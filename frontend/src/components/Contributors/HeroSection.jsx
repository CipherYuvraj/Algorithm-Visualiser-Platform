import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const HeroSection = () => {
  const { isDark, classes } = useTheme();
  
  return (
    <div
      className={`text-center mb-16 p-8 rounded-2xl backdrop-blur-xl ${
        isDark
          ? "bg-gray-800/20 border-gray-700/50"
          : "bg-white/20 border-white/50"
      } border`}
    >
      <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Our Contributors
      </h1>
      <p className={`text-xl leading-relaxed max-w-4xl mx-auto ${classes.textSecondary}`}>
        This project is made possible thanks to the amazing contributions from our
        community members. Explore their work and join us in making this even
        better.
      </p>
    </div>
  );
};

export default HeroSection;
