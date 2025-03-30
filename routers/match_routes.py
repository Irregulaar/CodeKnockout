from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter
from starlette.websockets import WebSocketState

router = APIRouter(tags=["websocket"])

active_games = {}
wait_list = {"participants": {}, "queue": {}}

async def mensaje_confirmacion():
    try:
        # Obtener la lista de IDs de los jugadores conectados
        jugadores_conectados = [
            wait_list["participants"][ws]["user_id"]
            for ws in wait_list["participants"].keys()
            if ws.client_state == WebSocketState.CONNECTED
        ]
        
        # Crear el mensaje con los IDs de los jugadores
        mensaje = f"Jugadores listos: {', '.join(jugadores_conectados)}" if jugadores_conectados else "No hay jugadores conectados"

        # Enviar el mensaje a cada WebSocket conectado
        for ws in list(wait_list["participants"].keys()):
            if ws.client_state == WebSocketState.CONNECTED:
                print(f"Enviando confirmación a {wait_list['participants'][ws]['user_id']}: {mensaje}")
                await ws.send_json({"msg": mensaje})
            else:
                print(f"WebSocket {wait_list['participants'][ws]['user_id']} no conectado, ignorando")
        
        # Limpiar la lista de participantes
        wait_list["participants"].clear()
    except Exception as e:
        print(f"Error de mensaje: {e}")

async def partida_encontrada():
    for ws in list(wait_list["participants"].keys()):
        try:
            if ws.client_state == WebSocketState.CONNECTED:
                print(f"Notificando partida encontrada a {wait_list['participants'][ws]['user_id']}")
                await ws.send_json({"msg": "Se ha encontrado una partida"})
            else:
                print(f"WebSocket {wait_list['participants'][ws]['user_id']} no conectado, ignorando")
        except Exception as e:
            print(f"Error al notificar partida encontrada: {e}")

def agregar_websocket(websocket: WebSocket, id: str):
    wait_list["participants"][websocket] = {"user_id": id, "listo": False}
    print(f"wait_list actualizado: {wait_list}")

async def notificar_en_cola():
    """ Notificar a los jugadores en la cola que deben esperar su turno. """
    for ws in list(wait_list["queue"].keys()):
        try:
            if ws.client_state == WebSocketState.CONNECTED:
                await ws.send_text("La partida ha comenzado, por favor espera tu turno.")
            else:
                print(f"WebSocket en cola {wait_list['queue'][ws]['user_id']} no conectado, ignorando")
        except Exception as e:
            print(f"Error al notificar a jugadores en cola: {e}")

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
                print(f"Movido {wait_list['participants'][ws]['user_id']} de queue a participants")
            await partida_encontrada()
            await notificar_en_cola()
        else:
            print("No hay suficientes jugadores conectados en la cola para iniciar una partida")

@router.websocket("/ws/{id}")
async def websocket_endpoint(websocket: WebSocket, id: str):
    await websocket.accept()
    
    if len(wait_list["participants"]) >= 2:
        wait_list["queue"][websocket] = {"user_id": id, "listo": False}
        await websocket.send_text("La partida ya está completa, espera la siguiente ronda.")
        print(f"Usuario {id} añadido a queue: {wait_list['queue']}")
    else:
        if len(wait_list["queue"]) >= 2 and len(wait_list["participants"]) == 0:
            await mover_jugadores_a_partida()
        
        agregar_websocket(websocket, id)
        if len(wait_list["participants"]) == 2:
            await partida_encontrada()

    try:
        while True:
            mensaje = await websocket.receive_text()
            print(f"Mensaje recibido de {id}: {mensaje}")
            todos_listos = False
            
            if mensaje == "confirmar" and websocket in wait_list["participants"]:
                wait_list["participants"][websocket]["listo"] = True
                print(wait_list)
                todos_listos = True
                for datos in wait_list["participants"].values():
                    if not datos.get("listo", False):
                        todos_listos = False
                        break
            elif websocket in wait_list["queue"]:
                wait_list["queue"][websocket]["listo"] = True
                print(f"Jugador en cola {id} está listo: {wait_list['queue']}")
            else:
                await websocket.send_text("Comando no reconocido o no estás en una partida activa")
                continue
                
            if todos_listos:
                game_id = f"game{len(active_games) + 1}"
                active_games[game_id] = {
                    "players": wait_list["participants"].copy(),
                    "estado": "en curso"
                }
                print(f"Juego creado: {game_id}")
                await mensaje_confirmacion()
                print(f"confirmación de waitlist borrada:\n {wait_list}")
                await mover_jugadores_a_partida()

    except WebSocketDisconnect:
        if websocket in wait_list["participants"]:
            wait_list["participants"].pop(websocket, None)
            print(f"Cliente {id} desconectado de participants, wait_list: {wait_list}")
            if len(wait_list["participants"]) < 2:
                await mover_jugadores_a_partida()
        elif websocket in wait_list["queue"]:
            wait_list["queue"].pop(websocket, None)
            print(f"Cliente {id} desconectado de queue, wait_list: {wait_list}")
            for ws in list(wait_list["queue"].keys()):
                if ws.client_state != WebSocketState.CONNECTED:
                    wait_list["queue"].pop(ws, None)
                    print(f"WebSocket desconectado limpiado de queue: {ws}")
        await notificar_en_cola()