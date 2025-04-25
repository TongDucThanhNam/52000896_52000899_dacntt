import type {ClientSession} from "mongoose";
import type {ICartRepository} from "../../../Application/Persistences/IRepositories/ICartRepository.ts";
import {users} from "../../../Domain/Entities/schema";
import { getDb } from "../Config/db";

class CartRepository implements ICartRepository {
    private db =  getDb();

    async createCart(cartData: any, session: ClientSession): Promise<typeof CartWithBase> {
        try {
            const cart: any = await db.insert(cartData)
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
            console.log('userId', userId);
            console.log('CartWithBase', CartWithBase);
            // Use the direct database access instead of going through the UnitOfWork
            const cart: any = await this.db.select().from(users).all()
            return cart;
        } catch (error) {
            throw new Error("Error at CartRepository: " + error);
        }
    }
}

export default CartRepository;
