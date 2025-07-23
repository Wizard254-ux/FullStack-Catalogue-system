const db = require('../config/db');

class Category {
  static async getAll() {
    // Get categories from the categories table
    const query = 'SELECT name FROM categories ORDER BY name';
    const result = await db.query(query);
    
    return result.rows.map(row => row.name);
  }

  static async create(categoryName) {
    // Insert the new category into the categories table
    const query = 'INSERT INTO categories (name) VALUES ($1) RETURNING name';
    
    try {
      const result = await db.query(query, [categoryName]);
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