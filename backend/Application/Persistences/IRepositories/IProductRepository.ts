import type {ClientSession} from "mongoose";
import {ProductWithBase} from "../../../Domain/Entities/ProductEntities.ts";

export interface IProductRepository {
    //CRUD
    createProduct(productData: any, session: ClientSession): Promise<typeof ProductWithBase>;

    getProductById(productId: string, queryData: any): Promise<typeof ProductWithBase | null>;

    getAllProducts(queryData: any): Promise<typeof ProductWithBase[] | null>;

    updateProductById(productId: string, productData: any, session: ClientSession): Promise<typeof ProductWithBase | null>;

    deleteProductById(productId: string, session: ClientSession): Promise<typeof ProductWithBase | null>;

    //Other API
    getProductsByCategory(categoryId: string, queryData: any): Promise<typeof ProductWithBase[] | null>;

    getProductsByTag(tagId: string, queryData: any): Promise<typeof ProductWithBase[] | null>;
}