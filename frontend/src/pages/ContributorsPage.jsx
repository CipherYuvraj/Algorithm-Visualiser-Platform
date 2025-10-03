import { useEffect, useState } from "react";
import HeroSection from "../components/Contributors/HeroSection";
import ContributorsGrid from "../components/Contributors/ContributorsGrid";
import CategoriesSection from "../components/Contributors/CategoriesSection";
import CTASection from "../components/Contributors/CTASection";

const ContributorsPage = ({ darkMode }) => {
  const [contributors, setContributors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchContributors() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/CipherYuvraj/Algorithm-Visualiser-Platform/contributors"
        );
        if (!res.ok) throw new Error("Failed to fetch contributors");
        const data = await res.json();
        setContributors(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchContributors();
  }, []);

  return (
    <div
      className={`min-h-screen transition-all duration-500 ${
        darkMode
          ? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
          : "bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-12">
        <HeroSection darkMode={darkMode} />
        <ContributorsGrid
          contributors={contributors}
          loading={loading}
          error={error}
          darkMode={darkMode}
        />
        <CategoriesSection darkMode={darkMode} />
        <CTASection darkMode={darkMode} />
      </div>
    </div>
  );
};

export default ContributorsPage;
