import type {ITransactionRepository} from "../../../Application/Persistences/IRepositories/ITransactionRepository.ts";
import {getDb} from "../Config/db";
import {transactions} from "../../../Domain/Entities/schema";
import {eq} from "drizzle-orm";

class TransactionRepository implements ITransactionRepository {
    private db = getDb()

    async createTransaction(transactionData: any): Promise<any> {
        try {
            const result = await this.db.insert(transactions).values(transactionData)
            return result;
        } catch (error) {
            throw new Error("Error at TransactionRepository: " + error);
        }
    }

    async getTransactionById(transactionId: string, queryData: any): Promise<any> {
        try {
            const result = await this.db
                .select()
                .from(transactions)
                .where(eq(transactions.id, parseInt(transactionId, 10)))
                .limit(1);

            return result[0] || null;
        } catch (error) {
            throw new Error("Error at TransactionRepository.getTransactionById: " + error);
        }
    }

    async getAllTransactions(queryData: any): Promise<any> {
        try {
            const result = await this.db
                .select()
                .from(transactions);

            return result;
        } catch (error) {
            throw new Error("Error at TransactionRepository.getAllTransactions: " + error);
        }
    }

    async updateTransactionById(transactionId: string, transactionData: any): Promise<any> {
        try {
            // Add updatedAt timestamp
            transactionData.updatedAt = new Date().toISOString();

            const result = await this.db
                .update(transactions)
                .set(transactionData)
                .where(eq(transactions.id, parseInt(transactionId, 10)))
                .returning();

            return result[0] || null;
        } catch (error) {
            throw new Error("Error at TransactionRepository.updateTransactionById: " + error);
        }
    }

    async getTransactionsByUserId(userId: string, queryData: any): Promise<any> {
        try {
            const result = await this.db
                .select()
                .from(transactions)
                .where(eq(transactions.userId, parseInt(userId, 10)));

            return result;
        } catch (error) {
            throw new Error("Error at TransactionRepository.getTransactionsByUserId: " + error);
        }
    }
}

export default TransactionRepository;
