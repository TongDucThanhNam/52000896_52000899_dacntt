import express from 'express';
import TransactionController from "../Controllers/TransactionController.ts";

const router = express.Router();
const transactionController = new TransactionController();

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:transactionId', transactionController.getTransactionById);
router.get('/users/:userId/transactions', transactionController.getUserTransactions);
router.get('/transactions/:transactionId/items', transactionController.getTransactionItems);
router.put('/transactions/:transactionId/status', transactionController.updateTransactionStatus);

export default router;