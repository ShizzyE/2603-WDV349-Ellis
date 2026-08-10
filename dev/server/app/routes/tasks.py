from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from starlette import status

from app.models.task import Task
from app.schemas.task import CreateTask, TaskBase
from app.db.database import get_db

router = APIRouter()


@router.get("/", response_model=List[CreateTask])
def get_tasks(db: Session = Depends(get_db)):
    return db.query(Task).all()


@router.get("/{id}", response_model=CreateTask)
def get_task(id: int, db: Session = Depends(get_db)):
    task = db.query(Task).filter(Task.id == id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task does not exist")
    return task


@router.post("/", response_model=CreateTask, status_code=201)
def create_task(task: CreateTask, db: Session = Depends(get_db)):
    new_task = Task(**task.dict())
    db.add(new_task)
    db.commit()
    db.refresh(new_task)
    return new_task


@router.put("/{id}", response_model=CreateTask)
def update_task(id: int, updated: TaskBase, db: Session = Depends(get_db)):
    task_query = db.query(Task).filter(Task.id == id)
    task = task_query.first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task does not exist")

    task_query.update(updated.dict(), synchronize_session=False)
    db.commit()
    return task_query.first()


@router.delete("/{id}", status_code=204)
def delete_task(id: int, db: Session = Depends(get_db)):
    task_query = db.query(Task).filter(Task.id == id)
    task = task_query.first()

    if task is None:
        raise HTTPException(status_code=404, detail="Task does not exist")

    task_query.delete(synchronize_session=False)
    db.commit()