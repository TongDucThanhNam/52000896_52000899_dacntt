import type {IInteractionServices} from "../../Application/Persistences/IServices/IInteractionServices.ts";
import InteractionServices from "../../Application/Features/Interaction/InteractionServices";
import type { Context } from 'hono';


export default class InteractionController {
    private interactionServices: IInteractionServices = new InteractionServices();

    //--------------------------------------------------------------
    // Interactions
    trackInteraction = async (c: Context) => {
        try {
            /*
              #swagger.tags = ['Interactions']
              #swagger.summary = 'Theo dõi tương tác'
              #swagger.description = 'Endpoint để theo dõi tương tác của ngừoi dùng'

              #swagger.parameters['body'] = {
                  in: 'body',
                  description: 'Thông tin tương tác',
                  required: true,
                  type: 'object',
                  schema: {
                      userId: '6765a28b018fe8cf713c0af0',
                      productId: '6765a809c044f8a8dc24ef08',
                      variantId: '6765abd0691e5aba6cf04f6e',
                      interactionType: 'view',
                   }
                }
            */
            const body = await c.req.json();
            const {
                userId,
                productId,
                variantId,
                interactionType,
                interactionContent,
            } = body;

            console.log("Track data sent:", body);


            const data = {
                userId,
                productId,
                variantId,
                interactionType,
                interactionContent,
            };

            const result = await this.interactionServices.trackInteraction(data);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    };

    trackPurchase = async (c: Context) => {
        try {
            /*
              #swagger.tags = ['Interactions']
              #swagger.summary = 'Lấy thông tin tương tác của của một user'
              #swagger.description = 'Endpoint để lấy thông tin tương tác của một user'
            */
            const body = await c.req.json();
            const {userId, productId, interactionType, interactionContent} = body;

            const data = {
                userId,
                productId,
                // variantId,
                interactionType,
                interactionContent,
            };

            // console.log("Data:", data);
            const result = await this.interactionServices.trackPurchase(data);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    };

    getUserInteractions = async (c: Context) => {
        try {
            /*
              #swagger.tags = ['Interactions']
              #swagger.summary = 'Lấy thông tin tương tác của của một user'
              #swagger.description = 'Endpoint để lấy thông tin tương tác của một user'
            */
            const userId = c.req.param('userId');
            const result = await this.interactionServices.getUserInteractions(userId);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    };

    getProductInteractions = async (c: Context) => {
        try {
            /*
              #swagger.tags = ['Interactions']
              #swagger.summary = 'Lấy thông tin tương tác của một sản phẩm'
              #swagger.description = 'Endpoint để lấy thông tin tương tác của một sản phẩm'
            */
            const productId = c.req.param('productId');
            const result =
                await this.interactionServices.getProductInteractions(productId);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    };

    //--------------------------------------------------------------
    // Logs
    createLog = async (c: Context) => {
        try {
            /*
              #swagger.tags = ['Interactions']
              #swagger.summary = 'Tạo log'
              #swagger.description = 'Endpoint để tạo log'
            */
            const query = c.req.query();
            const result = await this.interactionServices.createLog(query);
            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    };
    getUserLogs = async (c: Context) => {
        try {
            /*
              #swagger.tags = ['Interactions']
              #swagger.summary = 'Lấy thông tin log từ user'
              #swagger.description = 'Endpoint để lấy thông tin log từ user'
            */
            const userId = c.req.param('id');
            const result = await this.interactionServices.getUserLogs(userId);

            return c.json(result, 200);
        } catch (error: any) {
            return c.json({message: error.message}, 500);
        }
    };
}
