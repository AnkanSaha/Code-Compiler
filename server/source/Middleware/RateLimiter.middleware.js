import rateLimiter from 'express-rate-limit'; // Express Rate Limiter
import { StatusCodes } from 'outers'; // Import Status Codes

// Rate Limiter Middleware Function
export default rateLimiter({
  windowMs: 60 * 1000, // 1 Minute
  statusCode: StatusCodes.TOO_MANY_REQUESTS, // Too Many Requests
  max: 15, // 15 requests
  message: {
    status: false,
    statusCode: StatusCodes.TOO_MANY_REQUESTS,
    Title: 'Too many requests',
    message: 'Too many requests, please try again later',
    response: undefined,
  }, // Message
  standardHeaders: true, // Include standard headers for request limit
  legacyHeaders: false, // Include legacy headers for request limit
}); // Rate Limiter Middleware
