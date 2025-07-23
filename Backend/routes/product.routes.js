const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// Protected routes - all routes require authentication
router.use(verifyToken);

// Get all products (with filtering, pagination, search)
router.get('/', productController.getAllProducts);

// Get product by ID
router.get('/:id', productController.getProductById);

// Create new product with image upload
router.post('/', upload.single('image'), productController.createProduct);

// Update product with optional new image
router.put('/:id', upload.single('image'), productController.updateProduct);

// Delete product
router.delete('/:id', productController.deleteProduct);

module.exports = router;