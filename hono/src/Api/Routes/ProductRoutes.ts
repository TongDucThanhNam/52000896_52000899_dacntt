import { Hono } from 'hono';
import * as productController from "../Controllers/ProductController";

const productRoutes = new Hono();

// Product routes
productRoutes.get('/products', productController.getAllProducts);
productRoutes.post('/products', productController.createProduct);
productRoutes.get('/products/:productId', productController.getProductById);
// Get products by variantId
productRoutes.get('/product/variant/:variantId', productController.getProductByVariantId);
productRoutes.put('/products/:productId', productController.updateProduct);
productRoutes.delete('/products/:productId', productController.deleteProduct);

// create product with many variants at once
productRoutes.post('/products/variants', productController.createProductWithVariants);

// get an product and its variants
productRoutes.get('/variants/product/:productId', productController.getProductAndVariants);

// Variant routes
productRoutes.post('/products/:productId/variants', productController.createVariant);
productRoutes.get('/products/:productId/variants', productController.getVariantsByProduct);
productRoutes.put('/variants/:variantId', productController.updateVariant);
productRoutes.delete('/variants/:variantId', productController.deleteVariant);

// Category routes
productRoutes.post('/categories', productController.createCategory);
productRoutes.get('/categories', productController.getCategories);
productRoutes.put('/categories/:categoryId', productController.updateCategory);

// Tag routes
productRoutes.post('/products/add-tag', productController.addTagToProduct);
productRoutes.delete('/products/:productId/tags/:tagId', productController.removeTagFromProduct);

export default productRoutes;