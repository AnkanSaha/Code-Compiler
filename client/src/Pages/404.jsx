/* eslint-disable no-unused-vars */
import React from "react";

// Import Components
import Sidebar from "@component/General/SideBar"; // Sidebar
import Navbar from "@component/General/Navbar"; // Navbar
import Footer from "@component/General/Footer";

// Import Function
import { Update_Document_Title } from "@helper/Common"; // Common Functions

export default function NotFound() {
  Update_Document_Title("404 { Page Not Found }"); // Update Document Title by calling Update_Document_Title function
  return (
    <div>
      <Navbar NavbarTitle="404 { Page Not Found }" />
      <Sidebar/>
      <Footer />
    </div>
  );
}
