// HomePage.js
import React from 'react';
import './Home.css'; // Import the CSS file

const Home = () => {
    return (
        <div className="hero">
            <h1>Campus Virtual Assistant</h1>
            <p>I am here to make your life easier</p>
            <a href="/login" className="cta-button">Log In</a>
        </div>
    );
};

export default Home;
