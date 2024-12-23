import type {ClientSession} from "mongoose";
import {TagWithBase} from "../../../Domain/Entities/TagEntities";

export interface ITagRepository {
    //CRUD
    createTag(tagData: any, session: ClientSession): Promise<typeof TagWithBase>;

    getTagById(tagId: string, queryData: any): Promise<typeof TagWithBase | null>;

    getAllTags(queryData: any): Promise<typeof TagWithBase[] | null>;

    updateTagById(tagId: string, tagData: any, session: ClientSession): Promise<typeof TagWithBase | null>;

    deleteTagById(tagId: string, session: ClientSession): Promise<typeof TagWithBase | null>;

    //Other API
}