import type {ClientSession} from "mongoose";
import {InteractionWithBase} from "../../../Domain/Entities/InteractionEntities";
import type {IInteractionRepository} from "../../../Application/Persistences/IRepositories/IInteractionRepository";

class InteractionRepository implements IInteractionRepository {
    async createInteraction(interactionData: any, session: ClientSession): Promise<typeof InteractionWithBase> {
        try {
            const interaction: any = InteractionWithBase.create([interactionData],
                {
                    session: session
                })
            return interaction;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }

    async getInteractionById(interactionId: string, queryData: any): Promise<typeof InteractionWithBase | null> {
        try {
            const interaction: any = InteractionWithBase.findById(interactionId)
            return interaction;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }

    async getAllInteractions(queryData: any): Promise<(typeof InteractionWithBase)[] | null> {
        try {
            const interactions: any = InteractionWithBase.find(
                queryData
            )
            return interactions;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }

    async updateInteractionById(interactionId: string, interactionData: any, session: ClientSession): Promise<typeof InteractionWithBase | null> {
        try {
            const interaction: any = InteractionWithBase.findByIdAndUpdate(interactionId, interactionData, {
                new: true,
                session: session
            });
            return interaction;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }

    async deleteInteractionById(interactionId: string, session: ClientSession): Promise<typeof InteractionWithBase | null> {
        try {
            const interaction: any = InteractionWithBase.findByIdAndUpdate(interactionId,
                {
                    isDeleted: true,
                    isActive: false,
                },
                {
                    new: true,
                    session: session
                });
            return interaction;
        } catch (error) {
            throw new Error("Error at InteractionRepository: " + error);
        }
    }
}

export default InteractionRepository;