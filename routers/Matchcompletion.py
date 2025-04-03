import asyncio
from fastapi import FastAPI, WebSocket, WebSocketDisconnect, APIRouter
from database.match_database import SaveIdGame,CheckIdGame,playerwinner_database
import json


router = APIRouter(tags=["websocket_fight"])


class game_status:

    def __init__(self):
        self.games = {}
    
    def added_players(self,ID,Player:str,websocket):
        if ID not in self.games:
         self.games[ID] = {"players": [], "sockets":[]}
        
        if len(self.games[ID]["players"]) < 2:
            self.games[ID]["players"].append(Player)
            self.games[ID]["sockets"].append(websocket)

        # if len(self.games[ID]["players"]) == 2:
        #     print(f"Juego iniciado con los jugadores {self.games[ID]["players"]}")
    
    def show(self):
       print(self.games)

    async def remove_player(self,Game_id, Player,websocket):

           if Game_id in self.games:
               return
           

           if Player in self.games[Game_id]["players"]:
              #se borra de players y sockets
              self.games[Game_id]["players"].remove(Player)
              self.games[Game_id]["sockets"].remove(websocket)
              #print(self.games[game_id]["sockets"])


           if  len(self.games[Game_id]["players"]) == 1:
                winner =  self.games[Game_id]["players"][0]
                winner_socket =  self.games[Game_id]["sockets"][0]
                winner_data = {
                 "winner": f"{winner}"}
                try:
                    playerwinner_database(winner,game_id=Game_id)
                    await winner_socket.send_text(json.dumps(winner_data))

                    for ws in self.games[Game_id]["sockets"]:
                        await ws.close(code=1000, reason="Partida finalizada")    

                    del self.games[Game_id]
                    
                except Exception as e:
                    print(f"Error al enviar el ganador")

    async def winner_metodo(self,Game_id,Player):
        sockets = self.games[Game_id]["sockets"]
        
        if Player in self.games[Game_id]["players"]: 
            for ws in sockets:
                try:
                    await ws.send_text(json.dumps({"winner": Player}))
                except Exception as e:
                    print(f"Error al enviar el ganador: {e}")
                
            await asyncio.sleep(5)  

            for ws in sockets:
                try:
                    await ws.close(code=1000, reason="Partida finalizada")
                except Exception as e:
                    print(f"Error al cerrar WebSocket: {e}")
            del self.games[Game_id]

            

game = game_status()


@router.websocket("/ws/started/{game_id}")
async def websocket_game(websocket:WebSocket,game_id:str):
    await websocket.accept()

    if CheckIdGame(game_id):
        print("Encontrado")
    else:
        await websocket.close(code=1008, reason="ID de juego no válido")
        return


    try:

        while True:

           data = await websocket.receive_text()
           message = json.loads(data)
 
           player_id = message.get("player_id")
           player_winner= message.get("winner",None)

           game.added_players(game_id,player_id,websocket)
           
           if player_winner:
               print("Ganador encontrado")
               await game.winner_metodo(game_id,player_winner)
               playerwinner_database(player_winner,game_id)

               
           
           game.show()

    except WebSocketDisconnect:
            await game.remove_player(game_id,player_id,websocket)
            print(f"se ha salido {websocket}")
            game.show()
