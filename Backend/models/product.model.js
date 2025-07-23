const db = require('../config/db');
const fs = require('fs');
const path = require('path');

class Product {
  static async getAll(page = 1, limit = 10, filters = {}) {
    const offset = (page - 1) * limit;
    let query = 'SELECT * FROM products';
    const queryParams = [];
    let paramCount = 1;
    
    // Build WHERE clause based on filters
    const whereConditions = [];
    
    if (filters.search) {
      whereConditions.push(`(name ILIKE $${paramCount} OR $${paramCount} = ANY(tags))`);
      queryParams.push(`%${filters.search}%`);
      paramCount++;
    }
    
    if (filters.category) {
      whereConditions.push(`category = $${paramCount}`);
      queryParams.push(filters.category);
      paramCount++;
    }
    
    if (filters.minPrice) {
      whereConditions.push(`price >= $${paramCount}`);
      queryParams.push(filters.minPrice);
      paramCount++;
    }
    
    if (filters.maxPrice) {
      whereConditions.push(`price <= $${paramCount}`);
      queryParams.push(filters.maxPrice);
      paramCount++;
    }
    
    if (whereConditions.length > 0) {
      query += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    // Add pagination
    query += ` ORDER BY created_at DESC LIMIT $${paramCount} OFFSET $${paramCount + 1}`;
    queryParams.push(limit, offset);
    
    // Get total count for pagination
    let countQuery = 'SELECT COUNT(*) FROM products';
    if (whereConditions.length > 0) {
      countQuery += ' WHERE ' + whereConditions.join(' AND ');
    }
    
    const countResult = await db.query(countQuery, queryParams.slice(0, paramCount - 1));
    const total = parseInt(countResult.rows[0].count);
    
    const result = await db.query(query, queryParams);
    
    return {
      products: result.rows,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    };
  }
  
  static async getById(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
  
  static async create(productData) {
    const { name, category, price, tags, imageUrl } = productData;
    
    const query = `
      INSERT INTO products (name, category, price, tags, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const result = await db.query(query, [name, category, price, tags, imageUrl]);
    return result.rows[0];
  }
  
  static async update(id, productData) {
    const { name, category, price, tags, imageUrl } = productData;
    
    // Get current product to check if image needs to be deleted
    const currentProduct = await this.getById(id);
    if (!currentProduct) {
      return null;
    }
    
    const query = `
      UPDATE products
      SET name = $1, category = $2, price = $3, tags = $4, image_url = $5
      WHERE id = $6
      RETURNING *
    `;
    
    const result = await db.query(query, [name, category, price, tags, imageUrl, id]);
    
    // If image was updated and old image exists, delete it
    if (currentProduct.image_url && imageUrl !== currentProduct.image_url) {
      try {
        const oldImagePath = path.join(__dirname, '..', process.env.UPLOAD_PATH || 'uploads', 
          path.basename(currentProduct.image_url));
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }
    
    return result.rows[0];
  }
  
  static async delete(id) {
    // Get product to delete associated image
    const product = await this.getById(id);
    if (!product) {
      return false;
    }
    
    // Delete product from database
    const query = 'DELETE FROM products WHERE id = $1';
    await db.query(query, [id]);
    
    // Delete associated image if exists
    if (product.image_url) {
      try {
        const imagePath = path.join(__dirname, '..', process.env.UPLOAD_PATH || 'uploads', 
          path.basename(product.image_url));
        if (fs.existsSync(imagePath)) {
          fs.unlinkSync(imagePath);
        }
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }
    
    return true;
  }
}

module.exports = Product;