import React, { useState, useEffect, useMemo } from "react";
import Result from "../components/Result";

// Sample texts for the typing test
const sampleTexts = [
  "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
  "I can do all things through Christ which strengtheneth me.",
  "The Lord is my shepherd; I shall not want.",
  "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
  "Trust in the Lord with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
  "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness.",
  "For I know the thoughts that I think toward you, saith the Lord, thoughts of peace, and not of evil, to give you an expected end.",
  "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
  "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up, doth not behave itself unseemly, seeketh not her own, is not easily provoked, thinketh no evil;",
  "For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.",
];

// Function to select a random sample text from the list
const getRandomSampleText = () =>
  sampleTexts[Math.floor(Math.random() * sampleTexts.length)];

const StoryTypingTest = () => {
  // State to hold the selected sample text
  const [sampleText] = useState(getRandomSampleText());

  // State to track user's input
  const [userInput, setUserInput] = useState("");

  // State to track the start and end time of the test
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  // State to count the number of correctly typed characters
  const [correctChars, setCorrectChars] = useState(0);

  // Effect hook to handle the start and end of the typing test
  useEffect(() => {
    // If user starts typing, record the start time
    if (userInput.length === 1 && !startTime) {
      setStartTime(new Date());
    }

    // If user finishes typing the sample text, record the end time
    if (userInput.length === sampleText.length) {
      setEndTime(new Date());
    }
  }, [userInput, sampleText, startTime]);

  // Handle changes in the input field
  const handleInputChange = (e) => {
    const value = e.target.value;

    // Calculate the number of correct characters typed so far
    setCorrectChars(
      value.split("").reduce((acc, char, i) => {
        return char === sampleText[i] ? acc + 1 : acc;
      }, 0)
    );

    // Update user input state only if it's within the sample text length
    if (value.length <= sampleText.length) {
      setUserInput(value);
    }
  };

  // Calculate Words Per Minute (WPM) using memoization
  const calculateWPM = useMemo(() => {
    if (startTime && endTime) {
      const timeDiff = (endTime - startTime) / 1000 / 60; // Convert time difference to minutes
      const wordCount = sampleText.split(" ").length; // Count the number of words in the sample text
      return Math.round(wordCount / timeDiff); // Calculate WPM
    }
    return 0;
  }, [startTime, endTime, sampleText]);

  // Calculate typing accuracy as a percentage using memoization
  const calculateAccuracy = useMemo(() => {
    return userInput.length
      ? Math.round((correctChars / userInput.length) * 100)
      : 0;
  }, [correctChars, userInput.length]);

  // Render the sample text with color coding based on user input
  const renderText = useMemo(() => {
    return sampleText.split("").map((char, index) => {
      const isCorrect = index < userInput.length && userInput[index] === char; // Check if character is typed correctly
      const isCurrent = index === userInput.length; // Highlight the current character being typed

      return (
        <span
          key={index}
          style={{
            color: isCorrect
              ? "green"
              : index < userInput.length
              ? "red"
              : "black",
            backgroundColor: isCurrent ? "lightblue" : "transparent",
            // borderRight: isCurrent ? '1px solid grey' : '',
            padding: "0 2px",
            borderRadius: "3px",
          }}
        >
          {char}
        </span>
      );
    });
  }, [sampleText, userInput]);

  // Determine if the input field should be disabled (i.e., if the test has ended)
  const isInputDisabled = Boolean(endTime);

  return (
    <div>
      <h2>Typing Test</h2>
      {/* Display the sample text with color coding */}
      <p style={{ fontSize: "20px", fontFamily: "times-new-roman" }}>
        {renderText}
      </p>
      {/* Hidden input field to capture user input */}
      <input
        type="text"
        value={userInput}
        onChange={handleInputChange}
        style={{ opacity: 0, position: "absolute", left: "-9999px" }}
        autoFocus
        disabled={isInputDisabled} // Disable input if the test has ended
      />
      {/* Display results if the test has ended */}
      {endTime && <Result wpm={calculateWPM} accuracy={calculateAccuracy} />}
    </div>
  );
};

export default StoryTypingTest;
