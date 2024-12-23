import type {IProductServices} from "../../Application/Persistences/IServices/IProductServices.ts";
import {ProductServices} from "../../Application/Features/Product/ProductServices.ts";
import type {Request, Response,} from 'express';

import slugify from "slugify";

export default class ProductController {
    private productServices: IProductServices = new ProductServices();


    getAllProducts = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Get all products'
                #swagger.description = 'Endpoint to get all products'
             */
            const query = req.query;
            const result = await this.productServices.getAllProducts(query);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    createProduct = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Create product'
                #swagger.description = 'Endpoint to create product'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Product data',
                    required: true,
                    schema: {
                        productName: 'Product name',
                        productDescription: 'Product description',
                        productBrand: 'Product brand',
                        imageUrls: '[]',
                        categoryId: '6765a3b549de95984148bf5b',
                        productAvgRating: '0',
                        productTotalViews: '0',
                    }
                }
             */
            const {
                productName,
                productDescription,
                productBrand,
                imageUrls,
                categoryId,
                productAvgRating,
                productTotalViews
            } = req.body;

            const productSlug = slugify(productName, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true,      // convert to lower case, defaults to `false`
                strict: true,     // strip special characters except replacement, defaults to `false`
                locale: 'vi',      // language code of the locale to use
                trim: true         // trim leading and trailing replacement chars, defaults to `true`
            })

            const data = {
                productName,
                productSlug,
                productDescription,
                productBrand,
                imageUrls,
                categoryId,
                productAvgRating,
                productTotalViews
            }
            const result = await this.productServices.createProduct(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    getProductById = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Get product by id'
                #swagger.description = 'Endpoint to get product by id'
             */
            const productId = req.params.id;
            const result = await this.productServices.getProductById(productId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    updateProduct = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Update product'
                #swagger.description = 'Endpoint to update product'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Product data',
                    required: true,
                    schema: {
                        productName: 'Product name (optional)',
                        productDescription: 'Product description',
                        productBrand: 'Product brand',
                        imageUrls: '[]',
                        categoryId: '6765a3b549de95984148bf5b',
                        productAvgRating: '0',
                        productTotalViews: '0',
                    }
                }
             */
            const productId = req.params.id;
            const {
                productName,
                productDescription,
                productBrand,
                imageUrls,
                categoryId,
                productAvgRating,
                productTotalViews
            } = req.body;

            const productSlug = slugify(productName, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true,      // convert to lower case, defaults to `false`
                strict: true,     // strip special characters except replacement, defaults to `false`
                locale: 'vi',      // language code of the locale to use
                trim: true         // trim leading and trailing replacement chars, defaults to `true`
            })

            const data = {
                productId,
                productName,
                productSlug,
                productDescription,
                productBrand,
                imageUrls,
                categoryId,
                productAvgRating,
                productTotalViews
            }
            const result = await this.productServices.updateProduct(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    deleteProduct = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Delete product'
                #swagger.description = 'Endpoint to delete product'
             */
            const productId = req.params.id;
            const result = await this.productServices.deleteProduct(productId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    createVariant = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Create variant'
                #swagger.description = 'Endpoint to create variant'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Variant data',
                    required: true,
                    schema: {
                        variantSku: 'variant-sku',
                        variantName: 'variant name',
                        variantKeyIndex: '0',
                        variantImageUrl: 'variant-image-url',
                        variantSize: 'variant-size',
                        variantColor: 'variant-color',
                        variantStyle: 'variant-style',
                        variantMaterial: 'variant-material',
                        variantSeason: 'variant-season',
                        variantPrice: '100000',
                        variantPromotionPrice: '90000',
                        variantStockQuantity: '100',
                    }
                }
             */
            const productId = req.params.id;
                const {
                variantSku,
                variantName,
                variantKeyIndex,
                variantImageUrl,
                variantSize,
                variantColor,
                variantStyle,
                variantMaterial,
                variantSeason,
                variantPrice,
                variantPromotionPrice,
                variantStockQuantity
            } = req.body;

            const variantSlug = slugify(variantName, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true,      // convert to lower case, defaults to `false`
                strict: true,     // strip special characters except replacement, defaults to `false`
                locale: 'vi',      // language code of the locale to use
                trim: true         // trim leading and trailing replacement chars, defaults to `true`
            })

            const data = {
                productId,
                variantSku,
                variantName,
                variantSlug,
                variantKeyIndex,
                variantImageUrl,
                variantSize,
                variantColor,
                variantStyle,
                variantMaterial,
                variantSeason,
                variantPrice,
                variantPromotionPrice,
                variantStockQuantity
            }
            const result = await this.productServices.createVariant(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    getVariantsByProduct = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Get variants by product'
                #swagger.description = 'Endpoint to get variants by product'
             */
            const productId = req.params.id;
            const result = await this.productServices.getVariantsByProduct(productId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    updateVariant = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Update variant'
                #swagger.description = 'Endpoint to update variant'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Variant data',
                    required: true,
                    schema: {
                        variantSku: 'variant-sku',
                        variantName: 'variant name',
                        variantKeyIndex: '0',
                        variantImageUrl: 'variant-image-url',
                        variantSize: 'variant-size',
                        variantColor: 'variant-color',
                        variantStyle: 'variant-style',
                        variantMaterial: 'variant-material',
                        variantSeason: 'variant-season',
                        variantPrice: '100000',
                        variantPromotionPrice: '90000',
                        variantStockQuantity: '100',
                    }
                }
             */
            const variantId = req.params.id;

            const {
                variantSku,
                variantName,
                variantKeyIndex,
                variantImageUrl,
                variantSize,
                variantColor,
                variantStyle,
                variantMaterial,
                variantSeason,
                variantPrice,
                variantPromotionPrice,
                variantStockQuantity
            } = req.body;

            const variantSlug = slugify(variantName, {
                replacement: '-',  // replace spaces with replacement character, defaults to `-`
                remove: undefined, // remove characters that match regex, defaults to `undefined`
                lower: true,      // convert to lower case, defaults to `false`
                strict: true,     // strip special characters except replacement, defaults to `false`
                locale: 'vi',      // language code of the locale to use
                trim: true         // trim leading and trailing replacement chars, defaults to `true`
            })

            const data = {
                variantId,
                variantSku,
                variantName,
                variantSlug,
                variantKeyIndex,
                variantImageUrl,
                variantSize,
                variantColor,
                variantStyle,
                variantMaterial,
                variantSeason,
                variantPrice,
                variantPromotionPrice,
                variantStockQuantity
            }
            const result = await this.productServices.updateVariant(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    deleteVariant = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Delete variant'
                #swagger.description = 'Endpoint to delete variant'
             */
            const variantId = req.params.id;
            const result = await this.productServices.deleteVariant(variantId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    createCategory = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Create category'
                #swagger.description = 'Endpoint to create category'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Category data',
                    required: true,
                    schema: {
                        categoryName: 'Category name',
                    }
                }
             */
            const {
                categoryName
            } = req.body;

            const categorySlug = slugify(categoryName,{
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })

            const data = {
                categoryName,
                categorySlug
            }
            const result = await this.productServices.createCategory(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    getCategories = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Get categories'
                #swagger.description = 'Endpoint to get categories'
             */
            const result = await this.productServices.getCategories();
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    updateCategory = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Update category'
                #swagger.description = 'Endpoint to update category'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Category data',
                    required: true,
                    schema: {
                        categoryName: 'Category name',
                    }
                }
             */
            const categoryId = req.params.id;
            const {
                categoryName
            } = req.body;

            const categorySlug = slugify(categoryName,{
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })
            const data = {
                categoryId,
                categoryName,
                categorySlug
            }
            const result = await this.productServices.updateCategory(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    addTagToProduct = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Add tag to product'
                #swagger.description = 'Endpoint to add tag to product'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Product id and tag id',
                    required: true,
                    schema: {
                        productId: '6765a809c044f8a8dc24ef08',
                        tagId: '6765a3b549de95984148bf5b',
                    }
                }
             */
            const {
                productId,
                tagId
            } = req.body;

            const data = {
                productId,
                tagId
            }
            const result = await this.productServices.addTagToProduct(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    removeTagFromProduct = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Remove tag from product'
                #swagger.description = 'Endpoint to remove tag from product'
             */
            const {
                productId,
                tagId
            } = req.params;

            const data = {
                productId,
                tagId
            }
            const result = await this.productServices.removeTagFromProduct(data);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
    // getProductsByTag = async (
    //     req: Request,
    //     res: Response
    // ): Promise<Response> => {
    //     try {
    //         /*
    //             #swagger.tags = ['Products']
    //             #swagger.summary = 'Get products by tag'
    //             #swagger.description = 'Endpoint to get products by tag'
    //          */
    //         const tagId = req.params.id;
    //         const result = await this.productServices.getProductsByTag(tagId);
    //         return res.status(200).json(result);
    //     } catch (error: any) {
    //         return res.status(500).json({message: error.message});
    //     }
    // }
}