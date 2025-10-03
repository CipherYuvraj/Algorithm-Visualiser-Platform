import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children, theme, onThemeChange }) => {
  return (
    <div className="min-h-screen">
      <Navbar theme={theme} onThemeChange={onThemeChange} />
      <main className="pt-16">{children}</main>
      <Footer theme={theme} />
    </div>
  );
};

export default Layout;
