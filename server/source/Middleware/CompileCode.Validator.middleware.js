import {Response as Serve, StatusCodes} from 'outers'; // Import all the required modules

// Input Validation
export const InputValidation = (Request, Response, Next) => {
  if (!Request.body.Code) {
    return Serve.JSON({
      response: Response,
      message: 'Code is required in Request Body',
      Title: 'Input Validation Error',
      status: false,
      statusCode: StatusCodes.BAD_REQUEST,
      data: undefined,
    });
  }

  if (!Request.body.Language) {
    return Serve.JSON({
      response: Response,
      message: 'Language is required in Request Body',
      Title: 'Input Validation Error',
      status: false,
      statusCode: StatusCodes.BAD_REQUEST,
      data: undefined,
    });
  }

  if (!Request.body.FileName) {
    return Serve.JSON({
      response: Response,
      message: 'FileName is required in Request Body',
      Title: ' File Name Validation Error',
      status: false,
      statusCode: StatusCodes.BAD_REQUEST,
      data: undefined,
    });
  }

  if (!Request.body.SessionID) {
    return Serve.JSON({
      response: Response,
      message: 'SessionID is required in Request Body',
      Title: 'Session ID Validation Error',
      status: false,
      statusCode: StatusCodes.BAD_REQUEST,
      data: undefined,
    });
  }

  Next(); // Call Next Middleware Function  if all the above conditions are satisfied
};
