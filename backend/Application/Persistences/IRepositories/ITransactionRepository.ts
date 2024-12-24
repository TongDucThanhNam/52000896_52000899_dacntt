import type {ClientSession} from "mongoose";
import type {TransactionWithBase} from "../../../Domain/Entities/TransactionEntities.ts";

export interface ITransactionRepository {
    //CRUD
    createTransaction(transactionData: any, session: ClientSession): Promise<typeof TransactionWithBase>;

    getTransactionById(transactionId: string, queryData: any): Promise<typeof TransactionWithBase | null>;

    getAllTransactions(queryData: any): Promise<typeof TransactionWithBase[] | null>;

    updateTransactionById(transactionId: string, transactionData: any, session: ClientSession): Promise<typeof TransactionWithBase | null>;

    //Other API
    getTransactionsByUserId(userId: string, queryData: any): Promise<typeof TransactionWithBase[] | null>;
}