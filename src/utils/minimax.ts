type Board = (string | null)[];

export function minimax(
  board: Board,
  depth: number,
  isMaximizing: boolean,
  player: string,
  opponent: string
): number {
  const result = checkWinner(board);

  if (result === player) return 10 - depth;
  if (result === opponent) return depth - 10;
  if (isBoardFull(board)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = player;
        const score = minimax(board, depth + 1, false, player, opponent);
        board[i] = null;
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < board.length; i++) {
      if (!board[i]) {
        board[i] = opponent;
        const score = minimax(board, depth + 1, true, player, opponent);
        board[i] = null;
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

export function findBestMove(board: Board, player: string, opponent: string): number {
  let bestScore = -Infinity;
  let bestMove = -1;

  for (let i = 0; i < board.length; i++) {
    if (!board[i]) {
      board[i] = opponent;
      const score = minimax(board, 0, false, player, opponent);
      board[i] = null;

      if (score > bestScore) {
        bestScore = score;
        bestMove = i;
      }
    }
  }

  return bestMove;
}

function checkWinner(board: Board): string | null {
  const lines: number[][] = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (const [a, b, c] of lines) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return null;
}

function isBoardFull(board: Board): boolean {
  return board.every(cell => cell !== null);
}
