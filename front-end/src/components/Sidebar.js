import React from 'react';

const Sidebar = ({ onDifficultyChange }) => {
  return (
    <div className="sidebar">
      <h2>Menu</h2>
      <button onClick={() => onDifficultyChange('Easy')}>Easy</button>
      <button onClick={() => onDifficultyChange('Medium')}>Medium</button>
      <button onClick={() => onDifficultyChange('Hard')}>Hard</button>
    </div>
  );
};
export default Sidebar;
