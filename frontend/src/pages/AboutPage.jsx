import React from 'react';
import { Code, Users, Target, Award, Github, Linkedin, Mail, ExternalLink, MapPin, Calendar, GraduationCap, Briefcase } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import { motion } from "framer-motion";
import { FaReact, FaPython, FaDocker, FaJs } from 'react-icons/fa';
import { SiFastapi, SiTailwindcss, SiCanvas, SiLucide } from 'react-icons/si';


const techs = [
  { name: 'React.js', icon: <FaReact className="w-10 h-10 text-blue-400" /> },
  { name: 'FastAPI', icon: <SiFastapi className="w-10 h-10 text-cyan-400" /> },
  { name: 'Python', icon: <FaPython className="w-10 h-10 text-yellow-400" /> },
  { name: 'JavaScript', icon: <FaJs className="w-10 h-10 text-yellow-300" /> },
  { name: 'TailwindCSS', icon: <SiTailwindcss className="w-10 h-10 text-cyan-500" /> },
  { name: 'Docker', icon: <FaDocker className="w-10 h-10 text-blue-500" /> },
  { name: 'Canvas API', icon: <SiCanvas className="w-10 h-10 text-purple-400" /> },
  { name: 'Lucide Icons', icon: <SiLucide className="w-10 h-10 text-gray-400" /> },
];



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
          <h1 className="text-6xl p-5 font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500  bg-clip-text text-transparent">
            About Algorithm Visualizer Pro
          </h1>
          <p className={`text-xl leading-relaxed max-w-4xl font-medium mx-auto ${classes.textSecondary}`}>
            An interactive platform designed to make algorithm learning engaging and intuitive. 
            Built with passion by a full-stack developer who believes in the power of visual learning 
            to make complex computer science concepts accessible to everyone.
          </p>
        </div>

        {/* Mission Statement */}
     {/* My Mission Section */}
<div className={`relative mb-24 p-10 rounded-3xl overflow-hidden backdrop-blur-2xl border ${classes.cardBg}`}>
  {/* Soft Gradient Glow Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent rounded-3xl blur-3xl"></div>

  <h2 className="relative text-5xl p-5 font-extrabold mb-8 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
    My Mission
  </h2>

  <p
    className={`relative text-lg md:text-xl leading-relaxed text-center max-w-3xl mx-auto ${classes.textSecondary}`}
  >
    To bridge the gap between theoretical computer science and practical understanding 
    by providing interactive, visual learning experiences. As a developer passionate about 
    education technology, I strive to make complex algorithms understandable through 
    step-by-step visualizations and real-time analysis.
  </p>

  {/* Decorative Gradient Line */}
  <div className="relative mx-auto mt-10 h-1 w-32 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full"></div>
</div>

