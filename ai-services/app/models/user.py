from pydantic import BaseModel


class User(BaseModel):
    userId: str
    userName: str
    userHeight: float
    userWeight: float
    # If you plan to handle dates as datetime, import datetime and change type accordingly.
    userDateOfBirth: str
    userAddress: str
    userGender: str
    userJob: str
    userCity: str