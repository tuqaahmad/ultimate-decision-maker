import React, { useState } from "react";
import Confetti from "react-dom-confetti";
import StarryBackground from "./components/StarryBackground";

const confettiConfig = {
  angle: 90,
  spread: 360,
  startVelocity: "62",
  elementCount: "139",
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
};

function DecisionMaker() {
  const [options, setOptions] = useState("");
  const [decision, setDecision] = useState("");
  const [showDecision, setShowDecision] = useState(false);
  const [inputError, setInputError] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setOptions(value);
    setInputError("");

    // Check for empty input and display a validation error
    if (value.trim() === "") {
      setInputError("Please enter at least one option.");
    }
  };

  const decide = () => {
    const optionList = options.split(",").map((option) => option.trim());
    if (optionList.length === 0 || optionList[0] === "") {
      setInputError("Please enter at least one option.");
      return;
    }

    // Shuffle the optionList using the Fisher-Yates shuffle algorithm
    for (let i = optionList.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [optionList[i], optionList[j]] = [optionList[j], optionList[i]];
    }

    const selectedOption = optionList[0]; // Select the first option (now randomized)
    setDecision(selectedOption);
    setShowDecision(true);
    setShowConfetti(true);

    // Add a delay to reset the decision, hide it, and stop the confetti after 3 seconds
    setTimeout(() => {
      setDecision("");
      setShowDecision(false);
      setShowConfetti(false);
    }, 3000);
  };

  return (
    <>
      <StarryBackground />
      <div className="flex items-center justify-center min-h-screen">
        <div className="container mx-auto p-4 text-center relative">
          <h1 className="text-3xl font-bold mb-3 text-blue-600 animate-bounce">
            The Ultimate Decision Maker
          </h1>
          <p className="text-gray-300 mb-2">
            Enter your options below, separated by commas:
          </p>
          <textarea
            className={`w-full bg-[#141414] text-[#F1F1F1] p-2 mt-2 border border-[#515151] rounded-md resize-none  ${
              inputError ? "ring-[#515151]" : "ring-[#515151]"
            }`}
            rows="4"
            placeholder="Option 1, Option 2, Option 3"
            value={options}
            onChange={handleInputChange}
          ></textarea>
          {inputError && <p className="text-red-500 mt-2">{inputError}</p>}
          <button
            className="bg-blue-500 text-white px-20 py-2 mt-4 rounded-md hover:bg-blue-600 transform hover:scale-105 transition duration-300 ease-in-out"
            onClick={decide}
          >
            <Confetti active={showConfetti} config={confettiConfig} />
            Decide
          </button>
          {showDecision && (
            <p className="mt-7 text-3xl text-green-600 animate-bounce">
              <span className="font-bold uppercase">{decision}</span>
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default DecisionMaker;
