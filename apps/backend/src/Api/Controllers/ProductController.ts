import type { Context } from 'hono';
import ProductServices from "../../Application/Features/Product/ProductServices";
import type { IProductServices } from "../../Application/Persistences/IServices/IProductServices.ts";

// Basic slug generation function to replace slugify
const createSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-');     // Replace multiple hyphens with single hyphen
};

const productServices: IProductServices = new ProductServices();

// GET /products

export const getAllProducts = async (c: Context) => {
    try {
        const query = c.req.query();
        const result = await productServices.getAllProducts(query);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// POST /products
export const createProduct = async (c: Context) => {
    try {
        const body = await c.req.json();
        const {
            productName,
            productDescription,
            productBrand,
            imageUrls,
            categoryId,
            productAvgRating,
            productTotalViews,
            productTag
        } = body;

        const productSlug = createSlug(productName);

        const data = {
            productName,
            productSlug,
            productDescription,
            productBrand,
            imageUrls,
            categoryId,
            productAvgRating,
            productTotalViews,
            productTag
        };
        const result = await productServices.createProduct(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /products/:productId
export const getProductById = async (c: Context) => {
    try {
        const productId = c.req.param('productId');
        const result = await productServices.getProductById(productId);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /product/variant/:variantId
export const getProductByVariantId = async (c: Context) => {
    try {
        const variantId = c.req.param('variantId');
        const result = await productServices.getProductByVariantId(variantId);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// PUT /products/:productId
export const updateProduct = async (c: Context) => {
    try {
        const productId = c.req.param('productId');
        const body = await c.req.json();
        const {
            productName,
            productDescription,
            productBrand,
            imageUrls,
            categoryId,
            productAvgRating,
            productTotalViews
        } = body;
        const productSlug = createSlug(productName);
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
        };
        const result = await productServices.updateProduct(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// DELETE /products/:productId
export const deleteProduct = async (c: Context) => {
    try {
        const productId = c.req.param('productId');
        const result = await productServices.deleteProduct(productId);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// POST /products/:productId/variants
export const createVariant = async (c: Context) => {
    try {
        const productId = c.req.param('productId');
        const body = await c.req.json();
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
        } = body;
        const variantSlug = createSlug(variantName);
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
        };
        const result = await productServices.createVariant(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /products/:productId/variants
export const getVariantsByProduct = async (c: Context) => {
    try {
        const productId = c.req.param('productId');
        const result = await productServices.getVariantsByProduct(productId);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// PUT /variants/:variantId
export const updateVariant = async (c: Context) => {
    try {
        const variantId = c.req.param('variantId');
        const body = await c.req.json();
        const data = { ...body, variantId };
        const result = await productServices.updateVariant(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// DELETE /variants/:variantId
export const deleteVariant = async (c: Context) => {
    try {
        const variantId = c.req.param('variantId');
        const result = await productServices.deleteVariant(variantId);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// POST /products/:productId/variants
export const createProductWithVariants = async (c: Context) => {
    try {
        const body = await c.req.json();
        const {
            productName,
            productDescription,
            productBrand,
            imageUrls,
            categoryId,
            productAvgRating,
            productTotalViews,
            variants
        } = body;

        const productSlug = createSlug(productName);

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
        };

        const result = await productServices.createProductWithVariants(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /products/:productId
export const getProductAndVariants = async (c: Context) => {
    try {
        const productId = c.req.param('productId');
        console.log("ProductId: ", productId)

        const product = await productServices.getProductById(productId);
        const variants = await productServices.getVariantsByProduct(productId);
        const result = {
            product,
            variants
        };
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// POST /categories
export const createCategory = async (c: Context) => {
    try {
        const body = await c.req.json();
        const {
            categoryName
        } = body;

        const categorySlug = createSlug(categoryName);

        const data = {
            categoryName,
            categorySlug
        };

        const result = await productServices.createCategory(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// GET /categories
export const getCategories = async (c: Context) => {
    try {
        const query = c.req.query();
        const result = await productServices.getCategories(query);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// PUT /categories/:categoryId
export const updateCategory = async (c: Context) => {
    try {
        const categoryId = c.req.param('categoryId');
        const body = await c.req.json();
        const {
            categoryName
        } = body;

        const categorySlug = createSlug(categoryName);

        const data = {
            categoryId,
            categoryName,
            categorySlug
        };

        const result = await productServices.updateCategory(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// POST /products/:productId/tags
export const addTagToProduct = async (c: Context) => {
    try {
        const body = await c.req.json();
        const {
            productId,
            tagId
        } = body;

        const data = {
            productId,
            tagId
        };

        const result = await productServices.addTagToProduct(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};

// DELETE /products/:productId/tags/:tagId
export const removeTagFromProduct = async (c: Context) => {
    try {
        const productId = c.req.param('productId');
        const tagId = c.req.param('tagId');

        const data = {
            productId,
            tagId
        };

        const result = await productServices.removeTagFromProduct(data);
        return c.json(result, 200);
    } catch (error: any) {
        return c.json({ message: error.message }, 500);
    }
};
