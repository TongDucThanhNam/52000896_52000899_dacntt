import type {CartItemWithBase} from "../../../Domain/Entities/CartItemEntities.ts";
import type {CartWithBase} from "../../../Domain/Entities/CartEntities.ts";

export interface ICartService {
    createCart(data: any): Promise<typeof CartWithBase>;

    getCartByUserId(data: any): Promise<typeof CartWithBase | null>;

    addItemToCart(data: any): Promise<typeof CartItemWithBase>;

    updateCartItem(data: any): Promise<typeof CartItemWithBase | null>;

    removeCartItem(data: any): Promise<void>;

    clearCart(data: any): Promise<void>;
}