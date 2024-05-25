import React, { useEffect, useState } from 'react';
import axios from 'axios';



const SudokuBoard = () => {
    const [userInput, setUserInput] = useState(Array(9).fill('').map(() => Array(9).fill('')));
    const [solution, setSolution] = useState(Array(9).fill('').map(() => Array(9).fill(0))); // Assuming you have the solution array
    const [message, setMessage] = useState('');
    const [incorrectCells, setIncorrectCells] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:5000/generate')
        .then(response => response.json())
        .then(data => {
          setUserInput(data.puzzle);
          setSolution(data.solution);
        });
    }, []);
  
    const handleInputChange = (e, row, col) => {
      const value = e.target.value.replace(/[^1-9]/g, ''); // Only allow digits 1-9
      const newBoard = userInput.map((r, rowIndex) =>
        r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (value !== '' ? value : '') : cell))
      );
      setUserInput(newBoard);
  
      // Apply multi-numbers class if input contains multiple digits
      const inputElement = e.target;
      if (value.length > 1) {
        inputElement.classList.add('multi-numbers');
      } else {
        inputElement.classList.remove('multi-numbers');
      }
    };
  
    const handleCheckClick = () => {
      let wrongCount = 0;
      let correctCount = 0;
      let emptyCount = 0;
      const incorrectCells = [];
  
      // Calculate the counts
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          const userInputValue = userInput[i][j];
          const solutionValue = solution[i][j];
          const originalValue = solution[i][j]; // Assuming solution is the initial puzzle
  
          if (originalValue === 0) {
            if (userInputValue === '') {
              emptyCount++;
            } else if (userInputValue.length > 1 || userInputValue !== solutionValue.toString()) {
              wrongCount++;
              incorrectCells.push([i, j]);
            } else {
              correctCount++;
            }
          }
        }
      }
  
      // Construct the message
      let message = '';
      if (wrongCount > 0 || emptyCount > 0) {
        message = `There are `;
        if (wrongCount > 0) {
          message += `${wrongCount} incorrect entries, `;
        }
        if (emptyCount > 0) {
          message += `${emptyCount} empty box(es), `;
        }
        message += `to solve. Keep trying!`;
      } else {
        message = 'Puzzle solved correctly!';
      }
      // Add count of correct cells to the message
      message += ` You got ${correctCount} cells correct.`;
  
      // Update state
      setIncorrectCells(incorrectCells);
      setMessage(message);
    };
  
    return (
      <div className="sudoku-container">
        <div className="sudoku-board">
          {userInput.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((cell, colIndex) => {
                const isIncorrect = incorrectCells.some(([i, j]) => i === rowIndex && j === colIndex);
                return (
                  <div
                    key={colIndex}
                    className={`sudoku-cell ${isIncorrect ? 'incorrect' : ''} ${rowIndex % 3 === 0 ? 'top-border' : ''} ${colIndex % 3 === 0 ? 'left-border' : ''} ${rowIndex % 3 === 2 ? 'bottom-border' : ''} ${colIndex % 3 === 2 ? 'right-border' : ''}`}
                  >
                    <input
                      type="text"
                      value={cell}
                      onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                      readOnly={solution[rowIndex][colIndex] !== 0}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <button onClick={handleCheckClick}>Check Solution</button>
        <div>{message}</div>
      </div>
    );
  };
  
  export default SudokuBoard;