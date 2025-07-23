const db = require('../config/db');

class Category {
  static async getAll(userId = null) {
    // Get categories from the categories table
    let query = 'SELECT name FROM categories';
    const params = [];
    
    // Filter by user_id if provided
    if (userId) {
      query += ' WHERE user_id = $1';
      params.push(userId);
    }
    
    query += ' ORDER BY name';
    const result = await db.query(query, params);
    
    return result.rows.map(row => row.name);
  }

  static async create(categoryName, userId) {
    // Insert the new category into the categories table
    const query = 'INSERT INTO categories (name, user_id) VALUES ($1, $2) RETURNING name';
    
    try {
      const result = await db.query(query, [categoryName, userId]);
      return result.rows[0].name;
    } catch (error) {
      // If the category already exists, just return the name
      if (error.code === '23505') { // Unique violation
        return categoryName;
      }
      throw error;
    }
  }
}

module.exports = Category;