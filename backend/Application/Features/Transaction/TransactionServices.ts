import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import type {ITransactionService} from "../../Persistences/IServices/ITransactionServices.ts";
import {type TransactionWithBase} from "../../../Domain/Entities/TransactionEntities.ts";
import {type TransactionItemWithBase} from "../../../Domain/Entities/TransactionItemEntities.ts";

class TransactionServices implements ITransactionService {
    private unitOfWork: IUnitOfWork = new UnitOfWork();

    async createTransaction(data: any): Promise<typeof TransactionWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const transaction = await this.unitOfWork.transactionRepository.createTransaction(data, session);
            await this.unitOfWork.commitTransaction();
            return transaction;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async getTransactionById(data: any): Promise<typeof TransactionWithBase | null> {
        try {
            const transaction = await this.unitOfWork.transactionRepository.getTransactionById(data.transactionId, data);
            return transaction;
        } catch (error) {
            throw error;
        }
    }

    async getTransactionItems(data: any): Promise<typeof TransactionItemWithBase[] | null> {
        try {
            const transactionItems = await this.unitOfWork.transactionItemRepository.getTransactionItemsByTransactionId(data);
            return transactionItems;
        } catch (error) {
            throw error;
        }
    }

    async getUserTransactions(data: any): Promise<typeof TransactionWithBase[] | null> {
        try {
            const transactions = await this.unitOfWork.transactionRepository.getTransactionsByUserId(data);
            return transactions;
        } catch (error) {
            throw error;
        }
    }

    async updateTransactionStatus(data: any): Promise<typeof TransactionWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const transaction = await this.unitOfWork.transactionRepository.updateTransactionById(data.transactionId, data, session);
            await this.unitOfWork.commitTransaction();
            return transaction;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }
}

export default TransactionServices;