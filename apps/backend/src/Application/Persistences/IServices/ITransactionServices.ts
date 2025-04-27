export interface ITransactionService {
    createTransaction(data: any): Promise<any>;

    getTransactionById(data: any): Promise<any>;

    getAllTransactions(data: any): Promise<any>;

    getUserTransactions(
        data: any,
    ): Promise<any>;

    getTransactionItems(
        data: any,
    ): Promise<any>;

    updateTransactionStatus(
        data: any,
    ): Promise<any>;
}
