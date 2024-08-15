import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

// Homepage Component
const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleCustomTyping = () => {
    navigate("/custom");
  };

  const handleStoryTyping = () => {
    navigate("/story");
  };

  const handleStats = () => {
    navigate("/stats");
  };

  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1>Welcome to Bible Typer, {}!</h1>
          <p>
            Enhance your typing speed and accuracy with our interactive lessons
            and real-time feedback.
          </p>
        </div>
      </header>

      <section className="features-section">
        <div className="features">
          <div className="feature">
            <h2>Custom Mode</h2>
            <p>
              Learn at your own pace with step-by-step lessons designed for all
              skill levels.
            </p>
            <button className="cta-button" onClick={handleCustomTyping}>
              Start Typing Now
            </button>
          </div>
          <div className="feature">
            <h2>Story Mode</h2>
            <p>
              From Genesis 1 to Revelation 22. Type the entire Bible from start
              to finish at your own speed
            </p>
            <button className="cta-button" onClick={handleStoryTyping}>
              Start Typing Now
            </button>
          </div>
          <div className="feature">
            <h2>Stats</h2>
            <p>
              Monitor your progress over time and see how you improve with each
              session.
            </p>
            <button className="cta-button" onClick={handleStats}>
              See Stats
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
