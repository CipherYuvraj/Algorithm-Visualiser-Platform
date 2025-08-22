import React from 'react';
import { BookOpen, Code, Zap, Users, ArrowRight } from 'lucide-react';

const Documentation = ({ darkMode }) => {
  const sections = [
    {
      icon: BookOpen,
      title: 'Getting Started',
      description: 'Learn the basics of using Algorithm Visualizer Pro',
      items: ['Quick Start Guide', 'Interface Overview', 'Basic Controls']
    },
    {
      icon: Code,
      title: 'Algorithm Guide',
      description: 'Deep dive into each algorithm category',
      items: ['Sorting Algorithms', 'Graph Algorithms', 'String Processing', 'Dynamic Programming']
    },
    {
      icon: Zap,
      title: 'Features',
      description: 'Explore advanced features and customization',
      items: ['Visualization Controls', 'Export Options', 'Performance Analysis']
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Connect with other learners and contributors',
      items: ['Discussion Forum', 'Contribute', 'Report Issues']
    }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      darkMode 
        ? 'bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900' 
        : 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className={`text-4xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Documentation
          </h1>
          <p className={`text-xl mb-8 max-w-3xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Everything you need to know about using Algorithm Visualizer Pro effectively.
          </p>
        </div>

        {/* Documentation Sections */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {sections.map((section, index) => (
            <div
              key={index}
              className={`
                p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 
                transform hover:scale-105 hover:shadow-2xl
                ${darkMode 
                  ? 'bg-gray-800/20 border-gray-700/50' 
                  : 'bg-white/20 border-white/50'
                }
              `}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mr-4">
                  <section.icon className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {section.title}
                  </h3>
                  <p className={`text-sm ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {section.description}
                  </p>
                </div>
              </div>
              
              <ul className="space-y-2">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <button className={`
                      w-full text-left p-2 rounded-lg transition-colors flex items-center justify-between
                      ${darkMode 
                        ? 'hover:bg-gray-700/30 text-gray-300 hover:text-white' 
                        : 'hover:bg-gray-100/50 text-gray-600 hover:text-gray-900'
                      }
                    `}>
                      <span>{item}</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Coming Soon Notice */}
        <div className={`
          text-center p-8 rounded-2xl backdrop-blur-xl border
          ${darkMode 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
          }
        `}>
          <h2 className={`text-2xl font-bold mb-4 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Comprehensive Documentation Coming Soon
          </h2>
          <p className={`text-lg mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We're working on detailed documentation, tutorials, and guides to help you master algorithms.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className={`px-4 py-2 rounded-full text-sm ${
              darkMode ? 'bg-blue-900/50 text-blue-300' : 'bg-blue-100 text-blue-800'
            }`}>
              Algorithm Explanations
            </span>
            <span className={`px-4 py-2 rounded-full text-sm ${
              darkMode ? 'bg-green-900/50 text-green-300' : 'bg-green-100 text-green-800'
            }`}>
              Step-by-Step Tutorials
            </span>
            <span className={`px-4 py-2 rounded-full text-sm ${
              darkMode ? 'bg-purple-900/50 text-purple-300' : 'bg-purple-100 text-purple-800'
            }`}>
              Code Examples
            </span>
            <span className={`px-4 py-2 rounded-full text-sm ${
              darkMode ? 'bg-orange-900/50 text-orange-300' : 'bg-orange-100 text-orange-800'
            }`}>
              Interactive Exercises
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
