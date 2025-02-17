from pydantic import BaseModel


class Product(BaseModel):
    productId: str
    productName: str
    mainProductImageURL: str
    productDescription: str
    productBrand: str
    categoryId: str
    productAvgRating: float
    productTotalViews: int
