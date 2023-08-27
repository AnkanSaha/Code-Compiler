const {Mongo} = require('mongoland'); // import mongoland

const {DatabaseKeys} = require('../../keys/keys'); // import DatabaseKeys

// Import All Models
const SaveFileInfo = require('./Model/SaveFileInfo'); // import SaveFileInfo

// Export MongoDB for Store File Information at the time of Build
module.exports.StoreFileInfo = new Mongo({
    MongoURL: DatabaseKeys.MongoDbUrl, // export MongoDbUrl
    NeverDisconnect: true, // export NeverDisconnect
    CollectionName: DatabaseKeys.ClientAccountCollectionName, // export ClientAccountCollectionName
    Schema: SaveFileInfo, // export SaveFileInfo
}); // export MongoDB