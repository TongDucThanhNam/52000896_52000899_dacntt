import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import type {ITransactionService} from "../../Persistences/IServices/ITransactionServices.ts";
import {type TransactionWithBase} from "../../../Domain/Entities/TransactionEntities.ts";
import {type TransactionItemWithBase} from "../../../Domain/Entities/TransactionItemEntities.ts";

class TransactionServices implements ITransactionService {
    private unitOfWork: IUnitOfWork = new UnitOfWork();

    async createTransaction(data: any): Promise<typeof TransactionWithBase> {
        try {
            const {userId, orderStatus, totalValue, paymentMethod, items} = data;

            const session = await this.unitOfWork.startTransaction();
            // Create transaction
            const transaction: any = await this.unitOfWork.transactionRepository.createTransaction({
                userId,
                orderStatus,
                totalValue,
                paymentMethod
            }, session);
            // Create transaction items
            for (const item of items) {
                // console.log("Create transaction item", item);
                item.transactionId = transaction._id;
                await this.unitOfWork.transactionItemRepository.createTransactionItem(item, session);
                // then track interaction
                await this.unitOfWork.interactionRepository.createInteraction({
                    userId,
                    productId: item.productId,
                    variantId: item.variantId,
                    interactionType: "purchase",
                    interactionContent: "Purchase the product",
                    interactionScore: 1
                }, session)
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
            const queryData = {};
            const transactions = await this.unitOfWork.transactionRepository.getAllTransactions(queryData);
            return transactions;
        } catch (error) {
            throw error;
        }
    }

    async getTransactionById(data: any): Promise<typeof TransactionWithBase | null> {
        try {
            const {
                transactionId
            } = data;
            const queryData = {};
            const transaction = await this.unitOfWork.transactionRepository.getTransactionById(transactionId,queryData );
            return transaction;
        } catch (error) {
            throw error;
        }
    }

    async getTransactionItems(data: any): Promise<typeof TransactionItemWithBase[] | null> {
        try {
            const queryData = {}
            const transactionItems = await this.unitOfWork.transactionItemRepository.getTransactionItemsByTransactionId(data, queryData);
            return transactionItems;
        } catch (error) {
            throw error;
        }
    }

    async getUserTransactions(data: any): Promise<typeof TransactionWithBase[] | null> {
        try {
            const queryData = {};
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