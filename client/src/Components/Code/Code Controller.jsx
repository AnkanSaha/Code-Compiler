/* eslint-disable no-unused-vars */
import React from "react"; //

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
import { SiCompilerexplorer } from "react-icons/si"; // Si Compiler Explorer Icon
import { ImBoxAdd } from "react-icons/im"; // Im Box Add Icon
import { FaDownload } from "react-icons/fa"; // Fa Download Icon
import { MdLockReset } from "react-icons/md"; // Md Lock Reset Icon

// Redux
import { useDispatch, useSelector } from "react-redux"; // Import useDispatch hook
import { setCode, setPackages } from "@redux/Components/Code"; // Import setCode action
import { setLoadingStatus, setLoadingMessage } from "@redux/Components/Status"; // Import setCode action

export default function CodeController() {
  // hooks
  const dispatch = useDispatch(); // Get dispatch from useDispatch hook
  const { Language, FileName, SessionID } = useSelector((state) => state.Code); // Get code from Redux
  const { isOpen, onOpen, onClose } = useDisclosure(); // Get isOpen, onOpen, onClose from useDisclosure hook
  const ToastMessage = useToast(); // Get toast from useToast hook

  // State
  const [PackageName, setPackageName] = React.useState(""); // Package Name

  // Function for Reset Code
  const ResetCode = () => {
    dispatch(setLoadingMessage("Resetting Code..."));
    dispatch(setLoadingStatus(true));
    dispatch(setCode(""));
    dispatch(setLoadingStatus(false));
  };

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
  const CompileCode = () => {
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
    dispatch(setLoadingMessage("Compiling Code..."));
    dispatch(setLoadingStatus(true));
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
    <div className="ml-[43.5rem] fixed top-[11.75rem] space-y-12">
      <Button
        leftIcon={<SiCompilerexplorer />}
        rightIcon={<SiCompilerexplorer />}
        colorScheme="green"
        onClick={CompileCode}
      >
        Compile Code
      </Button>
      <br />
      <Button
        leftIcon={<ImBoxAdd />}
        rightIcon={<ImBoxAdd />}
        colorScheme="blue"
        onClick={onOpen}
      >
        {" "}
        Add Packages{" "}
      </Button>
      <br />
      <Button
        leftIcon={<FaDownload />}
        rightIcon={<FaDownload />}
        colorScheme="red"
        onClick={DownloadFile}
      >
        {" "}
        Download File{" "}
      </Button>
      <br />
      <Button
        leftIcon={<MdLockReset />}
        rightIcon={<MdLockReset />}
        colorScheme="purple"
        onClick={ResetCode}
      >
        {" "}
        Clear Editor{" "}
      </Button>

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
