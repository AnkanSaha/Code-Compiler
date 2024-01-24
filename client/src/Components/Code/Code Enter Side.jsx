/* eslint-disable no-unused-vars */
import React from "react"; // Import react module
import Typed from "typed.js"; // Import Typed.js

// Redux
import { useDispatch } from "react-redux"; // Import useDispatch hook
import {
  setLanguage,
  setCode,
  setSessionID,
  setFileName,
  setPackages,
} from "@redux/Components/Code"; // Import setCode action

// Import Components
import {
  Button,
  ModalFooter,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  useToast,
} from "@chakra-ui/react"; // Chakra UI Button

// Import Router
import { useParams } from "react-router-dom"; // Import useParams hook

// Import Data
import { CodeSnippet } from "@app/Data/Code Enter Board Sample"; // Import CodeSnippet from Code Enter Board Sample

export default function CodeEnterSide() {
  // Hooks
  const { language } = useParams(); // Get language from URL
  const dispatch = useDispatch(); // Get dispatch from useDispatch hook
  const { isOpen, onOpen, onClose } = useDisclosure(); // Get isOpen, onOpen, onClose from useDisclosure hook
  const ToastMessage = useToast(); // Get toast from useToast hook

  // States
  const [InitialCodeSnippet, setInitialCodeSnippet] = React.useState(""); // Set CodeSnippet to empty
  const [FileName, UpdateFileName] = React.useState(""); // Set FileName to empty

  // References
  const InitialCodeSnippetRef = React.useRef(null); // Set InitialCodeSnippetRef to null

  // Effects for InitialCodeSnippet animation
  React.useEffect(() => {
    const typed = new Typed(InitialCodeSnippetRef.current, {
      strings: [InitialCodeSnippet],
      typeSpeed: 10,
      loop: false,
      cursorChar: "",
    });

    return () => {
      // Destroy Typed instance during cleanup to stop animation
      typed.destroy();
    };
  }, [InitialCodeSnippet]);

  // Effects for Code finding right code snippet
  React.useEffect(() => {
    onOpen(); // Open Modal
    dispatch(setFileName("")); // Set FileName to empty
    const matchedElement = CodeSnippet.find(
      (element) => element.Language === language,
    );

    if (matchedElement) {
      dispatch(setCode(matchedElement.Code)); // Set code snippet to redux
      dispatch(setLanguage(matchedElement.Language)); // Set language to redux
      dispatch(setSessionID(crypto.randomUUID())); // Set session ID to redux
      setInitialCodeSnippet(matchedElement.Code); // Set CodeSnippet to matchedElement.Code
    } else {
      dispatch(setCode("")); // Set code snippet to redux to empty
      dispatch(setLanguage("")); // Set language to redux to empty
      dispatch(setSessionID("")); // Set session ID to redux to empty
      setInitialCodeSnippet(""); // Set CodeSnippet to empty
    }
  }, [dispatch, language, onOpen]);

  // Onchange Event Listener
  const CodeEntry = (event) => {
    dispatch(setCode(event.target.value)); // Set code snippet to redux
  };

  // Onchange Event Listener
  const onFileNameChange = (e) => {
    UpdateFileName(e.target.value);
  };

  // On Submit Event Listener
  const SetFileNameInRedux = () => {
    const LanguageDetails = CodeSnippet.find(
      (item) => item.Language === language,
    ); // Get Language Details

    // Check if FileName includes extension
    if (FileName.includes(LanguageDetails.Extension)) {
      ToastMessage({
        title: "Do not include extension",
        description: "Do not include extension in file name",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    dispatch(setFileName(`${FileName}${LanguageDetails.Extension}`)); // Set FileName in Redux
    onClose(); // Close Modal
    ToastMessage({
      title: "File Name Set Successfully",
      description: `File Name Set Successfully, Now you can compile your code with ${FileName}${LanguageDetails.Extension}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    UpdateFileName(""); // Clear FileName State
  };
  return (
    <>
      <div className="mx-5 mt-[5rem]">
        <textarea
          onChange={CodeEntry}
          ref={InitialCodeSnippetRef}
          rows="16"
          cols="48"
          className="mockup-code w-8/12 px-10"
          placeholder={`Enter or Paste your ${language} code here`}
          wrap="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />
      </div>
      {/* Add Packages Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Set File Name</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>File Name without extension</FormLabel>
              <Input
                onChange={onFileNameChange}
                value={FileName}
                placeholder="Enter The exact file name without extension"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={SetFileNameInRedux} colorScheme="green" mr={3}>
              Set File Name
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
