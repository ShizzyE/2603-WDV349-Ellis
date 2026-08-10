from datetime import date, datetime
from typing import Optional

from pydantic import BaseModel


class TaskBase(BaseModel):
    title: str
    description: str
    notes: str
    priority: str
    label: str
    due_date: date
    status: str
    start_date: date


class CreateTask(TaskBase):
    pass


class TaskResponse(TaskBase):
    id: int
    updated_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True