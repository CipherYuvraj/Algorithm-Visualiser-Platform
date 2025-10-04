import { Link } from "react-router-dom";
import { AlertCircle, Cpu, ArrowLeft } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const NotFoundPage = () => {
  const { isDark, classes, getThemedGradient } = useTheme();

  return (
    <div
      className={`relative flex-1 flex flex-col items-center justify-center p-6 transition-all duration-500 ${classes.bgGradient} ${classes.textPrimary}`}
    >
      {/* Floating icons for tech vibe */}
      <div className="absolute top-20 left-10 opacity-40 animate-bounce-slow">
        <AlertCircle
          className={`${classes.textSecondary} w-12 h-12`}
        />
      </div>
      <div className="absolute bottom-20 right-32 opacity-40 animate-spin-slow">
        <Cpu
          className={`${classes.textSecondary} w-20 h-20`}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center max-w-xl">
        <h1 className="text-7xl font-extrabold mb-4 animate-pulse">404</h1>
        <p className="text-2xl mb-6">
          Uh-oh! This algorithm didn't find a solution here.
        </p>
        <p className="text-lg mb-8">
          Looks like this page isn't in the visualization. Try going back and
          exploring!
        </p>
        <Link
          to="/"
          className={`inline-flex items-center gap-2 px-6 py-4 rounded-lg font-semibold shadow-lg transition-transform transform hover:scale-105 ${
            isDark
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Go Back to Visualizer
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
