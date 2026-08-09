from pydantic import BaseModel

class TaskBase(BaseModel):
    title: str
    description: str
    notes: str
    priority: str
    label: str
    due_date: str
    status: str
    start_date: str
    updated_at: str
    completed_at: str

    class Config:
        orm_mode = True

class CreateTask(TaskBase):
    class Config:
        orm_mode = True