from pydantic import BaseModel, EmailStr


class Login(BaseModel):
    email: EmailStr
    password: str
    
class register_user(BaseModel):
    email: EmailStr
    password: str
    username: str