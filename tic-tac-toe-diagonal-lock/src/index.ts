import * as readline from "readline";

type Board = string[][];
const EMPTY = "_";

interface Player {
  name: string;
  symbol: string;
}

// helper to create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function askQuestion(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, (answer) => resolve(answer.trim()));
  });
}

// create initial 3x3 board
function createEmptyBoard(): Board {
  return [
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
    [EMPTY, EMPTY, EMPTY],
  ];
}

function printBoard(board: Board): void {
  console.log("\n   1   2   3");
  const rows = ["A", "B", "C"];
  for (let i = 0; i < 3; i++) {
    console.log(`${rows[i]}  ${board[i][0]}   ${board[i][1]}   ${board[i][2]}`);
  }
  console.log();
}

function isBoardFull(board: Board): boolean {
  return board.every((row) => row.every((cell) => cell !== EMPTY));
}

function checkWinner(board: Board, symbol: string): boolean {
  // rows
  for (let i = 0; i < 3; i++) {
    if (
      board[i][0] === symbol &&
      board[i][1] === symbol &&
      board[i][2] === symbol
    ) {
      return true;
    }
  }

  // columns
  for (let j = 0; j < 3; j++) {
    if (
      board[0][j] === symbol &&
      board[1][j] === symbol &&
      board[2][j] === symbol
    ) {
      return true;
    }
  }

  // diagonals
  if (
    board[0][0] === symbol &&
    board[1][1] === symbol &&
    board[2][2] === symbol
  ) {
    return true;
  }

  if (
    board[0][2] === symbol &&
    board[1][1] === symbol &&
    board[2][0] === symbol
  ) {
    return true;
  }

  return false;
}

// map input like "A1" -> [rowIndex, colIndex]
function parseMove(input: string): { row: number; col: number } | null {
  if (input.length !== 2) {
    return null;
  }

  const rowChar = input[0].toUpperCase();
  const colChar = input[1];

  const rowMap: Record<string, number> = {
    A: 0,
    B: 1,
    C: 2,
  };

  if (!(rowChar in rowMap)) {
    return null;
  }

  const row = rowMap[rowChar];
  const col = parseInt(colChar, 10) - 1;

  if (isNaN(col) || col < 0 || col > 2) {
    return null;
  }

  return { row, col };
}

async function registerPlayers(): Promise<{ player1: Player; player2: Player }> {
  console.log("=== Player Registration ===");

  const name1 = await askQuestion("Player 1, enter your name: ");
  let symbol1: string;

  while (true) {
    symbol1 = (await askQuestion("Player 1, choose your symbol (e.g., X): ")).trim();
    if (symbol1 === EMPTY) {
      console.log(`Symbol '${EMPTY}' is reserved for empty cells. Choose another.`);
      continue;
    }
    if (symbol1.length !== 1) {
      console.log("Please choose a single character as symbol.");
      continue;
    }
    break;
  }

  const name2 = await askQuestion("Player 2, enter your name: ");
  let symbol2: string;

  while (true) {
    symbol2 = (await askQuestion("Player 2, choose your symbol (e.g., O): ")).trim();
    if (symbol2 === EMPTY) {
      console.log(`Symbol '${EMPTY}' is reserved for empty cells. Choose another.`);
      continue;
    }
    if (symbol2.length !== 1) {
      console.log("Please choose a single character as symbol.");
      continue;
    }
    if (symbol2 === symbol1) {
      console.log(
        `Symbol '${symbol2}' is already taken by Player 1. Choose another.`
      );
      continue;
    }
    break;
  }

  console.log(
    `\nWelcome ${name1} (${symbol1}) and ${name2} (${symbol2})! Let's start.\n`
  );

  return {
    player1: { name: name1 || "Player 1", symbol: symbol1 },
    player2: { name: name2 || "Player 2", symbol: symbol2 },
  };
}

async function main() {
  console.log("=== Tic-Tac-Toe: Diagonal-Lock Variant ===");
  console.log("Board coordinates are A1, A2, A3, B1, ..., C3.\n");

  const { player1, player2 } = await registerPlayers();

  let board = createEmptyBoard();
  let currentPlayer = player1;
  let gameOver = false;

  // Diagonal lock: if a player has A1 & C3 or A3 & C1, B2 is locked for opponent
  let lockedCenterFor: string | null = null; // symbol of player who owns lock

  while (!gameOver) {
    printBoard(board);

    if (lockedCenterFor) {
      console.log(
        `Diagonal lock active: center cell B2 is reserved for symbol '${lockedCenterFor}'.`
      );
    }

    const moveInput = await askQuestion(
      `${currentPlayer.name} (${currentPlayer.symbol}), enter your move (e.g., A1): `
    );

    const parsed = parseMove(moveInput);
    if (!parsed) {
      console.log("Invalid input. Please enter coordinates like A1, B2, C3.");
      continue;
    }

    const { row, col } = parsed;

    // Special rule: diagonal lock on center cell (B2 -> row 1, col 1)
    if (
      row === 1 &&
      col === 1 &&
      lockedCenterFor !== null &&
      lockedCenterFor !== currentPlayer.symbol &&
      board[row][col] === EMPTY
    ) {
      console.log(
        "Error: Center cell B2 is locked for you due to the diagonal lock rule."
      );
      continue;
    }

    // Check if cell is already filled
    if (board[row][col] !== EMPTY) {
      console.log("Error: That cell is already occupied. Try again.");
      continue;
    }

    // Place the symbol
    board[row][col] = currentPlayer.symbol;

    // After every successful move, maybe activate or clear the lock
    // Lock applies only if center is EMPTY
    if (board[1][1] === EMPTY) {
      const s = currentPlayer.symbol;
      const hasDiag1 = board[0][0] === s && board[2][2] === s; // A1 and C3
      const hasDiag2 = board[0][2] === s && board[2][0] === s; // A3 and C1
      if (hasDiag1 || hasDiag2) {
        if (!lockedCenterFor || lockedCenterFor !== s) {
          lockedCenterFor = s;
          console.log(
            `Diagonal lock activated! Center cell B2 is now reserved for '${s}'.`
          );
        }
      }
    } else {
      // Center already taken => lock has no effect
      lockedCenterFor = null;
    }

    // Check for winner
    if (checkWinner(board, currentPlayer.symbol)) {
      printBoard(board);
      console.log(`🎉 ${currentPlayer.name} (${currentPlayer.symbol}) wins!`);
      gameOver = true;
      break;
    }

    // Check for draw
    if (isBoardFull(board)) {
      printBoard(board);
      console.log("It's a draw! No more moves possible.");
      gameOver = true;
      break;
    }

    // Switch player
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  }

  console.log("\nGame over. Thanks for playing!");
  rl.close();
}

// Start the game
main().catch((err) => {
  console.error("Unexpected error:", err);
  rl.close();
});
