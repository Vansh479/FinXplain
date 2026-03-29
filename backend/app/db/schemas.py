from typing import Optional
from pydantic import BaseModel, EmailStr

class UserSignupRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    research_focus: Optional[str] = None  
    location: Optional[str] = None  
    professional_role: Optional[str] = None  

class UserLoginRequest(BaseModel):
    email: EmailStr
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    message: str