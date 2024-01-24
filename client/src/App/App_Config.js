// API URL

// API Controller
import { React as Service } from "react-caches";
export const isDevelopment = import.meta.env.DEV; // Check if the app is in development mode
export const AppName = "Code Compiler"; // Name of the App
export const API_URL =
  isDevelopment === true ? "http://localhost:4896" : window.location.origin; // Import React Caches
export const APIservice = new Service.ClassBasedFunctions.API({
  APIBaseDomain: API_URL,
}); // Register API Service
