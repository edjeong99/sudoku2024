
const createEmptyBoard = () => Array.from({ length: 9 }, () => Array(9).fill(0));

const isSafe = (board, row, col, num) => {
    for (let x = 0; x < 9; x++) {
      if (board[row][x] === num || board[x][col] === num || board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
        return false;
      }
    }
    return true;
  };

  const solveSudoku = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
              board[row][col] = num;
              if (solveSudoku(board)) {
                return true;
              } else {
                board[row][col] = 0;
              }
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const removeNumbers = (board, count) => {
    while (count > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        count--;
      }
    }
  };


  const generateSudoku = () => {
    const puzzle = createEmptyBoard();
    solveSudoku(puzzle);
    const solution = puzzle.map(row => row.slice());
    removeNumbers(puzzle, 2);
    console.log(puzzle)
    return {  puzzle, solution };
  };

module.exports = { generateSudoku };
