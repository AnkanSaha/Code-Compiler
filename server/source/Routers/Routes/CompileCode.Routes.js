import {Router} from 'express'; // Main Router

// Import Middlewares
import {InputValidation} from '../../Middleware/CompileCode.Validator.middleware.js'; // Input Validation Middleware

// import Controllers
import Compile from '../../Controllers/CompileCode.controller.js'; // Compile Code Controller
import DownloadCode from '../../Controllers/DownloadCode.controller.js'; // Router from express

// setup Router
const CompileRouter = Router(); // Download Code Controller

// Routes
CompileRouter.post('/compile', InputValidation, Compile); // Compile Code Route
CompileRouter.get('/download', DownloadCode); // Download Code Route

// export Compile Router
export default CompileRouter; // Export Main Router as default
