/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

// Import Components
import Sidebar from "@component/General/SideBar"; // Sidebar
import Navbar from "@component/General/Navbar"; // Navbar

// Import Function
import {Update_Document_Title} from '@helper/Common'; // Common Functions

export default function CodePage({Language}) {
  Update_Document_Title(`${Language} Code`); // Update Document Titles
  return (
    <>
      <Navbar />
      <Sidebar/>
    </>
  );
}

CodePage.defaultProps = {
  Language: "Programming",
}
