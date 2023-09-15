// Import Router
import { Routes, Route } from "react-router-dom"; // Import Router

// Import Pages
import CodePage from "@page/Code/CodePage"; // CodePage

export default function CodeRouter() {
  return (
    <Routes>
      <Route path="/:language" element={<CodePage />} />
    </Routes>
  );
}
