/* eslint-disable no-unused-vars */

import React from 'react'; // Import react module
// Import Pages
import CodePage from '@page/CodePage'; // CodePage

// Import Chaakra UI
import { ChakraProvider } from '@chakra-ui/react'

import 'flowbite'; // Import Flowbite CSS
import 'daisyui'; // Import DaisyUI CSS

function Global() {
  return (
   <>
   <ChakraProvider>
    <CodePage />
   </ChakraProvider>
   </>
  )
}

export default Global; // export default Global;
