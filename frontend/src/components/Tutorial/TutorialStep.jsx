import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

const TutorialStep = ({ step, onComplete }) => {
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  const renderContent = () => {
    if (step.codeExample) {
      return (
        <div className="mb-4">
          <SyntaxHighlighter language="javascript" style={dracula}>
            {step.codeExample}
          </SyntaxHighlighter>
        </div>
      );
    }
    return <div className="prose dark:prose-invert">{step.content}</div>;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        {step.title}
      </h2>
      {renderContent()}
      {step.interactive && !isCompleted && (
        <div className="mt-6">
          <button
            onClick={handleComplete}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Continue
          </button>
        </div>
      )}
    </div>
  );
};

export default TutorialStep;
