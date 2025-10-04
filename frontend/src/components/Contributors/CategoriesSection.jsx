import { Users, Award, Code2, Github } from "lucide-react";
import { useTheme } from '../../contexts/ThemeContext';

const categories = [
  { icon: Code2, title: "Code", desc: "Core features & bug fixes" },
  { icon: Users, title: "Documentation", desc: "Guides & tutorials" },
  { icon: Award, title: "Design", desc: "UI/UX improvements" },
  { icon: Github, title: "Community", desc: "Discussions & support" },
];

const CategoriesSection = () => {
  const { isDark, classes } = useTheme();
  
  return (
    <div className={`mb-16 p-8 rounded-2xl backdrop-blur-xl ${classes.cardBg} border`}>
      <h2 className={`text-3xl font-bold mb-12 text-center ${classes.textPrimary}`}>
        Contribution Areas
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className={`p-6 rounded-xl backdrop-blur-xl ${classes.cardBg} border text-center transform hover:scale-105 transition-all`}
          >
            <Icon
              className={`h-12 w-12 mb-4 mx-auto ${
                isDark ? "text-blue-400" : "text-blue-600"
              }`}
            />
            <h3 className={`text-xl font-semibold mb-2 ${classes.textPrimary}`}>
              {title}
            </h3>
            <p className={classes.textSecondary}>
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesSection;
