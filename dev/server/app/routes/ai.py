from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.db.database import get_db
from app.models.user import User
from app.services.auth_service import get_current_user
from app.services.ai_service import run_planbuddy_agent


router = APIRouter()


class AIRequest(BaseModel):
    message: str


class AIResponse(BaseModel):
    response: str


@router.post("/chat", response_model=AIResponse)
async def chat_with_planbuddy(
    request: AIRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    try:
        response = await run_planbuddy_agent(
            request.message,
            db,
            current_user
        )

        return AIResponse(
            response=response
        )

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"AI request failed: {str(e)}"
        )