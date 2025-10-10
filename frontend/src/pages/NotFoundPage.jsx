import { Link } from "react-router-dom";
import { ArrowLeft, Home, BookOpen, GitBranch, Activity } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const NotFoundPage = () => {
  const { isDark, classes } = useTheme();
  const [pathSearching, setPathSearching] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setPathSearching(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  // Quick links for algorithm visualizer platform
  const quickLinks = [
    { to: "/", icon: Home, label: "Home", color: "blue" },
    { to: "/sorting", icon: Activity, label: "Sorting Visualizer", color: "purple" },
    { to: "/graph", icon: GitBranch, label: "Graph Algorithms", color: "teal" },
    { to: "/tutorials", icon: BookOpen, label: "Tutorials", color: "green" },
  ];

  return (
    <main
      role="main"
      className={`min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-4 sm:px-6 sm:py-6 transition-all duration-500 ${classes.bgGradient} ${classes.textPrimary}`}
    >
      <div className="w-full max-w-4xl mx-auto">
        <div className={`p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl ${classes.card}`}>
          <motion.div
            className="text-center space-y-5"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* 404 Title Section */}
            <div className="space-y-2">
              <motion.h1
                className={`text-6xl sm:text-7xl font-extrabold ${classes.brandPrimary}`}
                animate={{
                  scale: [1, 1.02, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                404
              </motion.h1>
              <motion.div
                className={`h-1.5 w-32 mx-auto rounded-full ${isDark ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-blue-600 to-purple-600'}`}
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 128, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              />
            </div>

            {/* Error Message Section */}
            <div className="space-y-2 max-w-2xl mx-auto">
              <h2 className={`text-xl sm:text-2xl font-bold ${classes.textPrimary}`}>
                Path Not Found
              </h2>
              <p className={`text-sm sm:text-base ${classes.textSecondary} leading-relaxed`}>
                {pathSearching 
                  ? "Searching through the algorithm tree..." 
                  : "No valid path exists to this route. The algorithm couldn't find a solution here."}
              </p>
              <motion.p
                className={`text-sm ${classes.textTertiary} font-mono italic`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Error Code: ROUTE_NOT_FOUND | Stack Trace: /404
              </motion.p>
            </div>

            {/* Primary CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link
                to="/"
                className={`${classes.btnPrimary} gap-2 min-w-[160px] justify-center`}
                aria-label="Return to home page"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden />
                Back to Home
              </Link>
              <Link
                to="/docs"
                className={`${classes.btnSecondary} min-w-[160px] justify-center`}
              >
                <BookOpen className="w-5 h-5 inline mr-2" aria-hidden />
                View Docs
              </Link>
            </div>

            {/* Quick Navigation Section */}
            <div className="pt-4 space-y-2.5">
              <div className={`h-px w-full max-w-md mx-auto ${classes.borderPrimary}`} />
              <p className={`text-xs sm:text-sm font-semibold ${classes.textSecondary}`}>
                Explore Our Visualizers
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-2xl mx-auto">
                {quickLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${
                      isDark
                        ? 'border-gray-700 hover:border-blue-500 hover:bg-gray-800/70'
                        : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
                      <link.icon className={`w-5 h-5 ${classes.brandPrimary}`} aria-hidden />
                    </div>
                    <span className={`text-sm font-semibold ${classes.textPrimary}`}>
                      {link.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom Hint */}
            <motion.div
              className="pt-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
            >
              <p className={`text-sm ${classes.textTertiary}`}>
                💡 Tip: Use breadth-first search to navigate back to familiar routes
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
