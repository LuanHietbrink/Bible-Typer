import React from "react";
import '../styles/Home.css'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate } from 'react-router-dom';



function Home() {
    const navigate = useNavigate();

    const handleStoryTyping = () => {
      navigate('/story');
    };

    const handleCustomTyping = () => {
      navigate('/custom');
    };

    const handleStats = () => {
      navigate('/stats');
    };
    return (
        <div className="homepage">
          <header className="hero-section">
            <div className="hero-content">
              <h1>Welcome to Bible Typer!</h1>
              <p>Enhance your typing speed, accuracy as well as your Bible knowledge with our typing tests.</p>
              
            </div>
          </header>
    
          <section className="features-section">
            <div className="features">
              <div className="feature">
                <h2>Story Mode</h2>
                <p>From Genesis 1 to Revelation 22. Type the entire Bible verse for verse at your own pace. Choose your time interval and start typing!</p>
                <button className="cta-button" onClick={handleStoryTyping}>Start Typing Now</button>
              </div>
              <div className="feature">
                <h2>Custom Mode</h2>
                <p>Choose any chapter from any Book to type.</p>
                <button className="cta-button" onClick={handleCustomTyping}>Start Typing Now</button>
              </div>
              <div className="feature">
                <h2>Stats tracking</h2>
                <p>Monitor your progress over time and see how far in the Bible you progress.</p>
                <button className="cta-button" onClick={handleStats}>See Stats</button>
              </div>
            </div>
          </section>
        </div>
      );
}

export default Home