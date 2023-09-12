import { useDispatch } from "react-redux"; // import useDispatch hook from react-redux

// Import All Actions
import {setInternetStatus} from '@redux/Components/Status'; // Import setInternetStatus Action
 
export function Update_InternetStatus(){
    const Updater = useDispatch(); // initialize the useDispatch hook

    window.addEventListener("offline", () => {
        // add event listener for offline
        Updater(setInternetStatus(false)); // Update the Internet Status to false
      });
      window.addEventListener("online", async () => {
        // add event listener for online
        Updater(setInternetStatus(true)); // Update the Internet Status to true
      })
    }