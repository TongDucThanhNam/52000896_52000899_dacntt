import express from 'express';
import CartController from "../Controllers/CartController";

const router = express.Router();
const cartController = new CartController();

// router.post('/users/:userId/cart', cartController.createCart);
router.get('/users/:userId/cart', cartController.getCartByUserId);
router.post('/cart/:cartId/items', cartController.addItemToCart);
router.put('/cart/items/:itemId', cartController.updateCartItem);
router.delete('/cart/items/:itemId', cartController.removeCartItem);
router.delete('/cart/:cartId', cartController.clearCart);

export default router;