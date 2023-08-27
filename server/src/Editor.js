/* eslint-disable no-undef */
const Express = require('express'); // import express server
const {cpus, platform, freemem} = require('os'); // import os
const cluster = require('cluster'); // import cluster
const {green, red, yellow, blue, magenta, bright} = require('outers'); // import colors
const {json, urlencoded} = require('express'); // import body parser
const CORS = require('cors'); // import cors

// Import All Keys
const {NumberKeys, StringKeys} = require('./config/keys/keys'); // import keys

// CPU Length
let cpuLength = cpus().length; // get cpu length

if(cluster.isMaster){
    // Print Server Info
    bright(`${cpuLength} CPU(s) detected With ${platform()} server : ${(freemem() / 1024 / 1024 / 1024).toFixed(2)} GB Free Ram : ${cpus()[0].model}`);
    // Fork Cluster
    while (cpuLength--){
        cluster.fork();
    }
    // Listen for Cluster Online
    cluster.on('online', (worker) => {
        green(`🚀 Worker ${worker.process.pid} started 🚀`);
		blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`)
		yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`)
    });

    // Listen for Cluster Exit
    cluster.on('exit', (worker) => {
        red(`Worker ${worker.process.pid} died`);
		cluster.fork();
		green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
		blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`)
		yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`)
    });
}
else {
    // Create Server
    const Server = Express(); // Create Server

    // Enable All Proxy Settings
	Server.set('trust proxy', ()=> true); // Enable All Proxy Settings
    // Link All Router as MainRouter
	Server.use('/api', json(), urlencoded({extended:true, limit:5000000 * 1000})); // Link Main Router
	magenta('Linked All API Endpoints with PaisaPay Server'); // Print Success Message

    // Configure Static Folder
	Server.use(Express.static(StringKeys.StaticDirectoryName)); // Configure Static Folder

    // Configure cors
    Server.use(CORS({origin: StringKeys.AllowedOrigins})) // Configure cors
   
    // Server Listen
	try {
		Server.listen(NumberKeys.PORT, async () => {
			// const DB_Connection_Status = await MongoDB.ClientAccount.Connect(); // Connect to MongoDB
			// DB_Connection_Status.status === true ? yellow(` 🚀 Finally, Database Connected & Server is listening on Port ${NumberKeys.PORT} 🚀`) : red(` 🚀 Database Connection Failed & Server is listening on Port ${NumberKeys.PORT} 🚀`); // Print Server Status with Database Connection Status
		});
	} catch (err) {
		red(err);
	}
}