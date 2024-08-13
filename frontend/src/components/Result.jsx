import React from 'react';

// Component to display the typing test results
const Result = ({ wpm, accuracy}) => {
  return (
    <div>
      <h3>Results</h3>
      {/* Display the user's typing speed in WPM */}
      <p>Your typing speed is: {wpm} WPM</p>
      {/* Display the user's typing accuracy */}
      <p>Your accuracy is: {accuracy}%</p>
      {/* Button to reset the test */}
    </div>
  );
};

export default Result;
