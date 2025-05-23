import type { IVariantRepository } from "../../../Application/Persistences/IRepositories/IVariantRepository";
import { variants } from "../../../Domain/Entities/VariantEntities";
import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

class VariantRepository implements IVariantRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(db: DrizzleD1Database<Record<string, never>>) {
    this.db = db;
  }

  async createVariant(variantData: any): Promise<any> {
    try {
      console.log("variantData", variantData);
      const result = await this.db
        .insert(variants)
        .values(variantData)
        .returning();
      return result;
    } catch (error: any) {
      throw new Error(`Error at VariantRepository.createVariant: ${error}`);
    }
  }

  async getVariantById(variantId: string, queryData: any): Promise<any> {
    try {
      const variant = await this.db
        .select()
        .from(variants)
        .where(eq(variants.id, Number.parseInt(variantId)));
      return variant.length > 0 ? variant[0] : null;
    } catch (error: any) {
      throw new Error(`Error at VariantRepository.getVariantById: ${error}`);
    }
  }

  async getAllVariants(queryData: any): Promise<any> {
    try {
      // console.log('queryData', queryData);

      // If queryData contains filters, we would apply them here
      const result = await this.db
        .select()
        .from(variants)
        .where(eq(variants.productId, queryData.productId));
      return result;
    } catch (error: any) {
      throw new Error(`Error at VariantRepository.getAllVariants: ${error}`);
    }
  }

  async updateVariantById(variantId: string, variantData: any): Promise<any> {
    try {
      const result = await this.db
        .update(variants)
        .set(variantData)
        .where(eq(variants.id, Number.parseInt(variantId)))
        .returning();

      // Return the updated variant
      const updatedVariant = await this.getVariantById(variantId, {});
      return updatedVariant;
    } catch (error: any) {
      throw new Error(`Error at VariantRepository.updateVariantById: ${error}`);
    }
  }

  async deleteVariantById(variantId: string): Promise<any> {
    try {
      // TODO: Soft Delete
      const result = await this.db
        .update(variants)
        .set({})
        .where(eq(variants.id, Number.parseInt(variantId)));

      // Return the updated (deleted) variant
      const deletedVariant = await this.getVariantById(variantId, {});
      return deletedVariant;
    } catch (error: any) {
      throw new Error(`Error at VariantRepository.deleteVariantById: ${error}`);
    }
  }

  async getVariantsByProductId(
    productId: string,
    queryData: any,
  ): Promise<any> {
    try {
      const result = await this.db
        .select()
        .from(variants)
        .where(eq(variants.productId, Number.parseInt(productId)));
      return result;
    } catch (error: any) {
      throw new Error(
        `Error at VariantRepository.getVariantsByProductId: ${error}`,
      );
    }
  }
}

export default VariantRepository;
