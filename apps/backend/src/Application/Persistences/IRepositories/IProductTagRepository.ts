export interface IProductTagRepository {
    //CRUD
    createProductTag(productTagData: any): Promise<any>;

    getProductTagsByProductId(productId: string, queryData: any): Promise<any>;

    getProductTagsByTagId(tagId: string, queryData: any): Promise<any>;

    deleteProductTag(productId: string, tagId: string): Promise<any>;

    //Other API
}