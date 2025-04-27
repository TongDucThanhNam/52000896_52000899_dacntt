export interface IProductServices {
    // Product operations
    createProduct(data: any): Promise<any>;

    getProductById(data: any): Promise<any>;

    getProductByVariantId(data: any): Promise<any>;

    getAllProducts(data: any): Promise<any>;

    updateProduct(data: any): Promise<any>;

    deleteProduct(data: any): Promise<any>;

    createProductWithVariants(data: any): Promise<any>;

    // Variant operations
    createVariant(data: any): Promise<any>;

    getVariantsByProduct(data: any): Promise<any>;

    updateVariant(data: any): Promise<any>;

    deleteVariant(data: any): Promise<any>;

    // Category operations
    createCategory(data: any): Promise<any>;

    getCategories(data: any): Promise<any>;

    updateCategory(data: any): Promise<any>;

    // Tag operations
    createTag(data: any): Promise<any>;

    addTagToProduct(data: any): Promise<any>;

    removeTagFromProduct(data: any): Promise<any>;

    getProductsByTag(data: any): Promise<any>;
}