{/* Stats Section */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
  {stats.map((stat, index) => (
    <div
      key={index}
      className={`
        group relative p-8 text-center rounded-2xl overflow-hidden border 
        ${classes.cardBg} backdrop-blur-xl
        transform hover:-translate-y-2 hover:shadow-2xl hover:border-blue-400/40 
        transition-all duration-300 ease-out
      `}
    >
      {/* Soft Hover Glow */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-blue-500/10 via-cyan-400/10 to-transparent transition-opacity duration-500 rounded-2xl"></div>

      {/* Animated Number */}
      <div
        className={`relative z-10 text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent`}
      >
        {stat.value}
      </div>

      {/* Label */}
      <div
        className={`relative z-10 text-base md:text-lg ${classes.textSecondary} group-hover:text-gray-300 transition-colors`}
      >
        {stat.label}
      </div>

      {/* Animated underline */}
      <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 group-hover:w-full transition-all duration-500 rounded-full"></div>
    </div>
  ))}
</div>


<div className="relative mb-24 p-10 rounded-3xl backdrop-blur-2xl border ${classes.cardBg} overflow-hidden ">
  {/* Soft Gradient Glow Background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent blur-3xl rounded-3xl"></div>

  <div className="relative z-10 max-w-4xl mx-auto text-center">
    {/* Section Title */}
    <h3 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
      Project Vision
    </h3>

    {/* Description */}
    <p className={`text-lg md:text-xl leading-relaxed ${classes.textSecondary}`}>
      This platform represents my commitment to education technology and the belief that 
      visual learning can transform how we understand algorithms. Every feature has been 
      carefully designed to provide an intuitive, engaging, and educational experience 
      for learners at all levels.
    </p>

    {/* Decorative Gradient Line */}
    <div className="mt-8 h-1 w-32 mx-auto bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 rounded-full animate-pulse"></div>
  </div>
</div>





        {/* Features */}
     <div className="mb-20 px-6">
  <h2
    className="text-5xl font-extrabold mb-16 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-tight drop-shadow-lg"
  >
    Key Features
  </h2>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
    {features.map((feature, index) => (
      <div
        key={index}
        className={`
          group relative p-8 rounded-2xl overflow-hidden border border-white/10 
          shadow-lg backdrop-blur-xl ${classes.cardBg}
          hover:shadow-2xl hover:border-blue-400/40
          transform hover:-translate-y-2 transition-all duration-300 ease-out
        `}
      >
        {/* Gradient Glow Border */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-blue-600/20 to-cyan-400/20 rounded-2xl"></div>

        {/* Icon with Pulse Effect */}
        <div
          className={`
            relative z-10 flex items-center justify-center mb-6 h-16 w-16 
            rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 text-white 
            shadow-md group-hover:scale-110 transform transition-transform duration-300
          `}
        >
          <feature.icon className="h-8 w-8" />
        </div>

        {/* Title */}
        <h3
          className={`
            relative z-10 text-xl font-semibold mb-3 
            ${isDark ? 'text-white' : 'text-gray-900'}
            group-hover:text-blue-500 transition-colors duration-300
          `}
        >
          {feature.title}
        </h3>

        {/* Description */}
        <p
          className={`
            relative z-10 ${classes.textSecondary} leading-relaxed 
            group-hover:text-gray-300 transition-colors duration-300
          `}
        >
          {feature.description}
        </p>

        {/* Animated bottom border line */}
        <span className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 group-hover:w-full"></span>
      </div>
    ))}
  </div>
</div>


        {/* Developer Profile */}
        
<div className={`mb-32 p-10 rounded-3xl backdrop-blur-2xl  ${classes.cardBg} overflow-hidden relative`}>
  {/* Soft gradient glow background */}
  <div className="absolute inset-0  blur-3xl rounded-3xl"></div>

  {/* Section Title */}
  <h2 className="relative text-5xl font-extrabold mb-16 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 bg-clip-text text-transparent tracking-tight drop-shadow-lg">
    Meet The Developer
  </h2>

  {/* Team Member Cards */}
  {teamMembers.map((member, index) => (
    <div key={index} className="max-w-5xl mx-auto mb-16">
      <div className="grid md:grid-cols-3 gap-10 items-center">
        {/* Profile Image + Social Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left relative z-10">
          <img 
            src={member.image} 
            className="w-64 h-64 md:w-56 md:h-56 rounded-full object-cover shadow-lg border-4 border-gray-200 dark:border-gray-700 mb-5"
          />

          <div className="flex justify-center md:justify-start space-x-7 ml-2 mt-2">
            <a 
              href={member.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group p-3 rounded-full border transform transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'border-gray-700 text-gray-400 hover:bg-gray-800 hover:text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]' 
                  : 'border-gray-200 text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-[0_0_10px_rgba(0,0,0,0.05)]'
              }`}
            >
              <Github className="h-6 w-6 transition-transform duration-300 group-hover:rotate-[10deg]" />
            </a>
            <a 
              href={member.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className={`group p-3 rounded-full border transform transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'border-gray-700 text-gray-400 hover:bg-blue-800 hover:text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]' 
                  : 'border-gray-200 text-gray-600 hover:bg-blue-50 hover:text-blue-700 shadow-[0_0_10px_rgba(59,130,246,0.2)]'
              }`}
            >
              <Linkedin className="h-6 w-6 transition-transform duration-300 group-hover:rotate-[10deg]" />
            </a>
            <a 
              href={`mailto:${member.email}`}
              className={`group p-3 rounded-full border transform transition-all duration-300 hover:scale-110 ${
                isDark 
                  ? 'border-gray-700 text-gray-400 hover:bg-red-800 hover:text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]' 
                  : 'border-gray-200 text-gray-600 hover:bg-red-50 hover:text-red-600 shadow-[0_0_10px_rgba(239,68,68,0.2)]'
              }`}
            >
              <Mail className="h-6 w-6 transition-transform duration-300 group-hover:rotate-[10deg]" />
            </a>
          </div>
        </div>

        {/* Profile Info */}
        <div className="md:col-span-2 relative z-10">
          <h3 className={`text-3xl font-bold mb-2 ${classes.textPrimary}`}>
            {member.name}
          </h3>
          <p className={`text-lg mb-4 ${isDark ? 'text-blue-400' : 'text-blue-600'}`}>
            {member.role}
          </p>
          <p className={`text-base mb-6 leading-relaxed ${classes.textSecondary}`}>
            {member.description}
          </p>

          {/* Additional Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <GraduationCap className={`h-5 w-5 mr-3 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
              <span className={classes.textSecondary}>{member.education}</span>
            </div>
            <div className="flex items-center">
              <MapPin className={`h-5 w-5 mr-3 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
              <span className={classes.textSecondary}>{member.location}</span>
            </div>
            <div className="flex items-center">
              <Briefcase className={`h-5 w-5 mr-3 ${isDark ? 'text-purple-400' : 'text-purple-600'}`} />
              <span className={classes.textSecondary}>{member.experience}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  ))}

  {/* Technical Skills */}
  <div className="relative z-10 p-10 rounded-3xl backdrop-blur-2xl border bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent overflow-hidden">
    <h2 className="relative text-3xl md:text-4xl font-bold mb-10 text-center bg-gradient-to-r from-blue-600 via-purple-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg">
      Technical Skills
    </h2>

    <div className="flex flex-wrap justify-center gap-4">
      {skills.map((skill, index) => (
        <span
          key={index}
          className={`group relative px-5 py-2 md:px-6 md:py-3 rounded-full text-sm md:text-base font-semibold cursor-pointer transform transition-all duration-300 ease-out ${
            isDark 
              ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-500/30 hover:text-white hover:shadow-lg' 
              : 'bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200 hover:text-blue-900 hover:shadow-md'
          }`}
        >
          <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-300 group-hover:w-full -translate-x-1/2"></span>
          {skill}
        </span>
      ))}
    </div>
  </div>
</div>



        {/* Technology Stack */}
        
<div className={`p-10 rounded-3xl backdrop-blur-2xl border ${classes.cardBg} relative overflow-hidden mb-24`}>
  {/* Gradient glow background */}
  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-cyan-400/5 to-transparent blur-3xl rounded-3xl"></div>

  <h2 className={`relative text-4xl md:text-5xl font-extrabold mb-12 text-center bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-500 bg-clip-text text-transparent drop-shadow-lg`}>
    Built With Modern Technologies
  </h2>

  <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
    {techs.map((tech, index) => (
      <div
        key={index}
        className={`
          group p-6 rounded-2xl backdrop-blur-xl border border-white/10
          ${isDark ? 'bg-gray-700/20 hover:bg-gray-700/30' : 'bg-white/30 hover:bg-white/40'}
          transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-out
          flex flex-col items-center justify-center shadow-md hover:shadow-xl
        `}
      >
        <div className="mb-4">{tech.icon}</div>
        <span className={`font-semibold text-lg ${classes.textPrimary} group-hover:text-blue-500 transition-colors duration-300`}>
          {tech.name}
        </span>
      </div>
    ))}
  </div>
</div>
    
      </div>
    </div>
  );
};

export default AboutPage;
