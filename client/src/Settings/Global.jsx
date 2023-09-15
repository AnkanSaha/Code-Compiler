/* eslint-disable no-unused-vars */

import React from "react"; // Import react module

// Import Chakra UI
import { ChakraProvider } from "@chakra-ui/react";

// Install CSS
import "@css/Tailwind.css"; // Import Tailwind CSS

// Install CSS Framework
import "flowbite"; // Import Flowbite CSS
import "daisyui"; // Import DaisyUI CSS

// Import Router File
import MainRouter from "@router/Router"; // Import Router

// Import Some Common Functions
import { Update_InternetStatus } from "@helper/Common"; // Common Functions

// Import Pages
import Loading from "@page/Loading"; // Loading Page

// Import Redux
import { useSelector } from "react-redux"; // Import useSelector hook

export default function Global() {
  // Hooks
  const { LoadingStatus, InternetStatus } = useSelector(
    (state) => state.status
  ); // Get Loading Status from Redux
  Update_InternetStatus(); // Update Internet Status
  return (
    <>
      <ChakraProvider>
        {LoadingStatus === true ? (
          <Loading />
        ) : InternetStatus === true ? (
          <MainRouter />
        ) : (
          <Loading />
        )}
      </ChakraProvider>
    </>
  );
}
