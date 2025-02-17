import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import type {ITransactionService} from "../../Persistences/IServices/ITransactionServices.ts";
import {type TransactionWithBase} from "../../../Domain/Entities/TransactionEntities.ts";
import {type TransactionItemWithBase} from "../../../Domain/Entities/TransactionItemEntities.ts";

class TransactionServices implements ITransactionService {
    private unitOfWork: IUnitOfWork = new UnitOfWork();

    async createTransaction(data: any): Promise<typeof TransactionWithBase> {
        try {
            const { userId, orderStatus, totalValue, paymentMethod, items } = data;
            if (
                !userId ||
                !orderStatus ||
                totalValue == null ||
                !paymentMethod ||
                !Array.isArray(items) ||
                items.length === 0
            ) {
                throw new Error("Missing required transaction or item fields.");
            }

            items.forEach((item: any, index: number) => {
                if (!item.productId || !item.variantId || item.quantity == null || item.purchasePrice == null) {
                    throw new Error(`Missing required fields for item at index ${index}.`);
                }
            });

            const session = await this.unitOfWork.startTransaction();
            const transaction:any = await this.unitOfWork.transactionRepository.createTransaction(data, session);

            console.log("Transaction created: ", transaction);
            for (const item of items) {
                item.transactionId = transaction._id;
                await this.unitOfWork.transactionItemRepository.createTransactionItem(item, session);
            }

            await this.unitOfWork.commitTransaction();
            return transaction;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async getAllTransactions(data: any): Promise<typeof TransactionWithBase[] | null> {
        try {
            const queryData = {

            };
            const transactions = await this.unitOfWork.transactionRepository.getAllTransactions(queryData);
            return transactions;
        } catch (error) {
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
            const queryData = {

            }
            const transactionItems = await this.unitOfWork.transactionItemRepository.getTransactionItemsByTransactionId(data, queryData);
            return transactionItems;
        } catch (error) {
            throw error;
        }
    }

    async getUserTransactions(data: any): Promise<typeof TransactionWithBase[] | null> {
        try {
            const queryData = {
                
            };
            const transactions = await this.unitOfWork.transactionRepository.getTransactionsByUserId(data, queryData);
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