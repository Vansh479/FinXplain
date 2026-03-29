from typing import Optional 
from fastapi import APIRouter, Depends, HTTPException, File, UploadFile, Form
from app.routes.auth import get_current_user
from app.service.summary import get_financial_summary

router = APIRouter()

@router.post('/query')
async def query_financial_engine(
    fi_description: str = Form(...),
    reportssheet_type: str = Form("analyst"),
    fiscal_pdf: Optional[UploadFile] = File(None), 
    current_user = Depends(get_current_user),
):
    try: 
        result = get_financial_summary(fi_description, reportssheet_type, fiscal_pdf)

        if not result:
            raise HTTPException(status_code=404, detail="Analysis failed.")

        return {"status": "success", "data": result}

    except Exception as error:
        raise HTTPException(status_code=500, detail=str(error))