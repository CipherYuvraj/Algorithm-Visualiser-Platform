import React from "react";
import { useTheme } from "../../contexts/ThemeContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const { classes } = useTheme();
  
  return (
    <div className={`min-h-screen ${classes.bgPrimary} ${classes.textPrimary}`}>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
