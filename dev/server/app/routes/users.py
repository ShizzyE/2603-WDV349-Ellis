from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.models.user import User
from app.schemas.user import CreateUser, UserBase, UserResponse
from app.db.database import get_db

router = APIRouter()


@router.get("/", response_model=List[UserResponse])
def get_users(db: Session = Depends(get_db)):
    return db.query(User).all()


@router.get("/{id}", response_model=UserResponse)
def get_user(id: int, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.id == id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.post("/", response_model=UserResponse, status_code=201)
def create_user(user: CreateUser, db: Session = Depends(get_db)):
    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=user.password,
        auth_provider="local"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.put("/{id}", response_model=UserResponse)
def update_user(
    id: int,
    updated: UserBase,
    db: Session = Depends(get_db)
):
    user_query = db.query(User).filter(User.id == id)
    user = user_query.first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user.username = updated.username
    user.email = updated.email

    db.commit()
    db.refresh(user)

    return user


@router.delete("/{id}", status_code=204)
def delete_user(
    id: int,
    db: Session = Depends(get_db)
):
    user_query = db.query(User).filter(User.id == id)
    user = user_query.first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    user_query.delete(synchronize_session=False)
    db.commit()