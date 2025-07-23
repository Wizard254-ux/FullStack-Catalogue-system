const Product = require('../models/product.model');

const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    
    // Extract filter parameters
    const filters = {
      search: req.query.search,
      category: req.query.category,
      minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : null,
      maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : null
    };
    
    // Get user ID from the authenticated request
    const userId = req.user ? req.user.id : null;
    
    const result = await Product.getAll(page, limit, filters, userId);
    
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error while fetching products' });
  }
};

const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.getById(productId);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if the product belongs to the authenticated user
    if (product.user_id !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to view this product' });
    }
    
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server error while fetching product' });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, category, price } = req.body;
    let tags = req.body.tags || [];
    
    // Validate required fields
    if (!name || !category || !price) {
      return res.status(400).json({ message: 'Name, category, and price are required' });
    }
    
    // Convert tags to array if it's a string
    if (typeof tags === 'string') {
      try {
        // Try to parse as JSON first (for arrays sent as JSON strings)
        tags = JSON.parse(tags);
      } catch (e) {
        // If parsing fails, treat as comma-separated string
        tags = tags.split(',').map(tag => tag.trim());
      }
    }
    
    // Get image URL if file was uploaded
    let imageUrl = null;
    if (req.file) {
      imageUrl = `/api/images/${req.file.filename}`;
    }
    
    const productData = {
      name,
      category,
      price: parseFloat(price),
      tags,
      imageUrl,
      userId: req.user.id // Add user ID from authenticated request
    };
    
    const newProduct = await Product.create(productData);
    
    res.status(201).json({
      message: 'Product created successfully',
      product: newProduct
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error while creating product' });
  }
};

const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const { name, category, price } = req.body;
    let tags = req.body.tags || [];
    
    // Get existing product
    const existingProduct = await Product.getById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if the product belongs to the authenticated user
    if (existingProduct.user_id !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to update this product' });
    }
    
    // Convert tags to array if it's a string
    if (typeof tags === 'string') {
      try {
        // Try to parse as JSON first (for arrays sent as JSON strings)
        tags = JSON.parse(tags);
      } catch (e) {
        // If parsing fails, treat as comma-separated string
        tags = tags.split(',').map(tag => tag.trim());
      }
    }
    
    // Handle image URL
    let imageUrl = existingProduct.image_url;
    
    // If a new file was uploaded, use that
    if (req.file) {
      imageUrl = `/api/images/${req.file.filename}`;
    } 
    // If removeImage flag is set, remove the image
    else if (req.body.removeImage === 'true') {
      imageUrl = null;
    }
    
    const productData = {
      name: name || existingProduct.name,
      category: category || existingProduct.category,
      price: price ? parseFloat(price) : existingProduct.price,
      tags: tags.length > 0 ? tags : existingProduct.tags,
      imageUrl
    };
    
    const updatedProduct = await Product.update(productId, productData);
    
    res.status(200).json({
      message: 'Product updated successfully',
      product: updatedProduct
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error while updating product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    
    // Get existing product first to check ownership
    const existingProduct = await Product.getById(productId);
    if (!existingProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    // Check if the product belongs to the authenticated user
    if (existingProduct.user_id !== req.user.id) {
      return res.status(403).json({ message: 'You do not have permission to delete this product' });
    }
    
    const result = await Product.delete(productId);
    
    if (!result) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error while deleting product' });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};