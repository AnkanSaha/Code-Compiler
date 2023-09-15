/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react"; // Import react module
import  {useParams} from "react-router-dom"; // Import useParams hook

// Import Components
import Sidebar from "@component/General/SideBar"; // Sidebar
import Navbar from "@component/General/Navbar"; // Navbar
import CodeEnterSide from "@component/Code/Code Enter Side"; // Code Enter Side
import CodeController from "@component/Code/Code Controller"; // Code Controller
import Output from "../../Components/Code/Output"; // Output

// Import Function
import {Update_Document_Title} from '@helper/Common'; // Common Functions

export default function CodePage() {
  // Hooks
  const {language} = useParams(); // Get language from URL
  Update_Document_Title(`${language} Code`); // Update Document Titles
  return (
    <>
      <Navbar />
      <CodeEnterSide />
      <CodeController />
      <Output />
      <Sidebar />
    </>
  );
}