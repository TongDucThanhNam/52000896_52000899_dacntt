export interface IProductRepository {
    //CRUD
    createProduct(productData: any): Promise<any>;

    getProductById(productId: string, queryData: any): Promise<any>;

    getAllProducts(queryData: any): Promise<any>;

    updateProductById(productId: string, productData: any): Promise<any>;

    deleteProductById(productId: string): Promise<any>;

    //Other API
    getProductsByCategory(categoryId: string, queryData: any): Promise<any>;

    getProductsByTag(tagId: string, queryData: any): Promise<any>;
}