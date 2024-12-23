import type {ClientSession} from "mongoose";
import {CategoryWithBase} from "../../../Domain/Entities/CategoryEntities.ts";

export interface ICategoryRepository {
    //CRUD
    createCategory(categoryData: any, session: ClientSession): Promise<typeof CategoryWithBase>;

    getCategoryById(categoryId: string, queryData: any): Promise<typeof CategoryWithBase | null>;

    getAllCategories(queryData: any): Promise<typeof CategoryWithBase[] | null>;

    updateCategoryById(categoryId: string, categoryData: any, session: ClientSession): Promise<typeof CategoryWithBase | null>;

    deleteCategoryById(categoryId: string, session: ClientSession): Promise<typeof CategoryWithBase | null>;

    //Other API
}