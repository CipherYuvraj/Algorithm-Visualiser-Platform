const STORAGE_KEY = 'algorithmVisualizer';

const defaultPreferences = {
  theme: 'light',
  preferences: {
    autoSave: true,
    animationSpeed: 'medium'
  }
};

export const getUserPreferences = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : defaultPreferences;
  } catch (error) {
    console.error('Error loading user preferences:', error);
    return defaultPreferences;
  }
};

export const setUserPreferences = (preferences) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences));
  } catch (error) {
    console.error('Error saving user preferences:', error);
  }
};

export const getTheme = () => {
  const { theme } = getUserPreferences();
  return theme;
};

export const setTheme = (theme) => {
  const preferences = getUserPreferences();
  setUserPreferences({ ...preferences, theme });
};
