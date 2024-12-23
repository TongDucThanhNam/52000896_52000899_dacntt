import type {ClientSession} from "mongoose";
import {CategoryWithBase} from "../../../Domain/Entities/CategoryEntities.ts";
import type {ICategoryRepository} from "../../../Application/Persistences/IRepositories/ICategoryRepository.ts";

class CategoryRepository implements ICategoryRepository {
    async createCategory(categoryData: any, session: ClientSession): Promise<typeof CategoryWithBase> {
        try {
            const category: any = await CategoryWithBase.create([categoryData], {session: session});
            return category;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }

    async getCategoryById(categoryId: string, queryData: any): Promise<typeof CategoryWithBase | null> {
        try {
            const category: any = await CategoryWithBase.findById(categoryId)
            return category;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }

    async getAllCategories(queryData: any): Promise<(typeof CategoryWithBase)[] | null> {
        try {
            const categories: any = await CategoryWithBase.find()
            return categories;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }

    async updateCategoryById(categoryId: string, categoryData: any, session: ClientSession): Promise<typeof CategoryWithBase | null> {
        try {
            const category: any = await CategoryWithBase.findByIdAndUpdate(categoryId, categoryData, {
                new: true,
                session: session
            });
            return category;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }

    async deleteCategoryById(categoryId: string, session: ClientSession): Promise<typeof CategoryWithBase | null> {
        try {
            const category: any = await CategoryWithBase.findByIdAndUpdate(categoryId, {
                isActive: false,
                isDeleted: true
            }, {
                new: true,
                session: session
            });
            return category;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }
}

export default CategoryRepository;