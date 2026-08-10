from pydantic import BaseModel
from datetime import date, datetime
from typing import Optional


class TaskBase(BaseModel):
    title: str
    description: str
    notes: str
    priority: str
    label: str
    due_date: str
    status: str
    start_date: date
    updated_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class CreateTask(TaskBase):
    pass