import os

from pydantic.v1 import BaseSettings


class Settings(BaseSettings):
    mongodb_uri: str = os.getenv("CONNECTION_STRING", "mongodb://localhost:27017")
    database_name: str = os.getenv("DATABASE_NAME", "fashionai")

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"


settings = Settings()