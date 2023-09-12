/* eslint-disable no-unused-vars */
import React from "react"; // Import react module

// Import Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router

// Import Pages
import Home from "@page/Home"; // CodePage

// Import Sub Routers
import CodeRouter from "@router/Code Router/Code Router"; // Code Router

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code/*" element={<CodeRouter />} />
      </Routes>
    </Router>
  );
}
