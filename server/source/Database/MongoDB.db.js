import {Mongo} from 'mongosuper'; // MongoSuper for Create Connection only
import {DatabaseKeys} from '../core/environment variables.core.js'; // Env Variables

// Create Connection Instance
export const MongoConnector = new Mongo({
  MongoURL: DatabaseKeys.MongoDB,
  Database_Name: DatabaseKeys.DB_Name,
  CollectionName: DatabaseKeys.CompiledFileRecord,
  NeverDisconnect: true,
  isTimeStamps: true,
  Schema: undefined,
});
