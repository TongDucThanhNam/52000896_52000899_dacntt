import express from 'express';
import ProductController from "../Controllers/ProductController";

const router = express.Router();
const productController = new ProductController();

// Product routes
router.get('/products', productController.getAllProducts);
router.post('/products', productController.createProduct);
router.get('/products/:id', productController.getProductById);
router.put('/products/:id', productController.updateProduct);
router.delete('/products/:id', productController.deleteProduct);

//create product with many variants at once
router.post('/products/variants', productController.createProductWithVariants);

// Variant routes
router.post('/products/:id/variants', productController.createVariant);
router.get('/products/:id/variants', productController.getVariantsByProduct);
router.put('/variants/:id', productController.updateVariant);
router.delete('/variants/:id', productController.deleteVariant);

// Category routes
router.post('/categories', productController.createCategory);
router.get('/categories', productController.getCategories);
router.put('/categories/:id', productController.updateCategory);

// Tag routes
router.post('/products/add-tag', productController.addTagToProduct);
router.delete('/products/:productId/tags/:tagId', productController.removeTagFromProduct);
// router.get('/tags/:id/products', productController.getProductsByTag);

export default router;