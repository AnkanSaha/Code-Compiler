import mongoose, { connect } from 'mongoose' // Mongoose for Schema and Models only
import { DatabaseKeys, NumberKeys } from '../core/environment variables.core.js' // Env Variables
import { Console } from 'outers' // Import Console from outers

// Import Models
import compiledFileRecordModelDb from './Models/compiledFileRecord.model.db.js' // Compiled File Record Model

// Create mongoose Instance for Models
const MongooseSchema = new mongoose.Schema(compiledFileRecordModelDb) // Create Mongoose Schema
export const MongooseModel = mongoose.model(DatabaseKeys.CollectionName, MongooseSchema) // Create Mongoose Model

// Export MongoDB Connection Function
// Connect Database Function
export const ConnectDB = async () => {
  await connect(`${DatabaseKeys.MongoDB}${DatabaseKeys.DB_Name}`) // Connect to MongoDB
  Console.green(`🚀 Database Connected & Server is listening on Port ${NumberKeys.PORT} 🚀`) // Print Message for Server Start
} // Connect Database Function
