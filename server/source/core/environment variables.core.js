/* eslint-disable max-len */
import dotenv from 'dotenv'; // https://www.npmjs.com/package/dotenv
dotenv.config(); // Initialize dotenv
import {cpus, platform, freemem, arch} from 'os'; // Import OS

// Number Keys
export const NumberKeys = {
  PORT: Number(process.env.PORT) || 4896, // Port
  CPUCount: cpus().length * Number(process.env.CPU_COUNT_MULTIPLIERenv) || 2, // CPU Count
};

// Export keys
export const StringKeys = {
  AppName: String('Code-Editor'),
  CORS_URL: String(process.env.ALLOWED_ORIGINS) || '*',
  JWT_SECRET: String(process.env.JWT_SECRET),
  JWT_EXPIRES_IN: String(process.env.JWT_EXPIRES_IN) || '10d',
  StaticDirectoryName: String('CompiledCode'),
  // Server Details
  Platform: String(platform()),
  Architecture: String(arch()),
  FreeRam: Number((freemem() / 1024 / 1024 / 1024).toFixed(2)),
  Model: String(cpus()[0].model),
  CompileLangDirectoryName: String('CompiledLang'),
  InterpretedLangDirectoryName: String('InterpretedLang'),
};

// Database Keys
export const DatabaseKeys = {
  MongoDB: String(process.env.MONGODB_URI),
  DB_Name: String(process.env.DB_NAME) || 'code-editor',
  CollectionName: String('compiledFileRecord'),
};

// Language & Their Types & Directory Name
export const LangTypesDirectory = [
  {
    language: 'Javascript',
    type: 'interpreted',
    directoryName: StringKeys.InterpretedLangDirectoryName,
  },
  {
    language: 'Typescript',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
  },
  {
    language: 'Java',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
  },
  {
    language: 'C++',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
  },
  {
    language: 'Dart',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
  },
  {
    language: 'C Language',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
  },
  {
    language: 'Go',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
  },
  {
    language: 'Ruby',
    type: 'interpreted',
    directoryName: StringKeys.InterpretedLangDirectoryName,
  },
  {
    language: 'Rust',
    type: 'compiled',
    directoryName: StringKeys.CompileLangDirectoryName,
  },
];
