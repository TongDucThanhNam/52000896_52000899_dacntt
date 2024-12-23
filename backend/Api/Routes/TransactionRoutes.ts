import express from 'express';
import TransactionController from "../Controllers/TransactionController";

const router = express.Router();
const transactionController = new TransactionController();

router.post('/transactions', transactionController.createTransaction);
router.get('/transactions/:id', transactionController.getTransactionById);
router.get('/users/:userId/transactions', transactionController.getUserTransactions);
router.get('/transactions/:id/items', transactionController.getTransactionItems);
router.put('/transactions/:id/status', transactionController.updateTransactionStatus);

export default router;