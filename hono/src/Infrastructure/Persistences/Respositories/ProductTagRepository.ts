import type {IProductTagRepository} from "../../../Application/Persistences/IRepositories/IProductTagRepository.ts";
import {getDb} from "../Config/db";
import {productTags} from "../../../Domain/Entities/schema";
import {eq, and} from "drizzle-orm";

class ProductTagRepository implements IProductTagRepository {
    private db =  getDb()

    async createProductTag(productTagData: any): Promise<any> {
        try {
            const result: any = await this.db.insert(productTags).values(productTagData)
            return result;
        } catch (error) {
            throw new Error("Error at ProductTagRepository: " + error);
        }
    }

    async getProductTagsByProductId(productId: string, queryData: any): Promise<any> {
        try {
            const result = await this.db
                .select()
                .from(productTags)
                .where(eq(productTags.productId, parseInt(productId, 10)));
            return result;
        } catch (error) {
            throw new Error("Error at ProductTagRepository: " + error);
        }
    }

    async getProductTagsByTagId(tagId: string, queryData: any): Promise<any> {
        try {
            const result = await this.db
                .select()
                .from(productTags)
                .where(eq(productTags.tagId, parseInt(tagId, 10)));
            return result;
        } catch (error) {
            throw new Error("Error at ProductTagRepository: " + error);
        }
    }

    async deleteProductTag(productId: string, tagId: string): Promise<any> {
        try {
            const updateData = {
                isActive: false,
                isDeleted: true,
                updatedAt: new Date().toISOString()
            };

            const result = await this.db
                .update(productTags)
                .set(updateData)
                .where(
                    and(
                        eq(productTags.productId, parseInt(productId, 10)),
                        eq(productTags.tagId, parseInt(tagId, 10))
                    )
                )
                .returning();

            return result[0] || null;
        } catch (error) {
            throw new Error("Error at ProductTagRepository: " + error);
        }
    }
}

export default ProductTagRepository;
