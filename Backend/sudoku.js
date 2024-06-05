
const DifficultyNumber = Object.freeze({ 
    EASY: 2, 
    MEDIUM: 10, 
    HARD: 20
}); 

const generateEmptyBoard = () => Array(9).fill(0).map(() => Array(9).fill(0));

const isValid = (board, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num || 
        board[3 * Math.floor(row / 3) + Math.floor(x / 3)][3 * Math.floor(col / 3) + x % 3] === num) {
      return false;
    }
  }
  return true;
};

const solveBoard = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (solveBoard(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};


const fillBoard = (board) => {
  const numbers = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num of numbers) {
          if (isValid(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
              return true;
            }
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
};

const removeNumbers = (board, emptyCells) => {
  while (emptyCells > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (board[row][col] !== 0) {
      board[row][col] = 0;
      emptyCells--;
    }
  }
  return board;
};



  const generateSudoku = (difficulty = 'easy') => {
    let emptyCells;
    switch (difficulty) {
      case 'easy':
        emptyCells = 40;
        break;
      case 'medium':
        emptyCells = 50;
        break;
      case 'hard':
        emptyCells = 60;
        break;
      default:
        emptyCells = 40;
    }

    const solution = generateEmptyBoard();
    fillBoard(solution); // Use fillBoard instead of solveBoard for randomization
    const puzzle = JSON.parse(JSON.stringify(solution)); // Deep copy
    removeNumbers(puzzle, emptyCells);
  
    return { puzzle, solution };
  };

module.exports = { generateSudoku };
