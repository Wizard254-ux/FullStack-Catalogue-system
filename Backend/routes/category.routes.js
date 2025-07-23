const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');
const { verifyToken } = require('../middlewares/auth.middleware');

// Get all categories
router.get('/', categoryController.getAllCategories);

// Protected routes
router.use(verifyToken);

// Create new category
router.post('/', categoryController.createCategory);

module.exports = router;