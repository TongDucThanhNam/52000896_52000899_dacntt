export interface IInteractionServices {
    // Interaction tracking
    trackInteraction(data: any): Promise<any>;

    // Purchase tracking
    trackPurchase(data: any): Promise<any>;

    getUserInteractions(
        data: any,
    ): Promise<any>;

    getProductInteractions(
        data: any,
    ): Promise<any>;

    // Logging
    createLog(data: any): Promise<any>;

    getUserLogs(data: any): Promise<any>;
}
