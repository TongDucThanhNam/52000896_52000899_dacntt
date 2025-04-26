export interface ICategoryRepository {
    //CRUD
    createCategory(categoryData: any): Promise<any>;

    getCategoryById(categoryId: string, queryData: any): Promise<any>;

    getAllCategories(queryData: any): Promise<any>;

    updateCategoryById(categoryId: string, categoryData: any): Promise<any>;

    deleteCategoryById(categoryId: string): Promise<any>;

    //Other API
}