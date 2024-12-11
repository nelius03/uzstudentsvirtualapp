// RegisterPage.js
import React, { useState } from 'react';
import './Register.css'; // Import the CSS file

const RegisterPage = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [regNumber, setRegNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        
        fetch('api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, regnumber: regNumber, password })
        })
        .then(response => {
            if (response.ok) {
                alert('Registration successful!');
                window.location.href = '/login'; // Redirect to login
            } else {
                setError('User already exists');
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    };

    return (
        <div className="container">
            <h2>Register</h2>
            <form id="register-form" onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    id="registerUsername" 
                    required 
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input 
                    type="email" 
                    id="registerEmail" 
                    required 
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input 
                    type="text" 
                    id="registerRegnum" 
                    required 
                    placeholder="Enter your Reg"
                    value={regNumber}
                    onChange={(e) => setRegNumber(e.target.value)}
                />
                <input 
                    type="password" 
                    id="registerPassword" 
                    required 
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                
                <button type="submit">Register</button>
            </form>
            {error && <p className="error">{error}</p>}
            <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
    );
};

export default Register;