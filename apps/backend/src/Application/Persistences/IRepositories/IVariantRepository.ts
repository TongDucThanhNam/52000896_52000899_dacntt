export interface IVariantRepository {
    //CRUD
    createVariant(variantData: any): Promise<any>;

    getVariantById(variantId: string, queryData: any): Promise<any>;

    getAllVariants(queryData: any): Promise<any>;

    updateVariantById(variantId: string, variantData: any): Promise<any>;

    deleteVariantById(variantId: string): Promise<any>;

    //Other API
    getVariantsByProductId(productId: string, queryData: any): Promise<any>;
}