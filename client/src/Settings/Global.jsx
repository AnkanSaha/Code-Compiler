/* eslint-disable no-unused-vars */

import React from 'react'; // Import react module

// Import Chakra UI
import { ChakraProvider } from '@chakra-ui/react'

// Install CSS
import '@css/Tailwind.css'; // Import Tailwind CSS

// Install CSS Framework
import 'flowbite'; // Import Flowbite CSS
import 'daisyui'; // Import DaisyUI CSS

// Import Router File
import MainRouter from '@router/Router'; // Import Router

// Import Some Common Functions
import {Update_InternetStatus} from '@helper/Common'

export default function Global() {
  Update_InternetStatus(); // Update Internet Status
  return (
   <>
   <ChakraProvider>
   <MainRouter />
   </ChakraProvider>
   </>
  )
}
