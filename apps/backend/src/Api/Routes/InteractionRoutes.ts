import {type Context, Hono} from 'hono';
import InteractionController from "../Controllers/InteractionController";

const interactionRoutes = new Hono();
const interactionController = new InteractionController();

// Interaction routes
interactionRoutes.post("/interactions", (c: Context) => interactionController.trackInteraction(c));
// Interaction purchase
interactionRoutes.post("/interactions/purchase", (c: Context) => interactionController.trackPurchase(c));
interactionRoutes.get("/users/:userId/interactions", (c: Context) => interactionController.getUserInteractions(c));
interactionRoutes.get("/products/:productId/interactions", (c: Context) => interactionController.getProductInteractions(c));

// Log routes
interactionRoutes.post("/logs", (c: Context) => interactionController.createLog(c));

export default interactionRoutes;
