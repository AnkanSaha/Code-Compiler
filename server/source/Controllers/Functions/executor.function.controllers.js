// Main File Executor
import {Console, Response as Serve, StatusCodes} from 'outers'; // Import Console from Outers
import executeCommand from '../../utils/commandExecutor.utils.js'; // Import Command Executor
import {MongooseModel} from '../../Database/MongoDB.db.js'; // Import MongoDB Model

export default async function Executor(FileName, LanguageDetails, SessionID, FilePath, RequesterIP, Response) {
  try {
    console.log(LanguageDetails, SessionID, FilePath, RequesterIP);
    // Check if Code is Interpreted or Compiled
    if (LanguageDetails.type.toLowerCase() === 'interpreted') {
      const InterPreteStatus = await executeCommand(`${LanguageDetails.RunCommand}${FilePath}`); // Execute Command
      console.log(Status);
      if (InterPreteStatus.output !== '') {
        await MongooseModel.updateOne({sessionID: SessionID},
            {BuildStatus: 'Success', BuildTime: Date.now(), BuilderIP: RequesterIP}); // Update Session Status
        Serve.JSON({
          response: Response,
          status: true,
          statusCode: StatusCodes.OK,
          Title: 'Code Interpreted Successfully',
          message: 'Code Interpreted Successfully and Output is displayed below',
          data: InterPreteStatus.output,
        }); // Return Success
      } else if (InterPreteStatus.error !== '') {
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.EXPECTATION_FAILED,
          Title: 'Code Interpreted Failed',
          message: 'Code Interpreted Failed and Error is displayed below',
          data: InterPreteStatus.error,
        }); // Return Error
      } else {
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.EXPECTATION_FAILED,
          Title: 'Code Interpreted Failed',
          message: 'Code Interpreted Failed and Error is displayed below',
          data: InterPreteStatus.error,
        }); // Return Error
      }
    } else if (LanguageDetails.type.toLowerCase() === 'compiled') {
      console.log(LanguageDetails, SessionID, FilePath, RequesterIP);
      const CompileStatus = await executeCommand(`${LanguageDetails.CompileCommand}${FileName} ${FilePath}`); // Execute Command
      console.log(CompileStatus);
    } else {
      // Return Error if Language Type is not Found
      Console.red('Language Type not Found');
      Serve.JSON({
        response: Response,
        status: false,
        statusCode: StatusCodes.BAD_REQUEST,
        Title: 'Language Type not Found',
        message: 'Language Type not Found, please try again later or contact support',
        data: undefined,
      }); // Return Error
    }
  } catch (error) {
    Console.red(error); // Log Error
  }
}
