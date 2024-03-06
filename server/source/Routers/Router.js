import { Router } from 'express' // Router from express
import { StatusCodes, Serve, Middleware } from 'outers' // Import Status Codes
import { StringKeys } from '../core/environment variables.core.js' // Import variables

// Middleware Imports
import rateLimiter from '../Middleware/RateLimiter.middleware.js' // Express Rate Limiter
import CORS from '../Middleware/CORS.middleware.js' // Inject IP Middleware Function

// import All Sub Routers
import CompileRouter from './Routes/CompileCode.Routes.js' // CORS Middleware

// setup Router
const MainRouter = Router() // Main Router

// Attach Security Middleware to Protect API Endpoints
MainRouter.use(Middleware.MethodsController()) // Allow only GET, POST, PUT, DELETE
MainRouter.use(rateLimiter) // Rate Limiter Middleware
MainRouter.use(CORS) // CORS Config
MainRouter.use(Middleware.AccessController([new URL(StringKeys.CORS_URL).hostname])) // Allow access to only allowed URL
MainRouter.use(Middleware.RequestInjectIP(['POST', 'PUT', 'DELETE'])) // Environment Variables

// Link All Sub Routers to Main Router
MainRouter.use('/process', CompileRouter) // Compile Code Router

// Response Not Allowed Request
MainRouter.all('*', (Request, Response) => {
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
      requestedHeaders: Request.headers
    }
  }) // Response Not Allowed Request
}) // Not Allowed Request

// Export Main Router
export default MainRouter // Export Main Router as default
