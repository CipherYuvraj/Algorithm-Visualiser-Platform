import { Rocket } from "lucide-react";

const CTASection = ({ darkMode }) => (
  <div
    className={`p-8 rounded-2xl backdrop-blur-xl text-center ${
      darkMode
        ? "bg-gray-800/20 border-gray-700/50"
        : "bg-white/20 border-white/50"
    } border`}
  >
    <h2
      className={`flex gap-2 justify-center items-center text-3xl font-bold mb-4 ${
        darkMode ? "text-white" : "text-gray-900"
      }`}
    >
      Become a Contributor <Rocket />
    </h2>
    <p
      className={`text-lg mb-6 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      Want to join our mission? Read our{" "}
      <a
        href="https://github.com/CipherYuvraj/Algorithm-Visualiser-Platform/blob/main/CONTRIBUTING.md"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-500"
      >
        contribution guidelines
      </a>{" "}
      and pick an{" "}
      <a
        href="https://github.com/CipherYuvraj/Algorithm-Visualiser-Platform/issues"
        target="_blank"
        rel="noopener noreferrer"
        className="underline text-blue-500"
      >
        open issue
      </a>{" "}
      to get started.
    </p>
    <a
      href="https://github.com/CipherYuvraj/Algorithm-Visualiser-Platform"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:scale-105 transition-transform"
    >
      Contribute Now
    </a>
  </div>
);

export default CTASection;
