import jwt
from datetime import datetime, timedelta
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials

app = FastAPI()
security = HTTPBearer() 

# 🔑 Clave secreta (usada para firmar el token)
SECRET_KEY = "supersecreto"
ALGORITHM = "HS256"

def create_jwt(data: dict, expires_in: int = 3600):
    """
    data: Diccionario con datos que irán en el token (ej. usuario, rol)
    expires_in: Tiempo en segundos antes de que el token expire (default: 60 seg)
    """
    payload = data.copy()
    payload["exp"] = (datetime.now() + timedelta(seconds=expires_in)).timestamp()

    token = jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)  # Crea el JWT
    
    return token

#verificación del token jwt
def verify_jwt(token:str):
    try:
        payload = jwt.decode(token,SECRET_KEY,ALGORITHM)
        print(payload)
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401,detail="Token expirado")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401,detail="Token invalido")
    

def get_jwt_data(token: str):
    try:
        decoded_data = jwt.decode(token, options={"verify_signature": False})
        return decoded_data  # Devuelve el contenido del token
    except jwt.DecodeError:
        raise HTTPException(status_code=400, detail="Token inválido")