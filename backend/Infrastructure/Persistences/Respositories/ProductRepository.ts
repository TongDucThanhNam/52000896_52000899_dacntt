import type {ClientSession} from "mongoose";
import type {IProductRepository} from "../../../Application/Persistences/IRepositories/IProductRepository.ts";
import {ProductWithBase} from "../../../Domain/Entities/ProductEntities.ts";

class ProductRepository implements IProductRepository {
    async createProduct(productData: any, session: ClientSession): Promise<typeof ProductWithBase> {
        try {
            // console.log('Creating product with data:', productData);
            const product: any = await ProductWithBase.create([productData], {session: session});
            // console.log('Product created:', product);
            return product;
        } catch (error: any) {
            throw new Error("Error at ProductRepository.createProduct: " + error.message);
        }
    }

    async getProductById(productId: string, queryData: any): Promise<typeof ProductWithBase | null> {
        try {
            const product: any = await ProductWithBase.findById(productId).exec();
            return product;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.getProductById: ${error.message}`);
        }
    }

    async getAllProducts(queryData: any): Promise<typeof ProductWithBase[] | null> {
        try {
            const products: any = await ProductWithBase.find(queryData)
            return products;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.getAllProducts: ${error.message}`);
        }
    }

    async updateProductById(productId: string, productData: any, session: ClientSession): Promise<typeof ProductWithBase | null> {
        try {
            // console.log('productData', productData);
            const product: any = await ProductWithBase.findByIdAndUpdate(productId, productData, {
                new: true,
                session: session
            });
            return product;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.updateProductById: ${error.message}`);
        }
    }

    async deleteProductById(productId: string, session: ClientSession): Promise<typeof ProductWithBase | null> {
        try {
            const product: any = await ProductWithBase.findByIdAndUpdate(productId, {
                    isActive: false,
                    isDeleted: true
                }, {
                    new: true,
                    session: session
                }
            );
            return product;
        } catch (error: any) {
            throw new Error(`Error at ProductRepository.deleteProductById: ${error.message}`);
        }
    }
}

export default ProductRepository;