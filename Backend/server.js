const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { generateSudoku, solveSudoku } = require('./sudoku');
const { findNextHint } = require('./findHint');
const connectDB = require('./util/db');
const authRoutes = require('./routes/auth');
const { createUserProfile, getUserProfile, updateUserProfile } = require('./controllers/userController');

const app = express();
const PORT = process.env.PORT || 5000;;

app.use(cors());
app.use(bodyParser.json());

connectDB();
app.use('/auth', authRoutes);

app.get('/generate', (req, res) => {

  const difficulty = req.query.difficulty || 'easy';// Get difficulty from query parameters
        const { puzzle, solution } = generateSudoku(difficulty);
        res.json({ puzzle, solution });
      });

      app.post('/hint', (req, res) => {
        const { puzzle } = req.body;
        if (!puzzle) {
          return res.status(400).json({ error: 'Puzzle is required' });
        }
        try {
          const hint = findNextHint(puzzle);
          res.json(hint);
        } catch (error) {
          console.error('Error generating hint:', error);
          res.status(500).json({ error: 'Error generating hint' });
        }
      });
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

