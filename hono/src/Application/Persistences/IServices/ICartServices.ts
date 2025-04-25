export interface ICartService {
    createCart(data: any): Promise<any>;

    getCartByUserId(data: any): Promise<any>;

    addItemToCart(data: any): Promise<any>;

    updateCartItem(data: any): Promise<any>;

    removeCartItem(data: any): Promise<any>;

    clearCart(data: any): Promise<any>;
}
