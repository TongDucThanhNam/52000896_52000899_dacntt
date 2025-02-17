import type { IInteractionServices } from "../../Application/Persistences/IServices/IInteractionServices.ts";
import InteractionServices from "../../Application/Features/Interaction/InteractionServices.ts";
import type { Request, Response } from "express";
// import { Console } from "console";

export default class InteractionController {
  private interactionServices: IInteractionServices = new InteractionServices();
  trackInteraction = async (req: Request, res: Response): Promise<Response> => {
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
      const {
        userId,
        productId,
        variantId,
        interactionType,
        interactionContent,
      } = req.body;

      const data = {
        userId,
        productId,
        variantId,
        interactionType,
        interactionContent,
      };

      // console.log("Data:", data);
      const result = await this.interactionServices.trackInteraction(data);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  trackPurchase = async (req: Request, res: Response): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Lấy thông tin tương tác của của một user'
                #swagger.description = 'Endpoint để lấy thông tin tương tác của một user'
      */
      const { userId, productId, interactionType, interactionContent, items } =
        req.body;

      const data = {
        userId,
        productId,
        // variantId,
        interactionType,
        interactionContent,
      };

      // console.log("Data:", data);
      const result = await this.interactionServices.trackPurchase(data);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  getUserInteractions = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Lấy thông tin tương tác của của một user'
                #swagger.description = 'Endpoint để lấy thông tin tương tác của một user'
             */
      const userId = req.params.userId;
      const result = await this.interactionServices.getUserInteractions(userId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  getProductInteractions = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Lấy thông tin tương tác của một sản phẩm'
                #swagger.description = 'Endpoint để lấy thông tin tương tác của một sản phẩm'
             */
      const productId = req.params.productId;
      const result =
        await this.interactionServices.getProductInteractions(productId);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };

  createLog = async (req: Request, res: Response): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Tạo log'
                #swagger.description = 'Endpoint để tạo log'
             */
      const query = req.query;
      const result = await this.interactionServices.createLog(query);
      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
  getUserLogs = async (req: Request, res: Response): Promise<Response> => {
    try {
      /*
                #swagger.tags = ['Interactions']
                #swagger.summary = 'Lấy thông tin log từ user'
                #swagger.description = 'Endpoint để lấy thông tin log từ user'
             */
      const userId = req.params.id;
      const result = await this.interactionServices.getUserLogs(userId);

      return res.status(200).json(result);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  };
}
