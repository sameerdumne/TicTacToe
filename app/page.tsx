"use client"

import { useState, useEffect } from "react"
import { io, type Socket } from "socket.io-client"
import Snowfall from "react-snowfall"
import GameBoard from "@/components/game-board"
import GameStatus from "@/components/game-status"
import GameControls from "@/components/game-controls"

type CellValue = "X" | "O" | null

export default function Home() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [gameId, setGameId] = useState<string>("")
  const [board, setBoard] = useState<CellValue[]>(Array(9).fill(null))
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X")
  const [gameStatus, setGameStatus] = useState<"waiting" | "playing" | "finished">("waiting")
  const [winner, setWinner] = useState<"X" | "O" | "draw" | null>(null)
  const [playerSymbol, setPlayerSymbol] = useState<"X" | "O" | null>(null)
  const [opponentConnected, setOpponentConnected] = useState(false)

  useEffect(() => {
    // Fetch socket server URL from environment or use default
    const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:5001"
    console.log("[v0] Attempting to connect to:", socketUrl)
    const newSocket = io(socketUrl, {
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
      transports: ['websocket', 'polling'],
      withCredentials: true,
    })

    newSocket.on("connect", () => {
      console.log("[v0] Socket connected:", newSocket.id)
    })

    newSocket.on("connect_error", (error) => {
      console.error("[v0] Socket connection error:", error)
    })

    newSocket.on("disconnect", (reason) => {
      console.log("[v0] Socket disconnected:", reason)
    })

    newSocket.on("game-created", (id: string) => {
      console.log("[v0] Game created with ID:", id)
      setGameId(id)
      setPlayerSymbol("X")
      setGameStatus("waiting")
    })

    newSocket.on("game-joined", (id: string) => {
      console.log("[v0] Joined game:", id)
      setGameId(id)
      setPlayerSymbol("O")
      setGameStatus("playing")
      setOpponentConnected(true)
    })

    newSocket.on("opponent-joined", () => {
      console.log("[v0] Opponent joined the game")
      setOpponentConnected(true)
      setGameStatus("playing")
    })

    newSocket.on("board-updated", (newBoard: CellValue[], nextPlayer: "X" | "O") => {
      console.log("[v0] Board updated:", newBoard)
      setBoard(newBoard)
      setCurrentPlayer(nextPlayer)
    })

    newSocket.on("game-won", (winnerSymbol: "X" | "O") => {
      console.log("[v0] Game won by:", winnerSymbol)
      setWinner(winnerSymbol)
      setGameStatus("finished")
    })

    newSocket.on("game-draw", () => {
      console.log("[v0] Game is a draw")
      setWinner("draw")
      setGameStatus("finished")
    })

    newSocket.on("game-reset", () => {
      console.log("[v0] Game reset")
      setBoard(Array(9).fill(null))
      setCurrentPlayer("X")
      setGameStatus("playing")
      setWinner(null)
    })

    setSocket(newSocket)

    return () => {
      newSocket.disconnect()
    }
  }, [])

  const createGame = () => {
    console.log("[v0] Create game clicked, socket:", socket?.connected)
    if (socket) {
      console.log("[v0] Emitting create-game event")
      socket.emit("create-game")
    } else {
      console.error("[v0] Socket is null, cannot create game")
    }
  }

  const joinGame = (id: string) => {
    if (socket) {
      socket.emit("join-game", id)
    }
  }

  const makeMove = (index: number) => {
    if (socket && playerSymbol === currentPlayer && gameStatus === "playing") {
      socket.emit("make-move", gameId, index, playerSymbol)
    }
  }

  const resetGame = () => {
    if (socket) {
      socket.emit("reset-game", gameId)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col items-center justify-center p-2 sm:p-4 relative overflow-hidden">
      {/* Snowfall Effect */}
      <Snowfall
        color="#dee2e6"
        snowflakeCount={100}
        speed={[0.5, 1.5]}
        wind={[-0.5, 1.0]}
        radius={[0.5, 2.0]}
      />
      
      <div className="w-full max-w-md flex-1 flex flex-col justify-center px-2 sm:px-0 relative z-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-white mb-4 sm:mb-8 text-balance">Tic Tac Toe</h1>

        <GameStatus
          gameStatus={gameStatus}
          gameId={gameId}
          playerSymbol={playerSymbol}
          currentPlayer={currentPlayer}
          winner={winner}
          opponentConnected={opponentConnected}
          onJoinGame={joinGame}
          onCreateGame={createGame}
        />

        {gameStatus !== "waiting" && (
          <>
            <GameBoard board={board} onCellClick={makeMove} playerSymbol={playerSymbol} />

            <GameControls onResetGame={resetGame} gameStatus={gameStatus} />
          </>
        )}
      </div>
      
      <footer className="w-full text-center py-3 sm:py-4 text-slate-400 text-xs sm:text-sm relative z-10">
        made with ❤️ , by Sameer
      </footer>
    </div>
  )
}
