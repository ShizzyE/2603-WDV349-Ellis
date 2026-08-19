from agents import Agent, Runner, function_tool
from sqlalchemy.orm import Session

from app.models.user import User


@function_tool
def create_task(
    title: str,
    description: str = "",
    notes: str = "",
    priority: str = "medium",
    label: str = "",
    due_date: str = "",
    start_date: str = "",
    status: str = "todo",
):
    """Create a new PlanBuddy task."""

    print("\nCreating task:")
    print(f"Title: {title}")
    print(f"Description: {description}")
    print(f"Notes: {notes}")
    print(f"Priority: {priority}")
    print(f"Label: {label}")
    print(f"Start date: {start_date}")
    print(f"Due date: {due_date}")
    print(f"Status: {status}")
    print()

    return (
        f"Task created successfully:\n"
        f"Title: {title}\n"
        f"Description: {description}\n"
        f"Notes: {notes}\n"
        f"Priority: {priority}\n"
        f"Label: {label}\n"
        f"Start date: {start_date}\n"
        f"Due date: {due_date}\n"
        f"Status: {status}"
    )


planbuddy_agent = Agent(
    name="PlanBuddy Assistant",
    instructions=(
        "You are PlanBuddy, an AI productivity assistant. "
        "Help users organize tasks, plan their time, and make "
        "productive decisions. Keep responses clear and concise. "

        "When creating a task, infer reasonable values for fields "
        "the user does not explicitly provide. "
        "Use medium priority if priority is not specified. "
        "Use todo as the default status. "
        "Leave description, notes, and label empty when they are "
        "not provided. "
        "Do not ask the user for information unless it is necessary "
        "to complete the task. "

        "When interpreting relative dates, use the current date "
        "as the reference point. Today is 2026-08-19. "
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
    tools=[create_task],
)


async def run_planbuddy_agent(
    message: str,
    db: Session,
    current_user: User
) -> str:

    print(f"AI request from user ID: {current_user.id}")

    result = await Runner.run(
        planbuddy_agent,
        message,
    )

    return result.final_output