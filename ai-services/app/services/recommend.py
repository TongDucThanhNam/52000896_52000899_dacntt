from typing import List

import numpy as np
import pandas as pd
from numpy import hstack
from sklearn.compose import ColumnTransformer
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import StandardScaler, OneHotEncoder

from app.models import User
from app.models.interaction import Interaction
from app.models.product import Product


class CollaborativeFilteringRecommenderSystem:
    def __init__(self, interactions: List[Interaction], products: List[Product], users: List[User]):
        """
          Implements a collaborative filtering recommender system.
        """
        self.interactions = interactions
        self.products = products
        self.users = users

        # Build a user-product interating matrix.
        self.user_product_matrix = self._build_user_product_matrix()
        # Calculate user similarity based on the user-product matrix.
        self.user_similarity = self._calculate_user_similarity()

    def _predict_interating(self, user_id, product_id, k=3):
        # if that product new or never interacted by user
        if product_id not in self.user_product_matrix.columns:
            print(f"Product {product_id} is new.")
            return self.user_product_matrix.mean().mean()

        # find users who interate the product
        interated_users = self.user_product_matrix[product_id][self.user_product_matrix[product_id] > 0].index

        # Get similarity of current user with others
        similarity_scores = self.user_similarity.loc[user_id, interated_users]

        # Select top K similar users
        top_users = similarity_scores.nlargest(k).index

        # Get interatings of top K similar users
        similarity_scores = similarity_scores[top_users]

        # Get interratings of top K similar users for the product
        interatings = self.user_product_matrix.loc[top_users, product_id]

        # if don't hava any similar user, return the mean rating of the product
        if similarity_scores.sum() == 0:
            return self.user_product_matrix[product_id].mean()

        # Predict the interating score
        return np.dot(interatings, similarity_scores) / similarity_scores.sum()

    def _build_user_product_matrix(self) -> pd.DataFrame:
        """
            Create user-product interaction matrix.
        """
        # Convert all to DataFrame
        interactions_df = pd.DataFrame([interaction.model_dump() for interaction in self.interactions])

        # Preprocess the data
        # Interaction data
        # create new field recommendScore
        interactions_df["recommendScore"] = interactions_df["interactionScore"] * interactions_df[
            "interactionType"].map(
            {
                "view": 1,
                "cart": 2,
                "purchase": 5
            }
        )

        # Create matrix
        user_product_matrix = interactions_df.pivot_table(
            index="userId",
            columns="productId",
            values="recommendScore",
            aggfunc="sum",  # cause user can interacted with product many type.
            fill_value=0
        )  # user is row, product is column
        # write to csv
        # user_product_matrix.to_csv("user_product_matrix.csv")

        return user_product_matrix

    def _calculate_user_similarity(self) -> pd.DataFrame:
        """
            Calculate user similarity based on user features and user-product matrix.
        """

        users_df = pd.DataFrame([user.model_dump() for user in self.users])
        # Preprocess the data
        # Ingorning Admin users.
        users_df = users_df[users_df["userName"] != "admin"]
        # add field userAge from userDateOfBirth
        users_df["userAge"] = pd.to_datetime(users_df["userDateOfBirth"], format="%d/%m/%Y").apply(
            lambda x: 2025 - x.year
        )

        # Encode user features
        preprocessor = ColumnTransformer(
            transformers=[
                ('num', StandardScaler(), ['userHeight', 'userWeight', 'userAge']),
                ('cat', OneHotEncoder(), [
                    'userGender',
                    # 'userJob'
                ])
            ],
            remainder='drop'  # Drop other columns which unnecessary
        )
        # print(users_df.head(5))
        # apply transformm to create user features
        user_features = preprocessor.fit_transform(users_df)
        print(user_features.shape)


        # normalize user_product_matrix
        user_products_normalized = self.user_product_matrix.apply(
            lambda x: (x - x.mean()) / x.std() if x.std() > 0 else x,
            axis=0  # normalize by row
        ).fillna(0)  # fill NaN with 0

        # to csv
        # user_products_normalized.to_csv("user_products_normalized.csv")
        # user_features.to_csv("user_features.csv")
        # print(user_products_normalized.shape)

        # combine user features with user-product matrix
        # user_features and user_products_normalized must have same number of rows.
        # -> number of users and number of users interacted must be same
        # -> new user must have interacted with at least 1 product
        # TODO: handle new user
        user_features_sparse = hstack(
            [
                user_features,
                user_products_normalized
            ])

        # Compute cosine similarity
        similarity_matrix = cosine_similarity(user_features_sparse)
        # Convert the similarity matrix to DataFrame: index and columns are user IDs.
        similarity_df = pd.DataFrame(
            similarity_matrix,
            index=self.user_product_matrix.index,
            columns=self.user_product_matrix.index
        )
        # to csv
        # similarity_df.to_csv("similarity_df.csv")
        return similarity_df

    def recommend(self, target_user_id: str, top_n: int = 5) -> List[Product]:
        # find uninteracted products
        uninteracted = self.user_product_matrix.columns[self.user_product_matrix.loc[target_user_id] == 0]

        # Predict interating for each uninteracted product
        predictions = {}
        for product in uninteracted:
            # print(f"Predicting interacting for product {product}")
            pred = self._predict_interating(
                user_id=target_user_id,
                product_id=product,
                k=4  # number of similar users
            )
            # print(f"Predicted interating for product {product}: {pred:.2f}")
            predictions[product] = pred

        # fint top N products to recommend to user.
        top_products = sorted(predictions.items(), key=lambda x: x[1], reverse=True)[:top_n]
        # print(top_products)
        # return top products
        result = []
        for product_id, _ in top_products:
            product = next((p for p in self.products if p.productId == product_id), None)
            result.append(product)
        return result