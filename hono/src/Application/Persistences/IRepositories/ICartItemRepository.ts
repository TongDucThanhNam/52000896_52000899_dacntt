export interface ICartItemRepository {
    //CRUD
    createCartItem(cartItemData: any): Promise<any>;

    getCartItemById(cartItemId: string, queryData: any): Promise<any>;

    updateCartItemById(cartItemId: string, cartItemData: any): Promise<any>;

    deleteCartItemById(cartItemId: string): Promise<any>;

    //Other API
    getCartItemsByCartId(cartId: string, queryData: any): Promise<any>;
}