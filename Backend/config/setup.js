const { pool } = require('./db');
const fs = require('fs');
const path = require('path');

async function setupDatabase() {
  try {
    console.log('Starting database setup...');
    
    // Read SQL files
    const initSqlPath = path.join(__dirname, 'init.sql');
    const initSql = fs.readFileSync(initSqlPath, 'utf8');
    
    console.log('Connecting to PostgreSQL database...');
    
    // Execute init SQL script to create tables
    console.log('Creating database tables...');
    await pool.query(initSql);
    console.log('✅ Database tables created successfully');
    
    // Check if user_id columns need to be added
    try {
      console.log('Checking if schema update is needed...');
      
      // Try to add user_id column to products table
      await pool.query(`
        ALTER TABLE products 
        ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);
      `);
      
      // Try to add user_id column to categories table
      await pool.query(`
        ALTER TABLE categories 
        ADD COLUMN IF NOT EXISTS user_id INTEGER REFERENCES users(id);
      `);
      
      console.log('✅ Schema updated successfully');
    } catch (schemaError) {
      console.error('Error updating schema:', schemaError);
    }
    
    console.log('✅ Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();