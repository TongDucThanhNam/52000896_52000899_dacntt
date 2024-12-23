import type {ITransactionService} from "../../Application/Persistences/IServices/ITransactionServices.ts";
import TransactionServices from "../../Application/Features/Transaction/TransactionServices.ts";
import type {Request, Response,} from 'express';

export default class TransactionController {
    private transactionServices: ITransactionService = new TransactionServices()

    createTransaction = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Create transaction'
                #swagger.description = 'Endpoint to create transaction'

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
            return res.status(500).json({message: error.message});
        }
    }
    getTransactionById = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Get transaction by id'
                #swagger.description = 'Endpoint to get transaction by id'
             */
            const transactionId = req.params.id;
            const result = await this.transactionServices.getTransactionById(transactionId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    getUserTransactions = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Get user transactions'
                #swagger.description = 'Endpoint to get user transactions'
             */
            const userId = req.params.id;
            const result = await this.transactionServices.getUserTransactions(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    getTransactionItems = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Get transaction items'
                #swagger.description = 'Endpoint to get transaction items'
             */
            const transactionId = req.params.id;
            const result = await this.transactionServices.getTransactionItems(transactionId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    updateTransactionStatus = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Transactions']
                #swagger.summary = 'Update transaction status'
                #swagger.description = 'Endpoint to update transaction status'
             */
            const transactionId = req.params.id;
            const query = req.query;
            const result = await this.transactionServices.updateTransactionStatus(query);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
}