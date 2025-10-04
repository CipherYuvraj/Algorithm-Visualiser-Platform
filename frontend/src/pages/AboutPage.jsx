import React from 'react';
import { Code, Users, Target, Award, Github, Linkedin, Mail, ExternalLink, MapPin, Calendar, GraduationCap, Briefcase } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const AboutPage = () => {
  const { isDark, classes, getThemedGradient } = useTheme();
  const teamMembers = [
    {
      name: "Yuvraj Udaywal",
      role: "Full Stack Developer & Algorithm Enthusiast",
      image: "https://media.licdn.com/dms/image/v2/D5603AQFLCUEgIl_LeQ/profile-displayphoto-shrink_400_400/B56ZORqIfpGkAk-/0/1733315563362?e=1758758400&v=beta&t=9ChWV-bbcGmN1z59_MA3-Stt6TM4xOaTlIX-fTIm7Lk", // You can replace this with your actual photo URL
      description: "Passionate about creating innovative web applications and making complex algorithms accessible through interactive visualizations",
      education: "Bachelor of Technology in Computer Science",
      location: "India",
      experience: "Full Stack Development | React.js | Node.js | Python",
      github: "https://github.com/CipherYuvraj",
      linkedin: "https://www.linkedin.com/in/yuvraj-udaywal-7a5ba9275/", 
      email: "yuvraj.udaywal45@gmail.com"
    }
  ];

  const features = [
    {
      icon: Code,
      title: "Interactive Visualizations",
      description: "Step-by-step algorithm execution with real-time visual feedback and educational insights"
    },
    {
      icon: Users,
      title: "Educational Focus",
      description: "Designed for students, teachers, and algorithm enthusiasts to learn through visualization"
    },
    {
      icon: Target,
      title: "Multiple Categories",
      description: "Sorting, Graph algorithms, String matching, and Dynamic Programming with comprehensive coverage"
    },
    {
      icon: Award,
      title: "Performance Analysis",
      description: "Time and space complexity analysis with detailed explanations for each algorithm"
    }
  ];

  const skills = [
    "React.js", "Node.js", "Python", "JavaScript", "TypeScript", 
    "FastAPI", "MongoDB", "PostgreSQL", "Git", "Docker", 
    "Data Structures", "Algorithms", "System Design"
  ];

  const stats = [
    { label: "Algorithms Implemented", value: "15+" },
    { label: "Algorithm Categories", value: "4" },
    { label: "Interactive Features", value: "Advanced" },
    { label: "Open Source", value: "100%" }
  ];

  return (
    <div className={`min-h-screen transition-all duration-500 ${classes.bgGradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <div className={`text-center mb-16 p-8 rounded-2xl backdrop-blur-xl ${
          isDark 
            ? 'bg-gray-800/20 border-gray-700/50' 
            : 'bg-white/20 border-white/50'
        } border`}>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            About Algorithm Visualizer Pro
          </h1>
          <p className={`text-xl leading-relaxed max-w-4xl mx-auto ${classes.textSecondary}`}>
            An interactive platform designed to make algorithm learning engaging and intuitive. 
            Built with passion by a full-stack developer who believes in the power of visual learning 
            to make complex computer science concepts accessible to everyone.
          </p>
        </div>

        {/* Mission Statement */}
        <div className={`mb-16 p-8 rounded-2xl backdrop-blur-xl ${classes.cardBg} border`}>
          <h2 className={`text-3xl font-bold mb-6 text-center ${classes.textPrimary}`}>
            My Mission
          </h2>
          <p className={`text-lg leading-relaxed text-center max-w-3xl mx-auto ${classes.textSecondary}`}>
            To bridge the gap between theoretical computer science and practical understanding 
            by providing interactive, visual learning experiences. As a developer passionate about 
            education technology, I strive to make complex algorithms understandable through 
            step-by-step visualizations and real-time analysis.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center p-6 rounded-xl backdrop-blur-xl ${classes.cardBg} border transform hover:scale-105 transition-all`}
            >
              <div className={`text-3xl font-bold mb-2 ${
                isDark ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm ${classes.textSecondary}`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className={`text-3xl font-bold mb-12 text-center ${classes.textPrimary}`}>
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 rounded-xl backdrop-blur-xl ${classes.cardBg} border transform hover:scale-105 transition-all`}
              >
                <feature.icon className={`h-12 w-12 mb-4 ${
                  isDark ? 'text-blue-400' : 'text-blue-600'
                }`} />
                <h3 className={`text-xl font-semibold mb-3 ${classes.textPrimary}`}>
                  {feature.title}
                </h3>
                <p className={classes.textSecondary}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Developer Profile */}
        <div className={`mb-16 p-8 rounded-2xl backdrop-blur-xl ${classes.cardBg} border`}>
          <h2 className={`text-3xl font-bold mb-12 text-center ${classes.textPrimary}`}>
            Meet the Developer
          </h2>
          
          {teamMembers.map((member, index) => (
            <div key={index} className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Profile Image */}
                <div className="text-center md:text-left">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-48 h-48 rounded-full mx-auto md:mx-0 mb-4 object-cover shadow-lg"
                  />
                  <div className="flex justify-center md:justify-start space-x-4 mt-4">
                    <a 
                      href={member.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg transition-colors ${
                        isDark 
                          ? 'hover:bg-gray-600 text-gray-400 hover:text-white' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Github className="h-6 w-6" />
                    </a>
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className={`p-3 rounded-lg transition-colors ${
                        isDark 
                          ? 'hover:bg-gray-600 text-gray-400 hover:text-white' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Linkedin className="h-6 w-6" />
                    </a>
                    <a 
                      href={`mailto:${member.email}`}
                      className={`p-3 rounded-lg transition-colors ${
                        isDark 
                          ? 'hover:bg-gray-600 text-gray-400 hover:text-white' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      <Mail className="h-6 w-6" />
                    </a>
                  </div>
                </div>

                {/* Profile Info */}
                <div className="md:col-span-2">
                  <h3 className={`text-3xl font-bold mb-2 ${classes.textPrimary}`}>
                    {member.name}
                  </h3>
                  <p className={`text-lg mb-4 ${
                    isDark ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {member.role}
                  </p>
                  <p className={`text-base mb-6 leading-relaxed ${classes.textSecondary}`}>
                    {member.description}
                  </p>

                  {/* Additional Details */}
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <GraduationCap className={`h-5 w-5 mr-3 ${
                        isDark ? 'text-green-400' : 'text-green-600'
                      }`} />
                      <span className={classes.textSecondary}>
                        {member.education}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className={`h-5 w-5 mr-3 ${
                        isDark ? 'text-red-400' : 'text-red-600'
                      }`} />
                      <span className={classes.textSecondary}>
                        {member.location}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Briefcase className={`h-5 w-5 mr-3 ${
                        isDark ? 'text-purple-400' : 'text-purple-600'
                      }`} />
                      <span className={classes.textSecondary}>
                        {member.experience}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Section */}
        <div className={`mb-16 p-8 rounded-2xl backdrop-blur-xl ${classes.cardBg} border`}>
          <h2 className={`text-3xl font-bold mb-8 text-center ${classes.textPrimary}`}>
            Technical Skills
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  isDark 
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30' 
                    : 'bg-blue-100 text-blue-800 border border-blue-200'
                } hover:scale-105 transition-transform`}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Technology Stack */}
        <div className={`p-8 rounded-2xl backdrop-blur-xl ${classes.cardBg} border`}>
          <h2 className={`text-3xl font-bold mb-8 text-center ${classes.textPrimary}`}>
            Built With Modern Technologies
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {['React.js', 'FastAPI', 'Python', 'JavaScript', 'TailwindCSS', 'Docker', 'Canvas API', 'Lucide Icons'].map((tech, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${
                  isDark ? 'bg-gray-700/30' : 'bg-white/30'
                } transform hover:scale-105 transition-all`}
              >
                <span className={`font-medium ${classes.textPrimary}`}>
                  {tech}
                </span>
              </div>
            ))}
          </div>

          {/* Project Vision */}
          <div className="mt-12 text-center">
            <h3 className={`text-2xl font-bold mb-4 ${classes.textPrimary}`}>
              Project Vision
            </h3>
            <p className={`text-lg leading-relaxed max-w-3xl mx-auto ${classes.textSecondary}`}>
              This platform represents my commitment to education technology and the belief that 
              visual learning can transform how we understand algorithms. Every feature has been 
              carefully designed to provide an intuitive, engaging, and educational experience 
              for learners at all levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
