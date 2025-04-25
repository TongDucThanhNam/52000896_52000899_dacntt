import type {IInteractionRepository} from "../../../Application/Persistences/IRepositories/IInteractionRepository";
import type {IUnitOfWork} from "../../../Application/Persistences/IRepositories/IUnitOfWork";
import {UnitOfWorkFactory} from "../Factories/UnitOfWorkFactory";
import {interactions} from "../../../Domain/Entities/schema";
import {eq} from "drizzle-orm";
import {getDb} from "../Config/db";

class InteractionRepository implements IInteractionRepository {
    private db =  getDb();

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
