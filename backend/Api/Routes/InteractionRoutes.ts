import express from "express";
import InteractionController from "../Controllers/InteractionController";

const router = express.Router();
const interactionController = new InteractionController();

// Interaction routes
router.post("/interactions", interactionController.trackInteraction);
// Interaction purchase
router.post("/interactions/purchase", interactionController.trackPurchase);
router.get("/users/:userId/interactions", interactionController.getUserInteractions,);
router.get("/products/:productId/interactions", interactionController.getProductInteractions,);

// Log routes
router.post("/logs", interactionController.createLog);

export default router;