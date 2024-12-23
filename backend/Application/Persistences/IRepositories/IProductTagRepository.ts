// IProductTagRepository
import type {ClientSession} from "mongoose";
import type {ProductTagWithBase} from "../../../Domain/Entities/ProductTagEntities.ts";

export interface IProductTagRepository {
    //CRUD
    createProductTag(productTagData: any, session: ClientSession): Promise<typeof ProductTagWithBase>;

    getProductTagsByProductId(productId: string, queryData: any): Promise<typeof ProductTagWithBase[] | null>;

    getProductTagsByTagId(tagId: string, queryData: any): Promise<typeof ProductTagWithBase[] | null>;

    deleteProductTag(productId: string, tagId: string, session: ClientSession): Promise<typeof ProductTagWithBase | null>;

    //Other API
}