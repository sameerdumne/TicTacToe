import express from "express"
import { createServer } from "http"
import { Server } from "socket.io"
import cors from "cors"

const app = express()
const httpServer = createServer(app)

// Determine allowed origins based on environment
const allowedOrigins = process.env.NODE_ENV === "production" 
  ? [
      process.env.NEXT_PUBLIC_APP_URL,
      process.env.FRONTEND_URL,
    ].filter(Boolean)
  : ["http://localhost:3000", "http://localhost:3001", "http://127.0.0.1:3000", "http://127.0.0.1:3001"]

const io = new Server(httpServer, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
})

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}))
app.use(express.json())

const games = new Map()

function checkWinner(board) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]
    }
  }

  return null
}

function isBoardFull(board) {
  return board.every((cell) => cell !== null)
}

// Socket.IO connection handling
io.on("connection", (socket) => {
  console.log("[v0] User connected:", socket.id)

  socket.on("create-game", () => {
    const gameId = Math.random().toString(36).substring(7)
    const gameData = {
      id: gameId,
      board: Array(9).fill(null),
      currentPlayer: "X",
      players: {
        [socket.id]: "X",
      },
      status: "waiting",
      winner: null,
    }
    games.set(gameId, gameData)
    socket.join(gameId)
    socket.emit("game-created", gameId)
    console.log("[v0] Game created:", gameId)
  })

  socket.on("join-game", (gameId) => {
    const game = games.get(gameId)
    if (game && Object.keys(game.players).length < 2) {
      game.players[socket.id] = "O"
      socket.join(gameId)
      socket.emit("game-joined", gameId)
      io.to(gameId).emit("opponent-joined")
      game.status = "playing"
      console.log("[v0] Player joined game:", gameId)
    }
  })

  socket.on("make-move", (gameId, index, playerSymbol) => {
    const game = games.get(gameId)
    if (game && game.board[index] === null && game.currentPlayer === playerSymbol) {
      game.board[index] = playerSymbol
      
      const winner = checkWinner(game.board)

      if (winner) {
        // Send board update so winning move is visible
        io.to(gameId).emit("board-updated", game.board, game.currentPlayer)
        game.status = "finished"
        game.winner = winner
        io.to(gameId).emit("game-won", winner)
        console.log("[v0] Game won by:", winner)
      } else if (isBoardFull(game.board)) {
        // Send board update so final move is visible
        io.to(gameId).emit("board-updated", game.board, game.currentPlayer)
        game.status = "finished"
        game.winner = "draw"
        io.to(gameId).emit("game-draw")
        console.log("[v0] Game is a draw")
      } else {
        // Switch turn first, then send board update with next player
        game.currentPlayer = game.currentPlayer === "X" ? "O" : "X"
        io.to(gameId).emit("board-updated", game.board, game.currentPlayer)
        console.log("[v0] Move made at index:", index)
      }
    }
  })

  socket.on("reset-game", (gameId) => {
    const game = games.get(gameId)
    if (game) {
      game.board = Array(9).fill(null)
      game.currentPlayer = "X"
      game.status = "playing"
      game.winner = null
      io.to(gameId).emit("game-reset")
      console.log("[v0] Game reset:", gameId)
    }
  })

  socket.on("disconnect", () => {
    console.log("[v0] User disconnected:", socket.id)
    // Cleanup: remove games where this player was the only one
    for (const [gameId, game] of games.entries()) {
      if (Object.keys(game.players).length === 1) {
        games.delete(gameId)
      }
    }
  })
})

const PORT = process.env.PORT || 5001
httpServer.listen(PORT, () => {
  console.log(`[v0] Socket.IO server running on port ${PORT}`)
})
