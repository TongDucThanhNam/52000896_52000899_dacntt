import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import type {IProductServices} from "../../Persistences/IServices/IProductServices.ts";
import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import type {ProductTagWithBase} from "../../../Domain/Entities/ProductTagEntities.ts";
import type {CategoryWithBase} from "../../../Domain/Entities/CategoryEntities.ts";
import type {ProductWithBase} from "../../../Domain/Entities/ProductEntities.ts";
import type {VariantWithBase} from "../../../Domain/Entities/VariantEntities.ts";

class ProductServices implements IProductServices {
    private unitOfWork: IUnitOfWork = new UnitOfWork();

    async addTagToProduct(data: any): Promise<typeof ProductTagWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();

            const tag = await this.unitOfWork.productTagRepository.createProductTag(data, session);
            await this.unitOfWork.commitTransaction();
            return tag;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async createCategory(data: any): Promise<typeof CategoryWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const category = await this.unitOfWork.categoryRepository.createCategory(data, session);
            await this.unitOfWork.commitTransaction();
            return category;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async createProduct(data: any): Promise<typeof ProductWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const product = await this.unitOfWork.productRepository.createProduct(data, session);
            await this.unitOfWork.commitTransaction();
            return product;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async createVariant(data: any): Promise<typeof VariantWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const variant = await this.unitOfWork.variantRepository.createVariant(data, session);
            await this.unitOfWork.commitTransaction();
            return variant;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async deleteProduct(data: any): Promise<typeof ProductWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const product = await this.unitOfWork.productRepository.deleteProductById(data, session);
            await this.unitOfWork.commitTransaction();
            return product;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async deleteVariant(data: any): Promise<typeof VariantWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const variant = await this.unitOfWork.variantRepository.deleteVariantById(data, session);
            await this.unitOfWork.commitTransaction();
            return variant;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async getAllProducts(data: any): Promise<typeof ProductWithBase[] | null> {
        try {
            const {
                page,
                limit,
                ...restData
            } = data

            const queryData = {
                ...restData
            }

            const products = await this.unitOfWork.productRepository.getAllProducts(queryData);
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getCategories(data: any): Promise<typeof CategoryWithBase[] | null> {
        try {
            const categories = await this.unitOfWork.categoryRepository.getAllCategories();
            return categories;
        } catch (error) {
            throw error;
        }
    }

    async getProductById(data: any): Promise<typeof ProductWithBase | null> {
        try {
            const queryData = {
                isDeleted: false,
                isActive: true
            }
            const product = await this.unitOfWork.productRepository.getProductById(data, queryData);
            return product;
        } catch (error) {
            throw error;
        }
    }

    async getProductsByTag(data: any): Promise<typeof ProductWithBase[] | null> {
        try {
            const products = await this.unitOfWork.productTagRepository.getProductsByTag(data);
            return products;
        } catch (error) {
            throw error;
        }
    }

    async getVariantsByProduct(data: any): Promise<typeof VariantWithBase[] | null> {
        try {
            const queryData = {
                productId: data,
                isDeleted: false,
                isActive: true
            }
            const variants = await this.unitOfWork.variantRepository.getAllVariants(queryData);
            return variants;
        } catch (error) {
            throw error;
        }
    }

    async removeTagFromProduct(data: any): Promise<void> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const {
                productId,
                tagId
            } = data
            await this.unitOfWork.productTagRepository.deleteProductTag(productId, tagId, session);
            await this.unitOfWork.commitTransaction();
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async updateCategory(data: any): Promise<typeof CategoryWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const {
                categoryId,
                ...restData
            } = data
            const category = await this.unitOfWork.categoryRepository.updateCategoryById(categoryId, restData, session);
            await this.unitOfWork.commitTransaction();
            return category;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async updateProduct(data: any): Promise<typeof ProductWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();

            const {
                productId,
                ...restData
            } = data
            const product = await this.unitOfWork.productRepository.updateProductById(productId, restData, session);
            await this.unitOfWork.commitTransaction();
            return product;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async updateVariant(data: any): Promise<typeof VariantWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();

            const {
                variantId,
                ...restData
            } = data
            const variant = await this.unitOfWork.variantRepository.updateVariantById(variantId, restData, session);
            await this.unitOfWork.commitTransaction();
            return variant;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }
}

export {ProductServices};