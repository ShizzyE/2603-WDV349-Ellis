from fastapi import FastAPI
from app.db.database import engine, Base
from app.models.user import User  # 👈 THIS registers the model
from app.routes import users

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(users.router)