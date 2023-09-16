/* eslint-disable no-unused-vars */
import React from "react"; // Import react module
import Typed from "typed.js"; // Import Typed.js

// Import Components
import { textarea } from "daisyui"; // Import textarea from daisyui

// Redux
import { useSelector, useDispatch } from "react-redux"; // Import useSelector from react-redux

// Redux Controller
import { setOutput } from "@redux/Components/Code"; // Import setOutput action

export default function Output() {
  // Hooks
  const Output = useSelector((state) => state.Code.Output); // Get Output from Redux
  const dispatch = useDispatch(); // Get dispatch from useDispatch hook

 // References
 const OutputRef = React.useRef(null); // Set InitialCodeSnippetRef to null

   // Effects for InitialCodeSnippet animation
   React.useEffect(() => {
    const typed = new Typed(OutputRef.current, {
      strings: [Output],
      typeSpeed: 10,
      loop: false,
      cursorChar: "_",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [Output]);

  // Effect For Output Clear
  React.useEffect(() => {
    dispatch(setOutput("")); // Set Output to empty
  }, [dispatch]);

  return (
    <div>
      <textarea
        rows="15"
        disabled={true}
        cols="48"
        className="textarea textarea-bordered top-[9rem] ml-[57.25rem] fixed"
        placeholder="Output will be shown here"
        ref={OutputRef}
        // value={Output}
      ></textarea>
    </div>
  );
}
