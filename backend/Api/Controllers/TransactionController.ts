import type {ITransactionService} from "../../Application/Persistences/IServices/ITransactionServices.ts";
import TransactionServices from "../../Application/Features/Transaction/TransactionServices.ts";
import type {Request, Response} from "express";

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
              #swagger.description = 'Endpoint để tạo giao dịch với danh sách các item'
              #swagger.parameters['body'] = {
                  in: 'body',
                  description: 'Transaction data including items',
                  required: true,
                  schema: {
                    userId: '609c0b1f531123456789abcd',
                    orderStatus: 'pending',
                    totalValue: 1000,
                    paymentMethod: 'cash',
                    items: [
                      {
                        productId: '609c0b1f531123456789abce',
                        variantId: '609c0b1f531123456789abcf',
                        quantity: 2,
                        purchasePrice: 500
                      }
                    ]
                  }
            }
            */
            const {userId, orderStatus, totalValue, paymentMethod, items} =
                req.body;

            const transactionData = {
                userId,
                orderStatus,
                totalValue,
                paymentMethod,
                items,
            };

            // Forward the data to TransactionServices to handle business logic later
            const result =
                await this.transactionServices.createTransaction(transactionData);

            return res.status(201).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    getAllTransactions = async (
        req: Request,
        res: Response,
    ): Promise<Response> => {
        try {
            /*
              #swagger.tags = ['Transactions']
              #swagger.summary = 'Lấy danh sách giao dịch'
              #swagger.description = 'Endpoint để lấy danh sách giao dịch'
            */
            const query = req.query;
            const result = await this.transactionServices.getAllTransactions(query);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };

    getTransactionById = async (
        req: Request,
        res: Response,
    ): Promise<Response> => {
        try {
            const {transactionId} = req.params;
            /*
              #swagger.tags = ['Transactions']
              #swagger.summary = 'Lấy thông tin giao dịch'
              #swagger.description = 'Endpoint để lấy thông tin giao dịch theo Id'
            */
            const result =
                await this.transactionServices.getTransactionById(transactionId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
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
            return res.status(500).json({message: error.message});
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
            return res.status(500).json({message: error.message});
        }
    };

    updateTransactionStatus = async (
        req: Request,
        res: Response,
    ): Promise<Response> => {
        try {
            const {transactionId, orderStatus} = req.body;
            /*
              #swagger.tags = ['Transactions']
              #swagger.summary = 'Cập nhật trạng thái giao dịch'
              #swagger.description = 'Endpoint để cập nhật trạng thái của giao dịch'
              #swagger.parameters['body'] = {
                  in: 'body',
                  description: 'Transaction status update data',
                  required: true,
                  schema: {
                    transactionId: "609c0b1f531123456789abcd",
                    orderStatus: "completed"
                  }
              }
            */
            const updatedTransaction =
                await this.transactionServices.updateTransactionStatus({
                    transactionId,
                    orderStatus,
                });
            return res.status(200).json(updatedTransaction);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    };
}