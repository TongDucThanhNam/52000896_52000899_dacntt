import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import {UnitOfWork} from "../../../Infrastructure/Persistences/Respositories/UnitOfWork.ts";
import type {ICartService} from "../../Persistences/IServices/ICartServices.ts";
import {type CartItemWithBase} from "../../../Domain/Entities/CartItemEntities.ts";
import {type CartWithBase} from "../../../Domain/Entities/CartEntities.ts";

class CartServices implements ICartService {
    private unitOfWork: IUnitOfWork = new UnitOfWork();

    async addItemToCart(data: any): Promise<typeof CartItemWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const cartItem = await this.unitOfWork.cartItemRepository.createCartItem(
                data,
                session,
            );
            await this.unitOfWork.commitTransaction();
            return cartItem;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async clearCart(data: any): Promise<void> {
        try {
            const session = await this.unitOfWork.startTransaction();
            // await this.unitOfWork.cartItemRepository.clearCartItems(data, session);
            await this.unitOfWork.commitTransaction();
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async createCart(data: any): Promise<typeof CartWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const cart = await this.unitOfWork.cartRepository.createCart(data, session);
            await this.unitOfWork.commitTransaction();
            return cart;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async getCartByUserId(data: any): Promise<typeof CartWithBase | null> {
        try {
            const queryData = {
                isDeleted: false,
                isActive: true,
            }
            const cart = await this.unitOfWork.cartRepository.getCartByUserId(data, queryData);
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async removeCartItem(data: any): Promise<void> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const {
                cartItemId,
            } = data;
            await this.unitOfWork.cartItemRepository.deleteCartItemById(cartItemId, session);
            await this.unitOfWork.commitTransaction();
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }

    async updateCartItem(data: any): Promise<typeof CartItemWithBase | null> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const {
                cartItemId,
                ...restData
            } = data;
            const cartItem = await this.unitOfWork.cartItemRepository.updateCartItemById(
                cartItemId,
                restData,
                session
            );
            await this.unitOfWork.commitTransaction();
            return cartItem;
        } catch (error) {
            await this.unitOfWork.abortTransaction();
            throw error;
        }
    }
}

export default CartServices;