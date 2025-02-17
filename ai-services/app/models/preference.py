from pydantic import BaseModel


class Preference(BaseModel):
    preferenceId: str
    userId: str
    preferenceType: str
    preferenceScore: float
    preferenceDate: str
