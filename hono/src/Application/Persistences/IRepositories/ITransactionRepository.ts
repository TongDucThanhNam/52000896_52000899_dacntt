export interface ITransactionRepository {
    //CRUD
    createTransaction(transactionData: any): Promise<any>;

    getTransactionById(transactionId: string, queryData: any): Promise<any>;

    getAllTransactions(queryData: any): Promise<any>;

    updateTransactionById(transactionId: string, transactionData: any): Promise<any>;

    //Other API
    getTransactionsByUserId(userId: string, queryData: any): Promise<any>;
}