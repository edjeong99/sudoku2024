const express = require('express');
const cors = require('cors');
const { generateSudoku, solveSudoku } = require('./sudoku');

const app = express();
const PORT = 5000;

app.use(cors());

app.get('/generate', (req, res) => {
    const puzzle = generateSudoku();
    res.json(puzzle);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

