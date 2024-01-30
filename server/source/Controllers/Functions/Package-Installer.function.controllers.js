import { Console } from 'outers' // Import Console from Outers
import Executor from '../../utils/commandExecutor.utils.js' // Import Command Executor

// Installer of Packages for Codes
export default async function PackageInstaller (LanguageDetails, PackageArray) {
  try {
    // Install Packages for Code
    PackageArray.forEach(async (element) => {
      // Install Package
      const InstallationStatus = await Executor(`${LanguageDetails.PackageManagerInstallCommand}${element}`) // Install Package
      Console.green(InstallationStatus) // Log Installation Status
    }) // Install Packages
  } catch (error) {
    Console.red(error) // Log Error
    return false // Return false if error occurs
  }
}
