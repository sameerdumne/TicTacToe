# How to Play Multiplayer Tic Tac Toe 🎮

## Setup Instructions

### 1. Starting the Game
Make sure both servers are running:
```bash
# Terminal 1 - Socket.IO Server (port 5001)
npm run server

# Terminal 2 - Next.js App (port 3000)
npm run dev
```

Or run both together:
```bash
npm run dev:all
```

---

## Playing with a Friend

### For Player 1 (Game Creator) - You will be X ❌

1. **Open the website** in your browser:
   - Go to `http://localhost:3000`

2. **Click "Create Game"** button
   - A Game ID will appear (example: `abc123`)

3. **Copy the Game ID**
   - Click the copy icon 📋 next to the Game ID
   - Or manually copy the code

4. **Share with your friend**
   - Send the Game ID via text, email, chat, etc.

5. **Wait for your friend to join**
   - You'll see "⏱ Waiting for opponent..."
   - The game board appears but is not playable yet

6. **When friend joins:**
   - Status changes to "🎯 Your Turn!" (since X goes first)
   - Make your move by clicking any empty square
   - The Game ID stays visible at the top so you can reference it

---

### For Player 2 (Game Joiner) - You will be O ⭕

1. **Open the website** in your browser:
   - Go to `http://localhost:3000`

2. **Get the Game ID from your friend**
   - They should send you a code like `abc123`

3. **Enter the Game ID**
   - Type or paste it in the "Enter game ID" field

4. **Click "Join"** button
   - You'll immediately see the game board
   - Status shows "⏳ Opponent's Turn..." (waiting for X to move)

5. **Play the game!**
   - Wait for your friend to make their move
   - When it's your turn, status changes to "🎯 Your Turn!"
   - Click any empty square to place your O

---

## During the Game

### Game Status Indicators:
- **🎯 Your Turn!** - Blue highlight, you can click to play
- **⏳ Opponent's Turn...** - Gray, wait for opponent
- **⏱ Waiting for opponent...** - Orange, opponent hasn't joined yet

### Game Controls:
- **Game ID** - Visible at top with copy button (share this!)
- **Your Symbol** - Shows whether you're X or O
- **Current Turn** - Shows whose turn it is
- **Reset Button** - Restart the game (both players must agree)

### Winning:
- First to get 3 in a row (horizontal, vertical, or diagonal) wins!
- If all squares are filled with no winner → Draw
- Click "Play Again" to start a new game with the same opponent

---

## Playing Over the Internet (Not Localhost)

If you want to play with someone NOT on your local network:

1. Deploy the app to a hosting service (Vercel, Railway, etc.)
2. Update the `.env.local` to point to your deployed server URL
3. Share your deployed website URL with friends

---

## Troubleshooting

**"Create Game" doesn't work?**
- Make sure the Socket.IO server is running on port 5001
- Check browser console for errors
- Refresh the page

**Can't join friend's game?**
- Make sure you're both on the same deployed instance or same local network
- Check that the Game ID is correct (case-sensitive)
- Make sure the Socket.IO server is running

**Connection issues?**
- Hard refresh the browser (Cmd+Shift+R on Mac, Ctrl+Shift+R on Windows)
- Check that port 5001 is not blocked
- Restart both servers
