from agents import Agent, Runner, function_tool


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

    print("Creating task:")
    print(f"Title: {title}")
    print(f"Priority: {priority}")
    print(f"Due date: {due_date}")
    print(f"Status: {status}")

    return f"Task '{title}' was created successfully."


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
        "to complete the task."

        "When interpreting relative dates, use the current date "
        "as the reference point. Today is 2026-08-19. "
        "'Tomorrow' means 2026-08-20. "
        "'Next Friday' means 2026-08-28. "
        "Do not interpret 'next Friday' as the upcoming Friday."
    ),
    model="gpt-5-mini",
    tools=[create_task],
)

async def run_planbuddy_agent(message: str) -> str:
    result = await Runner.run(
        planbuddy_agent,
        message,
    )

    return result.final_output