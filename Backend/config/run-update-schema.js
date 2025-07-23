const { pool } = require('./db');
const fs = require('fs');
const path = require('path');

async function updateSchema() {
  try {
    console.log('Updating database schema...');
    
    // Read SQL file
    const sqlFilePath = path.join(__dirname, 'update-schema.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute SQL script
    await pool.query(sqlScript);
    
    console.log('Database schema updated successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error updating database schema:', error);
    process.exit(1);
  }
}

updateSchema();