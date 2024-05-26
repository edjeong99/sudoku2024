import React, { useState } from 'react';
import SudokuBoard from "./components/SudokuBoard";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [difficulty, setDifficulty] = useState("easy");
    const [key, setKey] = useState(0);

    const changeDifficulty = (newDifficulty) => {
        console.log(newDifficulty)
        setDifficulty(newDifficulty);
        setKey(prevKey => prevKey + 1);
      };

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

  return (
 <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} onDifficultyChange={changeDifficulty}/>
      <div id="main" className={sidebarOpen ? 'sidebar-open' : ''}>
        <button className="menu-icon" onClick={toggleSidebar}>
          &#9776;
        </button>
        <SudokuBoard difficulty={difficulty} key={key}/>
      </div>
    </div>
  );
};

export default App;
