import CartServices from "../../Application/Features/Cart/CartServices.ts";
import type {Request, Response,} from 'express';

export default class CartController {
    private cartServices: any = new CartServices();

    // CRUD
    getCartByUserId = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Lấy thông tin giỏ hàng'
                #swagger.description = 'Endpoint để lấy thông tin giỏ hàng của user theo Id'
             */
            const userId = req.params.userId;
            const result = await this.cartServices.getCartByUserId(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    addItemToCart = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Thêm sản phẩm vào giỏ hàng'
                #swagger.description = 'Endpoint để thêm sản phẩm vào giỏ hàng của user theo Id'
             */
            const userId = req.params.id;
            const {
                productId,
                quantity
            } = req.body;

            const cartData = {
                userId,
                productId,
                quantity
            }
            const result = await this.cartServices.addItemToCart(cartData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    updateCartItem = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Cập nhật giỏ hàng'
                #swagger.description = 'Endpoint để cập nhật giỏ hàng của user theo Id'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Cart data',
                    required: true,
                    schema: { $ref: "#/definitions/Cart" }
                }
             */
            const userId = req.params.itemId;
            const {
                productId,
                quantity
            } = req.body;

            const cartData = {
                userId,
                productId,
                quantity
            }
            const result = await this.cartServices.updateCartItem(cartData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    removeCartItem = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Xóa sản phẩm khỏi giỏ hàng'
                #swagger.description = 'Endpoint để xóa sản phẩm khỏi giỏ hàng của user theo Id'
             */
            const userId = req.params.itemId;
            const {
                productId,
            } = req.body;

            const cartData = {
                userId,
                productId,
            }
            const result = await this.cartServices.removeCartItem(cartData);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    clearCart = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Xóa toàn bộ sản phẩm khỏi giỏ hàng'
                #swagger.description = 'Endpoint để xóa toàn bộ sản phẩm khỏi giỏ hàng'
             */
            const userId = req.params.id;
            const result = await this.cartServices.clearCart(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
}