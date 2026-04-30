import os
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from jose import jwt, JWTError
from datetime import datetime, timedelta, timezone
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext
from loguru import logger
from dotenv import load_dotenv

from app.db.models import UserModel
from app.db.session import get_db
from app.db.schemas import UserSignupRequest, UserLoginRequest

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM", "HS256")
ACCESS_TOKEN_EXPIRE_MINUTES = 90

pwd_context = CryptContext(schemes=['bcrypt'], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str):
    return pwd_context.verify(plain_password, hashed_password)

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

def create_token(data: dict):
    to_encode = data.copy()
    expiry_date = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({'exp': expiry_date})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

@router.post('/login')
def login(request: UserLoginRequest, db: Session = Depends(get_db)):
    import time
    t0 = time.time()
    user = db.query(UserModel).filter(UserModel.email == request.email).first()
    t1 = time.time()
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Account not found")
    if not verify_password(request.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    t2 = time.time()
    token = create_token({"sub": str(user.id)})
    t3 = time.time()
    logger.info(f"Login timing: DB={t1-t0:.3f}s bcrypt={t2-t1:.3f}s JWT={t3-t2:.3f}s")
    return {
        "status": "success",
        "message": "Authenticated successfully",
        "access_token": token,
        "token_type": "bearer",
        "user_details": {
            "id": user.id,
            "name": user.name,
            "email": user.email
        },
    }

@router.post('/sign-up')
def sign_up(request: UserSignupRequest, db: Session = Depends(get_db)):
    import time
    t0 = time.time()
    existing_user = db.query(UserModel).filter(UserModel.email == request.email).first()
    t1 = time.time()
    if existing_user:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
    hashed_password = hash_password(request.password)
    t2 = time.time()
    new_user = UserModel(
        name=request.name,
        email=request.email,
        password=hashed_password,
        research_focus=request.research_focus,
        location=request.location,
        professional_role=request.professional_role
    )
    try:
        db.add(new_user)
        db.commit()
        db.refresh(new_user)
        t3 = time.time()
        logger.info(f"Signup timing: DB_check={t1-t0:.3f}s bcrypt_hash={t2-t1:.3f}s DB_write={t3-t2:.3f}s")
        return {
            "status": "success",
            "message": "Profile created",
            "user_details": {
                "id": new_user.id,
                "name": new_user.name,
                "email": new_user.email
            },
        }
    except IntegrityError:
        db.rollback()
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Registration failed")

def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Session expired or invalid",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except (JWTError, Exception):
        raise credentials_exception
    user = db.query(UserModel).filter(UserModel.id == user_id).first()
    if user is None:
        raise credentials_exception
    return user

@router.get('/check-token')
def check_token(current_user: UserModel = Depends(get_current_user)):
    return {
        "status": "success",
        "message": "Session valid",
        "user": {
            "id": current_user.id,
            "name": current_user.name,
            "email": current_user.email
        }
    }
