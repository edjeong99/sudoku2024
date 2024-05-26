import React from 'react';

const Sidebar = ({ onDifficultyChange }) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <button onClick={() => onDifficultyChange('EASY')}>Easy</button>
      <button onClick={() => onDifficultyChange('MEDIUM')}>Medium</button>
      <button onClick={() => onDifficultyChange('HARD')}>Hard</button>
    </div>
  );
};
export default Sidebar;
