const { pool } = require('./db');
const fs = require('fs');
const path = require('path');

async function resetUserData() {
  try {
    console.log('Resetting user data associations...');
    
    // Read SQL file
    const sqlFilePath = path.join(__dirname, 'reset-user-data.sql');
    const sqlScript = fs.readFileSync(sqlFilePath, 'utf8');
    
    // Execute SQL script
    await pool.query(sqlScript);
    
    console.log('User data associations reset successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting user data:', error);
    process.exit(1);
  }
}

resetUserData();