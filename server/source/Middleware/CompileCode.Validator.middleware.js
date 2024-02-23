import { StatusCodes, methods } from 'outers' // Import all the required modules

// Input Validation
export const InputValidation = (Request, Response, Next) => {
  // Create Response Instance
  const BAD_REQUEST = new methods.Response.JSON(Response, StatusCodes.BAD_REQUEST, 'json') // Bad Request Response Instance

  if (!Request.body.Code) {
    return BAD_REQUEST.Send(undefined, 'Code is required in Request Body') // Return Error
  }

  if (!Request.body.Language) {
    return BAD_REQUEST.Send(undefined, 'Language is required in Request Body') // Return Error
  }

  if (!Request.body.FileName) {
    return BAD_REQUEST.Send(undefined, 'FileName is required in Request Body') // Return Error
  }

  if (!Request.body.SessionID) {
    return BAD_REQUEST.Send(undefined, 'SessionID is required in Request Body') // Return Error
  }

  Next() // Call Next Middleware Function  if all the above conditions are satisfied
}
