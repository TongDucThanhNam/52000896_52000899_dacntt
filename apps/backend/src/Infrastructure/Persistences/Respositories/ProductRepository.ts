import type {IProductRepository} from "../../../Application/Persistences/IRepositories/IProductRepository";
import {products} from "../../../Domain/Entities/ProductEntities";
import {productTags} from "../../../Domain/Entities/ProductTagEntities";
import {eq} from "drizzle-orm";
import { DrizzleD1Database } from "drizzle-orm/d1";

interface QueryOpts {
    search?: string;       // tìm theo tên
    limit?: number;
    offset?: number;
    sortBy?: "name" | "price" | "createdAt";
    sortDir?: "asc" | "desc";
}

class ProductRepository implements IProductRepository {
    private db: DrizzleD1Database<Record<string, never>>;

    constructor(db: DrizzleD1Database<Record<string, never>>) {
        this.db = db;
    }

    async getProductsByCategory(categoryId: string, queryData: any): Promise<any> {
        try {
            const result = await this.db
                .select()
                .from(products)
                .where(eq(products.categoryId, parseInt(categoryId, 10)));
            return result;
        } catch (err) {
            throw new Error(`getProductsByCategory failed: ${err}`);
        }
    }

    async getProductsByTag(tagId: string, queryData: any): Promise<any> {
        try {
            const result = await this.db
                .select({
                    product: products
                })
                .from(productTags)
                .innerJoin(products, eq(productTags.productId, products.id))
                .where(eq(productTags.tagId, parseInt(tagId, 10)));

            return result.map(item => item.product);
        } catch (err) {
            throw new Error(`getProductsByTag failed: ${err}`);
        }
    }

    async createProduct(productData: any): Promise<any> {
        try {
            const result = await this.db
                .insert(products)
                .values(productData)
                .returning() // return the inserted product
            return result;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.createProduct: ${error.message}`);
        }
    }

    async getProductById(productId: string, queryData: any): Promise<any> {
        try {
            const result = await this.db
                .select()
                .from(products)
                .where(eq(products.id, parseInt(productId, 10)))
                .limit(1);

            return result[0] || null;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.getProductById: ${error.message}`);
        }
    }

    async getAllProducts(queryData: any): Promise<any> {
        try {
            // Handle basic query options
            const result = await this.db.select().from(products);
            return result;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.getAllProducts: ${error.message}`);
        }
    }

    async updateProductById(productId: string, productData: any): Promise<any> {
        try {
            // Add updatedAt timestamp
            productData.updatedAt = new Date().toISOString();

            const result = await this.db
                .update(products)
                .set(productData)
                .where(eq(products.id, parseInt(productId, 10)))
                .returning();

            return result[0] || null;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.updateProductById: ${error.message}`);
        }
    }

    async deleteProductById(productId: string): Promise<any> {
        try {
            const updateData = {
                isActive: false,
                isDeleted: true,
                updatedAt: new Date().toISOString()
            };

            const result = await this.db
                .update(products)
                .set(updateData)
                .where(eq(products.id, parseInt(productId, 10)))
                .returning();

            return result[0] || null;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.deleteProductById: ${error.message}`);
        }
    }
}

export default ProductRepository;
