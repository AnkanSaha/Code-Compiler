import fs from 'fs'; // File System Module
import {join} from 'path'; // Import the path module
import {StringKeys} from '../core/environment variables.core.js'; // Import Environment Variables

// Main Compile Code Controller
export default async function Compile(Request, Response) {
  // Write Code to Uncompiled File Directory
  const {FileName, Code} = Request.body; // Destructure Request Body
  console.log(Request.body);
  // Write Code to File
  await fs.promises.writeFile(`${join(`${StringKeys.UncompiledFileDirectory}/${FileName}`)}`,
      Code, 'utf-8'); // Write Code to File
}
