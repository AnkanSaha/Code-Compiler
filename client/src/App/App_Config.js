export const isDevelopment = import.meta.env.DEV; // Check if the app is in development mode
export const AppName = 'Code Editor'; // Name of the App
export const API_URL = isDevelopment === true ? 'http://localhost:3000' : window.location.origin; // API URL