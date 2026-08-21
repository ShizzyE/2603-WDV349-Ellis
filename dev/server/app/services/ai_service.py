from dataclasses import dataclass
from datetime import date
from typing import Literal

from agents import Agent, Runner, RunContextWrapper, function_tool
from sqlalchemy.orm import Session

from app.models.task import Task
from app.models.user import User


# Dataclass to hold the context for the PlanBuddy agent,
# including the database session and authenticated user ID.
@dataclass
class PlanBuddyContext:
    db: Session
    user_id: int


# Allowed task values
Priority = Literal["High", "Medium", "Low"]

Status = Literal[
    "Not Started",
    "In Progress",
    "Delayed",
    "Completed",
]

Label = Literal[
    "School",
    "Work",
    "Personal",
    "Faith",
    "Business",
]


# CREATE TASK TOOL
# =====

@function_tool
def create_task(
    ctx: RunContextWrapper[PlanBuddyContext],
    title: str,
    description: str = "",
    notes: str = "",
    priority: Priority = "Medium",
    label: Label = "Personal",
    due_date: str = "",
    start_date: str = "",
    status: Status = "Not Started",
):
    """Create a new PlanBuddy task for the authenticated user."""

    db = ctx.context.db
    user_id = ctx.context.user_id

    print("\nCreating task:")
    print(f"User ID: {user_id}")
    print(f"Title: {title}")
    print(f"Description: {description}")
    print(f"Notes: {notes}")
    print(f"Priority: {priority}")
    print(f"Label: {label}")
    print(f"Start date: {start_date}")
    print(f"Due date: {due_date}")
    print(f"Status: {status}")
    print()

    task = Task(
        user_id=user_id,
        title=title,
        description=description,
        notes=notes,
        priority=priority,
        label=label,
        due_date=date.fromisoformat(due_date),
        start_date=date.fromisoformat(start_date),
        status=status,
    )

    db.add(task)
    db.commit()
    db.refresh(task)

    return (
        f"Task created successfully:\n"
        f"ID: {task.id}\n"
        f"Title: {task.title}\n"
        f"Description: {task.description}\n"
        f"Notes: {task.notes}\n"
        f"Priority: {task.priority}\n"
        f"Label: {task.label}\n"
        f"Start date: {task.start_date}\n"
        f"Due date: {task.due_date}\n"
        f"Status: {task.status}"
    )


# GET TASKS TOOL
# =====

@function_tool
def get_tasks(
    ctx: RunContextWrapper[PlanBuddyContext],
):
    """Get all tasks belonging to the authenticated user."""

    db = ctx.context.db
    user_id = ctx.context.user_id

    tasks = (
        db.query(Task)
        .filter(Task.user_id == user_id)
        .order_by(Task.due_date.asc())
        .all()
    )

    if not tasks:
        return "You currently have no tasks."

    task_list = []

    for task in tasks:
        task_list.append(
            f"ID: {task.id}\n"
            f"Title: {task.title}\n"
            f"Description: {task.description}\n"
            f"Notes: {task.notes}\n"
            f"Priority: {task.priority}\n"
            f"Label: {task.label}\n"
            f"Start Date: {task.start_date}\n"
            f"Due Date: {task.due_date}\n"
            f"Status: {task.status}"
        )

    return "\n\n".join(task_list)


# UPDATE TASK TOOL
# ====

@function_tool
def update_task(
    ctx: RunContextWrapper[PlanBuddyContext],
    task_id: int,
    title: str | None = None,
    description: str | None = None,
    notes: str | None = None,
    priority: Priority | None = None,
    label: Label | None = None,
    due_date: str | None = None,
    start_date: str | None = None,
    status: Status | None = None,
):
    """Update an existing task belonging to the authenticated user."""

    db = ctx.context.db
    user_id = ctx.context.user_id

    task = (
        db.query(Task)
        .filter(
            Task.id == task_id,
            Task.user_id == user_id,
        )
        .first()
    )

    if not task:
        return "Task not found."

    if title is not None:
        task.title = title

    if description is not None:
        task.description = description

    if notes is not None:
        task.notes = notes

    if priority is not None:
        task.priority = priority

    if label is not None:
        task.label = label

    if due_date is not None:
        task.due_date = date.fromisoformat(due_date)

    if start_date is not None:
        task.start_date = date.fromisoformat(start_date)

    if status is not None:
        task.status = status

    db.commit()
    db.refresh(task)

    return (
        f"Task updated successfully:\n"
        f"ID: {task.id}\n"
        f"Title: {task.title}\n"
        f"Description: {task.description}\n"
        f"Notes: {task.notes}\n"
        f"Priority: {task.priority}\n"
        f"Label: {task.label}\n"
        f"Start Date: {task.start_date}\n"
        f"Due Date: {task.due_date}\n"
        f"Status: {task.status}"
    )


# PLANBUDDY AGENT
# =====

planbuddy_agent = Agent(
    name="PlanBuddy Assistant",
    instructions=(
        "You are PlanBuddy, an AI productivity assistant. "
        "Help users organize tasks, plan their time, and make "
        "productive decisions. Keep responses clear and concise. "

        "When creating or updating a task, you MUST use only the "
        "following allowed values:\n\n"

        "Priority values:\n"
        "- High\n"
        "- Medium\n"
        "- Low\n\n"

        "Status values:\n"
        "- Not Started\n"
        "- In Progress\n"
        "- Delayed\n"
        "- Completed\n\n"

        "Label values:\n"
        "- School\n"
        "- Work\n"
        "- Personal\n"
        "- Faith\n"
        "- Business\n\n"

        "Never create or invent different priority, status, or "
        "label values. "

        "When creating a task, infer reasonable values for fields "
        "the user does not explicitly provide. "

        "Use Medium priority if priority is not specified. "

        "Use Not Started as the default status. "

        "Use Personal as the default label when a label cannot "
        "reasonably be inferred. "

        "Leave description and notes empty when they are not provided. "

        "When updating a task, only change the fields the user "
        "specifically asks to change. "
        "Do not overwrite existing task information unnecessarily. "

        "Use get_tasks when the user asks to see, review, find, "
        "or reference their existing tasks. "

        "Use update_task when the user wants to modify an existing task. "

        "Only access and modify tasks belonging to the authenticated user. "

        "Do not ask the user for information unless it is necessary "
        "to complete the task. "

        "When interpreting relative dates, use the current date "
        "as the reference point. "
        "Today is 2026-08-19. "
        "'Tomorrow' means 2026-08-20. "
        "'Next Friday' means 2026-08-28. "
        "Do not interpret 'next Friday' as the upcoming Friday. "

        "When scheduling tasks, only use dates for the start_date "
        "and due_date fields. "

        "Do not use times in the date fields. "

        "If the user provides or the Agent determines a specific "
        "time, include that time in the task description instead. "

        "For example, if a task is scheduled for Saturday at 7:30 PM, "
        "use start_date='2026-08-22' and include "
        "'Scheduled time: 7:30 PM' in the description."
    ),
    model="gpt-5-mini",
    tools=[
        create_task,
        get_tasks,
        update_task,
    ],
)


# ============================================================
# RUN PLANBUDDY AGENT
# ============================================================

async def run_planbuddy_agent(
    message: str,
    db: Session,
    current_user: User,
) -> str:

    context = PlanBuddyContext(
        db=db,
        user_id=current_user.id,
    )

    print(f"AI request from user ID: {current_user.id}")

    result = await Runner.run(
        planbuddy_agent,
        message,
        context=context,
    )

    return result.final_output