from fastapi import APIRouter, Depends, HTTPException
from database.auth import login_user
from database.auth import get_username_by_user_id

router = APIRouter(tags=["auth"])

@router.post("/auth/login",description="Login user with credentials")
async def login(email:str,password:str):
    confirmation = login_user(user_email=email,password=password)
    if confirmation:
      print(confirmation)
      raise  HTTPException(status_code=200,detail="OK")
    else:
       raise HTTPException(status_code=404, detail="Incorrect credentials")
    


@router.get("/auth/user_data")
async def get_user_data(user_id:str):
   usuario = get_username_by_user_id(user_id)
   return {"username":usuario}
