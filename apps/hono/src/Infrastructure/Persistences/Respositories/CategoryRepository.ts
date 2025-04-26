import type {ICategoryRepository} from "../../../Application/Persistences/IRepositories/ICategoryRepository.ts";
import { getDb } from "../Config/db";
import {eq} from 'drizzle-orm';
import {categories} from "../../../Domain/Entities/schema";

class CategoryRepository implements ICategoryRepository {
    private db =  getDb();

    async createCategory(categoryData: any): Promise<any> {
        try {
            const category: any = await this.db.insert(categories).values(categoryData)
            return category;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }

    async getCategoryById(categoryId: string, queryData: any): Promise<any> {
        try {
            const category: any = await this.db.select().from(categories).where(eq(categories.id, Number(categoryId)))
            return category[0] || null;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }

    async getAllCategories(queryData: any): Promise<any> {
        try {
            const categoriesResult: any = await this.db.select().from(categories)
            return categoriesResult;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }

    async updateCategoryById(categoryId: string, categoryData: any): Promise<any> {
        try {
            const category: any = await this.db.update(categories)
                .set({
                    ...categoryData,
                    updatedAt: new Date().toISOString()
                })
                .where(eq(categories.id, Number(categoryId)))
            return category[0] || null;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }

    async deleteCategoryById(categoryId: string): Promise<any> {
        try {
            const category: any = await this.db.update(categories)
                .set({
                    isActive: false,
                    isDeleted: true,
                    updatedAt: new Date().toISOString()
                })
                .where(eq(categories.id, Number(categoryId)))
            return category[0] || null;
        } catch (error) {
            throw new Error("Error at CategoryRepository: " + error);
        }
    }
}

export default CategoryRepository;
