/* eslint-disable no-unused-vars */
import React from "react"; // Import react module

// Redux
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch hook
import { setLanguage, setCode, setSessionID } from "@redux/Components/Code"; // Import setCode action

// Import Router
import { useParams } from "react-router-dom"; // Import useParams hook

// Import Data
import { CodeSnippet } from "@app/Data/Code Enter Board Sample"; // Import CodeSnippet from Code Enter Board Sample

export default function CodeEnterSide() {
  // Hooks
  const { language } = useParams(); // Get language from URL
  const dispatch = useDispatch(); // Get dispatch from useDispatch hook
  const {Code} = useSelector((state) => state.Code); // Get state from useSelector hook


  React.useEffect(() => {
    const matchedElement = CodeSnippet.find(
      (element) => element.Language === language
    );

    if (matchedElement) {
      dispatch(setCode(matchedElement.Code)); // Set code snippet to redux
      dispatch(setLanguage(matchedElement.Language)); // Set language to redux
      dispatch(setSessionID(crypto.randomUUID())); // Set session ID to redux
    } else {
      dispatch(setCode("")); // Set code snippet to redux to empty
      dispatch(setLanguage("")); // Set language to redux to empty
      dispatch(setSessionID("")); // Set session ID to redux to empty
    }
  }, [dispatch, language]);

  // Onchange Event Listener
  const CodeEntry = (event) => {
    dispatch(setCode(event.target.value)); // Set code snippet to redux
  };


  return (
    <div className="mx-5 mt-10">
      <textarea
        onChange={CodeEntry}
        rows="18"
        cols="48"
        className="mockup-code w-6/12 px-10"
        placeholder={`Enter or Paste your ${language} code here`}
        defaultValue={Code}
        wrap="off"
        autoCapitalize="off"
        autoCorrect="off"
        spellCheck="false"
      ></textarea>
    </div>
  );
}
