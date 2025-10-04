import React from 'react';
import { useNavigate } from 'react-router-dom';

const TutorialsPage = ({ darkMode }) => {
  const navigate = useNavigate();

  const tutorials = [
    {
      id: 'sorting',
      title: 'Sorting Algorithms',
      description: 'Learn about different sorting algorithms and their implementations',
      difficulty: 'Beginner',
      duration: '30 minutes',
      icon: '🔄'
    },
    {
      id: 'graph',
      title: 'Graph Algorithms',
      description: 'Master graph traversal and pathfinding algorithms',
      difficulty: 'Intermediate',
      duration: '45 minutes',
      icon: '🕸️'
    },
    {
      id: 'string',
      title: 'String Algorithms',
      description: 'Explore pattern matching and string manipulation',
      difficulty: 'Intermediate',
      duration: '40 minutes',
      icon: '📝'
    },
    {
      id: 'dp',
      title: 'Dynamic Programming',
      description: 'Learn optimization through dynamic programming',
      difficulty: 'Advanced',
      duration: '60 minutes',
      icon: '🧮'
    }
  ];

  const difficultyColors = {
    Beginner: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    Intermediate: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    Advanced: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Interactive Tutorials
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Choose a tutorial to start learning algorithms through interactive visualizations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div
            key={tutorial.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            onClick={() => navigate(`/tutorial/${tutorial.id}`)}
          >
            <div className="p-6">
              <div className="flex items-center mb-4">
                <span className="text-4xl mr-4">{tutorial.icon}</span>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    {tutorial.title}
                  </h3>
                  <span className={`inline-block px-2 py-1 rounded text-sm font-medium mt-2 ${difficultyColors[tutorial.difficulty]}`}>
                    {tutorial.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {tutorial.description}
              </p>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <span className="mr-4">⏱️ {tutorial.duration}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TutorialsPage;
