"use client"

type CellValue = "X" | "O" | null

interface GameBoardProps {
  board: CellValue[]
  onCellClick: (index: number) => void
  playerSymbol: "X" | "O" | null
}

export default function GameBoard({ board, onCellClick, playerSymbol }: GameBoardProps) {
  const getCellSymbolColor = (symbol: CellValue) => {
    if (symbol === "X") return "text-blue-400"
    if (symbol === "O") return "text-red-400"
    return ""
  }

  return (
    <div className="bg-slate-700/50 backdrop-blur p-4 sm:p-6 md:p-8 rounded-lg border border-slate-600 mb-4 sm:mb-6">
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {board.map((cell, index) => (
          <button
            key={index}
            onClick={() => onCellClick(index)}
            className="aspect-square bg-slate-600 hover:bg-slate-500 active:bg-slate-500 border-2 border-slate-500 rounded-lg text-3xl sm:text-4xl md:text-5xl font-bold transition-all duration-200 transform hover:scale-105 active:scale-95 cursor-pointer touch-manipulation"
            disabled={cell !== null}
          >
            <span className={`${getCellSymbolColor(cell)}`}>{cell}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
