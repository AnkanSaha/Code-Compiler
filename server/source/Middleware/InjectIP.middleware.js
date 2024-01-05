import {Console, Response as Serve, StatusCodes} from 'outers'; // Import red from outers

// Main Function
export default async function InjectIP(Request, Response, Next) {
  try {
    // Allow only PUT, POST, PATCH, DELETE methods
    const AllowedMethods = ['PUT', 'POST', 'PATCH', 'DELETE']; // Allowed Methods

    // Check if Request Method is Allowed
    if (AllowedMethods.includes(Request.method)) {
      // Get IP
      const RequesterIPaddress =
        Request.headers['x-forwarded-for'] ||
        Request.connection.remoteAddress ||
        Request.socket.remoteAddress ||
        Request.socket.remoteAddress; // Get Requester IP Address

      // Inject IP
      Request.body.RequesterIP = RequesterIPaddress; // Inject IP in Request Body
      // Proceed
      Next();
    } else {
      // Proceed without injecting IP
      Next();
    }
  } catch (error) {
    Console.red(`[Middleware] [InjectIP] ${error}`);
    Serve.JSON({
      status: false,
      statusCode: StatusCodes.BAD_REQUEST,
      Title: 'Unable to Get IP',
      message: `Sorry to Say ! we couldn't fetch your IP in this request, so we can't proceed`,
      response: Response,
      data: undefined,
    });
  }
}
