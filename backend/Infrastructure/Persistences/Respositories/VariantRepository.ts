import type {ClientSession} from "mongoose";
import {VariantWithBase} from "../../../Domain/Entities/VariantEntities";
import type {IVariantRepository} from "../../../Application/Persistences/IRepositories/IVariantRepository";

class VariantRepository implements IVariantRepository {
    async createVariant(variantData: any, session: ClientSession): Promise<typeof VariantWithBase> {
        try {
            const variant: any = VariantWithBase.create([variantData]
                , {
                    session: session
                }
            );
            return variant;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async getVariantById(variantId: string, queryData: any): Promise<typeof VariantWithBase | null> {
        try {
            const variant: any = VariantWithBase.findById(variantId);
            return variant;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async getAllVariants(queryData: any): Promise<(typeof VariantWithBase)[] | null> {
        try {
            // console.log('queryData', queryData);

            const variants: any = VariantWithBase.find(queryData)
            return variants;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async updateVariantById(variantId: string, variantData: any, session: ClientSession): Promise<typeof VariantWithBase | null> {
        try {
            const variant: any = VariantWithBase.findByIdAndUpdate(variantId, variantData, {
                new: true,
                session: session
            });
            return variant;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async deleteVariantById(variantId: string, session: ClientSession): Promise<typeof VariantWithBase | null> {
        try {
            const variant: any = VariantWithBase.findByIdAndUpdate(variantId,
                {
                    isDeleted: true,
                    isActive: false
                }
                , {
                    new: true,
                    session: session
                });
            return variant;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }

    async getVariantsByProductId(productId: string, queryData: any): Promise<typeof VariantWithBase[] | null> {
        try {
            const variants: any = VariantWithBase.find({productId: productId});
            return variants;
        } catch (error: any) {
            throw new Error("Error at VariantRepository: " + error);
        }
    }
}

export default VariantRepository;