# Exam Guru Comments System - Setup Guide

## ✅ What's Been Set Up

Your project now has:
- **Backend (Node.js + Express)** in the `server/` folder
- **Comments API** with POST and GET endpoints
- **SQLite database** for storing comments
- **Frontend** comment UI integrated into your HTML

---

## 🚀 Deployment to Railway

Railway is the easiest way to deploy. It's free and takes 5 minutes.

### Step 1: Prepare Your Repository

1. Add the `server/` folder to your GitHub repo:
   ```bash
   git add server/
   git commit -m "Add comments backend server"
   git push
   ```

2. Create a `Procfile` in the root of your repo (this tells Railway how to start):
   ```
   web: cd server && npm install && npm start
   ```

### Step 2: Deploy on Railway

1. Go to https://railway.app/
2. Click **"New Project"** → **"Deploy from GitHub"**
3. Select your `englishpaper1` repository
4. Railway auto-detects Node.js and deploys 🎉
5. Once deployed, Railway shows you a public URL like: `https://yourproject-production.up.railway.app`

### Step 3: Update Your HTML

In [index.html](index.html), find this line (around line 1048):

```javascript
const COMMENTS_API_URL = 'https://YOUR_API_ENDPOINT.com/api/comments';
```

Replace it with your Railway URL:

```javascript
const COMMENTS_API_URL = 'https://yourproject-production.up.railway.app/api/comments';
```

That's it! 🎊

---

## 🛠️ Local Testing (Optional)

Want to test before deploying?

### Step 1: Install Dependencies

```bash
cd server
npm install
```

### Step 2: Start Server Locally

```bash
npm start
```

You'll see:
```
✓ Database initialized
🚀 Server running on port 3000
```

### Step 3: Update HTML Temporarily

Change the API URL to:
```javascript
const COMMENTS_API_URL = 'http://localhost:3000/api/comments';
```

### Step 4: Test

Open your HTML file in browser and try:
1. Complete 5 practice questions
2. Click **"Share Feedback"** in the modal
3. Submit a comment
4. Refresh page - comment appears on welcome screen

---

## 📋 API Endpoints

Once deployed, you have:

### GET /api/comments
Fetches recent comments
```
GET https://yourserver.com/api/comments?limit=10&offset=0
```

**Response:**
```json
{
  "success": true,
  "comments": [
    {
      "id": 1,
      "name": "Sam",
      "comment_text": "Great app!",
      "score": 5,
      "topic": "Prepositional Structures",
      "created_at": "2024-05-28T10:30:00Z"
    }
  ]
}
```

### POST /api/comments
Submit a new comment
```
POST https://yourserver.com/api/comments
Content-Type: application/json

{
  "name": "Your Name",
  "comment_text": "Your feedback...",
  "score": 5,
  "topic": "Prepositional Structures"
}
```

---

## 🔧 Environment Variables (Optional)

If you want to customize, create a `.env` file in the `server/` folder:

```
PORT=3000
DB_PATH=./comments.db
```

---

## ✨ Features

✅ Users can leave comments after completing 5 questions  
✅ Comments display on welcome page (latest 5)  
✅ Optional name field (defaults to "Anonymous")  
✅ Auto-tracks score and topic  
✅ Time-ago formatting ("5 minutes ago")  
✅ XSS protection (comments are sanitized)  
✅ SQLite database (built-in, no setup needed)  

---

## 🐛 Troubleshooting

**Comments not showing?**
- Check browser console (F12) for errors
- Verify COMMENTS_API_URL is correct in HTML
- Ensure API is running/deployed

**CORS errors?**
- Check that your GitHub Pages domain is in the CORS whitelist in `server/server.js`

**Database not working locally?**
- Delete `server/comments.db` and restart: `npm start`

---

## 📝 Next Steps

1. **Deploy to Railway** (see steps above)
2. **Update API URL** in your HTML
3. **Test** by leaving a comment
4. **Share** with your students! 🎓

Questions? Check the Railway docs: https://docs.railway.app/

---

**Created:** May 28, 2026  
**Backend:** Node.js + Express + SQLite  
**Host:** Railway (free tier available)
