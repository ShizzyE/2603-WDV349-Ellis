from pydantic import BaseModel

class UserBase(BaseModel):
    username: str
    email: str
    password: str

    class Config:
        orm_mode = True


class CreateUser(UserBase):
    class Config:
        orm_mode = True