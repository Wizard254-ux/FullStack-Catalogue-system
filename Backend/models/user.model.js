const db = require('../config/db');
const bcrypt = require('bcrypt');

class User {
  static async create(username, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, created_at
    `;
    
    const result = await db.query(query, [username, email, hashedPassword]);
    return result.rows[0];
  }
  
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await db.query(query, [email]);
    return result.rows[0];
  }
  
  static async findById(id) {
    const query = 'SELECT id, username, email, created_at FROM users WHERE id = $1';
    const result = await db.query(query, [id]);
    return result.rows[0];
  }
}

module.exports = User;