const HeroSection = ({ darkMode }) => (
  <div
    className={`text-center mb-16 p-8 rounded-2xl backdrop-blur-xl ${
      darkMode
        ? "bg-gray-800/20 border-gray-700/50"
        : "bg-white/20 border-white/50"
    } border`}
  >
    <h1
      className={`text-5xl font-bold mb-6 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      Our Contributors
    </h1>
    <p
      className={`text-xl leading-relaxed max-w-4xl mx-auto ${
        darkMode ? "text-gray-300" : "text-gray-600"
      }`}
    >
      This project is made possible thanks to the amazing contributions from our
      community members. Explore their work and join us in making this even
      better.
    </p>
  </div>
);

export default HeroSection;
