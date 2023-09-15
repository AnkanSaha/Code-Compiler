/* eslint-disable no-unused-vars */
import React from "react"; // Import react module

// Import Components
import { textarea } from "daisyui"; // Import textarea from daisyui

// Redux
import { useSelector } from "react-redux"; // Import useSelector from react-redux

export default function Output() {
  // Hooks
  const Output = useSelector((state) => state.Code.Output); // Get Output from Redux
  return (
    <div>
      <textarea
        rows="16"
        disabled={true}
        cols="48"
        className="textarea textarea-bordered top-[7rem] ml-[56.25rem] fixed"
        placeholder="Output will be shown here"
        value={Output}
      ></textarea>
    </div>
  );
}
