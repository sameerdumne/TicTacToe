import type { NextRequest } from "next/server"

const games: {
  [key: string]: {
    board: (string | null)[]
    currentPlayer: "X" | "O"
    players: { [key: string]: "X" | "O" }
    status: "waiting" | "playing" | "finished"
    winner: "X" | "O" | "draw" | null
  }
} = {}

function checkWinner(board: (string | null)[]): "X" | "O" | null {
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
      return board[a] as "X" | "O"
    }
  }

  return null
}

function isBoardFull(board: (string | null)[]): boolean {
  return board.every((cell) => cell !== null)
}

export async function GET(req: NextRequest) {
  return new Response("WebSocket endpoint", { status: 200 })
}
