from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    email: str


class CreateUser(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    auth_provider: str

    class Config:
        orm_mode = True