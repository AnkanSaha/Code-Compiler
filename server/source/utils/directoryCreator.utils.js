// Creator Function
import fs from 'fs'; // Import the fs module
import {join} from 'path'; // Import the path module
import {StringKeys} from '../core/environment variables.core.js'; // Import the environment variables

export default async function Creator() {
// Ensure All directory exists
  const UncompiledFileDirectory = join(`${StringKeys.UncompiledFileDirectory}/`);
  if (!fs.existsSync(UncompiledFileDirectory)) {
    await fs.promises.mkdir(UncompiledFileDirectory, {recursive: true});
  }

  const StaticDirectoryName = join(`${StringKeys.StaticDirectoryName}/`);
  if (!fs.existsSync(StaticDirectoryName)) {
    await fs.promises.mkdir(StaticDirectoryName, {recursive: true});
  }
}
