/* eslint-disable no-unused-vars */
import React from "react"; // Import react module

// Import Components
import { CircularProgress, Text } from "@chakra-ui/react"; // Chakra UI Circular Progress

// Import Redux
import { useSelector } from "react-redux"; // Import useSelector hook

export default function Loading() {
  // Hooks
  const LoadingMessage = useSelector((state) => state.status.LoadingMessage); // Get Loading Status from Redux
  return (
    <div>
      <CircularProgress
        isIndeterminate
        color="red.700"
        className="ml-[41.25rem] mt-[14.25rem]"
      />
      <br />
      <Text fontSize="4xl" className="text-center mt-10">
        {LoadingMessage}
      </Text>
    </div>
  );
}
