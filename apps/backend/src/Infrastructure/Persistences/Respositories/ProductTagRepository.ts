import type { IProductTagRepository } from "../../../Application/Persistences/IRepositories/IProductTagRepository";
import { productTags } from "../../../Domain/Entities/ProductTagEntities";
import { eq, and } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

class ProductTagRepository implements IProductTagRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(db: DrizzleD1Database<Record<string, never>>) {
    this.db = db;
  }

  async createProductTag(productTagData: any): Promise<any> {
    try {
      const result: any = await this.db
        .insert(productTags)
        .values(productTagData)
        .returning();
      return result;
    } catch (error) {
      throw new Error(
        `Error at ProductTagRepository.createProductTag: ${error}`,
      );
    }
  }

  async getProductTagsByProductId(
    productId: string,
    queryData: any,
  ): Promise<any> {
    try {
      const result = await this.db
        .select()
        .from(productTags)
        .where(eq(productTags.productId, Number.parseInt(productId, 10)));
      return result;
    } catch (error) {
      throw new Error(
        `Error at ProductTagRepository.getProductTagsByProductId: ${error}`,
      );
    }
  }

  async getProductTagsByTagId(tagId: string, queryData: any): Promise<any> {
    try {
      const result = await this.db
        .select()
        .from(productTags)
        .where(eq(productTags.tagId, Number.parseInt(tagId, 10)));
      return result;
    } catch (error) {
      throw new Error(
        `Error at ProductTagRepository.getProductTagsByTagId: ${error}`,
      );
    }
  }

  async deleteProductTag(productId: string, tagId: string): Promise<any> {
    try {
      // TODO: Soft Delete
      const updateData = {
        isActive: false,
        isDeleted: true,
        updatedAt: new Date().toISOString(),
      };

      const result = await this.db
        .update(productTags)
        .set({})
        .where(
          and(
            eq(productTags.productId, Number.parseInt(productId, 10)),
            eq(productTags.tagId, Number.parseInt(tagId, 10)),
          ),
        )
        .returning();

      return result[0] || null;
    } catch (error) {
      throw new Error(
        `Error at ProductTagRepository.deleteProductTag: ${error}`,
      );
    }
  }
}

export default ProductTagRepository;
