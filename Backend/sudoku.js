function isSafe(board, row, col, num) {
    for (let x = 0; x < 9; x++) {
        if (board[row][x] === num || board[x][col] === num) {
            return false;
        }
    }
    const startRow = row - row % 3;
    const startCol = col - col % 3;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i + startRow][j + startCol] === num) {
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(board) {
    const emptySpot = findEmpty(board);
    if (!emptySpot) {
        return true; // Puzzle is solved
    }

    const [row, col] = emptySpot;
    for (let num = 1; num <= 9; num++) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) {
                return true;
            }
            board[row][col] = 0; // Backtrack
        }
    }
    return false;
}

function findEmpty(board) {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === 0) {
                return [row, col];
            }
        }
    }
    return null;
}

function createFullBoard() {
    const board = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillBoard(board);
    return board;
}

function fillBoard(board) {
    const emptySpot = findEmpty(board);
    if (!emptySpot) {
        return true; // Puzzle is completely filled
    }

    const [row, col] = emptySpot;
    const nums = shuffleArray([...Array(9).keys()].map(i => i + 1));

    for (let num of nums) {
        if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
                return true;
            }
            board[row][col] = 0; // Backtrack
        }
    }
    return false;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function removeNumbers(board, attempts) {
    const cells = [];
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            cells.push([row, col]);
        }
    }
    shuffleArray(cells);

    while (attempts > 0 && cells.length > 0) {
        const [row, col] = cells.pop();
        const backup = board[row][col];
        board[row][col] = 0;

        const boardCopy = board.map(row => [...row]);
        if (!hasUniqueSolution(boardCopy)) {
            board[row][col] = backup;
            attempts--;
        }
    }
}

function hasUniqueSolution(board) {
    let solutionCount = 0;

    function solve(board) {
        const emptySpot = findEmpty(board);
        if (!emptySpot) {
            solutionCount++;
            return;
        }

        const [row, col] = emptySpot;
        for (let num = 1; num <= 9; num++) {
            if (isSafe(board, row, col, num)) {
                board[row][col] = num;
                solve(board);
                board[row][col] = 0; // Backtrack
                if (solutionCount > 1) {
                    return; // More than one solution found, stop further solving
                }
            }
        }
    }

    solve(board);
    return solutionCount === 1;
}

function generateSudoku(difficulty = 20) {
    const fullBoard = createFullBoard();
    const puzzleBoard = fullBoard.map(row => [...row]);
    removeNumbers(puzzleBoard, difficulty);
    return puzzleBoard;
}

module.exports = { generateSudoku, solveSudoku };
