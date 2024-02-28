// Server Related Imports
import express, { json, urlencoded } from 'express' // Import Express
import { methods } from 'outers' // Import Console from outers
import { StringKeys, NumberKeys } from './environment variables.core.js' // Env Variables

// Import Utils
import Creator from '../utils/directoryCreator.utils.js' // Import Directory Creator
import { ConnectDB } from '../Database/MongoDB.db.js' // Import MongoDB Connection

// Import Main Router
import MainRouter from '../Routers/Router.js' // Import Main Router

// Setup Express Server

// Create Express Server Instance
const Server = express() // Create Express Server Instance

// Enable All Proxy Settings for Server Security
Server.set('trust proxy', () => true) // Enable All Proxy Settings

// Enable JSON & URL Encoding Parser
Server.use(json({ limit: '999mb' })) // JSON Parser
Server.use(urlencoded({ extended: true, limit: '999mb', parameterLimit: 5000, inflate: true })) // URL Encoded Parser

// Link All Router as MainRouter with all main middlewares
Server.use('/api', MainRouter) // Link Main Router

// Configure Static Folders
Server.use(express.static(StringKeys.StaticDirectoryName)) // Configure Static Folder
Server.use(express.static(StringKeys.InterpretedLangDirectoryName)) // Configure Static Folder

// Start Server With Cluster Configuration
methods.ClusterCreator(Server, NumberKeys.PORT, NumberKeys.CPUCount, [Creator], [ConnectDB]) // Create NodeJS Cluster Process
