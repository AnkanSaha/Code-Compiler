/* eslint-disable no-unused-vars */
import React from "react"; // Import react module
import "@css/General.css"; // General CSS
import { APIservice } from "../../App/App_Config"; // APICalls

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
import { setLoadingStatus, setLoadingMessage } from "@redux/Components/Status"; // Import setCode action


export default function CodeController() {
  // hooks
  const dispatch = useDispatch(); // Get dispatch from useDispatch hook
  const { Language, FileName, SessionID, Packages, Code } = useSelector((state) => state.Code); // Get code from Redux
  const { isOpen, onOpen, onClose } = useDisclosure(); // Get isOpen, onOpen, onClose from useDisclosure hook
  const ToastMessage = useToast(); // Get toast from useToast hook

  // State
  const [PackageName, setPackageName] = React.useState(""); // Package Name

  // On Change Functions
  const onPackageNameChange = (e) => {
    setPackageName(e.target.value);
  };

  // Function for Add Package
  const AddPackage = () => {
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
    const Response = await APIservice.Post('/api/post/compile', {
      Language: Language,
      FileName: FileName,
      SessionID: SessionID,
      Packages: Packages,
      Code: Code,
    });
    console.log(Response)
    if(Response.statusCode === 200){
      dispatch(setOutput(Response.data)); // Set Output to Redux
    }
    else {
      dispatch(setOutput(Response.data.stderr)); // Set Output to Redux
    }
    document.getElementById("CompileIcons").classList.toggle("RotateButton"); // Rotate Button Icon
  };

  // Function for Download File
  const DownloadFile = () => {
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
    dispatch(setLoadingMessage("File will be downloaded soon..."));
    dispatch(setLoadingStatus(true));
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
        <button className="btn btn-circle btn-outline" onClick={onOpen}>
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
