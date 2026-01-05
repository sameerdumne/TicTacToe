"use client"
import { Button } from "@/components/ui/button"

interface GameControlsProps {
  onResetGame: () => void
  gameStatus: "waiting" | "playing" | "finished"
}

export default function GameControls({ onResetGame, gameStatus }: GameControlsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onResetGame}
        className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-semibold py-2.5 sm:py-3 text-sm sm:text-base rounded-lg transition-colors touch-manipulation"
      >
        {gameStatus === "finished" ? "Play Again" : "Reset"}
      </Button>
    </div>
  )
}
