from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.models import Case
from app.schemas import CaseCreate, CaseResponse
from app.auth import get_current_user

router = APIRouter()

@router.get("/", response_model=List[CaseResponse])
async def get_cases(current_user=Depends(get_current_user), db: Session = Depends(get_db)):
    cases = db.query(Case).filter(Case.userId == current_user.id).all()
    return cases

@router.post("/", response_model=CaseResponse)
async def create_case(
    case_data: CaseCreate,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    case = Case(
        **case_data.dict(),
        userId=current_user.id
    )
    db.add(case)
    db.commit()
    db.refresh(case)
    return case

@router.get("/{case_id}", response_model=CaseResponse)
async def get_case(
    case_id: int,
    current_user=Depends(get_current_user),
    db: Session = Depends(get_db)
):
    case = db.query(Case).filter(
        Case.id == case_id,
        Case.userId == current_user.id
    ).first()
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    
    return case
