import {Router} from 'express'; // Router from express

// setup Router
const CompileRouter = Router(); // Main Router

// import Controllers
import Compile from '../../Controllers/CompileCode.controller.js'; // Compile Code Controller

// Routes
CompileRouter.post('/compile', Compile); // Compile Code Route

// export Compile Router
export default CompileRouter; // Export Main Router as default
