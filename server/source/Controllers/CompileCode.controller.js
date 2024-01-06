import fs from 'fs'; // File System Module
import {join} from 'path'; // Import the path module
// import {StringKeys} from '../core/environment variables.core.js'; // Import Environment Variables
import {Response as Serve, StatusCodes} from 'outers'; // Import Response from Outers
import {LangTypesDirectory} from '../core/environment variables.core.js'; // Environmental Variables

// Import MongoDB
import {MongooseModel} from '../Database/MongoDB.db.js'; // Import MongoDB

// Main Compile Code Controller
export default async function Compile(Request, Response) {
  // Write Code to Uncompiled File Directory
  const {SessionID, Language, Code, FileName, Packages, RequesterIP} = Request.body; // Destructure Request Body
  console.log(Request.body);

  // Select Preferred Directory
  const PreferredDir = LangTypesDirectory.find((element) =>
    element.language.toLowerCase() === Language.toLowerCase()); // Find Preferred Directory
  console.log(Language);
  const FullPathOfFile = `${join(`${PreferredDir.directoryName}/${SessionID}-${FileName}`)}`; // Full Path of File to be Compiled

  // Find sessionID in MongoDB if it exists
  const ExistSessionID = await MongooseModel.find({sessionID: SessionID}); // Find SessionID in MongoDB
  console.log(ExistSessionID);

  // Check if SessionID exists in MongoDB
  if (ExistSessionID.length === 0) {
  // // Write Code to File
    await fs.promises.writeFile(FullPathOfFile,
        Code, 'utf-8'); // Write Code to File System if SessionID does not exist in MongoDB
  } else if (ExistSessionID.length > 1) {
    Response.status(500).send('SessionID exists more than once in MongoDB'); // Send 500 Status Code

    // Create a mongoDB document for the SessionID if it does not exist
    const CompilerDataModel = MongooseModel.create({
      FileName: `${SessionID}-${FileName}`,
      FileSize: Code.length,
      FilePath: FullPathOfFile,
      FileExtraPackages: Packages,
      sessionID: SessionID,
      LanguageName: Language,
      BuilderIP: RequesterIP,
      BuildTime: Date.now(),
      BuildStatus: 'Pending',
    }); // Create MongoDB Document
    const DataStatus = await CompilerDataModel.save(); // Save MongoDB Document
    console.log(DataStatus);
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
}
