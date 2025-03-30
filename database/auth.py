from database.database import supabase
from utils.security import verify_password
import uuid

def login_user(user_email:str, password:str):
    response = supabase.table("users").select("email,hashed_password").eq("email", user_email).execute()
    if response.data:
        store_hashed = response.data[0]["hashed_password"]
        return verify_password(password,store_hashed)
    else:
        return False
    

def get_username_by_user_id(user_id: str):
    try:
        user_id = str(uuid.UUID(user_id))
    except ValueError:
        print("El user_id proporcionado no es un UUID válido.")
        return None
    
    response = supabase.table("users").select("*").limit(5).execute()
    print("Respuesta completa:", response)

    if response.data:
        print("Primeros 5 registros:", response.data)
        for user in response.data:
            print(f"Comparando user_id: {user['user_id']} con {user_id}")
            if str(user['user_id']) == user_id:
                print("Usuario encontrado:", user)
                return user.get('username')  # Esto debería salir de la función
        print("No se encontró el usuario con el user_id proporcionado.")
        return None
    else:
        print("No se encontraron datos en la base de datos.")
        return None
