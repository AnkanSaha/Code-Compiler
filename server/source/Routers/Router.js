import {Router} from 'express'; // Router from express
import {StatusCodes, Response as Serve} from 'outers'; // Import Status Codes

// setup Router
const MainRouter = Router(); // Main Router

// import All Sub Routers
import CompileRouter from './Routes/CompileCode.Routes.js'; // Compile Code Router

// Link All Sub Routers to Main Router
MainRouter.use('/post', CompileRouter); // Compile Code Router

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
