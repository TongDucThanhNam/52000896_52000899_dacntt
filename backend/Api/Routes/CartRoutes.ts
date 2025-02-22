import express from 'express';
import CartController from "../Controllers/CartController";

const router = express.Router();
const cartController = new CartController();

router.get('/users/:userId/cart', cartController.getCartByUserId);
router.put('/cart/items/:itemId', cartController.updateCartItem);
router.delete('/cart/items/:itemId', cartController.removeCartItem);

export default router;