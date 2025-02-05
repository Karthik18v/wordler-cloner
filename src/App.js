import React, { useState, useEffect } from "react";
import "./App.css";

const WORDS = [
  "apple",
  "grape",
  "table",
  "chair",
  "house",
  "plane",
  "spike",
  "crane",
];
const WORD_LENGTH = 5;
const ATTEMPTS = 6;

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const App = () => {
  const [solution, setSolution] = useState(getRandomWord);
  const [guesses, setGuesses] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (guesses.some(({ word }) => word === solution)) {
      setMessage("🎉 You Win!");
    } else if (guesses.length >= ATTEMPTS) {
      setMessage(`Game Over! The word was: ${solution}`);
    }
  }, [guesses, solution]);

  const checkGuess = (word) =>
    word
      .split("")
      .map((letter, i) =>
        letter === solution[i]
          ? "green"
          : solution.includes(letter)
          ? "yellow"
          : "gray"
      );

  const onSubmit = (e) => {
    e.preventDefault();
    if (input.length !== WORD_LENGTH)
      return setMessage("Enter a 5-letter word!");
    if (guesses.some(({ word }) => word === input))
      return setMessage("Word already guessed!");

    setGuesses([...guesses, { word: input, feedback: checkGuess(input) }]);
    setInput("");
  };

  const onNewGame = () => {
    setSolution(getRandomWord());
    setGuesses([]);
    setMessage("");
  };

  return (
    <div className="wordle">
      <h1>Wordle Clone</h1>
      <div>
        <strong>How to Play:</strong>
        <div className="disclaimer">
          <p> 🟩 Green: Correct letter in the correct position.</p>
          <p> 🟨 Yellow: Correct letter in the wrong position.</p>
          <p> ⬜ Gray: Incorrect letter.</p>
        </div>
      </div>
      <div className="board">
        {Array.from({ length: ATTEMPTS }).map((_, i) => (
          <div key={i} className="row">
            {Array.from({ length: WORD_LENGTH }).map((_, j) => {
              const guess = guesses[i]?.word[j] || "";
              const color = guesses[i]?.feedback[j] || "white";
              return (
                <span key={j} className={`letter ${color}`}>
                  {guess}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      {message && <p className="message">{message}</p>}
      {message.includes("Win") || message.includes("Game Over") ? (
        <button onClick={onNewGame}>New Game</button>
      ) : (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value.toLowerCase())}
            maxLength={WORD_LENGTH}
          />
          <button type="submit">Guess</button>
        </form>
      )}
    </div>
  );
};

export default App;
