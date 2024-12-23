import type {ClientSession} from "mongoose";
import {CartWithBase} from "../../../Domain/Entities/CartEntities.ts";
import type {ICartRepository} from "../../../Application/Persistences/IRepositories/ICartRepository.ts";

class CartRepository implements ICartRepository {
    async createCart(cartData: any, session: ClientSession): Promise<typeof CartWithBase> {
        try {
            const cart: any = await CartWithBase.create([cartData], {session: session});
            return cart;
        } catch (error) {
            throw new Error("Error at CartRepository: " + error);
        }
    }

    async getCartById(cartId: string, queryData: any): Promise<typeof CartWithBase | null> {
        try {
            const cart: any = await CartWithBase.findById(cartId);
            return cart;
        } catch (error) {
            throw new Error("Error at CartRepository: " + error);
        }
    }

    async updateCartById(cartId: string, cartData: any, session: ClientSession): Promise<typeof CartWithBase | null> {
        try {
            const cart: any = await CartWithBase.findByIdAndUpdate(cartId, cartData, {
                new: true,
                session: session
            });
            return cart;
        } catch (error) {
            throw new Error("Error at CartRepository: " + error);
        }
    }

    async deleteCartById(cartId: string, session: ClientSession): Promise<typeof CartWithBase | null> {
        try {
            const cart: any = await CartWithBase.findByIdAndUpdate(cartId, {
                isActive: false,
                isDeleted: true
            }, {
                new: true,
                session: session
            });
            return cart;
        } catch (error) {
            throw new Error("Error at CartRepository: " + error);
        }
    }

    async getCartByUserId(userId: string, queryData: any): Promise<typeof CartWithBase | null> {
        try {
            const cart: any = await CartWithBase.findOne({userId: userId});
            return cart;
        } catch (error) {
            throw new Error("Error at CartRepository: " + error);
        }
    }
}

export default CartRepository;