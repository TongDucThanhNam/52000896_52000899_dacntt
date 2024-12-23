import type {IInteractionServices} from "../../Persistences/IServices/IInteractionServices.ts";
import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import type {LogWithBase} from "../../../Domain/Entities/LogEntities.ts";
import type {InteractionWithBase} from "../../../Domain/Entities/InteractionEntities.ts";

class InteractionServices implements IInteractionServices {
    private unitOfWork: IUnitOfWork = new UnitOfWork();

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

    async getProductInteractions(data: any): Promise<typeof InteractionWithBase[] | null> {
        try {
            const queryData = {
                productId: data,
                isDeleted: false,
                isActive: true,
            }

            const interactions = await this.unitOfWork.interactionRepository.getAllInteractions(queryData);
            return interactions;
        } catch (error) {
            throw error;
        }
    }

    async getUserInteractions(data: any): Promise<typeof InteractionWithBase[] | null> {
        try {
            const queryData = {
                userId: data,
                isDeleted: false,
                isActive: true,
            }
            console.log(queryData)
            const interactions = await this.unitOfWork.interactionRepository.getAllInteractions(queryData);
            return interactions;
        } catch (error) {
            throw error;
        }
    }

    async getUserLogs(data: any): Promise<typeof LogWithBase[] | null> {
        try {
            const {
                userId,
                ...restData
            } = data

            const queryData = {
                userId: userId,
                isDeleted: false,
                isActive: true,
            }
            const logs = await this.unitOfWork.logRepository.getAllLogs(queryData);
            return logs;
        } catch (error) {
            throw error;
        }
    }

    async trackInteraction(data: any): Promise<typeof InteractionWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const interaction = await this.unitOfWork.interactionRepository.createInteraction(data, session);
            await this.unitOfWork.commitTransaction();
            return interaction;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }
}

export default InteractionServices;