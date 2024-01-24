import mongoose from 'mongoose'; // Mongoose for Schema and Models only
import { DatabaseKeys } from '../core/environment variables.core.js'; // Env Variables

// Import Models
import compiledFileRecordModelDb from './Models/compiledFileRecord.model.db.js'; // Compiled File Record Model

// Create mongoose Instance for Models
const MongooseSchema = new mongoose.Schema(compiledFileRecordModelDb); // Create Mongoose Schema
export const MongooseModel = mongoose.model(DatabaseKeys.CollectionName, MongooseSchema); // Create Mongoose Model
