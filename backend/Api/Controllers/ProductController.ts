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
                #swagger.summary = 'Lấy tất cả sản phẩm'
                #swagger.description = 'Endpoint để lấy tất cả sản phẩm'
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
                #swagger.summary = 'Tạo sản phẩm'
                #swagger.description = 'Endpoint để tạo sản phẩm'

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
                #swagger.summary = 'Lấy sản phẩm theo [id]'
                #swagger.description = 'Endpoint để lấy sản phẩm theo [id]'
             */
            const productId = req.params.productId;
            const result = await this.productServices.getProductById(productId);
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    getProductByVariantId = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Lấy sản phẩm theo variantId'
                #swagger.description = 'Endpoint để lấy sản phẩm theo variantId'
             */
            const variantId = req.params.variantId;
            const result = await this.productServices.getProductByVariantId(variantId);
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
                #swagger.summary = 'Cập nhật sản phẩm'
                #swagger.description = 'Endpoint để cập nhật thông tin sản phẩm'

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
            const productId = req.params.productId;
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
                #swagger.summary = 'Xóa sản phẩm'
                #swagger.description = 'Endpoint để xóa sản phẩm'
             */
            const productId = req.params.productId;
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
                #swagger.summary = 'Thêm biến thể cho sản phẩm'
                #swagger.description = 'Endpoint để thêm biến thể'

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
            const productId = req.params.productId;
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
                #swagger.summary = 'Lấy biến thể theo sản phẩm'
                #swagger.description = 'Endpoint để lấy biến thể theo sản phẩm'
             */
            const productId = req.params.productId;
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
                #swagger.summary = 'Cập nhật biến thể'
                #swagger.description = 'Endpoint để cập nhật thông tin biến thể'

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
            const variantId = req.params.variantId;

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
                #swagger.summary = 'Xóa biến thể'
                #swagger.description = 'Endpoint để xóa biến thể'
             */
            const variantId = req.params.variantId;
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
                #swagger.summary = 'Thêm danh mục'
                #swagger.description = 'Endpoint để thêm danh mục'

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

            const categorySlug = slugify(categoryName, {
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
                #swagger.summary = 'Lấy danh mục'
                #swagger.description = 'Endpoint để lấy danh mục'
             */
            const query = req.query;
            const result = await this.productServices.getCategories(query);
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
                #swagger.summary = 'Cập nhật danh mục'
                #swagger.description = 'Endpoint để cập nhật thông tin danh mục'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Category data',
                    required: true,
                    schema: {
                        categoryName: 'Category name',
                    }
                }
             */
            const categoryId = req.params.categoryId;
            const {
                categoryName
            } = req.body;

            const categorySlug = slugify(categoryName, {
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
                #swagger.summary = 'Thêm tag vào sản phẩm'
                #swagger.description = 'Endpoint để thêm tag vào sản phẩm'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Product [id] and tag [id]',
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
                #swagger.summary = 'Xóa tag khỏi sản phẩm'
                #swagger.description = 'Endpoint để xóa tag khỏi sản phẩm'
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
    //             #swagger.summary = 'Lấy các sản phẩm theo tag'
    //             #swagger.description = 'Endpoint để lấy các sản phẩm theo tag'
    //          */
    //         const tagId = req.params.[id];
    //         const result = await this.productServices.getProductsByTag(tagId);
    //         return res.status(200).json(result);
    //     } catch (error: any) {
    //         return res.status(500).json({message: error.message});
    //     }
    // }


    createProductWithVariants = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Tạo sản phẩm với biến thể'
                #swagger.description = 'Endpoint để tạo sản phẩm với biến thể'

                #swagger.parameters['body'] = {
                    in: 'body',
                    description: 'Product data',
                    required: true,
                    schema: {
                        productName: 'Tên sản phẩm',
                        productSlug: 'ten-san-pham',
                        productDescription: 'Mô tả sản phẩm',
                        productBrand: 'Thương hiệu',
                        imageUrls: ['url1', 'url2'],
                        categoryId: '60d21b4667d0d8992e610c85',
                        productAvgRating: 4.5,
                        productTotalViews: 100,
                        variants: [
                            {
                                variantSku: 'SKU001',
                                variantName: 'Màu Đỏ - Size M',
                                variantSlug: 'maudo-size-m',
                                variantKeyIndex: 1,
                                variantImageUrl: 'url-avatar1',
                                variantSize: 'M',
                                variantColor: 'Đỏ',
                                variantStyle: 'X Casual',
                                variantMaterial: 'Cotton',
                                variantSeason: 'Summer',
                                variantPrice: 200000,
                                variantPromotionPrice: 180000,
                                variantStockQuantity: 50
                            },
                            {
                                variantSku: 'SKU002',
                                variantName: 'Màu Xanh - Size L',
                                variantSlug: 'mauxanh-size-l',
                                variantKeyIndex: 2,
                                variantImageUrl: 'url-avatar2',
                                variantSize: 'L',
                                variantColor: 'Xanh',
                                variantStyle: 'X Formal',
                                variantMaterial: 'Polyester',
                                variantSeason: 'Winter',
                                variantPrice: 220000,
                                variantPromotionPrice: 200000,
                                variantStockQuantity: 30
                            }
                        ]
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
                productTotalViews,
                variants
            } = req.body;

            const productSlug = slugify(productName, {
                replacement: '-',
                remove: undefined,
                lower: true,
                strict: true,
                locale: 'vi',
                trim: true
            })

            const data = {
                productName,
                productSlug,
                productDescription,
                productBrand,
                imageUrls,
                categoryId,
                productAvgRating,
                productTotalViews,
                variants
            }
            const result = await this.productServices.createProductWithVariants(data);

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }

    getProductAndVariants = async (
        req: Request,
        res: Response
    ): Promise<Response> => {
        try {
            /*
                #swagger.tags = ['Products']
                #swagger.summary = 'Lấy sản phẩm và biến thể'
                #swagger.description = 'Endpoint để lấy sản phẩm và biến thể'
             */
            const productId = req.params.productId;
            const product = await this.productServices.getProductById(productId);
            const variants = await this.productServices.getVariantsByProduct(productId);
            const result = {
                product,
                variants
            }
            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({message: error.message});
        }
    }
}