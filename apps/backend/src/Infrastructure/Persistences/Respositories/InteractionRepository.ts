import type {IInteractionRepository} from "../../../Application/Persistences/IRepositories/IInteractionRepository";
import {interactions} from "../../../Domain/Entities/InteractionEntities.js";
import {eq} from "drizzle-orm";
import { DrizzleD1Database } from "drizzle-orm/d1";

class InteractionRepository implements IInteractionRepository {
    private db: DrizzleD1Database<Record<string, never>>;

    constructor(db: DrizzleD1Database<Record<string, never>>) {
        this.db = db;
    }

    async createInteraction(interactionData: any): Promise<any> {
        try {
            const interaction: any = this.db.insert(interactions).values(interactionData)
            console.log('interaction', interaction);
            return interaction;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }

    async getInteractionById(interactionId: string, queryData: any): Promise<any> {
        try {
            const interaction: any = this.db.select().from(interactions).where(eq(interactions.id, parseInt(interactionId))).get()
            return interaction;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }

    async getAllInteractions(queryData: any): Promise<any> {
        try {
            const result: any = this.db.select().from(interactions)
            return result;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }

    async updateInteractionById(interactionId: string, interactionData: any): Promise<any> {
        try {
            const interaction: any = this.db.update(interactions).set(interactionData).where(eq(interactions.id, parseInt(interactionId)))
            return interaction;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }

    async deleteInteractionById(interactionId: string): Promise<any> {
        try {
            const interaction: any = this.db.update(interactions).set({
                isDeleted: true,
                isActive: false
            }).where(eq(interactions.id, parseInt(interactionId)))
            return interaction;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }
}

export default InteractionRepository;
