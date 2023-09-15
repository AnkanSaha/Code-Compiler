/* eslint-disable no-unused-vars */
import React from "react";

// Import Components
import Sidebar from "@component/General/SideBar"; // Sidebar
import Navbar from "@component/General/Navbar"; // Navbar
import Footer from "@component/General/Footer";
import HomeOptions from '@component/General/Home Options'; // Home Options

// Import Function
import {Update_Document_Title} from '@helper/Common'; // Common Functions

const Home = () => {
  Update_Document_Title('Home'); // Update Document Titles
  return (
    <>
      <Navbar />
      <Sidebar />
      <HomeOptions />
      <Footer FooterStyle="static" />
    </>
  );
};

export default Home; // Don't forget to export the component!
