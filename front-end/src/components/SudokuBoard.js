import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SudokuBoard = () => {
   
    const [board, setBoard] = useState([]);
    const [message, setMessage] = useState('');
  
    useEffect(() => {
      const fetchSudoku = async () => {
        try {
          const response = await axios.get('http://localhost:5000/generate');
          setBoard(response.data);
        } catch (error) {
          console.error('Error fetching Sudoku board:', error);
        }
      };
      fetchSudoku();
    }, []);
  
    const handleInputChange = (e, row, col) => {
      const value = parseInt(e.target.value) || 0;
      if (value >= 0 && value <= 9) {
        const newBoard = board.map((r, rowIndex) =>
          r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? value : cell))
        );
        setBoard(newBoard);
      }
    };
  
    const handleSolveClick = () => {
      const isSolved = checkSudokuSolution(board);
      setMessage(isSolved ? 'Puzzle solved correctly!' : 'Puzzle is not solved correctly. Keep trying!');
    };
  
    return (
      <div className="sudoku-container">
        {board.map((row, rowIndex) => (
          <div className="sudoku-row" key={rowIndex}>
            {row.map((cell, colIndex) => (
              <input
                type="text"
                className={`sudoku-cell ${getBorderClass(rowIndex, colIndex)}`}
                key={colIndex}
                value={cell !== 0 ? cell : ''}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
              />
            ))}
          </div>
        ))}
        <button onClick={handleSolveClick} className="solve-button">Check Solution</button>
        {message && <div className="message">{message}</div>}
      </div>
    );
  };
  
  const getBorderClass = (rowIndex, colIndex) => {
    let classes = '';
    if (rowIndex % 3 === 0) classes += ' top-border';
    if (colIndex % 3 === 0) classes += ' left-border';
    if ((rowIndex + 1) % 3 === 0) classes += ' bottom-border';
    if ((colIndex + 1) % 3 === 0) classes += ' right-border';
    return classes.trim();
  };
  
  const checkSudokuSolution = (board) => {
    // Helper function to check if a board is solved correctly
    const isValidRow = (row) => {
      const nums = row.filter(n => n !== 0);
      return new Set(nums).size === nums.length;
    };
    const isValidCol = (board, colIndex) => {
      const nums = board.map(row => row[colIndex]).filter(n => n !== 0);
      return new Set(nums).size === nums.length;
    };
  
    const isValidGrid = (board, startRow, startCol) => {
      const nums = [];
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const num = board[startRow + row][startCol + col];
          if (num !== 0) nums.push(num);
        }
      }
      return new Set(nums).size === nums.length;
    };
  
    for (let i = 0; i < 9; i++) {
      if (!isValidRow(board[i]) || !isValidCol(board, i)) return false;
    }
  
    for (let row = 0; row < 9; row += 3) {
      for (let col = 0; col < 9; col += 3) {
        if (!isValidGrid(board, row, col)) return false;
      }
    }
  
    return true;
  };
       

export default SudokuBoard;
