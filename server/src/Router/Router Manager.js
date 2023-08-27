const {Router} = require('express'); // import Router
const ExpressRateLimit = require('express-rate-limit'); // Import Express Rate Limit

// Import Helpers
const {JSONSendResponse} = require('../Helper/Response'); // Import Response
const {StatusCodes} = require('../config/keys/keys'); // Import Keys

// Create Router
const Manager = Router(); // Create Router

// Apply Rate Limit
Manager.use(ExpressRateLimit({
    windowMs: 10 * 60 * 1000, // 10 Minutes
    max: 15, // Max Request
    message: {
        Code:StatusCodes.TOO_MANY_REQUESTS,
        Title: 'Too Many Requests',
        message: 'You have exceeded the 15 requests in 10 minutes limit!',
    } // Message
}));


// Link All Sub Routers
Manager.use('/get', ()=>{}); // Link Get Router
Manager.use('/post', ()=>{}); // Link Post Router
Manager.use('/put', ()=>{}); // Link Put Router
Manager.use('/delete', ()=>{}); // Link Delete Router

// Send Response if any request is not allowed
Manager.all('*', (Request, Response) => {
    JSONSendResponse({
        status: false,
        statusCode: StatusCodes.NOT_FOUND,
        Title: 'URL Not Found',
        message: 'Requested url is not found on this server, please check your url and try again',
        response: Response,
        data: {
            requestedUrl: Request.url,
            requestedMethod: Request.method,
            requestedBody: Request.body,
            requestedHeaders: Request.headers
        }
    }); // Send Response if Method is not allowed
})


// Export Router
module.exports = Manager; // Export Router