from pydantic import BaseModel


class Interaction(BaseModel):
    interactionId: str
    userId: str
    productId: str
    variantId: str
    interactionType: str
    interactionScore: float
    # interactionDate: str
