// Tutorial service to manage tutorial data and progress
const tutorialData = {
  'sorting': {
    id: 'sorting',
    title: 'Sorting Algorithms Mastery',
    difficulty: 'Beginner',
    prerequisites: ['basic-arrays'],
    estimatedTime: '30 minutes',
    steps: [
      {
        id: 'intro',
        title: 'Introduction to Sorting',
        type: 'explanation',
        content: 'Sorting algorithms are fundamental building blocks in computer science...',
        interactive: true
      },
      {
        id: 'bubble-sort',
        title: 'Bubble Sort',
        type: 'explanation',
        content: 'Bubble sort is a simple sorting algorithm...',
        codeExample: `function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}`,
        interactive: true,
        quiz: {
          question: 'What is the time complexity of bubble sort?',
          options: ['O(n)', 'O(n²)', 'O(n log n)', 'O(1)'],
          correct: 1
        }
      }
    ]
  },
  'graph': {
    id: 'graph',
    title: 'Graph Algorithms',
    difficulty: 'Intermediate',
    prerequisites: ['basic-arrays', 'sorting'],
    estimatedTime: '45 minutes',
    steps: [
      {
        id: 'intro',
        title: 'Introduction to Graphs',
        type: 'explanation',
        content: 'Graphs are versatile data structures...',
        interactive: true
      }
    ]
  }
};

export const getTutorial = async (id) => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(tutorialData[id]);
    }, 500);
  });
};

export const getTutorialProgress = (tutorialId) => {
  const progress = localStorage.getItem('tutorialProgress');
  if (progress) {
    const allProgress = JSON.parse(progress);
    return allProgress[tutorialId];
  }
  return null;
};

export const saveTutorialProgress = (tutorialId, progress) => {
  const existingProgress = localStorage.getItem('tutorialProgress');
  const allProgress = existingProgress ? JSON.parse(existingProgress) : {};
  
  allProgress[tutorialId] = progress;
  localStorage.setItem('tutorialProgress', JSON.stringify(allProgress));
};

export const generateCertificate = (tutorialId) => {
  const progress = getTutorialProgress(tutorialId);
  if (!progress || !tutorialData[tutorialId]) {
    return null;
  }

  const tutorial = tutorialData[tutorialId];
  const completionPercentage = (progress.completedSteps.length / tutorial.steps.length) * 100;

  if (completionPercentage < 100) {
    return null;
  }

  return {
    tutorialTitle: tutorial.title,
    completionDate: new Date().toISOString(),
    difficulty: tutorial.difficulty,
    studentName: 'Student Name' // TODO: Add user management
  };
};

export default {
  getTutorial,
  getTutorialProgress,
  saveTutorialProgress,
  generateCertificate
};
