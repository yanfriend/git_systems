from fastapi import APIRouter
from app.database import get_db_connection

router = APIRouter()

@router.get("/db-status")
def db_status():
    try:
        conn = get_db_connection()
        return {"status": "Database connected"}
    except Exception as e:
        return {"status": f"Error connecting to DB: {e}"}
