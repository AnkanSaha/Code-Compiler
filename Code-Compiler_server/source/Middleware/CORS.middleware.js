import CORS from 'cors' // Cors Module
import { StringKeys } from '../core/environment variables.core.js' // CORS Config
import { StatusCodes } from 'outers' // Import Status Codes

export default CORS({
  origin: StringKeys.CORS_URL, // Allow Only This URL to Access
  credentials: true, // Allow Client To Send Cookies or Credentials to Server
  allowedHeaders: ['Authorization', 'Content-Type', 'filename'], // Allow Only These Headers from Client to Server
  exposedHeaders: ['filename', 'Content-Disposition'], // Expose Custom Headers to Client from Server
  maxAge: 86400, // 1 Day
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allow Only These Methods
  optionsSuccessStatus: StatusCodes.CONTINUE, // Set Status Code for OPTIONS Request
  preflightContinue: true // Continue if OPTIONS Request
}) // CORS Config
