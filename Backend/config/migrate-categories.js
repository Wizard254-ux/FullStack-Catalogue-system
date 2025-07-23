const { pool } = require('./db');

async function migrateCategories() {
  try {
    console.log('Starting category migration...');
    
    // Get distinct categories from products table
    const getProductCategoriesQuery = 'SELECT DISTINCT category FROM products';
    const productCategories = await pool.query(getProductCategoriesQuery);
    
    if (productCategories.rows.length === 0) {
      console.log('No categories found in products table.');
      return;
    }
    
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
    
    console.log('Category migration completed successfully!');
  } catch (error) {
    console.error('Error during category migration:', error);
  } finally {
    pool.end();
  }
}

migrateCategories();