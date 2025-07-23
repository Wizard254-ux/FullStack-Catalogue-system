const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload.controller');
const { verifyToken } = require('../middlewares/auth.middleware');
const upload = require('../middlewares/upload.middleware');

// Protected route
router.use(verifyToken);

// Upload image
router.post('/', upload.single('image'), uploadController.uploadImage);

module.exports = router;