require('dotenv').config();
const express = require('express');
const cors = require('cors');
const initializeDatabase = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: [
    'https://samuelmwakanema.github.io', 
    'http://localhost:3000', 
    'http://localhost:5500'
  ],
  methods: ['GET', 'POST', 'OPTIONS'], // 1. Added OPTIONS here
  allowedHeaders: ['Content-Type'],    // 2. Added explicitly allowed headers
  credentials: true
}));
app.use(express.json());

// Initialize database
let db = null;
initializeDatabase().then(database => {
  db = database;
  console.log('✓ Database initialized');
}).catch(err => {
  console.error('✗ Database initialization failed:', err);
  process.exit(1);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Exam Guru Comments API is running' });
});

// GET recent comments
app.get('/api/comments', async (req, res) => {
  try {
    const limit = Math.min(parseInt(req.query.limit) || 10, 50); // Max 50
    const offset = parseInt(req.query.offset) || 0;

    const rows = await db.getComments(limit, offset);
    res.json({
      success: true,
      comments: rows || [],
      count: rows ? rows.length : 0
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new comment
app.post('/api/comments', async (req, res) => {
  try {
    const { name, comment_text, score, topic } = req.body;

    // Validation
    if (!comment_text || comment_text.trim().length === 0) {
      return res.status(400).json({ error: 'Comment text is required' });
    }
    if (comment_text.trim().length > 500) {
      return res.status(400).json({ error: 'Comment must be 500 characters or less' });
    }

    const finalName = name && name.trim().length > 0 ? name.trim() : 'Anonymous';
    const finalTopic = topic || 'General';
    const finalScore = typeof score === 'number' ? score : null;

    const commentId = await db.addComment({
      name: finalName,
      comment_text: comment_text.trim(),
      score: finalScore,
      topic: finalTopic
    });

    res.status(201).json({
      success: true,
      message: 'Comment saved successfully',
      comment_id: commentId
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Railway's edge proxy needs the app bound to 0.0.0.0, not just localhost.
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📝 API ready at http://localhost:${PORT}/api`);
});
