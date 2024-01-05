import {Router} from 'express'; // Router from express

// setup Router
const CompileRouter = Router(); // Main Router

// Import Middlewares
import {InputValidation} from '../../Middleware/CompileCode.Validator.middleware.js'; // Input Validation Middleware

// import Controllers
import Compile from '../../Controllers/CompileCode.controller.js'; // Compile Code Controller

// Routes
CompileRouter.post('/compile', InputValidation, Compile); // Compile Code Route

// export Compile Router
export default CompileRouter; // Export Main Router as default
