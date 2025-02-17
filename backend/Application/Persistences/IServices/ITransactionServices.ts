import type { TransactionWithBase } from "../../../Domain/Entities/TransactionEntities.ts";
import type { TransactionItemWithBase } from "../../../Domain/Entities/TransactionItemEntities.ts";

export interface ITransactionService {
  createTransaction(data: any): Promise<typeof TransactionWithBase>;

  getTransactionById(data: any): Promise<typeof TransactionWithBase | null>;

  getAllTransactions(data: any): Promise<(typeof TransactionWithBase)[] | null>;

  getUserTransactions(
    data: any,
  ): Promise<(typeof TransactionWithBase)[] | null>;

  getTransactionItems(
    data: any,
  ): Promise<(typeof TransactionItemWithBase)[] | null>;

  updateTransactionStatus(
    data: any,
  ): Promise<typeof TransactionWithBase | null>;
}
