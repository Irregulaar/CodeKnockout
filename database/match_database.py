from database.database import supabase

#Posibles estados de partida: ('pendiente', 'en curso', 'finalizado')

def SaveIdGame(GameID:str,player1:str,player2:str,state:str):
    data = {
        "game_id": GameID,
        "player1": player1,
        "player2": player2,
        "state": state
    }
    save = supabase.table("partidas").insert(data).execute()


def CheckIdGame(GameID:str):
 try:
    check = supabase.table("partidas").select("game_id").eq("game_id",GameID).execute()


    if check.data:
        print("Juego encontrado")
        return True
    else:
       print("Juego no existente")
 except Exception as e:
    print(f"Error {e}")

# def Checkplayer(GameID:str):
#     check_users = supabase.table("partidas").select("player1","player2").eq("game_id",GameID).execute()
#     if check_users.data:
#        for game in check_users.data:
#           player1 = game.get("player1",None)
#           player2 = game.get("player2",None)

#           if player1 and player2:
#              print(f"Jugador 1: {player1}, Jugador 2: {player2}")
#           elif player1:
#              print(f"Player 1 encontrado {player1}")
#           elif player2:
#              print(f"Player 2 encontrado {player2}")

#     else:
#        return False
    


def playerwinner_database(winner: str, game_id: str):
    print(f"Ganador: {winner}, ID de juego: {game_id}")
    data = {
        "winner": winner,
        "state": "finalizado"
    }
    
    response = supabase.table("partidas").update(data).eq("game_id", game_id).execute()
    
    print("Respuesta de Supabase:", response)
