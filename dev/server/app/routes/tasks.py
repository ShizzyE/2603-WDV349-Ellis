from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.task import Task
from app.models.user import User
from app.schemas.task import CreateTask, TaskBase, TaskResponse
from app.services.auth_service import get_current_user


router = APIRouter()


# GET ALL TASKS FOR CURRENT USER
@router.get("/", response_model=List[TaskResponse])
def get_tasks(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return (
        db.query(Task)
        .filter(Task.user_id == current_user.id)
        .all()
    )


# GET ONE TASK
@router.get("/{id}", response_model=TaskResponse)
def get_task(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = (
        db.query(Task)
        .filter(
            Task.id == id,
            Task.user_id == current_user.id
        )
        .first()
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task does not exist"
        )

    return task


# CREATE TASK
@router.post(
    "/",
    response_model=TaskResponse,
    status_code=status.HTTP_201_CREATED
)
def create_task(
    task: CreateTask,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    new_task = Task(
        **task.dict(),
        user_id=current_user.id
    )

    db.add(new_task)
    db.commit()
    db.refresh(new_task)

    return new_task


# UPDATE TASK
@router.put("/{id}", response_model=TaskResponse)
def update_task(
    id: int,
    updated: TaskBase,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = (
        db.query(Task)
        .filter(
            Task.id == id,
            Task.user_id == current_user.id
        )
        .first()
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task does not exist"
        )

    for key, value in updated.dict().items():
        setattr(task, key, value)

    db.commit()
    db.refresh(task)

    return task


# DELETE TASK
@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_task(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    task = (
        db.query(Task)
        .filter(
            Task.id == id,
            Task.user_id == current_user.id
        )
        .first()
    )

    if task is None:
        raise HTTPException(
            status_code=404,
            detail="Task does not exist"
        )

    db.delete(task)
    db.commit()

    return None