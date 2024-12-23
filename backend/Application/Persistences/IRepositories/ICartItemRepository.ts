import type {ClientSession} from "mongoose";
import type {CartItemWithBase} from "../../../Domain/Entities/CartItemEntities.ts";

export interface ICartItemRepository {
    //CRUD
    createCartItem(cartItemData: any, session: ClientSession): Promise<typeof CartItemWithBase>;

    getCartItemById(cartItemId: string, queryData: any): Promise<typeof CartItemWithBase | null>;

    updateCartItemById(cartItemId: string, cartItemData: any, session: ClientSession): Promise<typeof CartItemWithBase | null>;

    deleteCartItemById(cartItemId: string, session: ClientSession): Promise<typeof CartItemWithBase | null>;

    //Other API
    getCartItemsByCartId(cartId: string, queryData: any): Promise<typeof CartItemWithBase[] | null>;
}