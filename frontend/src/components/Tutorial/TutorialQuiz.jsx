import React, { useState } from 'react';

const TutorialQuiz = ({ quiz, onComplete }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleAnswerSelect = (index) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    const correct = selectedAnswer === quiz.correct;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Quiz Time!</h3>
      <div className="mb-6">
        <p className="text-gray-700 dark:text-gray-300">{quiz.question}</p>
      </div>
      <div className="space-y-3">
        {quiz.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswerSelect(index)}
            className={`w-full p-3 text-left rounded-md transition-colors ${
              selectedAnswer === index
                ? 'bg-blue-100 dark:bg-blue-900 border-blue-500'
                : 'bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600'
            } ${
              showFeedback && index === quiz.correct
                ? 'bg-green-100 dark:bg-green-900 border-green-500'
                : ''
            } ${
              showFeedback && index === selectedAnswer && index !== quiz.correct
                ? 'bg-red-100 dark:bg-red-900 border-red-500'
                : ''
            }`}
          >
            {option}
          </button>
        ))}
      </div>
      {!showFeedback && (
        <button
          onClick={handleSubmit}
          disabled={selectedAnswer === null}
          className={`mt-6 px-4 py-2 rounded-md transition-colors ${
            selectedAnswer === null
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          Submit Answer
        </button>
      )}
      {showFeedback && (
        <div className={`mt-4 p-4 rounded-md ${
          isCorrect ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200' : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200'
        }`}>
          {isCorrect ? 'Correct! Well done!' : 'Try again! Review the material and give it another shot.'}
        </div>
      )}
    </div>
  );
};

export default TutorialQuiz;
