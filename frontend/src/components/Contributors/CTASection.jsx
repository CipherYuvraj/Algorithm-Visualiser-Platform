import { Rocket } from "lucide-react";
import { useTheme } from '../../contexts/ThemeContext';

const CTASection = () => {
  const { classes } = useTheme();
  
  return (
    <div className={`p-8 rounded-2xl backdrop-blur-xl text-center ${classes.cardBg} border`}>
      <h2 className={`flex gap-2 justify-center items-center text-3xl font-bold mb-4 ${classes.textPrimary}`}>
        Become a Contributor <Rocket />
      </h2>
      <p className={`text-lg mb-6 ${classes.textSecondary}`}>
        Want to join our mission? Read our{" "}
        <a
          href="https://github.com/CipherYuvraj/Algorithm-Visualiser-Platform/blob/main/CONTRIBUTING.md"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500 hover:text-blue-600 transition-colors"
        >
          contribution guidelines
        </a>{" "}
        and pick an{" "}
        <a
          href="https://github.com/CipherYuvraj/Algorithm-Visualiser-Platform/issues"
          target="_blank"
          rel="noopener noreferrer"
          className="underline text-blue-500 hover:text-blue-600 transition-colors"
        >
          open issue
        </a>{" "}
        to get started.
      </p>
      <a
        href="https://github.com/CipherYuvraj/Algorithm-Visualiser-Platform"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-xl shadow-md hover:scale-105 hover:bg-blue-700 transition-all"
      >
        Contribute Now
      </a>
    </div>
  );
};

export default CTASection;
