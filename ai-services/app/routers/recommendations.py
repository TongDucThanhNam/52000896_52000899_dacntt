from datetime import datetime

from dotenv import load_dotenv
from fastapi import APIRouter
from app.models import Interaction, Product, User
from app.services.recommend import CollaborativeFilteringRecommenderSystem

load_dotenv()

from app.database.mongodb import get_database

router = APIRouter()


@router.get("/recommendations/{user_id}")
async def recommendations(user_id: str):
    # get database from mongodb
    db = await get_database()

    # Fetch interactions
    interactions_collection = db["interactions"]
    interactions = await interactions_collection.find().to_list()
    clean_interactions = []
    for interaction in interactions:
        clean_interactions.append(
            Interaction(
                interactionId=str(interaction.get("_id")),
                userId=str(interaction.get("userId")),
                productId=str(interaction.get("productId")),
                variantId=str(interaction.get("variantId")),
                interactionType=interaction.get("interactionType"),
                interactionScore=interaction.get("interactionScore"),
            )
        )
    # print(clean_interactions)

    # Fetch products
    products_collection = db["products"]
    products = await products_collection.find().to_list()
    # print(products)
    clean_products = []
    for product in products:
        clean_products.append(
            Product(
                productId=str(product.get("_id")),
                productName=product.get("productName"),
                mainProductImageURL=product.get("imageUrls")[0],
                productDescription=product.get("productDescription"),
                productBrand=product.get("productBrand"),
                categoryId=str(product.get("categoryId")),
                productAvgRating=product.get("productAvgRating"),
                productTotalViews=product.get("productTotalViews"),
            )
        )
    # print(clean_products)

    # fetch users
    users_collection = db["users"]
    users = await users_collection.find().to_list()
    clean_users = []
    for user in users:
        user_date = user.get("userDateOfBirth")
        if isinstance(user_date, datetime):
            user_date = user_date.strftime("%d/%m/%Y")
        clean_users.append(
            User(
                userId=str(user.get("_id")),
                userName=user.get("userName"),
                userHeight=user.get("userHeight"),
                userWeight=user.get("userWeight"),
                userDateOfBirth=user_date,
                userAddress=user.get("userAddress"),
                userGender=user.get("userGender"),
                userJob=user.get("userJob"),
            )
        )
    # print(clean_users)

    recommender = CollaborativeFilteringRecommenderSystem(clean_interactions, clean_products, clean_users)
    result = recommender.recommend(user_id, top_n=5)
    return result
