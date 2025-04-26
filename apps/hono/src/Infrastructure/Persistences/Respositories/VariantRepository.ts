import type {IVariantRepository} from "../../../Application/Persistences/IRepositories/IVariantRepository";
import { variants } from "../../../Domain/Entities/schema";
import {getDb} from "../Config/db";
import { eq } from "drizzle-orm";

class VariantRepository implements IVariantRepository {
    private db =  getDb();

    async createVariant(variantData: any): Promise<any> {
        try {
            console.log('variantData', variantData);
            const result = await this.db.insert(variants).values(variantData)
            return result;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async getVariantById(variantId: string, queryData: any): Promise<any> {
        try {
            const variant = await this.db.select().from(variants).where(eq(variants.id, parseInt(variantId)));
            return variant.length > 0 ? variant[0] : null;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async getAllVariants(queryData: any): Promise<any> {
        try {
            // console.log('queryData', queryData);

            // If queryData contains filters, we would apply them here
            const result = await this.db.select().from(variants);
            return result;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async updateVariantById(variantId: string, variantData: any): Promise<any> {
        try {
            const result = await this.db.update(variants)
                .set(variantData)
                .where(eq(variants.id, parseInt(variantId)));

            // Return the updated variant
            const updatedVariant = await this.getVariantById(variantId, {});
            return updatedVariant;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async deleteVariantById(variantId: string): Promise<any> {
        try {
            const result = await this.db.update(variants)
                .set({
                    isDeleted: true,
                    isActive: false
                })
                .where(eq(variants.id, parseInt(variantId)));

            // Return the updated (deleted) variant
            const deletedVariant = await this.getVariantById(variantId, {});
            return deletedVariant;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async getVariantsByProductId(productId: string, queryData: any): Promise<any> {
        try {
            const result = await this.db.select().from(variants)
                .where(eq(variants.productId, parseInt(productId)));
            return result;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }
}

export default VariantRepository;
