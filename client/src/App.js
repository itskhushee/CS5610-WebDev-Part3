// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage.js';
import Login from './pages/LoginPage.js';
import Register from './pages/RegisterPage.js';
import GetItems from './pages/GetItems.js';
import AddItems from './pages/AddItems.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
        <Route path="/items" element={<GetItems />} />
        <Route path="/add-items" element={<AddItems />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
