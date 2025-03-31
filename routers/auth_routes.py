from fastapi import APIRouter, Depends, HTTPException

#funcioness de database
from database.auth import login_user_database, get_username_by_user_id, register_user_database

#schemas:
from schemas.auth_schemas import Login,register_user

#jwt
from utils.jwt import create_jwt,verify_jwt
#password
from utils.security import hash_password,verify_password

router = APIRouter(tags=["auth"])

@router.post("/auth/login",description="Login user with credentials")
async def login(user:Login):
    confirmation = login_user_database(user_email=user.email,password=user.password)
    if confirmation:
        data= {"user":user.email, "role": "member"}
        newtoken = create_jwt(data)
        if verify_jwt(newtoken):
           return {"Verification": confirmation, "access_token": newtoken, "token_type": "bearer"}
    else:
       raise HTTPException(status_code=404, detail="Incorrect credentials")
    

    
    


@router.get("/auth/user_data")
async def get_user_data(user_id:str):
   usuario = get_username_by_user_id(user_id)
   return {"username":usuario}


@router.post("/auth/register")
async def register(user: register_user):
   hashed_password = hash_password(user.password)
   
   data = {
    "email": user.email,
    "username": user.username,
    "hashed_password": hashed_password}
   
   response = register_user_database(data)
   return response
   
  