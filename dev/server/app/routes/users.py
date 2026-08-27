from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.db.database import get_db
from app.models.user import User
from app.schemas.user import (
    CreateUser,
    UpdateUser,
    ChangePassword,
    UserResponse,
)
from app.services.auth_service import (
    get_current_user,
    hash_password,
    verify_password,
)

router = APIRouter()


@router.get("/", response_model=List[UserResponse])
def get_users(
    db: Session = Depends(get_db)
):
    return db.query(User).all()


@router.get("/{id}", response_model=UserResponse)
def get_user(
    id: int,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == id).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    return user


@router.post(
    "/",
    response_model=UserResponse,
    status_code=201
)
def create_user(
    user: CreateUser,
    db: Session = Depends(get_db)
):
    existing_user = (
        db.query(User)
        .filter(User.email == user.email)
        .first()
    )

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email is already registered."
        )

    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=hash_password(user.password),
        auth_provider="local"
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return new_user


@router.put("/me", response_model=UserResponse)
def update_current_user(
    updated: UpdateUser,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if updated.username is not None:
        username = updated.username.strip()

        if not username:
            raise HTTPException(
                status_code=400,
                detail="Username cannot be empty."
            )

        current_user.username = username

    db.commit()
    db.refresh(current_user)

    return current_user


@router.put("/me/password", response_model=UserResponse)
def change_password(
    password_data: ChangePassword,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if not verify_password(
        password_data.current_password,
        current_user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Current password is incorrect."
        )

    if len(password_data.new_password) < 8:
        raise HTTPException(
            status_code=400,
            detail="New password must be at least 8 characters."
        )

    current_user.password_hash = hash_password(
        password_data.new_password
    )

    db.commit()
    db.refresh(current_user)

    return current_user


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