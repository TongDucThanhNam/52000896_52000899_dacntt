import { CartWithBase } from "../../../Domain/Entities/CartEntities.js";
import { CartItemWithBase } from "../../../Domain/Entities/CartItemEntities.js";
import type {IUnitOfWork} from "../../Persistences/IRepositories/IUnitOfWork.ts";
import type {ICartService} from "../../Persistences/IServices/ICartServices.ts";
import { UnitOfWorkFactory } from "../../../Infrastructure/Persistences/Factories/UnitOfWorkFactory";

class CartServices implements ICartService {
    private get unitOfWork(): IUnitOfWork {
        return UnitOfWorkFactory.getInstance().createUnitOfWork();
    }

    async addItemToCart(data: any): Promise<typeof CartItemWithBase> {
        try {
            const session = await this.unitOfWork.startTransaction();
            const cartItem = await this.unitOfWork.cartItemRepository.createCartItem(
                data,
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
            const cart = await this.unitOfWork.cartRepository.createCart(data);
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
            await this.unitOfWork.cartItemRepository.deleteCartItemById(cartItemId);
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
