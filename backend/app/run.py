from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.middleware import LoggingAndPerformanceMiddleware
from app.db.session import Base, engine
from app.db import models

from app.routes import auth 

from app.routes.auth import router as auth_router
from app.routes.reports import router as analysis_router
from app.routes.user import router as user_router
from app.routes.health import router as health_router

def create_app():
    app = FastAPI(
        title="FinXplain AI - Core Engine",
        description="Stateless RAG system for Financial Analysis and Retrieval",
        version="1.0.0"
    )

    app.add_middleware(LoggingAndPerformanceMiddleware)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"], 
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(auth_router, prefix="/auth", tags=["Security"])
    app.include_router(analysis_router, prefix="/analysis", tags=["Engine"])
    app.include_router(user_router, prefix="/user", tags=["Account"])
    app.include_router(health_router, prefix="/health", tags=["System"])

    print(f"📡 SQLAlchemy is creating tables for: {Base.metadata.tables.keys()}")
    
    Base.metadata.create_all(bind=engine)
    

    return app
from app.core.config import SECRET_KEY
print(f"🚀 ENGINE STARTING... SECRET_KEY IS: {SECRET_KEY}")

app = create_app()