import type {ICartItemRepository} from "../../../Application/Persistences/IRepositories/ICartItemRepository.ts";
import {cartItems} from "../../../Domain/Entities/schema";
import {getDb} from "../Config/db.js";
import {eq} from 'drizzle-orm';

class CartItemRepository implements ICartItemRepository {
    private db = getDb();

    async createCartItem(cartItemData: any): Promise<any> {
        try {
            const cartItem: any = await this.db.insert(cartItems).values(cartItemData)
            return cartItem;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }

    async getCartItemById(cartItemId: string, queryData: any): Promise<any> {
        try {
            const cartItem: any = await this.db.select().from(cartItems).where(eq(cartItems.cartId, Number(cartItemId)))
            return cartItem;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }

    async updateCartItemById(cartItemId: string, cartItemData: any): Promise<any> {
        try {
            const cartItem: any = await this.db.update(cartItems).set(cartItemData).where(eq(cartItems.cartId, Number(cartItemId)))
            return cartItem;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }

    async deleteCartItemById(cartItemId: string): Promise<any> {
        try {
            const cartItem: any = await this.db.update(cartItems).set({isDeleted: true}).where(eq(cartItems.cartId, Number(cartItemId)))
            return cartItem;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }

    async getCartItemsByCartId(cartId: string, queryData: any): Promise<any> {
        try {
            const result: any = await this.db.select().from(cartItems).where(eq(cartItems.cartId, Number(cartId)))
            return result;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }
}

export default CartItemRepository;