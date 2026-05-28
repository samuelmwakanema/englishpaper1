const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'comments.db');

function initializeDatabase() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('Error opening database:', err);
        reject(err);
        return;
      }

      // Create comments table if it doesn't exist
      db.run(
        `CREATE TABLE IF NOT EXISTS comments (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL DEFAULT 'Anonymous',
          comment_text TEXT NOT NULL,
          score INTEGER,
          topic TEXT DEFAULT 'General',
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`,
        (err) => {
          if (err) {
            console.error('Error creating table:', err);
            reject(err);
            return;
          }

          console.log('✓ Comments table ready');
          resolve(db);
        }
      );
    });
  });
}

module.exports = initializeDatabase;
