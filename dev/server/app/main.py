from fastapi import FastAPI
from app.db.database import engine, Base
from app.models.user import User 
from app.models.task import Task
from app.routes import users, tasks

app = FastAPI()

Base.metadata.create_all(bind=engine)

app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(tasks.router, prefix="/tasks", tags=["Tasks"])