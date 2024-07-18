import { useEffect, useState } from "react";
import "./App.css";

import question_data from "./Question.json";
function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [timer, setTimer] = useState(15);

  useEffect(() => {
    let interval;
    if (timer > 0 && !showScore) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(interval);
      setShowScore(true);
    }

    return () => clearInterval(interval);
  }, [timer, showScore]);

  const answerClick = (selectedOption) => {
    if (selectedOption === question_data[currentQuestion].answer) {
      setScore((add) => add + 1);
    }
    if (currentQuestion < question_data.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
      setTimer(15);
    } else {
      setShowScore(true);
    }
  };

  const restartButton = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(15);
  };

  return (
    <div className="quiz-app">
      {showScore ? (
        <div className="score-section">
          <h2>
            Your Score : {score}/{question_data.length}
          </h2>
          <button onClick={restartButton}>Restart</button>
        </div>
      ) : (
        <div className="question-section">
          <h2>Question {currentQuestion + 1}</h2>
          <p>{question_data[currentQuestion].question}</p>
          <div className="options">
            {question_data[currentQuestion].options.map((option, index) => (
              <button key={index} onClick={answerClick}>
                {option}
              </button>
            ))}
          </div>
          <div className="timer">
            Time Left : <span>{timer}s</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
