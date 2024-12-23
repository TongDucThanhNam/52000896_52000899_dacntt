import type {ClientSession} from "mongoose";
import {CartItemWithBase} from "../../../Domain/Entities/CartItemEntities.ts";
import type {ICartItemRepository} from "../../../Application/Persistences/IRepositories/ICartItemRepository.ts";

class CartItemRepository implements ICartItemRepository {
    async createCartItem(cartItemData: any, session: ClientSession): Promise<typeof CartItemWithBase> {
        try {
            const cartItem: any = await CartItemWithBase.create([cartItemData], {session: session});
            return cartItem;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }

    async getCartItemById(cartItemId: string, queryData: any): Promise<typeof CartItemWithBase | null> {
        try {
            const cartItem: any = await CartItemWithBase.findById(cartItemId)
            return cartItem;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }

    async updateCartItemById(cartItemId: string, cartItemData: any, session: ClientSession): Promise<typeof CartItemWithBase | null> {
        try {
            const cartItem: any = await CartItemWithBase.findByIdAndUpdate(cartItemId, cartItemData, {
                new: true,
                session: session
            });
            return cartItem;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }

    async deleteCartItemById(cartItemId: string, session: ClientSession): Promise<typeof CartItemWithBase | null> {
        try {
            const cartItem: any = await CartItemWithBase.findByIdAndUpdate(cartItemId, {
                isActive: false,
                isDeleted: true
            }, {
                new: true,
                session: session
            });
            return cartItem;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }

    async getCartItemsByCartId(cartId: string, queryData: any): Promise<typeof CartItemWithBase[] | null> {
        try {
            const cartItems: any = await CartItemWithBase.find({cartId: cartId})
            return cartItems;
        } catch (error) {
            throw new Error("Error at CartItemRepository: " + error);
        }
    }
}

export default CartItemRepository;