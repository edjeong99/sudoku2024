import React from 'react';

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  return (
    <div id="mySidebar" className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
      <a href="#" onClick={closeSidebar}>Choose Difficulty</a>
      <a href="#" onClick={closeSidebar}>User Board</a>
      <a href="#" onClick={closeSidebar}>Download App</a>
    </div>
  );
};
export default Sidebar;
