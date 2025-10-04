import React from 'react';

const TutorialProgress = ({ tutorial, currentStep, progress }) => {
  const calculateProgress = () => {
    if (!progress?.completedSteps) return 0;
    return (progress.completedSteps.length / tutorial.steps.length) * 100;
  };

  const progressPercentage = calculateProgress();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Your Progress</h3>
      <div className="mb-4">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">
          {Math.round(progressPercentage)}% Complete
        </p>
      </div>
      <div className="space-y-2">
        {tutorial.steps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center p-2 rounded ${
              index === currentStep
                ? 'bg-blue-100 dark:bg-blue-900'
                : progress?.completedSteps?.includes(index)
                ? 'bg-green-100 dark:bg-green-900'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            <div className={`w-6 h-6 flex items-center justify-center rounded-full mr-2 ${
              progress?.completedSteps?.includes(index)
                ? 'bg-green-500 text-white'
                : index === currentStep
                ? 'bg-blue-500 text-white'
                : 'bg-gray-300 dark:bg-gray-600'
            }`}>
              {progress?.completedSteps?.includes(index) ? '✓' : index + 1}
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {step.title || `Step ${index + 1}`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialProgress;
