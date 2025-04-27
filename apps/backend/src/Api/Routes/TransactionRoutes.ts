import { Hono } from 'hono';
import * as transactionController from "../Controllers/TransactionController";

const transactionRoutes = new Hono();

transactionRoutes.post('/transactions', transactionController.createTransaction);
transactionRoutes.get('/transactions', transactionController.getAllTransactions);
transactionRoutes.get('/transactions/:transactionId', transactionController.getTransactionById);
transactionRoutes.get('/users/:userId/transactions', transactionController.getUserTransactions);
transactionRoutes.get('/transactions/:transactionId/items', transactionController.getTransactionItems);
transactionRoutes.put('/transactions/:transactionId/status', transactionController.updateTransactionStatus);

export default transactionRoutes;
