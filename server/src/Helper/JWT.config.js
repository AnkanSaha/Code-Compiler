// Import JWT Module
const {Jwt} = require('jwt-destroy'); // import jwt-destroy

// import SecretKeys from './SecretKeys.config';
const {StringKeys} = require('../config/keys/keys'); // import keys

module.exports.JWT = new Jwt(StringKeys.JWT_SECRETS); // create a new instance of the JWT class