
import React, { useState, useEffect } from 'react';
import './VirtualApp.css'; 

const VirtualApp = () => {
    const [userInput, setUserInput] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [sidebarVisible, setSidebarVisible] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        setInitialUsername();
    }, []);

    const setInitialUsername = () => {
        const name = prompt("Please enter your name:");
        if (name) {
            setUsername(name);
            addMessage(`Welcome, ${name}! How can I assist you today?`, 'bot');
        }
    };

    const addMessage = (text, sender) => {
        setChatHistory((prevHistory) => [...prevHistory, { text, sender }]);
    };

    const handleSend = () => {
        if (userInput.trim()) {
            addMessage(userInput, 'user');
            sendMessageToBot(userInput);
            setUserInput('');
        }
    };

    const sendMessageToBot = (message) => {
        fetch('/api/bot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        })
        .then(response => response.json())
        .then(data => {
            addMessage(data.response, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
            addMessage("Sorry, there was an error processing your request.", 'bot');
        });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const logout = () => {
        alert("You have logged out successfully!");
        window.location.href = '/login';
    };

    return (
        <div style={{ display: 'flex' }}>
            <button id="toggle-button" onClick={toggleSidebar}>
                <div className="bar"></div>
                <div className="bar"></div>
                <div className="bar"></div>
            </button>
            <div id="sidebar" className={sidebarVisible ? 'show' : ''}>
                <h2 style={{ textAlign: 'center' }}>Navigation</h2>
                <a href="#" className="sidebar-link">🏠 Home</a>
                <a href="#" className="sidebar-link">📚 Resources</a>
                <a href="#" className="sidebar-link">❓ Help</a>
                <button id="logout-button" onClick={logout}>Logout</button>
            </div>
            <div id="chat-container" style={{ flex: 1 }}>
                <div id="chat-box">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`message ${msg.sender}`}>
                            <p>{msg.text}</p>
                        </div>
                    ))}
                </div>
                <div id="input-container">
                    <input
                        type="text"
                        id="user-input"
                        placeholder="Type your message..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button id="send-button" onClick={handleSend}>Send</button>
                </div>
            </div>
        </div>
    );
};

export default VirtualApp;