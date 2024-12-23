// ICartRepository
import type {ClientSession} from "mongoose";
import type {CartWithBase} from "../../../Domain/Entities/CartEntities.ts";

export interface ICartRepository {
    //CRUD
    createCart(cartData: any, session: ClientSession): Promise<typeof CartWithBase>;

    getCartById(cartId: string, queryData: any): Promise<typeof CartWithBase | null>;

    updateCartById(cartId: string, cartData: any, session: ClientSession): Promise<typeof CartWithBase | null>;

    deleteCartById(cartId: string, session: ClientSession): Promise<typeof CartWithBase | null>;

    //Other API
    getCartByUserId(userId: string, queryData: any): Promise<typeof CartWithBase | null>;
}