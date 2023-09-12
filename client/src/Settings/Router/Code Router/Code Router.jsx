// Import Router
import { Routes, Route } from "react-router-dom"; // Import Router

// Import Pages
import CodePage from "@page/CodePage"; // CodePage

export default function CodeRouter() {
  return (
    <Routes>
      <Route path="/javascript" element={<CodePage Language="Javascript" />} />
    </Routes>
  );
}
