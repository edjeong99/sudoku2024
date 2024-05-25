import React, { useState } from 'react';
import SudokuBoard from "./components/SudokuBoard";
import Sidebar from "./components/Sidebar";
import "./App.css";

function App() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const showSidebar = () => {
        setSidebarOpen(true);
      };

      const closeSidebar = () => {
        setSidebarOpen(false);
      };

  return (
 <div className="app-container">
      <Sidebar sidebarOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div id="main" className={sidebarOpen ? 'sidebar-open' : ''}>
        <button className="menu-icon" onClick={showSidebar}>
          &#9776;
        </button>
        <SudokuBoard />
      </div>
    </div>
  );
};

export default App;
