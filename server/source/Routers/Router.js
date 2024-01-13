import {Router} from 'express'; // Router from express
import {StatusCodes, Serve} from 'outers'; // Import Status Codes
import CORS from 'cors'; // Cors Module
import {StringKeys} from '../core/environment variables.core.js'; // Environment Variables

// setup Router
const MainRouter = Router(); // Main Router

// Setup Cors Config
MainRouter.use(CORS({
  origin: StringKeys.CORS_URL, // Allow Only This URL to Access
  credentials: true, // Allow Client To Send Cookies or Credentials to Server
  allowedHeaders: ['Authorization', 'Content-Type', 'filename'], // Allow Only These Headers from Client to Server
  exposedHeaders: ['filename', 'Content-Disposition'], // Expose Custom Headers to Client from Server
  maxAge: 86400, // 1 Day
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow Only These Methods
  optionsSuccessStatus: StatusCodes.CONTINUE, // Set Status Code for OPTIONS Request
  preflightContinue: true, // Continue if OPTIONS Request
})); // CORS Config

// import All Sub Routers
import CompileRouter from './Routes/CompileCode.Routes.js'; // Compile Code Router

// Link All Sub Routers to Main Router
MainRouter.use('/process', CompileRouter); // Compile Code Router

// Response Not Allowed Request
MainRouter.all('*', (Request, Response)=>{
  Serve.JSON({
    response: Response,
    status: false,
    statusCode: StatusCodes.BAD_REQUEST,
    Title: 'Not Allowed Request',
    message: 'You are not allowed to access this route or method',
    data: {
      requestedUrl: Request.url,
      requestedMethod: Request.method,
      requestedBody: Request.body,
      requestedHeaders: Request.headers,
    },
  }); // Response Not Allowed Request
}); // Not Allowed Request

// Export Main Router
export default MainRouter; // Export Main Router as default
