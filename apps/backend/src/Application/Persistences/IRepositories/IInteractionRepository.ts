export interface IInteractionRepository {
    //CRUD
    createInteraction(interactionData: any): Promise<any>;

    getInteractionById(interactionId: string, queryData: any): Promise<any>;

    getAllInteractions(queryData: any): Promise<any>;

    updateInteractionById(interactionId: string, interactionData: any): Promise<any>;

    deleteInteractionById(interactionId: string): Promise<any>;

    //Other API
}