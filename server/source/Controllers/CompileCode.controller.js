// import fs from 'fs'; // File System Module
// import {join} from 'path'; // Import the path module
// import {StringKeys} from '../core/environment variables.core.js'; // Import Environment Variables
import {Response as Serve, StatusCodes} from 'outers'; // Import Response from Outers

// Import MongoDB
import {MongooseModel} from '../Database/MongoDB.db.js'; // Import MongoDB

// Main Compile Code Controller
export default async function Compile(Request, Response) {
  // Write Code to Uncompiled File Directory
  const {SessionID} = Request.body; // Destructure Request Body
  console.log(Request.body);

  // Find sessionID in MongoDB if it exists
  const ExistSessionID = await MongooseModel.find({sessionID: SessionID}); // Find SessionID in MongoDB
  console.log(ExistSessionID);

  // Check if SessionID exists in MongoDB
  if (ExistSessionID.length === 0) {
    Response.status(404).send('SessionID does not exist in MongoDB'); // Send 404 Status Code
    return; // Return
  } else if (ExistSessionID.length > 1) {
    Response.status(500).send('SessionID exists more than once in MongoDB'); // Send 500 Status Code
    return; // Return
  } else {
    Serve.JSON({
      response: Response,
      status: false,
      statusCode: StatusCodes.REQUEST_TIMEOUT,
      Title: 'Unable to Compile Code',
      message: 'Unable to Compile Code, please try again later or contact support',
      data: undefined,
    });
  }
  // // Write Code to File
  // await fs.promises.writeFile(`${join(`${StringKeys.InterpretedLangDirectoryName}/${FileName}`)}`,
  //     Code, 'utf-8'); // Write Code to File
}
