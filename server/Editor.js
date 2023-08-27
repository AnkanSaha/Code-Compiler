const Server = require('express')(); // import express server
const {cpus} = require('os'); // import os
const {yellow, bright} = require('outers'); // import colors

Server.listen(3000, () => {
    bright(cpus().length); // log cpu cores
    yellow(`Server started on port 3000`); // log server started
}); // start server