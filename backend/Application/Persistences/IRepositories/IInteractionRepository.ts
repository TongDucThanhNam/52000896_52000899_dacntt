import type {ClientSession} from "mongoose";
import {InteractionWithBase} from "../../../Domain/Entities/InteractionEntities";

export interface IInteractionRepository {
    //CRUD
    createInteraction(interactionData: any, session: ClientSession): Promise<typeof InteractionWithBase>;

    getInteractionById(interactionId: string, queryData: any): Promise<typeof InteractionWithBase | null>;

    getAllInteractions(queryData: any): Promise<typeof InteractionWithBase[] | null>;

    updateInteractionById(interactionId: string, interactionData: any, session: ClientSession): Promise<typeof InteractionWithBase | null>;

    deleteInteractionById(interactionId: string, session: ClientSession): Promise<typeof InteractionWithBase | null>;

    //Other API
}