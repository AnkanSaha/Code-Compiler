// Import MongoDB
import {MongooseModel} from '../Database/MongoDB.db.js'; // Import MongoDB
import {Response as Serve, Console, StatusCodes} from 'outers'; // Response
import {LangTypesDirectory} from '../core/environment variables.core.js'; // Environmental Variables

// Main Code for Download Code Controller
export default async function DownloadCode(Request, Response) {
  try {
    const {SessionID, Language} = Request.body; // Destructure Request Body
    console.log(SessionID, Language); // Print SessionID and Language
    // Detect is this Language is Interpreted or Compiled
    const LanguageType = LangTypesDirectory.find((element) =>
      element.language.toLowerCase() === Language.toLowerCase()); // Detect Language Type

    console.log(SessionID, Language, LanguageType); // Print SessionID and Language
    // Find Any Documents with the SessionID
    const SessionIDData = await MongooseModel.find({sessionID: SessionID}); // Find SessionID in MongoDB
    console.log(SessionIDData);

    // Download Code if SessionID exists in MongoDB
    if (SessionIDData.length === 0) {
      Serve.JSON({
        response: Response,
        status: false,
        statusCode: StatusCodes.REQUEST_TIMEOUT,
        Title: 'Unable to Download Code',
        message: 'Unable to Download Code, please try again later or contact support',
        data: undefined,
      });
      return; // Return if SessionID does not exist in MongoDB
    }

    // Check if SessionID is Compiled or Interpreted
    if (LanguageType.type === 'interpreted') {
      // Download Code
      try {
        // Set the Content-Disposition header to force download
        Response.setHeader('Content-Disposition', 'attachment; filename=' + SessionIDData[0].FileName); // Set Header
        Serve.File({
          statusCode: StatusCodes.OK,
          response: Response,
          rootName: LanguageType.directoryName,
          Filename: SessionIDData[0].FileName,
        });
      } catch (error) {
        console.log(error); // Print Error
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.REQUEST_TIMEOUT,
          Title: 'Unable to Download Code',
          message: 'Unable to Download Code, please try again later or contact support',
          data: error,
        });
      }
    }
  } catch (error) {
    Console.red(error); // Print When Error
    Serve.JSON({
      response: Response,
      status: false,
      statusCode: StatusCodes.REQUEST_TIMEOUT,
      Title: 'Unable to Download Code',
      message: 'Unable to Download Code, please try again later or contact support',
    });
  }
}
