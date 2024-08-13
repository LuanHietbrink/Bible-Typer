import React, { useState, useEffect } from 'react';
import Result from '../components/Result';

// Sample texts for the typing test
const sampleTexts = [
  "The quick brown fox jumps over the lazy dog",
  "A journey of a thousand miles begins with a single step",
  "To be or not to be, that is the question",
  "All that glitters is not gold",
  "Fortune favors the bold"
];

const testIndex = Math.floor(Math.random()*5)

const StoryTypingTest = () => {
   // State variables
  const [sampleText, setSampleText] = useState(sampleTexts[testIndex]); // Stores the current sample text
  const [userInput, setUserInput] = useState(""); // Stores the user's input
  const [startTime, setStartTime] = useState(null); // Stores the start time of the test
  const [endTime, setEndTime] = useState(null); // Stores the end time of the test
  const [isTestStarted, setIsTestStarted] = useState(false); // Tracks if the test has started
  const [correctChars, setCorrectChars] = useState(0); // Counts the number of correct characters typed

  // Effect hook to handle the start and end of the test
  useEffect(() => {
    if (userInput.length === 1 && !isTestStarted) {
      setStartTime(new Date());
      setIsTestStarted(true);
    }

    if (userInput.length === sampleText.length) {
      setEndTime(new Date());
    }
  }, [userInput, isTestStarted, sampleText]);

  // Handle input changes
  const handleInputChange = (e) => {
    const value = e.target.value;
    let correctCount = 0;

    // Count the number of correct characters typed
    for (let i = 0; i < value.length; i++) {
      if (value[i] === sampleText[i]) {
        correctCount++;
      }
     
    }
    setCorrectChars(correctCount);

    // Only update the input if it's within the sample text length
    if (value.length <= sampleText.length) {
      setUserInput(value);
    }
  };

  // Calculate Words Per Minute (WPM)
  const calculateWPM = () => {
    if (startTime && endTime) {
      const timeDiff = (endTime - startTime) / 1000 / 60; // Convert time difference to minutes
      const wordCount = sampleText.split(" ").length; // Count the number of words in the sample text
      return Math.round(wordCount / timeDiff); // Calculate WPM
    }
    return 0;
  };

  // Calculate accuracy as a percentage
  const calculateAccuracy = () => {
    if (userInput.length === 0) return 0;
    return Math.round((correctChars / userInput.length) * 100);
  };


  // Render the sample text with colors based on user input
  const renderText = () => {
    return sampleText.split("").map((char, index) => {
      let color = 'black';
      let backgroundColor = 'transparent';
      
      // Determine the color for the character based on the user's input
      if (index < userInput.length) {
        if (userInput[index] === char) {
          color = 'green';
        } else {
          color = 'red';
        }
      }
      
      // Highlight the current position
      if (index === userInput.length) {
        backgroundColor = 'lightblue';
      }
      
      return (
        <span
          key={index}
          style={{ color, backgroundColor, padding: '0 2px', borderRadius: '3px' }}
        >
          {char}
        </span>
      );
    });
  };

  // Determine if input field should be disabled
  const isInputDisabled = endTime !== null;

  return (
    <div>
      <h2>Typing Test</h2>
      {/* Display the sample text with color coding */}
      <p style={{ fontSize: '24px', fontFamily: 'monospace' }}>
        {renderText()}
      </p>
      {/* Hidden input field to capture user input */}
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        style={{ opacity: 0, position: 'absolute', left: '-9999px' }}
        autoFocus
        disabled={isInputDisabled} // Disable input if test has ended
      />
      {/* Show results if the test has ended */}
      {endTime && (
        <Result wpm={calculateWPM()} accuracy={calculateAccuracy()} />
      )}
      
    </div>
  );
};

export default StoryTypingTest;
