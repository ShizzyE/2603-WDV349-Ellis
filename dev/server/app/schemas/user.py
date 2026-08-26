from pydantic import BaseModel


class UserBase(BaseModel):
    username: str
    email: str


class CreateUser(UserBase):
    password: str


class UpdateUser(BaseModel):
    username: str | None = None
    password: str | None = None


class UserResponse(UserBase):
    id: int
    auth_provider: str

    class Config:
        orm_mode = True