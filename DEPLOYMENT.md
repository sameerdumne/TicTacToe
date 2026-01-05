# Deployment Guide for Tic Tac Toe Multiplayer Game

This guide will help you deploy your Tic Tac Toe game. The project has two parts:
1. **Frontend (Next.js)** - Deploy to Netlify
2. **Backend (Socket.IO Server)** - Deploy to Railway, Render, or Heroku

---

## Part 1: Deploy Socket.IO Server (Backend)

The Socket.IO server needs to be deployed separately. Here are your options:

### Option A: Deploy to Railway (Recommended - Free Tier Available)

1. **Sign up** at [Railway.app](https://railway.app)

2. **Create a new project** from GitHub:
   - Connect your GitHub repository
   - Railway will auto-detect the Node.js app

3. **Important**: Railway will use **npm** (not pnpm) thanks to the included `nixpacks.toml` file

4. **Configure the service**:
   - Railway will automatically detect `server.js`
   - Build Command: `npm install` (auto-detected)
   - Start Command: `node server.js` (auto-detected)

5. **Set environment variables**:
   - `NODE_ENV` = `production`
   - `FRONTEND_URL` = (your Netlify URL - add after frontend deployment)
   - `NEXT_PUBLIC_APP_URL` = (your Netlify URL - add after frontend deployment)
   - `PORT` = (Railway auto-assigns, no need to set)

6. **Get your server URL**:
   - After deployment, Railway provides a public URL
   - Example: `https://your-app.railway.app`
   - Copy this URL for the next step

**Note**: The project includes `nixpacks.toml` and `.npmrc` to ensure Railway uses npm instead of pnpm, avoiding lockfile conflicts.

### Option B: Deploy to Render (Free Tier Available)

1. **Sign up** at [Render.com](https://render.com)

2. **Create a new Web Service**:
   - Connect your GitHub repository
   - Select "Web Service"
   - Build Command: `npm install`
   - Start Command: `node server.js`

3. **Configure environment**:
   - Render auto-assigns PORT
   - No additional env vars needed

4. **Get your server URL**:
   - Example: `https://your-app.onrender.com`

### Option C: Deploy to Heroku

1. **Sign up** at [Heroku.com](https://heroku.com)

2. **Install Heroku CLI** and login:
   ```bash
   heroku login
   ```

3. **Create and deploy**:
   ```bash
   heroku create your-tictactoe-server
   git push heroku main
   ```

4. **Get your server URL**:
   - Example: `https://your-tictactoe-server.herokuapp.com`

---

## Part 2: Deploy Frontend to Netlify

### Step 1: Update Environment Variable

1. Create a production environment variable file or configure in Netlify:
   - Variable name: `NEXT_PUBLIC_SOCKET_URL`
   - Value: Your deployed Socket.IO server URL from Part 1
   - Example: `https://your-app.railway.app`

### Step 2: Deploy to Netlify

#### Method 1: Deploy via Netlify Website (Easiest)

1. **Sign up/Login** at [Netlify.com](https://netlify.com)

2. **Import your project**:
   - Click "Add new site" → "Import an existing project"
   - Connect to GitHub
   - Select your `TicTacToe` repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Netlify will auto-detect Next.js

4. **Add environment variable**:
   - Go to Site Settings → Environment Variables
   - Add `NEXT_PUBLIC_SOCKET_URL` with your Socket.IO server URL

5. **Deploy**:
   - Click "Deploy site"
   - Netlify will build and deploy automatically

#### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   ```

2. **Login to Netlify**:
   ```bash
   netlify login
   ```

3. **Initialize and deploy**:
   ```bash
   netlify init
   netlify env:set NEXT_PUBLIC_SOCKET_URL https://your-socket-server-url.railway.app
   netlify deploy --prod
   ```

### Step 3: Update Server CORS Settings

After deploying to Netlify, you need to update the Socket.IO server's CORS settings:

1. Edit `server.js` on your backend deployment or update before deploying:

```javascript
const io = new Server(httpServer, {
  cors: {
    origin: process.env.NODE_ENV === "production" 
      ? [
          process.env.NEXT_PUBLIC_APP_URL,  // Your Netlify URL
          "https://your-netlify-site.netlify.app"  // Replace with actual URL
        ]
      : ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"],
    methods: ["GET", "POST"],
    credentials: true,
  },
})
```

2. Add environment variable to your backend deployment:
   - Variable: `NEXT_PUBLIC_APP_URL`
   - Value: Your Netlify site URL

---

## Environment Variables Summary

### Backend (Railway/Render/Heroku)
- `PORT` - Auto-assigned by platform
- `NODE_ENV` - Set to `production`
- `NEXT_PUBLIC_APP_URL` - Your Netlify frontend URL

### Frontend (Netlify)
- `NEXT_PUBLIC_SOCKET_URL` - Your deployed Socket.IO server URL

---

## Testing Your Deployment

1. **Visit your Netlify URL** (e.g., `https://your-site.netlify.app`)

2. **Check browser console** for:
   - `[v0] Attempting to connect to: https://your-socket-server...`
   - `[v0] Socket connected: <socket-id>`

3. **Test the game**:
   - Click "Create Game"
   - Should generate a game ID
   - Open in another browser/device
   - Join the game and play!

---

## Troubleshooting

### "Websocket error" in browser
- Check that Socket.IO server is running
- Verify `NEXT_PUBLIC_SOCKET_URL` is correct
- Check CORS settings on server

### "Connection refused"
- Socket.IO server might be down
- Check server logs on Railway/Render/Heroku
- Verify server URL is correct

### Game doesn't sync between players
- Check that both players are connected to the same server
- Verify WebSocket connection in Network tab
- Check server logs for errors

---

## Local Development

To run locally after cloning:

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with local settings
   ```

3. **Run both servers**:
   ```bash
   npm run dev:all
   ```
   Or run separately:
   ```bash
   # Terminal 1
   npm run server
   
   # Terminal 2
   npm run dev
   ```

4. **Open** http://localhost:3000

---

## Cost Breakdown

- **Railway**: Free tier (500 hours/month)
- **Render**: Free tier (750 hours/month, may sleep after 15 min inactivity)
- **Netlify**: Free tier (100GB bandwidth/month, unlimited sites)
- **Total**: **$0/month** on free tiers! 🎉

---

## Next Steps

1. ✅ Deploy Socket.IO server to Railway/Render
2. ✅ Get server URL
3. ✅ Deploy frontend to Netlify with correct env var
4. ✅ Update server CORS settings
5. ✅ Test and enjoy! 🎮

---

## Support

If you run into issues:
1. Check the browser console for errors
2. Check server logs on your hosting platform
3. Verify all environment variables are set correctly
4. Ensure CORS is properly configured

Made with ❤️ by Sameer
