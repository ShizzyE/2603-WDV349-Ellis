from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from starlette import status

from app.models.user import User
from app.schemas.user import CreateUser, UserBase
from app.db.database import get_db

router = APIRouter(prefix="/users", tags=["Users"])


@router.get("/", response_model=List[CreateUser])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()


@router.get("/{id}", response_model=CreateUser)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.id == id).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.post("/", response_model=CreateUser, status_code=201)
def create_user(user: CreateUser, db: Session = Depends(get_db)):
    new_user = User(**user.dict())
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.put("/{id}", response_model=CreateUser)
def update_user(id: int, updated: UserBase, db: Session = Depends(get_db)):
    user_query = db.query(models.User).filter(models.User.id == id)
    user = user_query.first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user_query.update(updated.dict(), synchronize_session=False)
    db.commit()
    return user_query.first()


@router.delete("/{id}", status_code=204)
def delete_user(id: int, db: Session = Depends(get_db)):
    user_query = db.query(models.User).filter(models.User.id == id)
    user = user_query.first()

    if user is None:
        raise HTTPException(status_code=404, detail="User not found")

    user_query.delete(synchronize_session=False)
    db.commit()