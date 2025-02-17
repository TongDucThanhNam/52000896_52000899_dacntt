from fastapi import FastAPI

from app.routers import recommendations

app = FastAPI(
    title="FashionAI - AI services",
)

app.include_router(recommendations.router)
