import type { ITagRepository } from "../../../Application/Persistences/IRepositories/ITagRepository";
import { tags } from "../../../Domain/Entities/TagEntities";
import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

class TagRepository implements ITagRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(db: DrizzleD1Database<Record<string, never>>) {
    this.db = db;
  }

  async createTag(tagData: any): Promise<any> {
    try {
      const result: any = await this.db
        .insert(tags)
        .values(tagData)
        .returning();
      return result;
    } catch (error: any) {
      throw new Error(`Error at TagRepository.createTag: ${error}`);
    }
  }

  async getTagById(tagId: string, queryData: any): Promise<any> {
    try {
      const tag = await this.db
        .select()
        .from(tags)
        .where(eq(tags.id, Number.parseInt(tagId)))
        .limit(1);
      return tag.length > 0 ? tag[0] : null;
    } catch (error: any) {
      throw new Error(`Error at TagRepository.getTagById: ${error}`);
    }
  }

  async getAllTags(queryData: any): Promise<any> {
    try {
      const allTags = await this.db.select().from(tags);
      return allTags;
    } catch (error: any) {
      throw new Error(`Error at TagRepository.getAllTags: ${error}`);
    }
  }

  async updateTagById(tagId: string, tagData: any): Promise<any> {
    try {
      const result = await this.db
        .update(tags)
        .set({
          ...tagData,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(tags.id, Number.parseInt(tagId)))
        .returning();

      // Get the updated tag
      const updatedTag = await this.getTagById(tagId, {});
      return updatedTag;
    } catch (error: any) {
      throw new Error(`Error at TagRepository.updateTagById: ${error}`);
    }
  }

  async deleteTagById(tagId: string): Promise<any> {
    try {
      // TODO: Soft Delete
      const result = await this.db
        .update(tags)
        .set({})
        .where(eq(tags.id, Number.parseInt(tagId)));

      // Get the updated (soft-deleted) tag
      const deletedTag = await this.getTagById(tagId, {});
      return deletedTag;
    } catch (error: any) {
      throw new Error(`Error at TagRepository.deleteTagById: ${error}`);
    }
  }
}

export default TagRepository;
