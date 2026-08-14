from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.ai_service import run_planbuddy_agent


router = APIRouter()


class AIRequest(BaseModel):
    message: str


class AIResponse(BaseModel):
    response: str


@router.post("/chat", response_model=AIResponse)
async def chat_with_planbuddy(request: AIRequest):
    try:
        response = await run_planbuddy_agent(request.message)

        return AIResponse(
            response=response
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI request failed: {str(e)}"
        )