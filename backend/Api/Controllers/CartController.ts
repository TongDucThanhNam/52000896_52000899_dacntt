import CartServices from "../../Application/Features/Cart/CartServices.ts";
import type {Request, Response,} from 'express';


export default class CartController {
    private cartServices: any = new CartServices();

    //CRUD
    // createCart = async (
    //     req: Request,
    //     res: Response
    // ): Promise<Response> => {
    //     try {
    //         /*
    //             #swagger.tags = ['Carts']
    //             #swagger.summary = 'Create cart'
    //             #swagger.description = 'Endpoint to create cart'
    //
    //          */
    //         const query = req.body;
    //         const result = await this.cartServices.createCart(query);
    //         return res.status(200).json(result);
    //     } catch (error: any) {
    //         return res.status(500).json({message: error.message});
    //     }
    // }
    getCartByUserId = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Carts']
                #swagger.summary = 'Get cart by user id'
                #swagger.description = 'Endpoint to get cart by user id'
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
                #swagger.summary = 'Add item to cart'
                #swagger.description = 'Endpoint to add item to cart'
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
                #swagger.summary = 'Update cart item'
                #swagger.description = 'Endpoint to update cart item'
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
                #swagger.summary = 'Remove cart item'
                #swagger.description = 'Endpoint to remove cart item'
             */
            const userId = req.params.id;
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
                #swagger.summary = 'Clear cart'
                #swagger.description = 'Endpoint to clear cart'
             */
            const userId = req.params.id;
            const result = await this.cartServices.clearCart(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
}