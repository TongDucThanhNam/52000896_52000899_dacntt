export interface ITransactionItemRepository {
    //CRUD
    createTransactionItem(transactionItemData: any): Promise<any>;

    getTransactionItemById(transactionItemId: string, queryData: any): Promise<any>;

    getTransactionItemsByTransactionId(transactionId: string, queryData: any): Promise<any>;

    updateTransactionItemById(transaction: string, transactionItemData: any): Promise<any>;

    deleteTransactionItemById(transaction: string): Promise<any>;

    //Other API
}