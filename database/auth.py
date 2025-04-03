from database.database import supabase
from utils.security import verify_password
import uuid

def login_user_database(user_email:str, password:str):
    response = supabase.table("users").select("email,hashed_password").eq("email", user_email).execute()
    if response.data:
        store_hashed = response.data[0]["hashed_password"]
        return verify_password(password,store_hashed)
    else:
        return False
    

# def get_username_by_user_id(user_id: str):
#     try:
#         user_id = str(uuid.UUID(user_id))
#     except ValueError:
#         print("El user_id proporcionado no es un UUID válido.")
#         return None
    
#     response = supabase.table("users").select("*").execute()
#     #print("Respuesta completa:", response)

#     if response.data:
#         for user in response.data:

#             if str(user['user_id']) == user_id:
       
#                 return user.get('username')  # Esto debería salir de la función
#         print("No se encontró el usuario con el user_id proporcionado.")
#         return None
#     else:
#         print("No se encontraron datos en la base de datos.")
#         return None




def register_user_database(data:dict):
    exist_user = supabase.table("users").select("email").eq("username",data["username"]).execute()
    exist_email = supabase.table("users").select("email").eq("email",data["email"]).execute()
    if exist_user.data:
        return "0"
    
    if exist_email.data:
        return "1"
 
    response = supabase.table("users").insert(data).execute()
    return "Ok"


def get_user_data(email: str):  # Ahora solo recibe un string
    if not email:
        return None  # Si el username es None, retorna None
    
    response = supabase.table("users").select("username", "avatar_url","email","user_id").eq("email", email).execute()

    print(response.data[0]) 
    if response.data:
        
        return response.data[0]  # Devuelve los datos del usuario
    
    return None  # No se encontró el usuario

def check_email_exists(email: str) -> bool:
    response = supabase.table("users").select("email").eq("email", email).execute()
    if response.data:
        return True  # El correo electrónico ya existe
    return False  # El correo electrónico no existe