from fastapi import APIRouter, Depends, HTTPException

#funcioness de database
from database.auth import login_user_database, register_user_database,get_user_data, check_email_exists

#schemas:
from schemas.auth_schemas import Login,register_user

#jwt
from utils.jwt import create_jwt,verify_jwt,get_jwt_data
#password
from utils.security import hash_password,verify_password



router = APIRouter(tags=["auth"])

@router.post("/auth/login",description="Login user with credentials")
async def login(user:Login):
    confirmation = login_user_database(user_email=user.email,password=user.password)
    if confirmation:
        data= {"user":user.email, "role": "member"}
        newtoken = create_jwt(data)
        data_jwt = get_jwt_data(newtoken)
        email_user = data_jwt["user"]
        datauser = get_user_data(email_user)

        if verify_jwt(newtoken):
           return {"Verification": confirmation, "access_token": newtoken, "datauser": datauser}
    else:
       raise HTTPException(status_code=404, detail="Incorrect credentials")
    

@router.get("/auth/validate-email",description="Check if email exists")
async def validate_email(email:str):
    response = check_email_exists(email=email)
    if response:
        return {"message": True}
    else:
        return {"message": False}
    
    


# @router.get("/auth/user_data")
# async def get_user_data(user_id:str):
#    usuario = get_username_by_user_id(user_id)
#    return {"username":usuario}



register_responses = {
    400: {
        "description": "Bad Request - User or email already exists",
        "content": {
            "application/json": {
                "examples": {
                    "UserExists": {"summary": "User already exists", "value": {"detail": "0"}},
                    "EmailExists": {"summary": "Email already exists", "value": {"detail": "1"}}
                }
            }
        }
    }
}

@router.post("/auth/register", responses=register_responses)
async def register(user: register_user):
   hashed_password = hash_password(user.password)
   
   data = {
    "email": user.email,
    "username": user.username,
    "hashed_password": hashed_password}
   
   response = register_user_database(data)
   if response == "0":
      raise HTTPException(status_code=400,detail="0")
   elif response == "1":
      raise HTTPException(status_code=400,detail="1")
   
   return response
   
  