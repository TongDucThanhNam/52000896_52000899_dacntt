export interface ICartRepository {
    //CRUD
    createCart(cartData: any): Promise<any>;

    getCartById(cartId: string, queryData: any): Promise<any>;

    updateCartById(cartId: string, cartData: any): Promise<any>;

    deleteCartById(cartId: string): Promise<any>;

    //Other API
    getCartByUserId(userId: string, queryData: any): Promise<any>;
}
