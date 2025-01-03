import express from 'express';
import ProductController from "../Controllers/ProductController";

const router = express.Router();
const productController = new ProductController();

// Product routes
router.get('/products', productController.getAllProducts);
// router.post('/products', productController.createProduct);
router.get('/products/:productId', productController.getProductById);
router.put('/products/:productId', productController.updateProduct);
router.delete('/products/:productId', productController.deleteProduct);

//create product with many variants at once
router.post('/products/variants', productController.createProductWithVariants);

// Variant routes
router.post('/products/:productId/variants', productController.createVariant);
router.get('/products/:productId/variants', productController.getVariantsByProduct);
router.put('/variants/:variantId', productController.updateVariant);
router.delete('/variants/:variantId', productController.deleteVariant);

// Category routes
router.post('/categories', productController.createCategory);
router.get('/categories', productController.getCategories);
router.put('/categories/:categoryId', productController.updateCategory);

// Tag routes
router.post('/products/add-tag', productController.addTagToProduct);
router.delete('/products/:productId/tags/:tagId', productController.removeTagFromProduct);
// router.get('/tags/:id/products', productController.getProductsByTag);

export default router;