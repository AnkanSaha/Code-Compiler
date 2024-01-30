// Main File Executor
import { Console, Serve, StatusCodes } from 'outers' // Import Console from Outers
import executeCommand from '../../utils/commandExecutor.utils.js' // Import Command Executor
import { MongooseModel } from '../../Database/MongoDB.db.js' // Import MongoDB Model
import { join } from 'path' // Import the path module

export default async function Executor (FileName, LanguageDetails, SessionID, FilePath, RequesterIPaddress, Response) {
  try {
    // Check if Code is Interpreted or Compiled
    if (LanguageDetails.type.toLowerCase() === 'interpreted') {
      const InterPreteStatus = await executeCommand(`${LanguageDetails.RunCommand}${FilePath}`) // Execute Command

      // Check If Interpret Status is Success
      if (InterPreteStatus.output !== '') {
        await MongooseModel.updateOne(
          { sessionID: SessionID },
          {
            BuildStatus: 'Success',
            BuildTime: Date.now(),
            BuilderIP: RequesterIPaddress,
            CompilerOutputFile: `${join(`${LanguageDetails.directoryName}/${FileName}`)}`
          }
        ) // Update Session Status
        Serve.JSON({
          response: Response,
          status: true,
          statusCode: StatusCodes.OK,
          Title: 'Code Interpreted Successfully',
          message: 'Code Interpreted Successfully and Output is displayed below',
          data: InterPreteStatus.output
        }) // Return Success
      } else if (InterPreteStatus.error !== '') {
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.EXPECTATION_FAILED,
          Title: 'Code Interpreted Failed',
          message: 'Code Interpreted Failed and Error is displayed below',
          data: InterPreteStatus.error
        }) // Return Error
      } else {
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.EXPECTATION_FAILED,
          Title: 'Code Interpreted Failed',
          message: 'Code Interpreted Failed and Error is displayed below',
          data: InterPreteStatus.error
        }) // Return Error
      }
    } else if (LanguageDetails.type.toLowerCase() === 'compiled') {
      // Compile Code
      const CompileStatus = await executeCommand(`${LanguageDetails.CompileCommand}${FileName} ${FilePath}`) // Execute Command

      // Update File Path in MongoDB after Compilation
      await MongooseModel.updateOne(
        { sessionID: SessionID },
        { CompilerOutputFile: `${join(`${LanguageDetails.CompiledOutputDirectory}/${FileName}`)}` }
      ) // Update Session Status

      // Check If Compile Status is Success
      if (CompileStatus.error) {
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.EXPECTATION_FAILED,
          Title: 'Code Compilation Failed',
          message: 'Code Compilation Failed and Error is displayed below',
          data: CompileStatus.error
        }) // Return Error
        return
      }

      // Execute Compiled Code
      const ExecuteStatus = await executeCommand(`${LanguageDetails.ExecuteCommand}
      ${LanguageDetails.CompiledOutputDirectory}/${FileName}`) // Execute Command

      // Check If Execute Status is Success
      if (ExecuteStatus.output !== '') {
        await MongooseModel.updateOne(
          { sessionID: SessionID },
          { BuildStatus: 'Success', BuildTime: Date.now(), BuilderIP: RequesterIPaddress }
        ) // Update Session Status
        Serve.JSON({
          response: Response,
          status: true,
          statusCode: StatusCodes.OK,
          Title: 'Code Interpreted Successfully',
          message: 'Code Interpreted Successfully and Output is displayed below',
          data: ExecuteStatus.output
        }) // Return Success
      } else if (ExecuteStatus.error !== '') {
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.EXPECTATION_FAILED,
          Title: 'Code Interpreted Failed',
          message: 'Code Interpreted Failed and Error is displayed below',
          data: ExecuteStatus.error
        }) // Return Error
      } else {
        Serve.JSON({
          response: Response,
          status: false,
          statusCode: StatusCodes.EXPECTATION_FAILED,
          Title: 'Code Interpreted Failed',
          message: 'Code Interpreted Failed and Error is displayed below',
          data: ExecuteStatus.error
        }) // Return Error
      }
    } else {
      // Return Error if Language Type is not Found
      Console.red('Language Type not Found')
      Serve.JSON({
        response: Response,
        status: false,
        statusCode: StatusCodes.BAD_REQUEST,
        Title: 'Language Type not Found',
        message: 'Language Type not Found, please try again later or contact support',
        data: undefined
      }) // Return Error
    }
  } catch (error) {
    Console.red(error) // Log Error
  }
}
