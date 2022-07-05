import React, { useState } from 'react';
import './App.css';
import Columns from './components/layout/columns/Columns';
import Header from './components/layout/header/Header';
import SideMenu from './components/layout/sideMenu/SideMenu';

function App() {

  const [sidebarVisible, setSidebarVisible] = useState(true);

  async function getAllTasks() {
    const res = await fetch('http://localhost:3000/tasks');
    const data = await res.json();
    return data;
  }


  return (
    <div className='layout'>
      <SideMenu setSidebarVisible={setSidebarVisible} />
      <div className={`content ${!sidebarVisible && 'full'}`}>
        <Header getAllTasks={getAllTasks} />
        <Columns />
      </div>
    </div>
  );
}

export default App;
