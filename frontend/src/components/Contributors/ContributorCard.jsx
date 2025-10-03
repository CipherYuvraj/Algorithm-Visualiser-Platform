import { Github } from "lucide-react";

const ContributorCard = ({ contributor, darkMode }) => (
  <div
    key={contributor.id}
    className={`p-6 rounded-xl backdrop-blur-xl ${
      darkMode
        ? "bg-gray-800/20 border-gray-700/50"
        : "bg-white/20 border-white/50"
    } border text-center transform hover:scale-105 transition-all`}
  >
    <a href={contributor.html_url} target="_blank" rel="noopener noreferrer">
      <img
        src={contributor.avatar_url}
        alt={contributor.login}
        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-lg"
      />
      <h3
        className={`text-xl font-semibold mb-2 ${
          darkMode ? "text-white" : "text-gray-900"
        }`}
      >
        {contributor.login}
      </h3>
    </a>
    <p
      className={`text-sm mb-3 ${darkMode ? "text-gray-300" : "text-gray-600"}`}
    >
      {contributor.contributions} contributions
    </p>
    <a
      href={contributor.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center px-3 py-1 rounded-lg text-sm font-medium ${
        darkMode
          ? "bg-blue-600/20 text-blue-300 border border-blue-500/30 hover:bg-blue-600/40"
          : "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200"
      }`}
    >
      <Github className="h-4 w-4 mr-2" /> View Profile
    </a>
  </div>
);

export default ContributorCard;
