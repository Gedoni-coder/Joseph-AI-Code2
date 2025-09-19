from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from tortoise.contrib.fastapi import register_tortoise

from business_forecast.routers import router as business_forecast_router

app = FastAPI()

# Configure CORS to allow frontend access
origins = [
    "http://localhost:8080",
    # Add other allowed origins here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register Tortoise ORM
register_tortoise(
    app,
    db_url="sqlite://db.sqlite3",
    modules={"models": ["business_forecast.models"]},
    generate_schemas=True,
    add_exception_handlers=True,
)

@app.get("/")
async def root():
    return {"message": "FastAPI backend is running"}

# Include routers
app.include_router(business_forecast_router, prefix="/api", tags=["business_forecast"])
