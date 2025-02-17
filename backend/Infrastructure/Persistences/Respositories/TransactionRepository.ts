import type {ClientSession} from "mongoose";
import {TransactionWithBase} from "../../../Domain/Entities/TransactionEntities.ts";
import type {ITransactionRepository} from "../../../Application/Persistences/IRepositories/ITransactionRepository.ts";

class TransactionRepository implements ITransactionRepository {
    async createTransaction(transactionData: any, session: ClientSession): Promise<typeof TransactionWithBase> {
        try {
            const transaction: any = await TransactionWithBase.create([transactionData], {session: session});
            return transaction[0];
        } catch (error) {
            throw new Error("Error at TransactionRepository: " + error);
        }
    }

    async getTransactionById(transactionId: string, queryData: any): Promise<typeof TransactionWithBase | null> {
        try {
            const transaction: any = await TransactionWithBase.findById(transactionId)
            return transaction;
        } catch (error) {
            throw new Error("Error at TransactionRepository: " + error);
        }
    }

    async getAllTransactions(queryData: any): Promise<(typeof TransactionWithBase)[] | null> {
        try {
            const transactions: any = await TransactionWithBase.find()
            return transactions;
        } catch (error) {
            throw new Error("Error at TransactionRepository: " + error);
        }
    }

    async updateTransactionById(transactionId: string, transactionData: any, session: ClientSession): Promise<typeof TransactionWithBase | null> {
        try {
            const transaction: any = await TransactionWithBase.findByIdAndUpdate(transactionId, transactionData, {
                new: true,
                session: session
            });
            return transaction;
        } catch (error) {
            throw new Error("Error at TransactionRepository: " + error);
        }
    }

    async getTransactionsByUserId(userId: string, queryData: any): Promise<(typeof TransactionWithBase)[] | null> {
        try {
            const transactions: any = await TransactionWithBase.find({userId: userId});
            return transactions;
        } catch (error) {
            throw new Error("Error at TransactionRepository: " + error);
        }
    }
}

export default TransactionRepository;