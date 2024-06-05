const findNextHint = (puzzle) => {

    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (puzzle[row][col] === 0) {
          // Get possible values for the empty cell
          const possibleValues = getPossibleValues(puzzle, row, col);
          if (possibleValues.length === 1) {
            // Only one possible value for this cell
            return {
              row,
              col,
              num: possibleValues[0],
              reason: `This cell can be filled with ${possibleValues[0]} based on the current state of the puzzle.`,
            };
          }
        }
      }
    }
    // No valid hint found
    return null;
  };
  
  // Function to get possible values for an empty cell
  const getPossibleValues = (puzzle, row, col) => {
    const possibleValues = [];
    for (let num = 1; num <= 9; num++) {
      if (isValidMove(puzzle, row, col, num)) {
        possibleValues.push(num);
      }
    }
    return possibleValues;
  };
  const isValidMove = (puzzle, row, col, num) => {
    // Check if the number already exists in the row
    for (let i = 0; i < 9; i++) {
      if (puzzle[row][i] === num) {
        return false;
      }
    }
  
    // Check if the number already exists in the column
    for (let i = 0; i < 9; i++) {
      if (puzzle[i][col] === num) {
        return false;
      }
    }
  
    // Check if the number already exists in the 3x3 subgrid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (puzzle[i][j] === num) {
          return false;
        }
      }
    }
  
    // If the move is valid, return true
    return true;
  };
  
  module.exports = { findNextHint}