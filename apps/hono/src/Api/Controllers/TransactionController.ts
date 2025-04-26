import type { Context } from 'hono';
import TransactionServices from "../../Application/Features/Transaction/TransactionServices";
import type { ITransactionService } from "../../Application/Persistences/IServices/ITransactionServices";

const transactionServices: ITransactionService = new TransactionServices();

// POST /transactions
export const createTransaction = async (c: Context) => {
    try {
        const body = await c.req.json();
        const { userId, orderStatus, totalValue, paymentMethod, items } = body;
        const transactionData = { userId, orderStatus, totalValue, paymentMethod, items };
        const result = await transactionServices.createTransaction(transactionData);
        return c.json(result, 201);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /transactions
export const getAllTransactions = async (c: Context) => {
    try {
        const query = c.req.query();
        const result = await transactionServices.getAllTransactions(query);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /transactions/:transactionId
export const getTransactionById = async (c: Context) => {
    try {
        const transactionId = c.req.param('transactionId');
        const result = await transactionServices.getTransactionById({ transactionId });
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /users/:userId/transactions
export const getUserTransactions = async (c: Context) => {
    try {
        const userId = c.req.param('userId');
        const result = await transactionServices.getUserTransactions(userId);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /transactions/:transactionId/items
export const getTransactionItems = async (c: Context) => {
    try {
        const transactionId = c.req.param('transactionId');
        const result = await transactionServices.getTransactionItems(transactionId);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// PUT /transactions/:transactionId/status
export const updateTransactionStatus = async (c: Context) => {
    try {
        const transactionId = c.req.param('transactionId');
        const { orderStatus } = await c.req.json();
        const updatedTransaction = await transactionServices.updateTransactionStatus({ transactionId, orderStatus });
        return c.json(updatedTransaction, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};