import React from 'react';

const Sidebar = ({ sidebarOpen }) => {
  return (
    <div id="mySidebar" className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
    <a href="#">Choose Difficulty</a>
    <a href="#">User Board</a>
    <a href="#">Download App</a>
  </div>
  );
};
export default Sidebar;
