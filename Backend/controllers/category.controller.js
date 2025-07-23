const Category = require('../models/category.model');

const getAllCategories = async (req, res) => {
  try {
    // Get user ID from the authenticated request
    const userId = req.user ? req.user.id : null;
    
    const categories = await Category.getAll(userId);
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Server error while fetching categories' });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    
    if (!name) {
      return res.status(400).json({ message: 'Category name is required' });
    }
    
    // Get user ID from the authenticated request
    const userId = req.user.id;
    
    const category = await Category.create(name, userId);
    
    res.status(201).json({
      message: 'Category created successfully',
      category
    });
  } catch (error) {
    console.error('Error creating category:', error);
    res.status(500).json({ message: 'Server error while creating category' });
  }
};

module.exports = {
  getAllCategories,
  createCategory
};