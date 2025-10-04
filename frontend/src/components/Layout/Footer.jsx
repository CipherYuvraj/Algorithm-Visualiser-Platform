import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { useTheme } from "../../contexts/ThemeContext";

const Footer = () => {
  const { isDark, classes } = useTheme();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      platform: "GitHub",
      url: "https://github.com/CipherYuvraj",
      icon: <FaGithub className="w-5 h-5" />,
    },
    {
      platform: "LinkedIn",
      url: "https://www.linkedin.com/in/yuvraj-udaywal-7a5ba9275",
      icon: <FaLinkedin className="w-5 h-5" />,
    },
    {
      platform: "Twitter",
      url: "https://twitter.com/your_twitter_handle",
      icon: <FaTwitter className="w-5 h-5" />,
    },
  ];

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Sorting", path: "/sorting" },
    { name: "Graph", path: "/graph" },
    { name: "String", path: "/string" },
    { name: "DP", path: "/dp" },
    { name: "About", path: "/about" },
    { name: "Docs", path: "/docs" },
    { name: "Contributors", path: "/contributors" },
  ];

  return (
    <footer className={`py-12 transition-all duration-500 ${classes.bgSecondary} ${classes.textPrimary}`}>
      {/* Top Row: Social & Quick Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row justify-between items-start lg:items-start gap-10 lg:gap-0">
        {/* Social Media */}
        <div className="flex flex-col space-y-4 flex-1">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AlgoViz Pro
          </h2>
          <p className={`text-sm max-w-xs ${classes.textSecondary}`}>
            Learn algorithms interactively. Made possible by our amazing
            contributors.
          </p>
          <div className="flex space-x-3 mt-2">
            {socialLinks.map((link) => (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`
                  p-2 rounded-lg transition-all transform hover:scale-110
                  ${isDark 
                    ? 'hover:bg-blue-500/20 text-gray-400 hover:text-blue-400' 
                    : 'hover:bg-blue-500/10 text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {link.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex-1">
          <h3 className={`text-lg font-semibold mb-4 ${classes.textPrimary}`}>
            Quick Links
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
            {quickLinks.map((link) => (
              <a
                key={link.name}
                href={link.path}
                className={`
                  transition-colors duration-200
                  ${isDark 
                    ? 'text-gray-400 hover:text-blue-400' 
                    : 'text-gray-600 hover:text-blue-600'
                  }
                `}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className={`mt-10 border-t ${classes.borderPrimary}`}></div>

      {/* Centered Copyright */}
      <div className={`mt-4 text-center text-sm ${classes.textSecondary}`}>
        <p>
          &copy; {currentYear} Algorithm Visualiser Platform. All rights
          reserved.
        </p>
        <p>
          Licensed under{" "}
          <a
            href="https://opensource.org/licenses/MIT"
            target="_blank"
            rel="noopener noreferrer"
            className={`
              underline transition-colors duration-200
              ${isDark ? 'hover:text-blue-400' : 'hover:text-blue-600'}
            `}
          >
            MIT License
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
