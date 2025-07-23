const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Protected routes - all routes require authentication
router.use(verifyToken);

// Get all categories
router.get('/', categoryController.getAllCategories);

// Create new category
router.post('/', categoryController.createCategory);

module.exports = router;