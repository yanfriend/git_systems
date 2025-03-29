from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from . import models, database
from pydantic import BaseModel
from typing import Optional

from fastapi.middleware.cors import CORSMiddleware  # <-- Add this


app = FastAPI()

# Add CORS middleware (place this right after creating the FastAPI app)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Your React app's URL
    allow_methods=["*"],  # Allows all methods (GET, POST, OPTIONS etc.)
    allow_headers=["*"],
)

# Create tables
models.Base.metadata.create_all(bind=database.engine)

# Dependency
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Pydantic models
class TaskCreate(BaseModel):
    title: str
    description: Optional[str] = None

class Task(TaskCreate):
    id: int
    completed: bool
    
    class Config:
        orm_mode = True

# Routes
@app.post("/tasks/", response_model=Task)
def create_task(task: TaskCreate, db: Session = Depends(get_db)):
    db_task = models.Task(**task.dict())
    db.add(db_task)
    db.commit()
    db.refresh(db_task)
    return db_task

@app.get("/tasks/", response_model=list[Task])
def read_tasks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(models.Task).offset(skip).limit(limit).all()

@app.get("/tasks/{task_id}", response_model=Task)
def read_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# @app.put("/tasks/{task_id}", response_model=Task)
# def update_task(task_id: int, completed: bool, db: Session = Depends(get_db)):
#     task = db.query(models.Task).filter(models.Task.id == task_id).first()
#     if task is None:
#         raise HTTPException(status_code=404, detail="Task not found")
#     task.completed = completed
#     db.commit()
#     db.refresh(task)
#     return task

@app.put("/tasks/{task_id}")
def update_task(
    task_id: int, 
    task_update: dict,  # Accept raw dict instead of Pydantic model
    db: Session = Depends(get_db)
):
    db_task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if not db_task:
        raise HTTPException(status_code=404, detail="Task not found")
    
    # Update only the 'completed' status
    if "completed" in task_update:
        db_task.completed = task_update["completed"]
    
    db.commit()
    db.refresh(db_task)
    return db_task
        

@app.delete("/tasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    task = db.query(models.Task).filter(models.Task.id == task_id).first()
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    db.delete(task)
    db.commit()
    return {"message": "Task deleted"}