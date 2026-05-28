const fs = require('fs');
const path = require('path');

const DB_PATH = process.env.DB_PATH || path.join(__dirname, 'comments.json');

async function readComments() {
  try {
    const raw = await fs.promises.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err.code === 'ENOENT') {
      return [];
    }
    throw err;
  }
}

async function writeComments(comments) {
  await fs.promises.mkdir(path.dirname(DB_PATH), { recursive: true });
  await fs.promises.writeFile(DB_PATH, JSON.stringify(comments, null, 2));
}

async function initializeDatabase() {
  const comments = await readComments();
  await writeComments(Array.isArray(comments) ? comments : []);
  console.log('Comments store ready');
  return {
    async getComments(limit, offset) {
      const allComments = await readComments();
      return allComments
        .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
        .slice(offset, offset + limit);
    },

    async addComment({ name, comment_text, score, topic }) {
      const allComments = await readComments();
      const nextId = allComments.reduce((max, comment) => Math.max(max, comment.id || 0), 0) + 1;
      const comment = {
        id: nextId,
        name,
        comment_text,
        score,
        topic,
        created_at: new Date().toISOString()
      };
      allComments.push(comment);
      await writeComments(allComments);
      return nextId;
    }
  };
}

module.exports = initializeDatabase;
