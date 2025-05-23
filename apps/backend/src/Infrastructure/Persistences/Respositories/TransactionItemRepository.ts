import type { ITransactionItemRepository } from "../../../Application/Persistences/IRepositories/ITransactionItemRepository.ts";
import { transactionItems } from "../../../Domain/Entities/TransactionItemEntities";
import { eq } from "drizzle-orm";
import type { DrizzleD1Database } from "drizzle-orm/d1";

class TransactionItemRepository implements ITransactionItemRepository {
  private db: DrizzleD1Database<Record<string, never>>;

  constructor(db: DrizzleD1Database<Record<string, never>>) {
    this.db = db;
  }

  async createTransactionItem(transactionItemData: any): Promise<any> {
    try {
      const result = await this.db
        .insert(transactionItems)
        .values(transactionItemData)
        .returning();
      return result;
    } catch (error) {
      throw new Error(
        `Error at TransactionItemRepository.createTransactionItem: ${error}`,
      );
    }
  }

  async getTransactionItemById(
    transactionItemId: string,
    queryData: any,
  ): Promise<any> {
    try {
      const transactionItem = await this.db
        .select()
        .from(transactionItems)
        .where(eq(transactionItems.id, Number.parseInt(transactionItemId)))
        .limit(1);
      return transactionItem[0] || null;
    } catch (error) {
      throw new Error(
        `Error at TransactionItemRepository.getTransactionItemById: ${error}`,
      );
    }
  }

  async getTransactionItemsByTransactionId(
    transactionId: string,
    queryData: any,
  ): Promise<any> {
    try {
      const items = await this.db
        .select()
        .from(transactionItems)
        .where(
          eq(transactionItems.transactionId, Number.parseInt(transactionId)),
        );
      return items;
    } catch (error) {
      throw new Error(
        `Error at TransactionItemRepository.getTransactionItemsByTransactionId: ${error}`,
      );
    }
  }

  async updateTransactionItemById(
    transactionId: string,
    transactionItemData: any,
  ): Promise<any> {
    try {
      await this.db
        .update(transactionItems)
        .set(transactionItemData)
        .where(eq(transactionItems.id, Number.parseInt(transactionId)))
        .returning();

      // Return the updated item
      const updatedItem = await this.db
        .select()
        .from(transactionItems)
        .where(eq(transactionItems.id, Number.parseInt(transactionId)))
        .limit(1);

      return updatedItem[0] || null;
    } catch (error) {
      throw new Error(
        `Error at TransactionItemRepository.updateTransactionItemById: ${error}`,
      );
    }
  }

  async deleteTransactionItemById(transactionId: string): Promise<any> {
    try {
      // TODO: Soft Delete
      await this.db
        .update(transactionItems)
        .set({})
        .where(eq(transactionItems.id, Number.parseInt(transactionId)));

      // Return the updated item
      const updatedItem = await this.db
        .select()
        .from(transactionItems)
        .where(eq(transactionItems.id, Number.parseInt(transactionId)))
        .limit(1);

      return updatedItem[0] || null;
    } catch (error) {
      throw new Error(
        `Error at TransactionItemRepository.deleteTransactionItemById: ${error}`,
      );
    }
  }
}

export default TransactionItemRepository;
