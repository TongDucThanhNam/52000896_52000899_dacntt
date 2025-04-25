export interface ITagRepository {
    //CRUD
    createTag(tagData: any): Promise<any>;

    getTagById(tagId: string, queryData: any): Promise<any>;

    getAllTags(queryData: any): Promise<any>;

    updateTagById(tagId: string, tagData: any): Promise<any>;

    deleteTagById(tagId: string): Promise<any>;

    //Other API
}