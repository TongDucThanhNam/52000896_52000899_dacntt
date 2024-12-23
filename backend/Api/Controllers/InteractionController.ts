import type {IInteractionServices} from "../../Application/Persistences/IServices/IInteractionServices.ts";
import InteractionServices from "../../Application/Features/Interaction/InteractionServices.ts";
import type {Request, Response,} from 'express';


export default class InteractionController {
    private interactionServices: IInteractionServices = new InteractionServices();


    trackInteraction = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Track interaction'
                #swagger.description = 'Endpoint to track interaction'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Query to track interaction',
                    required: true,
                    type: 'object',
                    schema: {
                        userId: '6765a28b018fe8cf713c0af0',
                        productId: '6765a809c044f8a8dc24ef08',
                        variantId: '6765abd0691e5aba6cf04f6e',
                        interactionType: 'view',
                        interactionContent: 'product',
                        interactionScore: '1'
                     }
                }
             */
            const {
                userId,
                productId,
                variantId,
                interactionType,
                interactionContent,
                interactionScore
            } = req.body;

            const data = {
                userId,
                productId,
                variantId,
                interactionType,
                interactionContent,
                interactionScore
            }
            const result = await this.interactionServices.trackInteraction(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    getUserInteractions = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Get user interactions'
                #swagger.description = 'Endpoint to get user interactions'
             */
            const userId = req.params.userId;
            const result = await this.interactionServices.getUserInteractions(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    getProductInteractions = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Get product interactions'
                #swagger.description = 'Endpoint to get product interactions'
             */
            const productId = req.params.productId;
            const result = await this.interactionServices.getProductInteractions(productId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    createLog = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Create log'
                #swagger.description = 'Endpoint to create log'
             */
            const query = req.query;
            const result = await this.interactionServices.createLog(query);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    getUserLogs = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Get user logs'
                #swagger.description = 'Endpoint to get user logs'
             */
            const userId = req.params.id;
            const result = await this.interactionServices.getUserLogs(userId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
}