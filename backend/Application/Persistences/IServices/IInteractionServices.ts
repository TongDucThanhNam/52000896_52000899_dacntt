import type {InteractionWithBase} from "../../../Domain/Entities/InteractionEntities.ts";
import type {LogWithBase} from "../../../Domain/Entities/LogEntities.ts";

export interface IInteractionServices {
    // Interaction tracking
    trackInteraction(data: any): Promise<typeof InteractionWithBase>;

    getUserInteractions(data: any): Promise<typeof InteractionWithBase[] | null>;

    getProductInteractions(data: any): Promise<typeof InteractionWithBase[] | null>;

    // Logging
    createLog(data: any): Promise<typeof LogWithBase>;

    getUserLogs(data: any): Promise<typeof LogWithBase[] | null>;
}