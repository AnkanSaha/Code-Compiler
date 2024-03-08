// Main File Executor
import { Console, StatusCodes, ClassBased } from 'outers' // Import Console from Outers
import executeCommand from '../../utils/commandExecutor.utils.js' // Import Command Executor
import { MongooseModel } from '../../Database/MongoDB.db.js' // Import MongoDB Model
import { join } from 'path' // Import the path module

export default async function Executor (FileName, LanguageDetails, SessionID, FilePath, RequesterIPaddress, Response) {
  try {
    // Create Response Instances
    const EXPECTATION_FAILED = new ClassBased.Response.JSON(
      Response,
      StatusCodes.EXPECTATION_FAILED,
      'json',
      'Code Interpreted Failed'
    ) // Expectation Failed Response Instance
    const OK = new methods.Response.JSON(Response, StatusCodes.OK, 'json', 'Code Interpreted Successfully') // OK Response Instance
    const BAD_REQUEST = new methods.Response.JSON(Response, StatusCodes.BAD_REQUEST, 'json') // Bad Request Response Instance

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

        // Return Success
        OK.Send(InterPreteStatus.output, 'Code Interpreted Successfully and Output is displayed below') // Return Success
      } else if (InterPreteStatus.error !== '') {
        EXPECTATION_FAILED.Send(InterPreteStatus.error, 'Code Interpreted Failed and Error is displayed below') // Return Error
      } else {
        EXPECTATION_FAILED.Send(InterPreteStatus.error, 'Code Interpreted Failed and Error is displayed below') // Return Error
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
        EXPECTATION_FAILED.Send(CompileStatus.error, 'Code Compilation Failed and Error is displayed below') // Return Error
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

        OK.Send(ExecuteStatus.output, 'Code Interpreted Successfully and Output is displayed below') // Return Success
      } else if (ExecuteStatus.error !== '') {
        EXPECTATION_FAILED.Send(ExecuteStatus.error, 'Code Interpreted Failed and Error is displayed below') // Return Error
      } else {
        EXPECTATION_FAILED.Send(ExecuteStatus.error, 'Code Interpreted Failed and Error is displayed below') // Return Error
      }
    } else {
      // Return Error if Language Type is not Found
      Console.red('Language Type not Found')
      BAD_REQUEST.Send(undefined, 'Language Type not Found, please try again later or contact support', 'Language Type not Found') // Return Error
    }
  } catch (error) {
    Console.red(error) // Log Error
  }
}
