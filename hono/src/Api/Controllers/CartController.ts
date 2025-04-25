import type { Context } from 'hono';
import CartServices from '../../Application/Features/Cart/CartServices';

export default class CartController {
    private cartServices: any = new CartServices();

    // CRUD
    getCartByUserId = async (c: Context) => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Lấy thông tin giỏ hàng'
                #swagger.description = 'Endpoint để lấy thông tin giỏ hàng của user theo Id'
             */
            const userId = c.req.param('userId');
            const result = await this.cartServices.getCartByUserId(userId);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    }

    addItemToCart = async (c: Context) => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Thêm sản phẩm vào giỏ hàng'
                #swagger.description = 'Endpoint để thêm sản phẩm vào giỏ hàng của user theo Id'
             */
            const userId = c.req.param('id');
            const body = await c.req.json();
            const {
                productId,
                quantity
            } = body;

            const cartData = {
                userId,
                productId,
                quantity
            }
            const result = await this.cartServices.addItemToCart(cartData);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    }

    updateCartItem = async (c: Context) => {
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
            const userId = c.req.param('itemId');
            const body = await c.req.json();
            const {
                productId,
                quantity
            } = body;

            const cartData = {
                userId,
                productId,
                quantity
            }
            const result = await this.cartServices.updateCartItem(cartData);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    }

    removeCartItem = async (c: Context) => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Xóa sản phẩm khỏi giỏ hàng'
                #swagger.description = 'Endpoint để xóa sản phẩm khỏi giỏ hàng của user theo Id'
             */
            const userId = c.req.param('itemId');
            const body = await c.req.json();
            const {
                productId,
            } = body;

            const cartData = {
                userId,
                productId,
            }
            const result = await this.cartServices.removeCartItem(cartData);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    }

    clearCart = async (c: Context) => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Xóa toàn bộ sản phẩm khỏi giỏ hàng'
                #swagger.description = 'Endpoint để xóa toàn bộ sản phẩm khỏi giỏ hàng'
             */
            const userId = c.req.param('id');
            const result = await this.cartServices.clearCart(userId);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    }
}
