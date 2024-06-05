import React, { useEffect, useState } from 'react';
import axios from 'axios';



const SudokuBoard = ({difficulty}) => {
    const [puzzle, setPuzzle] = useState([]);
    const [solution, setSolution] = useState([]);
    const [userInput, setUserInput] = useState([]);
    const [message, setMessage] = useState('');
    const [incorrectCells, setIncorrectCells] = useState([]);
    const [hint, setHint] = useState(null);
    const [highlightedCell, setHighlightedCell] = useState(null);

  
    useEffect(() => {
      fetchPuzzle(difficulty); // Default difficulty
    }, [difficulty]);

    const fetchPuzzle = () => {
        axios.get(`http://localhost:5000/generate?difficulty=${difficulty}`)
      .then(response => {
        console.log(response.data)
        const { puzzle, solution } = response.data;
        setPuzzle(puzzle);
        setSolution(solution);
        setUserInput(puzzle.map(row => row.map(cell => (cell !== 0 ? cell : ''))));
        setMessage('');
        setIncorrectCells([]);
        setHint(null);
        setHighlightedCell(null); // Reset highlighted cell
      })
      .catch(error => {
        console.error('There was an error fetching the puzzle!', error);
      });
  };
  

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
          const originalValue = puzzle[i][j]; // Assuming solution is the initial puzzle
  
          if (originalValue === 0) {
            if (userInputValue === '' || userInputValue.length > 1) {
              emptyCount++;
            } else if (userInputValue !== solutionValue.toString()) {
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
  
    const requestHint = async () => {
      try {
        const puzzleForHint = userInput.map(row => row.map(cell => (cell === '' ? 0 : parseInt(cell, 10))));

        console.log(puzzleForHint)
        const response = await axios.post('http://localhost:5000/hint', { puzzle: puzzleForHint });
        const hint = response.data;
        console.log(hint)
        setHint(hint);
        setHighlightedCell({ row: hint.row, col: hint.col });
        setTimeout(() => {
          setHighlightedCell(null);
        }, 5000);
      } catch (error) {
        console.error('Error fetching hint!', error);
        setMessage('Error fetching hint!');
      }
    };


    return (
      <div className="sudoku-container">
        <div>Difficulty Level : {difficulty}</div>
        <div className="sudoku-board">
          {puzzle.map((row, rowIndex) => (
            <div key={rowIndex} className="sudoku-row">
              {row.map((cell, colIndex) => {
                const isIncorrect = incorrectCells.some(([i, j]) => i === rowIndex && j === colIndex);
                return (
                  <div
                    key={colIndex}
                    className={`sudoku-cell ${isIncorrect ? 'incorrect' : ''} ${rowIndex % 3 === 0 ? 'top-border' : ''} ${colIndex % 3 === 0 ? 'left-border' : ''} ${rowIndex % 3 === 2 ? 'bottom-border' : ''} ${colIndex % 3 === 2 ? 'right-border' : ''}`}
                  >
                    <input
                     key={`${rowIndex}-${colIndex}`}
                      type="text"
                      value={userInput[rowIndex][colIndex]}
                      className= {`sudoku-cell 
                                   ${cell !== 0 ? 'initial' : ''} 
                                   ${highlightedCell && highlightedCell.row === rowIndex && highlightedCell.col === colIndex ? 
                                  'highlighted' : ''} 
                                   ${userInput[rowIndex][colIndex] && userInput[rowIndex][colIndex].length > 1 ? 'multi-numbers' : ''}`}
                      onChange={(e) => handleInputChange(e, rowIndex, colIndex)}
                      disabled={cell !== 0}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <button onClick={handleCheckClick}>Check Solution</button>
        <button onClick={() => fetchPuzzle(difficulty)}>New Game</button>
        <button onClick={requestHint}>Hint</button>
        {hint && (
        <div className="hint-message">
          Hint: Cell at ({hint.row + 1}, {hint.col + 1}) can be {hint.num}.
        </div>
      )}
        {message && <div className="hint-message">{message}</div>}
      </div>
    );
  };
  
  export default SudokuBoard;