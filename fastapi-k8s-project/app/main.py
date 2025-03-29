from fastapi import FastAPI
from app.routers import healthcheck, users

app = FastAPI()

# Include Routers
app.include_router(healthcheck.router)
app.include_router(users.router)
