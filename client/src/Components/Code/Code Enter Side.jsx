/* eslint-disable no-unused-vars */
import React from "react"; // Import react module

// Redux
import { useDispatch } from "react-redux"; // Import useDispatch hook
import { setLanguage, setCode, setSessionID } from "@redux/Components/Code"; // Import setCode action

// Import Router
import { useParams } from "react-router-dom"; // Import useParams hook

// Import Data
import { CodeSnippet } from "@app/Data/Code Enter Board Sample"; // Import CodeSnippet from Code Enter Board Sample

export default function CodeEnterSide() {
  // Hooks
  const { language } = useParams(); // Get language from URL
  const dispatch = useDispatch(); // Get dispatch from useDispatch hook

  // State
  const [codeSnippet, setCodeSnippet] = React.useState(""); // Set code state

  React.useEffect(() => {
    const matchedElement = CodeSnippet.find(
      (element) => element.Language === language
    );

    if (matchedElement) {
      setCodeSnippet(matchedElement.Code); // Set code snippet
      dispatch(setCode(matchedElement.Code)); // Set code snippet to redux
      dispatch(setLanguage(matchedElement.Language)); // Set language to redux
      dispatch(setSessionID(crypto.randomUUID())); // Set session ID to redux
    } else {
      setCodeSnippet("");
    }
  }, [dispatch, language]);

  // Onchange Event Listener
  const CodeEntry = (event) => {
    setCodeSnippet(event.target.value); // Set code snippet to state
    dispatch(setCode(event.target.value)); // Set code snippet to redux
  };

  return (
    <div className="mx-5 mt-10">
      <textarea
        onChange={CodeEntry}
        rows="19"
        cols="50"
        className="mockup-code w-6/12 px-10"
        placeholder={`Enter or Paste your ${language} code here`}
        defaultValue={codeSnippet}
        wrap="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      ></textarea>
    </div>
  );
}
