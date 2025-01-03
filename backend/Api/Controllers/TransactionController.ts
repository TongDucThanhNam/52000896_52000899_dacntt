import type { ITransactionService } from "../../Application/Persistences/IServices/ITransactionServices.ts";
import TransactionServices from "../../Application/Features/Transaction/TransactionServices.ts";
import type { Request, Response } from "express";

export default class TransactionController {
  private transactionServices: ITransactionService = new TransactionServices();

  createTransaction = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Tạo giao dịch'
                #swagger.description = 'Endpoint để tạo giao dịch'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Transaction data',
                    required: true,
                    schema: {
                        userId: '1',
                        orderStatus: 'pending',
                        totalValue: '1000',
                        paymentMethod: 'cash',
                     }
                }
             */
      const query = req.query;
      const result = await this.transactionServices.createTransaction(query);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  getTransactionById = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Lấy thông tin giao dịch'
                #swagger.description = 'Endpoint để lấy thông tin giao dịch theo Id'
             */
      const transactionId = req.params.transactionId;
      const result =
        await this.transactionServices.getTransactionById(transactionId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  getUserTransactions = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Lấy thông tin giao dịch của user'
                #swagger.description = 'Endpoint để lấy thông tin giao dịch của user theo Id'
             */
      const userId = req.params.userId;
      const result = await this.transactionServices.getUserTransactions(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  getTransactionItems = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Lấy danh sách sản phẩm trong giao dịch'
                #swagger.description = 'Endpoint để lấy danh sách sản phẩm trong giao dịch theo Id'
             */
      const transactionId = req.params.transactionId;
      const result =
        await this.transactionServices.getTransactionItems(transactionId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  updateTransactionStatus = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Cập nhật trạng thái giao dịch'
                #swagger.description = 'Endpoint để cập nhật trạng thái giao dịch theo Id'
             */
      const transactionId = req.params.transactionId;
      const query = req.query;
      const result =
        await this.transactionServices.updateTransactionStatus(query);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}
