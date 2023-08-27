// Note: Response Helper Module
module.exports.JSONSendResponse = (response, statusCode, Title, message, data) => {
    response.status(statusCode).json({
        StatusCode: statusCode,
        Title: Title,
        Message: message,
        Data: data
    }); // Send Response
}

// File Response Helper Module
module.exports.SendFileResponse = (response, statusCode, Filename, rootName) => {
    response.status(statusCode).sendFile(Filename, { root: rootName });
};