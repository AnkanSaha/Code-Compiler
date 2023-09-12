/* eslint-disable no-unused-vars */
import React from "react"; // Import react module

// Import Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Import Router


// Import Pages
import CodePage from '@page/CodePage'; // CodePage

export default function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodePage />} />
      </Routes>
    </Router>
  );
}
