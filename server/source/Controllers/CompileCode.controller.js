import fs from 'fs' // File System Module
import { join } from 'path' // Import the path module
import PackageInstaller from './Functions/Package-Installer.function.controllers.js' // Import Package Installer
import { Serve, StatusCodes } from 'outers' // Import Response from Outers
import { LangTypesDirectory } from '../core/environment variables.core.js' // Environmental Variables
import Executor from './Functions/executor.function.controllers.js' // Import Executor

// Import MongoDB
import { MongooseModel } from '../Database/MongoDB.db.js' // Import MongoDB

// Main Compile Code Controller
export default async function Compile (Request, Response) {
  // Write Code to Uncompiled File Directory
  const { SessionID, Language, Code, FileName, Packages, RequesterIPaddress } = Request.body // Destructure Request Body

  // Select Preferred Directory
  const PreferredLanguageDir = LangTypesDirectory.find((element) => element.language.toLowerCase() === Language.toLowerCase()) // Find Preferred Directory

  // Check if Preferred Directory Exists in Environmental Variables
  const FilePath = `${join(`${PreferredLanguageDir.directoryName}/${SessionID}-${FileName}`)}` // Path of Uncompiled File
  const PreferredFileName = `${SessionID}-${FileName}` // File Name in Server

  // Find sessionID in MongoDB if it exists
  const ExistSessionID = await MongooseModel.find({ sessionID: SessionID }) // Find SessionID in MongoDB

  // Check if SessionID exists in MongoDB
  if (ExistSessionID.length === 0) {
    // // Write Code to File
    await fs.promises.writeFile(FilePath, Code, 'utf-8') // Write Code to File System if SessionID does not exist in MongoDB

    // Check if Any Packages are Required
    if (Packages.length > 0) {
      // Install Packages
      await PackageInstaller(PreferredLanguageDir, Packages) // Install Packages
    }

    // Create a mongoDB document for the SessionID if it does not exist
    const CompilerDataModel = new MongooseModel({
      FileName: PreferredFileName,
      FileSize: Code.length,
      FilePath,
      FileExtraPackages: Packages,
      sessionID: SessionID,
      LanguageName: Language,
      BuilderIP: RequesterIPaddress,
      BuildTime: Date.now(),
      BuildStatus: 'Pending'
    }) // Create MongoDB Document
    const DataStatus = await CompilerDataModel.save() // Save MongoDB Document

    // Check if MongoDB Document was saved
    if (!DataStatus) {
      Serve.JSON({
        response: Response,
        status: false,
        statusCode: StatusCodes.REQUEST_TIMEOUT,
        Title: 'Unable to Compile Code',
        message: 'Unable to Compile Code, please try again later or contact support',
        data: undefined
      })
      return // Return if MongoDB Document was not saved
    }

    await Executor(PreferredFileName, PreferredLanguageDir, SessionID, FilePath, RequesterIPaddress, Response) // Execute Code
  } else if (ExistSessionID.length > 0) {
    // Delete Previous File if Same SessionID Exists
    await fs.promises.unlink(ExistSessionID[0].FilePath) // Delete Previous File if Same SessionID Exists

    // // Write Code to File
    await fs.promises.writeFile(ExistSessionID[0].FilePath, Code, 'utf-8') // Write Code to File System if SessionID does not exist in MongoDB

    // Check if Any Packages are Required
    if (Packages.length > 0) {
      // Install Packages
      await PackageInstaller(PreferredLanguageDir, Packages) // Install Packages
    }
    // Update MongoDB Document for the SessionID if it exists
    const updateStatus = await MongooseModel.updateOne(
      { sessionID: SessionID },
      {
        BuildStatus: 'Pending',
        BuildTime: Date.now(),
        BuilderIP: RequesterIPaddress,
        FileSize: Code.length,
        FileExtraPackages: Packages
      }
    ) // Update MongoDB Document for the SessionID

    // Check if MongoDB Document was updated
    if (updateStatus.modifiedCount === 0) {
      Serve.JSON({
        response: Response,
        status: false,
        statusCode: StatusCodes.REQUEST_TIMEOUT,
        Title: 'Unable to Compile Code',
        message: 'Unable to Compile Code, please try again later or contact support',
        data: undefined
      })
      return // Return if MongoDB Document was not updated
    }

    await Executor(PreferredFileName, PreferredLanguageDir, SessionID, FilePath, RequesterIPaddress, Response) // Execute Code
  } else {
    Serve.JSON({
      response: Response,
      status: false,
      statusCode: StatusCodes.REQUEST_TIMEOUT,
      Title: 'Unable to Compile Code',
      message: 'Unable to Compile Code, please try again later or contact support',
      data: undefined
    })
  }
}
