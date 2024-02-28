// Import MongoDB
import {MongooseModel} from '../Database/MongoDB.db.js' // Import MongoDB
import {Console, StatusCodes, methods} from 'outers' // Response
import {LangTypesDirectory} from '../core/environment variables.core.js' // Environmental Variables

// Main Code for Download Code Controller
export default async function DownloadCode(Request, Response) {
  // Response Instances
  const REQUEST_TIMEOUT = new methods.Response.JSON(Response, StatusCodes.REQUEST_TIMEOUT, 'json', 'Unable to Download Code') // Request Timeout Response Instance
  try {
    const {SessionID, Language} = Request.query // Destructure Request Body

    // Detect is this Language is Interpreted or Compiled
    const LanguageType = LangTypesDirectory.find((element) => element.language.toLowerCase() === Language.toLowerCase()) // Detect Language Type

    // Find Any Documents with the SessionID
    const SessionIDData = await MongooseModel.find({sessionID: SessionID}) // Find SessionID in MongoDB

    // Create File Downloader Response Instance
    const FILE_DOWNLOAD = new methods.Response.File(
        Response,
        `${LanguageType?.CompiledOutputDirectory || LanguageType.directoryName}`,
        'text/plain',
        StatusCodes.OK,
    ) // File Download Response Instance

    // Download Code if SessionID exists in MongoDB
    if (SessionIDData.length === 0) {
      return REQUEST_TIMEOUT.Send(undefined, 'No Code Found, please try again later or contact support') // Return Error
    }

    // Download Code
    try {
      // Set the Content-Disposition header to force download
      Response.setHeader('Content-Disposition', 'attachment; filename=' + SessionIDData[0].FileName) // Set Header
      Response.setHeader('filename', `${SessionIDData[0].FileName}`) // Set a Custom Header for FileName

      // Delete The Document from MongoDB before Downloading
      await MongooseModel.findByIdAndDelete(SessionIDData[0]._id) // Delete Document from MongoDB

      // Serve the File
      FILE_DOWNLOAD.SendFile(SessionIDData[0].FileName) // Send File to the Client
    } catch (error) {
      console.log(error) // Print Error
      REQUEST_TIMEOUT.Send(undefined, 'Unable to Download Code, please try again later or contact support') // Return Error
    }
  } catch (error) {
    Console.red(error) // Print When Error
    REQUEST_TIMEOUT.Send(undefined, 'Unable to Download Code, please try again later or contact support') // Return Error
  }
}
