import type {ClientSession} from "mongoose";
import {VariantWithBase} from "../../../Domain/Entities/VariantEntities";

export interface IVariantRepository {
    //CRUD
    createVariant(variantData: any, session: ClientSession): Promise<typeof VariantWithBase>;

    getVariantById(variantId: string, queryData: any): Promise<typeof VariantWithBase | null>;

    getAllVariants(queryData: any): Promise<typeof VariantWithBase[] | null>;

    updateVariantById(variantId: string, variantData: any, session: ClientSession): Promise<typeof VariantWithBase | null>;

    deleteVariantById(variantId: string, session: ClientSession): Promise<typeof VariantWithBase | null>;

    //Other API
    getVariantsByProductId(productId: string, queryData: any): Promise<typeof VariantWithBase[] | null>;
}