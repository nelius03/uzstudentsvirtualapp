// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Import global styles
import Home from './Home'; // Import the Home component
import Login from './Login'; // Import the Login component
import Register from './Register'; // Import the Register component

const App = () => {
    return (
        <Router>
            <div>
                <nav>
                    <button onClick={() => window.location.href = '/'}>Home</button>
                    <button onClick={() => window.location.href = '/login'}>Login</button>
                    <button onClick={() => window.location.href = '/register'}>Register</button>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;