from app.db.database import Base
from sqlalchemy import Column, Integer, String, TIMESTAMP, Date, text


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, nullable=False)

    title = Column(String, nullable=False)
    description = Column(String, nullable=False)
    notes = Column(String, nullable=False)
    priority = Column(String, nullable=False)
    label = Column(String, nullable=False)

    due_date = Column(Date, nullable=False)
    start_date = Column(Date, nullable=False)

    status = Column(String, nullable=False)

    updated_at = Column(
        TIMESTAMP(timezone=True),
        server_default=text("now()"),
        onupdate=text("now()")
    )

    completed_at = Column(
        TIMESTAMP(timezone=True),
        nullable=True
    )

    created_at = Column(
        TIMESTAMP(timezone=True),
        server_default=text("now()")
    )