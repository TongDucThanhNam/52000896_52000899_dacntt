import type { ICategoryRepository } from "../../../Application/Persistences/IRepositories/ICategoryRepository.ts";
import { eq } from "drizzle-orm";
import { categories } from "../../../Domain/Entities/CategoryEntities.js";
import type { DrizzleD1Database } from "drizzle-orm/d1";

class CategoryRepository implements ICategoryRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(db: DrizzleD1Database<Record<string, never>>) {
    this.db = db;
  }

  async createCategory(categoryData: any): Promise<any> {
    try {
      const category: any = await this.db
        .insert(categories)
        .values(categoryData)
        .returning();
      return category;
    } catch (error) {
      throw new Error(`Error at CategoryRepository.createCategory : ${error}`);
    }
  }

  async getCategoryById(categoryId: string, queryData: any): Promise<any> {
    try {
      const category: any = await this.db
        .select()
        .from(categories)
        .where(eq(categories.id, Number(categoryId)));
      return category[0] || null;
    } catch (error) {
      throw new Error(`Error at CategoryRepository.getCategoryById: ${error}`);
    }
  }

  async getAllCategories(queryData: any): Promise<any> {
    try {
      const categoriesResult: any = await this.db.select().from(categories);
      return categoriesResult;
    } catch (error) {
      throw new Error(`Error at CategoryRepository.getAllCategories: ${error}`);
    }
  }

  async updateCategoryById(
    categoryId: string,
    categoryData: any,
  ): Promise<any> {
    try {
      const category: any = await this.db
        .update(categories)
        .set({
          ...categoryData,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(categories.id, Number(categoryId)))
        .returning();
      return category[0] || null;
    } catch (error) {
      throw new Error(
        `Error at CategoryRepository.updateCategoryById: ${error}`,
      );
    }
  }

  async deleteCategoryById(categoryId: string): Promise<any> {
    try {
      const category: any = await this.db.update(categories);
      return category[0] || null;
    } catch (error) {
      throw new Error(
        `Error at CategoryRepository.deleteCategoryById: ${error}`,
      );
    }
  }
}

export default CategoryRepository;
