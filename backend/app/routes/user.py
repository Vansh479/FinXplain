from fastapi import APIRouter, Depends, HTTPException, status
from loguru import logger
from sqlalchemy.orm import Session

from app.db.models import FinancialSummaryModel
from app.db.session import get_db
from app.routes.auth import get_current_user

router = APIRouter()

@router.get('/details')
async def get_user_details(current_user=Depends(get_current_user)):
    try:
        return {
            "status": "success",
            "user_details": {
                "username": current_user.name,
                "email": current_user.email,
                "location": current_user.location,
                "id": current_user.id,
                "research_focus": current_user.research_focus,
                "professional_role": current_user.professional_role  
            }
        }
    except Exception as e:
        logger.exception(f"Detail fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Data retrieval failed")

@router.get('/reports', response_model=dict, status_code=status.HTTP_200_OK)
async def get_user_reports(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    try:
        user_reports = db.query(FinancialSummaryModel).filter_by(user_id=current_user.id).all()
        if not user_reports:
            return {
                "status": "success",
                "message": "No records found",
                "reports": []
            }
        formatted_reports = []
        for report in user_reports:
            try:
                formatted_reports.append({
                    "id": report.id,
                    "user_id": report.user_id,
                    "summary_type": report.summary_type,
                    "content": report.content,
                    "filename": report.filename,
                    "generated_at": report.generated_at
                })
            except Exception:
                continue  
        return {
            "status": "success",
            "reports": formatted_reports
        }
    except Exception as e:
        logger.exception(f"Report fetch error: {str(e)}")
        raise HTTPException(status_code=500, detail="Retrieval failed")