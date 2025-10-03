import ContributorCard from "./ContributorCard";

const ContributorsGrid = ({ contributors, loading, error, darkMode }) => {
  if (loading)
    return (
      <p
        className={`text-center ${
          darkMode ? "text-gray-300" : "text-gray-600"
        }`}
      >
        Loading contributors...
      </p>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      {contributors.map((c) => (
        <ContributorCard key={c.id} contributor={c} darkMode={darkMode} />
      ))}
    </div>
  );
};

export default ContributorsGrid;
