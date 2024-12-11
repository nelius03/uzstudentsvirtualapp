// LoginPage.js
import React, { useState } from 'react';
import './Login.css'; // Import the CSS file

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('loggedIn', 'true'); // Set login flag
                window.location.href = '/virtualassist'; // Redirect to virtual assistant
            } else {
                setError('Invalid credentials');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <form id="login-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    id="username" 
                    name="username" 
                    required 
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    id="password" 
                    name="password" 
                    required 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button type="submit">Login</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Don't have an account? <a href="/reg">Register here</a></p>
        </div>
    );
};

export default Login;