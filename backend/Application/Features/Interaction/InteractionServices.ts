import type {IInteractionServices} from "../../Persistences/IServices/IInteractionServices.ts";
import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import type {LogWithBase} from "../../../Domain/Entities/LogEntities.ts";
import type {InteractionWithBase} from "../../../Domain/Entities/InteractionEntities.ts";

class InteractionServices implements IInteractionServices {
    private unitOfWork: IUnitOfWork = new UnitOfWork();

    // Interactions
    async getProductInteractions(
        data: any,
    ): Promise<(typeof InteractionWithBase)[] | null> {
        try {
            const queryData = {
                productId: data,
                isDeleted: false,
                isActive: true,
            };

            const interactions =
                await this.unitOfWork.interactionRepository.getAllInteractions(
                    queryData,
                );
            return interactions;
        } catch (error) {
            throw error;
        }
    }

    async getUserInteractions(
        data: any,
    ): Promise<(typeof InteractionWithBase)[] | null> {
        try {
            const queryData = {
                userId: data,
                isDeleted: false,
                isActive: true,
            };
            console.log(queryData);
            const interactions =
                await this.unitOfWork.interactionRepository.getAllInteractions(
                    queryData,
                );
            return interactions;
        } catch (error) {
            throw error;
        }
    }

    async getUserLogs(data: any): Promise<(typeof LogWithBase)[] | null> {
        try {
            const {userId, ...restData} = data;

            const queryData = {
                userId: userId,
                isDeleted: false,
                isActive: true,
            };
            const logs = await this.unitOfWork.logRepository.getAllLogs(queryData);
            return logs;
        } catch (error) {
            throw error;
        }
    }

    async trackInteraction(data: any): Promise<any> {
        const session = await this.unitOfWork.startTransaction();

        try {
            const {
                userId,
                productId,
                variantId,
                interactionType,
                interactionContent,
            } = data;
            const interactions: any =
                await this.unitOfWork.interactionRepository.getAllInteractions({
                    userId,
                    productId,
                    variantId,
                    interactionType,
                });

            // console.log("Interactions:", interactions);

            let result;
            if (interactions && interactions.length > 0) {
                console.log("Existing interaction found");
                const existing = interactions[0];
                const newScore = (existing.interactionScore || 0) + 1;
                result =
                    await this.unitOfWork.interactionRepository.updateInteractionById(
                        existing._id,
                        {interactionScore: newScore},
                        session,
                    );
            } else {
                console.log("Creating new interaction");
                result = await this.unitOfWork.interactionRepository.createInteraction(
                    {
                        userId,
                        productId,
                        variantId,
                        interactionType,
                        interactionScore: 1,
                    },
                    session,
                );
            }

            await this.unitOfWork.commitTransaction();
            console.log("Interaction tracked successfully", result);
            return result;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw new Error(`Error when tracking interaction: ${error}`);
        }
    }

    async trackPurchase(data: any): Promise<any> {
        const session = await this.unitOfWork.startTransaction();

        try {
            return {
                message: "Not implemented yet",
            };
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw new Error(`Error when tracking purchase: ${error}`);
        }
    }

    async createLog(data: any): Promise<typeof LogWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const log = await this.unitOfWork.logRepository.createLog(data, session);
            await this.unitOfWork.commitTransaction();
            return log;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }
}

export default InteractionServices;
