# 🎮 Tic Tac Toe - Multiplayer Online Game

A real-time multiplayer Tic Tac Toe game built with Next.js and Socket.IO, featuring beautiful snowfall animations! ❄️

![Tic Tac Toe Game](./public/tictactoe.png)

## ✨ Features

- 🎯 Real-time multiplayer gameplay
- ❄️ Beautiful snowfall animation
- 📱 Fully responsive (mobile, tablet, desktop)
- 🎨 Modern dark theme UI
- 🔄 Game state synchronization
- 📋 Easy game ID sharing with copy button
- 🎉 Win/draw detection
- 🔄 Reset/Play Again functionality

## 🚀 Quick Start (Local Development)

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sameerdumne/TicTacToe.git
   cd TicTacToe
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development servers**:
   
   **Option 1: Run both servers together**
   ```bash
   npm run dev:all
   ```
   
   **Option 2: Run separately (2 terminals)**
   ```bash
   # Terminal 1 - Socket.IO Server
   npm run server
   
   # Terminal 2 - Next.js Frontend
   npm run dev
   ```

5. **Open your browser**:
   - Go to `http://localhost:3000`
   - Enjoy! 🎮

## 🎮 How to Play

### Create a Game (Player 1)
1. Click **"Create Game"**
2. Copy the generated Game ID
3. Share the Game ID with your friend
4. Wait for them to join
5. Make your move (you play as X)

### Join a Game (Player 2)
1. Get the Game ID from your friend
2. Enter it in the **"Enter game ID"** field
3. Click **"Join"**
4. Wait for Player 1 to move
5. Make your move (you play as O)

### Gameplay
- Players take turns clicking empty squares
- First to get 3 in a row (horizontal, vertical, or diagonal) wins!
- If all squares are filled with no winner, it's a draw
- Click **"Play Again"** to restart with the same opponent

## 📦 Project Structure

```
tic-tac-toe-web-app/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Main game page
│   ├── layout.tsx         # App layout with metadata
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── game-board.tsx     # Game board grid
│   ├── game-status.tsx    # Status display & controls
│   ├── game-controls.tsx  # Reset/Play Again button
│   └── ui/               # shadcn/ui components
├── server.js             # Socket.IO server
├── public/               # Static assets
├── .env.example          # Environment variables template
├── netlify.toml          # Netlify configuration
└── DEPLOYMENT.md         # Detailed deployment guide
```

## 🌐 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for comprehensive deployment instructions.

### Quick Deploy Summary:

1. **Deploy Socket.IO Server** (Backend):
   - Railway, Render, or Heroku
   - Get the server URL

2. **Deploy Frontend** (Netlify):
   - Set `NEXT_PUBLIC_SOCKET_URL` to your server URL
   - Deploy via Netlify dashboard or CLI

### Environment Variables

**Frontend (.env.local or Netlify)**:
```bash
NEXT_PUBLIC_SOCKET_URL=https://your-socket-server.railway.app
```

**Backend (Railway/Render/Heroku)**:
```bash
NODE_ENV=production
FRONTEND_URL=https://your-netlify-site.netlify.app
```

## 🛠️ Tech Stack

- **Frontend**:
  - Next.js 16.0.10
  - React 19.2.0
  - TypeScript
  - Tailwind CSS
  - shadcn/ui
  - react-snowfall

- **Backend**:
  - Node.js
  - Express
  - Socket.IO 4.8.3
  - CORS

## 📝 Available Scripts

```bash
npm run dev          # Start Next.js dev server
npm run server       # Start Socket.IO server
npm run dev:all      # Start both servers
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🐛 Troubleshooting

### Websocket Error
- Make sure the Socket.IO server is running
- Check that `NEXT_PUBLIC_SOCKET_URL` is set correctly
- Verify CORS settings on the server

### Can't Connect to Game
- Ensure both players are using the same deployed instance
- Check that the Game ID is correct
- Refresh the page and try again

### Snowfall Not Showing
- Hard refresh your browser (Cmd+Shift+R or Ctrl+Shift+R)
- Clear browser cache

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Sameer Dumne**

Made with ❤️ by Sameer

## 🙏 Acknowledgments

- Built with [v0.dev](https://v0.dev)
- UI components from [shadcn/ui](https://ui.shadcn.com)
- Snowfall effect from [react-snowfall](https://github.com/cahilfoley/react-snowfall)

---

⭐ Star this repo if you found it helpful!
