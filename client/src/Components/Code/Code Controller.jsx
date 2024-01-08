/* eslint-disable no-unused-vars */
import React from "react"; // Import react module
import "@css/General.css"; // General CSS
import { APIservice, API_URL } from "../../App/App_Config"; // APICalls

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
  useToast,
  useDisclosure,
} from "@chakra-ui/react"; // Chakra UI Button

// Import Icons
import CompileIcons from "@assets/compile.png"; // Compile Icons
import DownloadIcons from "@assets/download.png"; // Compile Icons
import AddPackageIcons from "@assets/add.jpeg"; // Add Package Icons

// Redux
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch hook
import { setPackages, setOutput } from "@redux/Components/Code"; // Import setCode action


export default function CodeController() {
  // hooks
  const dispatch = useDispatch(); // Get dispatch from useDispatch hook
  const { Language, FileName, SessionID, Packages, Code } = useSelector((state) => state.Code); // Get code from Redux
  const { isOpen, onOpen, onClose } = useDisclosure(); // Get isOpen, onOpen, onClose from useDisclosure hook
  const ToastMessage = useToast(); // Get toast from useToast hook

  // State
  const [PackageName, setPackageName] = React.useState(""); // Package Name
  const [PackageAction, setPackageAction] = React.useState(false); // Package Action [Add/Remove
  // On Change Functions
  const onPackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  // Function for Add Package
  const AddPackage = () => {
    if (Language === "Javascript"){
      setPackageAction(true); // Set Package Action to true [Add] if Language is not JavaScript
    }
    dispatch(setPackages(PackageName)); // Set Package Name to Redux
    onClose(); // Close Modal
    ToastMessage({
      title: `${PackageName} Package Added`,
      description: `${PackageName} Package Added Successfully`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    setPackageName(""); // Clear Package Name State
  };

  // Function for Compile Code
  const CompileCode = async () => {
    dispatch(setOutput("")); // Set Output to Redux to empty
    if (FileName === "") {
      ToastMessage({
        title: "File Name Empty",
        description: "Please Enter File Name",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }


    document.getElementById("CompileIcons").classList.toggle("RotateButton"); // Rotate Button Icon
    const Response = await APIservice.Post('/api/process/compile', {
      Language: Language,
      FileName: FileName,
      SessionID: SessionID,
      Packages: Packages,
      Code: Code,
    });
 
    if(Response.statusCode === 200){
      dispatch(setOutput(Response.data)); // Set Output to Redux
    }
    else {
      dispatch(setOutput(Response.data.stderr)); // Set Output to Redux
    }
    document.getElementById("CompileIcons").classList.toggle("RotateButton"); // Rotate Button Icon
  };

  // Function for Download File
  const DownloadFile = async () => {
    if (SessionID === "") {
      ToastMessage({
        title: "Session ID Empty",
        description: "Please Compile Code First",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (FileName === "") {
      ToastMessage({
        title: "File Name Empty",
        description: "Please Enter File Name",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    } else if (Language === "") {
      ToastMessage({
        title: "Language Empty",
        description: "Please Select Language",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    document.getElementById("DownloadIcons").classList.toggle("RotateButton"); // Rotate Button Icon
    // Fetch the file from the server & Download it
    const Response = await fetch(`${API_URL}/api/process/download?SessionID=${SessionID}&Language=${Language}`)
  
    // Create a Blob from the response
    const blobDownloader = await Response.blob(); // Create a Blob from the response
    const FileUrl = window.URL.createObjectURL(blobDownloader); // Create a URL for the Blob
    const FileNameFromServer = Response.headers.get('filename'); // Get File Name from Response Headers
    document.getElementById("DownloadIcons").classList.toggle("RotateButton"); // Rotate Button Icon
    
    // Create a temporary anchor element to trigger the download
      const DownloadButton = document.createElement('a'); // Create a anchor tag
      DownloadButton.href = FileUrl;
      DownloadButton.download = FileNameFromServer;
      document.body.appendChild(DownloadButton);
      DownloadButton.click();
      document.body.removeChild(DownloadButton);
  };
  return (
    <div className="fixed ml-[42.25rem] top-[5.75rem] space-x-7">
      <div className="tooltip" data-tip="Compile Code">
        <button className="btn btn-circle btn-outline" onClick={CompileCode}>
          <img
            src={CompileIcons}
            id="CompileIcons"
            className=""
            alt="CompileIcons"
          />
        </button>
      </div>
      <div className="tooltip" data-tip="Add Packages (Only for JavasScript/TypeScript)">
        <button className="btn btn-circle btn-outline" onClick={onOpen} disabled = {PackageAction ? false : true}>
          <img
            src={AddPackageIcons}
            id="AddPackageIcons"
            className=""
            alt="AddPackageIcons"
          />
        </button>
      </div>
      <div className="tooltip" data-tip="Download File">
        <button className="btn btn-circle btn-outline" onClick={DownloadFile}>
          <img
            src={DownloadIcons}
            id="DownloadIcons"
            className=""
            alt="DownloadIcons"
          />
        </button>
      </div>
      {/* Add Packages Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {Language} Packages</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Package Name</FormLabel>
              <Input
                onChange={onPackageNameChange}
                value={PackageName}
                placeholder="Enter The exact package name"
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={AddPackage} colorScheme="green" mr={3}>
              Add Package
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
