import type {ClientSession} from "mongoose";
import {TagWithBase} from "../../../Domain/Entities/TagEntities";
import type {ITagRepository} from "../../../Application/Persistences/IRepositories/ITagRepository";

class TagRepository implements ITagRepository {
    async createTag(tagData: any, session: ClientSession): Promise<typeof TagWithBase> {
        try {
            const tag: any = TagWithBase.create(tagData,
                {
                    session: session
                });
            return tag;
        } catch (error: any) {
            throw new Error("Error at TagRepository: " + error);
        }
    }

    async getTagById(tagId: string, queryData: any): Promise<typeof TagWithBase | null> {
        try {
            const tag: any = TagWithBase.findById(tagId)
            return tag;
        } catch (error: any) {
            throw new Error("Error at TagRepository: " + error);
        }
    }

    async getAllTags(queryData: any): Promise<(typeof TagWithBase)[] | null> {
        try {
            const tags: any = TagWithBase.find(queryData)
            return tags;
        } catch (error: any) {
            throw new Error("Error at TagRepository: " + error);
        }
    }

    async updateTagById(tagId: string, tagData: any, session: ClientSession): Promise<typeof TagWithBase | null> {
        try {
            const tag: any = TagWithBase.findByIdAndUpdate(tagId, tagData, {new: true, session: session});
            return tag;
        } catch (error: any) {
            throw new Error("Error at TagRepository: " + error);
        }
    }

    async deleteTagById(tagId: string, session: ClientSession): Promise<typeof TagWithBase | null> {
        try {
            const tag: any = TagWithBase.findByIdAndUpdate(tagId,
                {isDeleted: true, isActive: false},
                {
                    new: true,
                    session: session
                }
            );
            return tag;
        } catch (error: any) {
            throw new Error("Error at TagRepository: " + error);
        }
    }
}

export default TagRepository;