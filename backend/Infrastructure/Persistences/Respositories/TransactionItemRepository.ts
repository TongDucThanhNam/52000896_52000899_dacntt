import type {ClientSession} from "mongoose";
import {TransactionItemWithBase} from "../../../Domain/Entities/TransactionItemEntities.ts";
import type {
    ITransactionItemRepository
} from "../../../Application/Persistences/IRepositories/ITransactionItemRepository.ts";

class TransactionItemRepository implements ITransactionItemRepository {
    async createTransactionItem(transactionItemData: any, session: ClientSession): Promise<typeof TransactionItemWithBase> {
        try {
            const transactionItem: any = await TransactionItemWithBase.create([transactionItemData], {session: session});
            return transactionItem;
        } catch (error) {
            throw new Error("Error at TransactionItemRepository: " + error);
        }
    }

    async getTransactionItemById(transactionItemId: string, queryData: any): Promise<typeof TransactionItemWithBase | null> {
        try {
            const transactionItem: any = await TransactionItemWithBase.findById(transactionItemId)
            return transactionItem;
        } catch (error) {
            throw new Error("Error at TransactionItemRepository: " + error);
        }
    }

    async getTransactionItemsByTransactionId(transactionId: string, queryData: any): Promise<typeof TransactionItemWithBase[] | null> {
        try {
            const transactionItems: any = await TransactionItemWithBase.find({
                transactionId: transactionId
            });
            return transactionItems;
        } catch (error) {
            throw new Error("Error at TransactionItemRepository: " + error);
        }
    }

    async updateTransactionItemById(transactionId: string, transactionItemData: any, session: ClientSession): Promise<typeof TransactionItemWithBase | null> {
        try {
            const transactionItem: any = await TransactionItemWithBase.findByIdAndUpdate(transactionId, transactionItemData, {
                new: true,
                session: session
            });
            return transactionItem;
        } catch (error) {
            throw new Error("Error at TransactionItemRepository: " + error);
        }
    }

    async deleteTransactionItemById(transactionId: string, session: ClientSession): Promise<typeof TransactionItemWithBase | null> {
        try {
            const transactionItem: any = await TransactionItemWithBase.findByIdAndUpdate(transactionId, {
                isActive: false,
                isDeleted: true
            }, {
                new: true,
                session: session
            });
            return transactionItem;
        } catch (error) {
            throw new Error("Error at TransactionItemRepository: " + error);
        }
    }
}

export default TransactionItemRepository;