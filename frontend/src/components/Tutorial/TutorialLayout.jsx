import React, { useState, useEffect } from 'react';
import TutorialStep from './TutorialStep';
import TutorialProgress from './TutorialProgress';
import TutorialQuiz from './TutorialQuiz';

const TutorialLayout = ({ tutorialId }) => {
  const [currentTutorial, setCurrentTutorial] = useState(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    // Load tutorial data
    const loadTutorial = async () => {
      try {
        const tutorialData = await getTutorialById(tutorialId);
        setCurrentTutorial(tutorialData);
      } catch (error) {
        console.error('Error loading tutorial:', error);
        // Handle error appropriately
      }
    };

    loadTutorial();
    loadProgress();
  }, [tutorialId]);

  const loadProgress = () => {
    const savedProgress = localStorage.getItem('tutorialProgress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  };

  const saveProgress = (updatedProgress) => {
    localStorage.setItem('tutorialProgress', JSON.stringify(updatedProgress));
    setProgress(updatedProgress);
  };

  const handleStepComplete = () => {
    const updatedProgress = {
      ...progress,
      [tutorialId]: {
        ...progress[tutorialId],
        completedSteps: [...(progress[tutorialId]?.completedSteps || []), currentStep]
      }
    };
    saveProgress(updatedProgress);
    setCurrentStep(currentStep + 1);
  };

  if (!currentTutorial) {
    return <div>Loading tutorial...</div>;
  }

  const currentStepData = currentTutorial.steps[currentStep];

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-gray-900">
      <div className="flex-1 container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {currentTutorial.title}
          </h1>
          <div className="text-gray-600 dark:text-gray-300">
            Estimated time: {currentTutorial.estimatedTime}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStepData.type === "explanation" && (
              <TutorialStep
                step={currentStepData}
                onComplete={handleStepComplete}
              />
            )}
            {currentStepData.quiz && (
              <TutorialQuiz
                quiz={currentStepData.quiz}
                onComplete={handleStepComplete}
              />
            )}
          </div>
          <div className="lg:col-span-1">
            <TutorialProgress
              tutorial={currentTutorial}
              currentStep={currentStep}
              progress={progress[tutorialId]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialLayout;
