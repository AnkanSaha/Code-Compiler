const {Router} = require('express'); // import Router
const ExpressRateLimit = require('express-rate-limit'); // Import Express Rate Limit

// Import Helpers
const {StatusCodes} = require('../config/keys/keys'); // Import Keys

//Import controllers
const compilerController = require('../Controller/compileController.js')

// Create Router
const Compile = Router(); // Create Router

// Apply Rate Limit
Compile.use(ExpressRateLimit({
    windowMs: 10 * 60 * 1000, // 10 Minutes
    max: 15, // Max Request
    message: {
        Code:StatusCodes.TOO_MANY_REQUESTS,
        Title: 'Too Many Requests',
        message: 'You have exceeded the 15 requests in 10 minutes limit!',
    } // Message
}));


// Link All Sub Routers
Compile.post('/compile', compilerController.compile); // Link Post Router


// Export Router
module.exports = Compile; // Export Router