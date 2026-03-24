from database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Boolean, text

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer,primary_key=True,nullable=False)
    
    created_at = Column(TIMESTAMP(timezone=True), server_default=text('now()'))