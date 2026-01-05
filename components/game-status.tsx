"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Copy, Check } from "lucide-react"

interface GameStatusProps {
  gameStatus: "waiting" | "playing" | "finished"
  gameId: string
  playerSymbol: "X" | "O" | null
  currentPlayer: "X" | "O"
  winner: "X" | "O" | "draw" | null
  opponentConnected: boolean
  onJoinGame: (id: string) => void
  onCreateGame: () => void
}

export default function GameStatus({
  gameStatus,
  gameId,
  playerSymbol,
  currentPlayer,
  winner,
  opponentConnected,
  onJoinGame,
  onCreateGame,
}: GameStatusProps) {
  const [joinGameId, setJoinGameId] = useState("")
  const [copied, setCopied] = useState(false)

  const copyGameId = () => {
    navigator.clipboard.writeText(gameId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (gameStatus === "waiting") {
    return (
      <Card className="bg-slate-700/50 backdrop-blur border-slate-600 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="space-y-4">
          <Button
            onClick={onCreateGame}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 sm:py-3 text-base sm:text-lg rounded-lg transition-colors touch-manipulation"
          >
            Create Game
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-500" />
            </div>
            <div className="relative flex justify-center text-xs sm:text-sm">
              <span className="px-2 bg-slate-700 text-slate-400">or join a game</span>
            </div>
          </div>

          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter game ID"
              value={joinGameId}
              onChange={(e) => setJoinGameId(e.target.value)}
              className="bg-slate-600 border-slate-500 text-white placeholder-slate-400 text-sm sm:text-base touch-manipulation"
            />
            <Button
              onClick={() => {
                if (joinGameId.trim()) {
                  onJoinGame(joinGameId)
                  setJoinGameId("")
                }
              }}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 sm:px-6 rounded-lg transition-colors touch-manipulation"
            >
              Join
            </Button>
          </div>

          {gameId && (
            <div className="bg-slate-600/50 p-3 sm:p-4 rounded-lg border border-slate-500">
              <p className="text-xs sm:text-sm text-slate-300 mb-2">Your Game ID:</p>
              <div className="flex items-center gap-2">
                <p className="text-base sm:text-lg font-mono font-bold text-blue-300 break-all flex-1">{gameId}</p>
                <Button
                  onClick={copyGameId}
                  className="bg-slate-500 hover:bg-slate-400 text-white px-2 sm:px-3 py-2 touch-manipulation"
                  size="sm"
                >
                  {copied ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : <Copy className="h-3 w-3 sm:h-4 sm:w-4" />}
                </Button>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {copied ? "✓ Copied to clipboard!" : "Share this ID with your opponent"}
              </p>
            </div>
          )}
        </div>
      </Card>
    )
  }

  if (gameStatus === "finished") {
    return (
      <Card className="bg-slate-700/50 backdrop-blur border-slate-600 p-4 sm:p-6 mb-4 sm:mb-6">
        <div className="text-center space-y-3 sm:space-y-4">
          <div className="text-2xl sm:text-3xl font-bold">
            {winner === "draw" ? (
              <span className="text-yellow-400">It's a Draw!</span>
            ) : (
              <span className="text-green-400">Player {winner} Wins!</span>
            )}
          </div>
          <p className="text-sm sm:text-base text-slate-300">
            {winner === playerSymbol ? "You won! 🎉" : winner === "draw" ? "Good game!" : "Better luck next time!"}
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card className="bg-slate-700/50 backdrop-blur border-slate-600 p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="space-y-3">
        {/* Game ID Display */}
        {gameId && (
          <div className="bg-slate-600/30 p-2 sm:p-3 rounded border border-slate-500">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-slate-400">Game ID:</p>
                <p className="text-xs sm:text-sm font-mono font-bold text-blue-300 truncate">{gameId}</p>
              </div>
              <Button
                onClick={copyGameId}
                className="bg-slate-500 hover:bg-slate-400 text-white px-2 py-1 ml-2 touch-manipulation"
                size="sm"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
              </Button>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <div>
            <p className="text-xs sm:text-sm text-slate-400">Your Symbol:</p>
            <p className={`text-xl sm:text-2xl font-bold ${playerSymbol === "X" ? "text-blue-400" : "text-red-400"}`}>
              {playerSymbol}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs sm:text-sm text-slate-400">Current Turn:</p>
            <p className={`text-xl sm:text-2xl font-bold ${currentPlayer === "X" ? "text-blue-400" : "text-red-400"}`}>
              {currentPlayer}
            </p>
          </div>
        </div>

        <div
          className={`text-xs sm:text-sm font-semibold text-center py-2 rounded ${
            opponentConnected 
              ? currentPlayer === playerSymbol 
                ? "bg-blue-500/20 text-blue-300" 
                : "bg-slate-500/20 text-slate-300"
              : "bg-orange-500/20 text-orange-300"
          }`}
        >
          {opponentConnected 
            ? currentPlayer === playerSymbol 
              ? "🎯 Your Turn!" 
              : "⏳ Opponent's Turn..."
            : "⏱ Waiting for opponent..."}
        </div>
      </div>
    </Card>
  )
}
