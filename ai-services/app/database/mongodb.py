import motor.motor_asyncio
from dotenv import load_dotenv

from app.config import settings

load_dotenv()

client = motor.motor_asyncio.AsyncIOMotorClient(settings.mongodb_uri)
database = client[settings.database_name]


async def get_database():
    return database
