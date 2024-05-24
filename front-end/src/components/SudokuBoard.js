import React, { useEffect, useState } from 'react';
import axios from 'axios';


const SudokuBoard = () => {
    const [puzzle, setPuzzle] = useState([]);
  const [solution, setSolution] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [message, setMessage] = useState('');
  const [incorrectCells, setIncorrectCells] = useState([]); // State for tracking incorrect cells

  useEffect(() => {
    const fetchSudoku = async () => {
      try {
        const response = await axios.get('http://localhost:5000/generate');
        setPuzzle(response.data.puzzle);
        setSolution(response.data.solution);
        setUserInput(response.data.puzzle.map(row => row.map(cell => (cell !== 0 ? cell : ''))));
      } catch (error) {
        console.error('Error fetching Sudoku board:', error);
      }
    };
    fetchSudoku();
  }, []);

  const handleInputChange = (e, row, col) => {
    const value = e.target.value.replace(/[^1-9]/g, ''); // Only allow digits 1-9
    const newBoard = userInput.map((r, rowIndex) =>
      r.map((cell, colIndex) => (rowIndex === row && colIndex === col ? (value !== '' ? Number(value) : '') : cell))
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
  console.log(userInput)
  console.log(solution)
  console.log(puzzle)
    // Calculate the counts
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        const userInputValue = userInput[i][j];
        const solutionValue = solution[i][j];
        const originalValue = puzzle[i][j];
  
        if (originalValue === 0) {
          if ( userInputValue == 0 || userInputValue > 9 ) {
            emptyCount++;
          } else if ( userInputValue !== solutionValue) {
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
      {puzzle.map((row, rowIndex) => (
        <div className="sudoku-row" key={rowIndex}>
          {row.map((cell, colIndex) => (
           <div
           className={`sudoku-cell ${getBorderClass(rowIndex, colIndex)} ${cell !== 0 ? 'initial-number' : ''} ${incorrectCells.some(([i, j]) => i === rowIndex && j === colIndex) ? 'incorrect-cell' : ''}`}
           key={colIndex}
         >
         
              <input
                type="text"
                value={userInput[rowIndex][colIndex] !== 0 ? userInput[rowIndex][colIndex] : ''}
                className={userInput[rowIndex][colIndex] && userInput[rowIndex][colIndex].length > 1 ? 'multi-numbers' : ''}
                onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                disabled={cell !== 0}
              />
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleCheckClick} className="check-button">Check Solution</button>
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

export default SudokuBoard;
