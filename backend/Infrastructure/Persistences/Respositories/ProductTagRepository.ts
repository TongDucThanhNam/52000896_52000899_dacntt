import type {ClientSession} from "mongoose";
import {ProductTagWithBase} from "../../../Domain/Entities/ProductTagEntities.ts";
import type {IProductTagRepository} from "../../../Application/Persistences/IRepositories/IProductTagRepository.ts";

class ProductTagRepository implements IProductTagRepository {
    async createProductTag(productTagData: any, session: ClientSession): Promise<typeof ProductTagWithBase> {
        try {
            const productTag: any = await ProductTagWithBase.create([productTagData], {session: session});
            return productTag;
        } catch (error) {
            throw new Error("Error at ProductTagRepository: " + error);
        }
    }

    async getProductTagsByProductId(productId: string, queryData: any): Promise<typeof ProductTagWithBase[] | null> {
        try {
            const productTags: any = await ProductTagWithBase.find({productId: productId});
            return productTags;
        } catch (error) {
            throw new Error("Error at ProductTagRepository: " + error);
        }
    }

    async getProductTagsByTagId(tagId: string, queryData: any): Promise<typeof ProductTagWithBase[] | null> {
        try {
            const productTags: any = await ProductTagWithBase.find({tagId: tagId});
            return productTags;
        } catch (error) {
            throw new Error("Error at ProductTagRepository: " + error);
        }
    }

    async deleteProductTag(productId: string, tagId: string, session: ClientSession): Promise<typeof ProductTagWithBase | null> {
        try {
            const productTag: any = await ProductTagWithBase.findOneAndUpdate(
                {productId: productId, tagId: tagId},
                {
                    isActive: false,
                    isDeleted: true
                },
                {
                    new: true,
                    session: session
                }
            );
            return productTag;
        } catch (error) {
            throw new Error("Error at ProductTagRepository: " + error);
        }
    }
}

export default ProductTagRepository;