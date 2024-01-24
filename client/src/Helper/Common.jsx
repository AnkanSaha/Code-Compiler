import { useDispatch } from "react-redux"; // import useDispatch hook from react-redux

// Import All Actions
import { setInternetStatus, setLoadingMessage } from "@redux/Components/Status";

// Import APP Name
import { AppName } from "@app/App_Config"; // Import setInternetStatus Action

export function Update_InternetStatus() {
  const Updater = useDispatch(); // initialize the useDispatch hook

  window.addEventListener("offline", () => {
    // add event listener for offline
    Updater(setLoadingMessage("You are Offline")); // Update the Loading Message
    Updater(setInternetStatus(false)); // Update the Internet Status to false
  });
  window.addEventListener("online", async () => {
    // add event listener for online
    Updater(setInternetStatus(true)); // Update the Internet Status to true
  });
}

export function Update_Document_Title(Title) {
  document.title = `${Title} - ${AppName}`;
}
