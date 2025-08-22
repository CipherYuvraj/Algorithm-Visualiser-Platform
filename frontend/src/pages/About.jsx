import React from 'react';
import { Zap, Target, Users, Lightbulb, Github, Twitter, Mail } from 'lucide-react';

const About = ({ darkMode }) => {
  const features = [
    {
      icon: Zap,
      title: 'Interactive Learning',
      description: 'Step-by-step algorithm visualization with real-time explanations and controls.'
    },
    {
      icon: Target,
      title: 'Educational Focus',
      description: 'Designed specifically for students, educators, and algorithm enthusiasts.'
    },
    {
      icon: Users,
      title: 'Community Driven',
      description: 'Built with feedback from the programming and computer science community.'
    },
    {
      icon: Lightbulb,
      title: 'Modern Technology',
      description: 'Powered by React, FastAPI, and C++ for optimal performance and user experience.'
    }
  ];

  const team = [
    {
      name: 'Algorithm Visualizer Team',
      role: 'Development & Design',
      description: 'Passionate about making algorithms accessible and understandable for everyone.'
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
            About Algorithm Visualizer Pro
          </h1>
          <p className={`text-xl mb-8 max-w-4xl mx-auto ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            We believe that understanding algorithms should be visual, interactive, and engaging. 
            Our platform transforms complex algorithmic concepts into intuitive, step-by-step visualizations 
            that make learning both effective and enjoyable.
          </p>
        </div>

        {/* Mission Statement */}
        <div className={`
          p-8 rounded-2xl backdrop-blur-xl border mb-16
          ${darkMode 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
          }
        `}>
          <h2 className={`text-2xl font-bold mb-4 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Our Mission
          </h2>
          <p className={`text-lg text-center leading-relaxed ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            To democratize algorithm education by providing an interactive, visual learning platform 
            that helps students, educators, and professionals understand the fundamental building blocks 
            of computer science through hands-on exploration and experimentation.
          </p>
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            What Makes Us Different
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`
                  p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 
                  transform hover:scale-105 text-center
                  ${darkMode 
                    ? 'bg-gray-800/20 border-gray-700/50' 
                    : 'bg-white/20 border-white/50'
                  }
                `}
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className={`text-lg font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className={`
          p-8 rounded-2xl backdrop-blur-xl border mb-16
          ${darkMode 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
          }
        `}>
          <h2 className={`text-2xl font-bold mb-6 text-center ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Technology Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${
                darkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                Frontend
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li>React 18 with Hooks</li>
                <li>TailwindCSS for styling</li>
                <li>Canvas API for visualizations</li>
                <li>React Router for navigation</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${
                darkMode ? 'text-green-400' : 'text-green-600'
              }`}>
                Backend
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li>FastAPI (Python)</li>
                <li>Pydantic for data validation</li>
                <li>RESTful API design</li>
                <li>CORS enabled</li>
              </ul>
            </div>
            <div>
              <h3 className={`text-lg font-semibold mb-3 ${
                darkMode ? 'text-purple-400' : 'text-purple-600'
              }`}>
                Performance
              </h3>
              <ul className={`space-y-2 text-sm ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <li>C++ algorithm engine</li>
                <li>Python fallback system</li>
                <li>Real-time step execution</li>
                <li>Optimized animations</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold text-center mb-12 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            The Team
          </h2>
          <div className="flex justify-center">
            {team.map((member, index) => (
              <div
                key={index}
                className={`
                  p-8 rounded-2xl backdrop-blur-xl border text-center max-w-md
                  ${darkMode 
                    ? 'bg-gray-800/20 border-gray-700/50' 
                    : 'bg-white/20 border-white/50'
                  }
                `}
              >
                <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-white" />
                </div>
                <h3 className={`text-xl font-semibold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {member.name}
                </h3>
                <p className={`text-sm text-blue-500 mb-3`}>
                  {member.role}
                </p>
                <p className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  {member.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className={`
          p-8 rounded-2xl backdrop-blur-xl border text-center
          ${darkMode 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
          }
        `}>
          <h2 className={`text-2xl font-bold mb-6 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Get in Touch
          </h2>
          <p className={`text-lg mb-6 ${
            darkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Have questions, suggestions, or want to contribute? We'd love to hear from you!
          </p>
          <div className="flex justify-center space-x-6">
            <button className={`
              p-3 rounded-lg transition-colors
              ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }
            `}>
              <Github className="h-6 w-6" />
            </button>
            <button className={`
              p-3 rounded-lg transition-colors
              ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }
            `}>
              <Twitter className="h-6 w-6" />
            </button>
            <button className={`
              p-3 rounded-lg transition-colors
              ${darkMode 
                ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }
            `}>
              <Mail className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
