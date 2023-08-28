const {StatusCodes} = require('../config/keys/keys'); // Importing the keys
const {JSONSendResponse} = require('../Helper/Response'); // Importing the Response Helper Module

// All Variables for send response
const AllowedMethods = ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS']; // Allowed Methods

module.exports.CheckHeader = (req, res, next) => {
    if(!req.headers){
        const ResponseContent = {
            status: false,
            statusCode: StatusCodes.FORBIDDEN,
            Title: 'Request Headers not found',
            message: 'Request Headers not found or not set',
            response: res,
            data: {
                requestedUrl: req.url,
                requestedMethod: req.method,
                requestedBody: req.body,
                requestedHeaders: req.headers
            }
        }
        JSONSendResponse(ResponseContent); // Send Response to Client
    }
    else if(!AllowedMethods.includes(req.method)){
        const ResponseContent = {
            status: false,
            statusCode: StatusCodes.METHOD_NOT_ALLOWED,
            Title: 'Request Method not allowed',
            message: 'Request Method not allowed for this url, please check the url and try again',
            response: res,
            data: {
                requestedUrl: req.url,
                requestedMethod: req.method,
                requestedBody: req.body,
                requestedHeaders: req.headers
            }
        }
        JSONSendResponse(ResponseContent); // Send Response to Client
    }
    else {
        next(); // Go to next middleware
    }
}