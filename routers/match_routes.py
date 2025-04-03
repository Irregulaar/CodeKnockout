from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter
from starlette.websockets import WebSocketState
from database.auth import get_user_data
from database.match_database import SaveIdGame
import uuid
from utils.jwt import get_jwt_data
import logging

# Configuración básica de logging (mínima, solo para errores)
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

router = APIRouter(tags=["websocket"])

active_games = {}
wait_list = {"participants": {}, "queue": {}}

async def mensaje_confirmacion():
    try:
        # Obtener la lista de datos completos de los jugadores conectados
        jugadores_conectados = [
            wait_list["participants"][ws]
            for ws in wait_list["participants"].keys()
            if ws.client_state == WebSocketState.CONNECTED
        ]
        
        # Crear un diccionario con user_id como clave y avatar_url como valor
        mensaje_dict = {
            datos["user_id"]: datos["avatar_url"]
            for datos in jugadores_conectados
        }
        
        # Enviar el mensaje como un objeto JSON con "msg" como clave principal
        uuid_str = str(uuid.uuid4())
        mensaje_dict["game_id"] = uuid_str
        SaveIdGame(uuid_str, list(mensaje_dict.keys())[0], list(mensaje_dict.keys())[1], "pendiente")
        mensaje = {"start": mensaje_dict if jugadores_conectados else "No hay jugadores conectados"}

        # Enviar el mensaje a cada WebSocket conectado
        for ws in list(wait_list["participants"].keys()):
            if ws.client_state == WebSocketState.CONNECTED:
                await ws.send_json(mensaje)
        
        # Limpiar la lista de participantes
        wait_list["participants"].clear()
    except Exception as e:
        logger.error(f"Error en mensaje_confirmacion: {e}")

async def partida_encontrada():
    for ws in list(wait_list["participants"].keys()):
        try:
            if ws.client_state == WebSocketState.CONNECTED:
                await ws.send_json({"msg": "Se ha encontrado una partida"})
        except Exception as e:
            logger.error(f"Error al notificar partida encontrada: {e}")

def agregar_websocket(websocket: WebSocket, id: str, url_avatar):
    wait_list["participants"][websocket] = {"user_id": id, "listo": False, "avatar_url": url_avatar}

async def notificar_en_cola():
    for ws in list(wait_list["queue"].keys()):
        try:
            if ws.client_state == WebSocketState.CONNECTED:
                await ws.send_text("La partida ha comenzado, por favor espera tu turno.")
        except Exception as e:
            logger.error(f"Error al notificar a jugadores en cola: {e}")

async def mover_jugadores_a_partida():
    if len(wait_list["queue"]) >= 2:
        jugadores_a_mover = []
        for ws in list(wait_list["queue"].keys()):
            if ws.client_state == WebSocketState.CONNECTED:
                jugadores_a_mover.append(ws)
                if len(jugadores_a_mover) == 2:
                    break
        if len(jugadores_a_mover) == 2:
            for ws in jugadores_a_mover:
                wait_list["participants"][ws] = wait_list["queue"].pop(ws)
            await partida_encontrada()
            await notificar_en_cola()

@router.websocket("/ws/{token}")
async def websocket_endpoint(websocket: WebSocket, token: str):
    # Decodificar el token JWT
    decode_data = get_jwt_data(token)  # Cambiado de 'user' a 'token'
    user_data = get_user_data(decode_data["user"])  # Asegúrate de que 'user' sea el campo correcto

    if not user_data:
        await websocket.close(code=1008, reason="Usuario no encontrado")
        return

    # Obtener el username y avatar_url del usuario
    id = user_data["username"]  # Cambiado de 'user_id' a 'username' si hiciste este cambio
    url_avatar = user_data["avatar_url"]

    await websocket.accept()

    # Manejo de la lista de espera y participantes
    if len(wait_list["participants"]) >= 2:
        wait_list["queue"][websocket] = {"user_id": id, "listo": False, "avatar_url": url_avatar}
        await websocket.send_text("La partida ya está completa, espera la siguiente ronda.")
    else:
        if len(wait_list["queue"]) >= 2 and len(wait_list["participants"]) == 0:
            await mover_jugadores_a_partida()

        agregar_websocket(websocket, id, url_avatar)
        if len(wait_list["participants"]) == 2:
            await partida_encontrada()

    try:
        while True:
            mensaje = await websocket.receive_text()

            if mensaje == "confirmar" and websocket in wait_list["participants"]:
                wait_list["participants"][websocket]["listo"] = True
                await websocket.send_json({"msg": "Has confirmado, esperando a otros jugadores"})

                # Verificar si todos están listos
                todos_listos = all(datos["listo"] for datos in wait_list["participants"].values())

                if todos_listos:
                    game_id = f"game{len(active_games) + 1}"
                    active_games[game_id] = {
                        "players": wait_list["participants"].copy(),
                        "estado": "en curso"
                    }
                    await mensaje_confirmacion()
                    await mover_jugadores_a_partida()
            elif websocket in wait_list["queue"]:
                wait_list["queue"][websocket]["listo"] = True
                await websocket.send_json({"msg": "Estás en la cola y listo, esperando partida"})
            else:
                await websocket.send_text("Comando no reconocido o no estás en una partida activa")

    except WebSocketDisconnect:
        if websocket in wait_list["participants"]:
            wait_list["participants"].pop(websocket, None)
            if len(wait_list["participants"]) < 2:
                await mover_jugadores_a_partida()
        elif websocket in wait_list["queue"]:
            wait_list["queue"].pop(websocket, None)
            for ws in list(wait_list["queue"].keys()):
                if ws.client_state != WebSocketState.CONNECTED:
                    wait_list["queue"].pop(ws, None)
        await notificar_en_cola()