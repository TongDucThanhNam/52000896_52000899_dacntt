import type { IInteractionRepository } from "../../../Application/Persistences/IRepositories/IInteractionRepository";
import { interactions } from "../../../Domain/Entities/InteractionEntities.js";
import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

class InteractionRepository implements IInteractionRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(db: DrizzleD1Database<Record<string, never>>) {
    this.db = db;
  }

  async createInteraction(interactionData: any): Promise<any> {
    try {
      const interaction: any = this.db
        .insert(interactions)
        .values(interactionData)
        .returning();
      console.log("interaction", interaction);
      return interaction;
    } catch (error) {
      throw new Error(
        `Error at InteractionRepository.createInteraction ${error}`,
      );
    }
  }

  async getInteractionById(
    interactionId: string,
    queryData: any,
  ): Promise<any> {
    try {
      const interaction: any = this.db
        .select()
        .from(interactions)
        .where(eq(interactions.id, Number.parseInt(interactionId)))
        .get();
      return interaction;
    } catch (error) {
      throw new Error(
        `Error at InteractionRepository.getInteractionById: ${error}`,
      );
    }
  }

  async getAllInteractions(queryData: any): Promise<any> {
    try {
      const result: any = this.db.select().from(interactions);
      return result;
    } catch (error) {
      throw new Error(
        `Error at InteractionRepository.getAllInteractions: ${error}`,
      );
    }
  }

  async updateInteractionById(
    interactionId: string,
    interactionData: any,
  ): Promise<any> {
    try {
      const interaction: any = this.db
        .update(interactions)
        .set(interactionData)
        .where(eq(interactions.id, Number.parseInt(interactionId)))
        .returning();
      return interaction;
    } catch (error) {
      throw new Error(
        `Error at InteractionRepository.updateInteractionById: ${error}`,
      );
    }
  }

  async deleteInteractionById(interactionId: string): Promise<any> {
    try {
      //TODO: Soft Delete
      const interaction: any = this.db.update(interactions).set({});
      return interaction;
    } catch (error) {
      throw new Error(
        `Error at InteractionRepository.deleteInteractionById: ${error}`,
      );
    }
  }
}

export default InteractionRepository;
