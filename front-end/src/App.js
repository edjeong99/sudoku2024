import React, { useState } from 'react';
import SudokuBoard from "./components/SudokuBoard";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
      };

  return (
 <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} />
      <div id="main" className={sidebarOpen ? 'sidebar-open' : ''}>
        <button className="menu-icon" onClick={toggleSidebar}>
          &#9776;
        </button>
        <SudokuBoard />
      </div>
    </div>
  );
};

export default App;
