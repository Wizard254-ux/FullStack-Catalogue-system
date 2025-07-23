const { pool } = require('./db');
const fs = require('fs');
const path = require('path');

async function initializeDatabase() {
  try {
    console.log('Initializing database...');
    
    // Read SQL file
    const sqlFilePath = path.join(__dirname, 'init.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute SQL script
    await pool.query(sqlScript);
    
    console.log('Database tables created successfully!');
    
    // Run category migration
    console.log('Migrating categories from products...');
    
    // Get distinct categories from products table
    const getProductCategoriesQuery = 'SELECT DISTINCT category FROM products';
    const productCategories = await pool.query(getProductCategoriesQuery);
    
    if (productCategories.rows.length > 0) {
      console.log(`Found ${productCategories.rows.length} distinct categories in products table.`);
      
      // Insert each category into the categories table
      for (const row of productCategories.rows) {
        const category = row.category;
        try {
          await pool.query('INSERT INTO categories (name) VALUES ($1) ON CONFLICT (name) DO NOTHING', [category]);
          console.log(`Added category: ${category}`);
        } catch (err) {
          console.error(`Error adding category ${category}:`, err);
        }
      }
    } else {
      console.log('No existing categories found in products table.');
    }
    
    console.log('Database initialized successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();