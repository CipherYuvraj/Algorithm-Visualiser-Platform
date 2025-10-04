import ContributorCard from "./ContributorCard";
import { useTheme } from '../../contexts/ThemeContext';

const ContributorsGrid = ({ contributors, loading, error }) => {
  const { classes } = useTheme();
  
  if (loading)
    return (
      <p className={`text-center ${classes.textSecondary}`}>
        Loading contributors...
      </p>
    );
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
      {contributors.map((c) => (
        <ContributorCard key={c.id} contributor={c} />
      ))}
    </div>
  );
};

export default ContributorsGrid;
