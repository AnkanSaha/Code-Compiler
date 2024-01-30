// Creator Function
import fs from 'fs' // Import the fs module
import { join } from 'path' // Import the path module
import { StringKeys } from '../core/environment variables.core.js' // Import the environment variables

export default async function Creator () {
  // Ensure All directory exists
  const InterpretedFileDirectory = join(`${StringKeys.InterpretedLangDirectoryName}/`)
  if (!fs.existsSync(InterpretedFileDirectory)) {
    await fs.promises.mkdir(InterpretedFileDirectory, { recursive: true })
  }

  const CompiledFileDirectory = join(`${StringKeys.CompileLangDirectoryName}/`)
  if (!fs.existsSync(CompiledFileDirectory)) {
    await fs.promises.mkdir(CompiledFileDirectory, { recursive: true })
  }

  const StaticDirectoryName = join(`${StringKeys.StaticDirectoryName}/`)
  if (!fs.existsSync(StaticDirectoryName)) {
    await fs.promises.mkdir(StaticDirectoryName, { recursive: true })
  }
}
