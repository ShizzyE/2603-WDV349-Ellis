from agents import Agent, Runner


planbuddy_agent = Agent(
    name="PlanBuddy Assistant",
    instructions=(
        "You are PlanBuddy, an AI productivity assistant. "
        "Help users organize tasks, plan their time, and make "
        "productive decisions. Keep responses clear and concise."
    ),
    model="gpt-5-mini",
)


async def run_planbuddy_agent(message: str) -> str:
    result = await Runner.run(
        planbuddy_agent,
        message,
    )

    return result.final_output