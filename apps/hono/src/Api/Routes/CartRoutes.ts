import { type Context, Hono } from 'hono';
import CartController from "../Controllers/CartController";

const cartController = new CartController();
const cartRoutes = new Hono();

// Cart routes
cartRoutes.get('/users/:userId/cart', (c: Context) => cartController.getCartByUserId(c));
cartRoutes.put('/cart/:itemId', (c: Context) => cartController.updateCartItem(c));
cartRoutes.delete('/cart/:itemId', (c: Context) => cartController.removeCartItem(c));
cartRoutes.post('/users/:id/cart', (c: Context) => cartController.addItemToCart(c));
cartRoutes.delete('/users/:id/cart', (c: Context) => cartController.clearCart(c));

export default cartRoutes;
