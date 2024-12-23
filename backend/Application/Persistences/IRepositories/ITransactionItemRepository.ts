// ITransactionItemRepository
import type {ClientSession} from "mongoose";
import type {TransactionItemWithBase} from "../../../Domain/Entities/TransactionItemEntities.ts";

export interface ITransactionItemRepository {
    //CRUD
    createTransactionItem(transactionItemData: any, session: ClientSession): Promise<typeof TransactionItemWithBase>;

    getTransactionItemById(transactionItemId: string, queryData: any): Promise<typeof TransactionItemWithBase | null>;

    getTransactionItemsByTransactionId(transactionId: string, queryData: any): Promise<typeof TransactionItemWithBase[] | null>

    updateTransactionItemById(transaction: string, transactionItemData: any, session: ClientSession): Promise<typeof TransactionItemWithBase | null>;

    deleteTransactionItemById(transaction: string, session: ClientSession): Promise<typeof TransactionItemWithBase | null>;

    //Other API
}