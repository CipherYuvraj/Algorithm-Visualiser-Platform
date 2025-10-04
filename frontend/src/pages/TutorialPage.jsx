import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import TutorialLayout from '../components/Tutorial/TutorialLayout';
import { getTutorial } from '../services/tutorialService';

const TutorialPage = () => {
  const { tutorialId } = useParams();
  const navigate = useNavigate();
  const [tutorial, setTutorial] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTutorial = async () => {
      try {
        const tutorialData = await getTutorial(tutorialId);
        if (!tutorialData) {
          setError('Tutorial not found');
          return;
        }
        setTutorial(tutorialData);
      } catch (err) {
        setError('Failed to load tutorial');
      }
    };

    loadTutorial();
  }, [tutorialId]);

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
          <p className="text-red-700 dark:text-red-200">{error}</p>
          <button
            onClick={() => navigate('/tutorials')}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Back to Tutorials
          </button>
        </div>
      </div>
    );
  }

  if (!tutorial) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>
    );
  }

  return <TutorialLayout tutorialId={tutorialId} />;
};

export default TutorialPage;
