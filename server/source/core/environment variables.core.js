/* eslint-disable max-len */
import dotenv from 'dotenv' // https://www.npmjs.com/package/dotenv
import {join} from 'path' // Initialize dotenv
import {cpus, platform, freemem, arch} from 'os' // Import Path
dotenv.config() // Import OS

// Number Keys
export const NumberKeys = {
  PORT: Number(process.env.PORT) ?? 4896, // Port
  CPUCount: Number(process.env.CPU_COUNT_MULTIPLIERENV) ?? cpus().length, // CPU Count
}

// Export keys
export const StringKeys = Object.freeze({
  AppName: String('Code-Compiler'),
  CORS_URL: String(process.env.CORS_ORIGIN) ?? '*',
  JWT_SECRET: String(process.env.JWT_SECRET),
  JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN) ?? '10d',
  IPINFO_API_KEY: String(process.env.IP_INFO_API_KEY) ?? String(process.env.VITE_IP_INFO_API_KEY) ?? undefined,
  // Server Details
  Platform: String(platform()),
  Architecture: String(arch()),
  FreeRam: Number((freemem() / 1024 / 1024 / 1024).toFixed(2)),
  Model: String(cpus()[0].model),
  StaticDirectoryName: String('CompiledCode'),
  CompileLangDirectoryName: String('CompiledLang'),
  InterpretedLangDirectoryName: String('InterpretedLang'),
})

// Database Keys
export const DatabaseKeys = Object.freeze({
  MongoDB: String(process.env.MONGODB_URL),
  DB_Name: String(process.env.DB_NAME) ?? 'Code-Compiler',
  CollectionName: String('compiledFileRecord'),
})

// Language & Their Types & Directory Name
export const LangTypesDirectory = [
  {
    language: 'Javascript',
    type: 'interpreted',
    directoryName: StringKeys.InterpretedLangDirectoryName,
    RunCommand: 'node ',
    PackageManagerInstallCommand: 'npm install ',
  },
  {
    language: 'Python',
    type: 'interpreted',
    directoryName: StringKeys.InterpretedLangDirectoryName,
    RunCommand: 'python3 ',
    PackageManagerInstallCommand: 'pip install',
  },
  {
    language: 'Java',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
    CompileCommand: `javac -d ${join(StringKeys.StaticDirectoryName)}/`,
    CompiledOutputDirectory: StringKeys.StaticDirectoryName,
    RunCommand: 'java ',
  },
  {
    language: 'C++',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
    CompileCommand: `g++ -o ${join(StringKeys.StaticDirectoryName)}/`,
    CompiledOutputDirectory: StringKeys.StaticDirectoryName,
    RunCommand: './',
  },
  {
    language: 'Dart',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
    CompileCommand: `dart compile exe -o ${join(StringKeys.StaticDirectoryName)}/`,
    CompiledOutputDirectory: StringKeys.StaticDirectoryName,
    RunCommand: './',
  },
  {
    language: 'C',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
    CompileCommand: `gcc -o ${join(StringKeys.StaticDirectoryName)}/`,
    CompiledOutputDirectory: StringKeys.StaticDirectoryName,
    RunCommand: './',
  },
  {
    language: 'Go',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
    CompileCommand: `go build -o ${join(StringKeys.StaticDirectoryName)}/`,
    CompiledOutputDirectory: StringKeys.StaticDirectoryName,
    RunCommand: './',
  },
  {
    language: 'Ruby',
    type: 'interpreted',
    directoryName: StringKeys.InterpretedLangDirectoryName,
    RunCommand: 'ruby ',
  },
  {
    language: 'Rust',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
    CompileCommand: `rustc -o ${join(StringKeys.StaticDirectoryName)}/`,
    CompiledOutputDirectory: StringKeys.StaticDirectoryName,
    RunCommand: './',
  },
]
