import type { IUnitOfWork } from "../../Persistences/IRepositories/IUnitOfWork.ts";
import type { ITransactionService } from "../../Persistences/IServices/ITransactionServices";
import { UnitOfWorkFactory } from "../../../Infrastructure/Persistences/Factories/UnitOfWorkFactory";

class TransactionServices implements ITransactionService {
  private get unitOfWork(): IUnitOfWork {
    return UnitOfWorkFactory.getInstance().createUnitOfWork();
  }
  async createTransaction(data: any): Promise<any> {
    try {
      const { userId, orderStatus, totalValue, paymentMethod, items } = data;

      // Create transaction
      const transaction: any =
        await this.unitOfWork.transactionRepository.createTransaction({
          userId,
          orderStatus,
          totalValue,
          paymentMethod,
        });

      console.log("Transaction created", transaction);
      // Create transaction items
      for (const item of items) {
        // console.log("Create transaction item", item);
        item.transactionId = transaction.id;
        await this.unitOfWork.transactionItemRepository.createTransactionItem(
          item,
        );
        // then track interaction
        await this.unitOfWork.interactionRepository.createInteraction({
          userId,
          productId: item.productId,
          variantId: item.variantId,
          interactionType: "purchase",
          interactionContent: "Purchase the product",
          interactionScore: 1,
        });
      }
      return transaction;
    } catch (error) {
      throw new Error("Error creating transaction");
    }
  }

  async getAllTransactions(data: any): Promise<any> {
    try {
      const queryData = {};
      const transactions =
        await this.unitOfWork.transactionRepository.getAllTransactions(
          queryData,
        );
      return transactions;
    } catch (error) {
      throw new Error(
        `Error at TransactionServices.getAllTransactions: ${error}`,
      );
    }
  }

  async getTransactionById(data: any): Promise<any> {
    try {
      const { transactionId } = data;
      const queryData = {};
      const transaction =
        await this.unitOfWork.transactionRepository.getTransactionById(
          transactionId,
          queryData,
        );
      return transaction;
    } catch (error) {
      throw new Error(
        `Error at TransactionServices.getTransactionById: ${error}`,
      );
    }
  }

  async getTransactionItems(data: any): Promise<any> {
    try {
      const queryData = {};
      const transactionItems =
        await this.unitOfWork.transactionItemRepository.getTransactionItemsByTransactionId(
          data,
          queryData,
        );
      return transactionItems;
    } catch (error) {
      throw `Error at TransactionServices.getTransactionItems: ${error}`;
    }
  }

  async getUserTransactions(data: any): Promise<any> {
    try {
      const queryData = {};
      const transactions =
        await this.unitOfWork.transactionRepository.getTransactionsByUserId(
          data,
          queryData,
        );
      return transactions;
    } catch (error) {
      throw new Error(
        `Error at TransactionServices.getUserTransactions: ${error}`,
      );
    }
  }

  async updateTransactionStatus(data: any): Promise<any> {
    try {
      const transaction =
        await this.unitOfWork.transactionRepository.updateTransactionById(
          data.transactionId,
          data,
        );
      return transaction;
    } catch (error) {
      throw new Error(
        `Error at TransactionServices.updateTransactionStatus: ${error}`,
      );
    }
  }
}

export default TransactionServices;
