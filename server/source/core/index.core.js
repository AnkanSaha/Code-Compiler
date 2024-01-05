// Server Related Imports
import express, {json, urlencoded} from 'express'; // Import Express
import {Console} from 'outers'; // Import Console from outers
import cluster from 'cluster'; // Import Cluster
import {StringKeys, NumberKeys} from './environment variables.core.js'; // Env Variables

// Middleware Imports
import rateLimiter from '../Middleware/RateLimiter.middleware.js'; // Express Rate Limiter
import InjectIP from '../Middleware/InjectIP.middleware.js'; // Inject IP Middleware

// Setup Express Server

// CPU Count Copy for Process
let ProcessCopy = NumberKeys.CPUCount; // Copy CPU Count

if (cluster.isPrimary) {
  // Print CPU Count
  Console.bright(
      `${NumberKeys.CPUCount} CPU(s) detected With
       ${StringKeys.Platform} ${StringKeys.Architecture} server : ${StringKeys.FreeRam} GB Free Ram : ${StringKeys.Model}`,
  );

  // Fork Cluster
  while (ProcessCopy > 0) {
    cluster.fork();
    ProcessCopy--;
  }

  // Listen for Cluster Online
  cluster.on('online', (worker) => {
    Console.green(`🚀 Worker ${worker.process.pid} started 🚀`);
    Console.blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`);
    Console.yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`);
  });

  // Listen for Cluster Exit
  cluster.on('exit', (worker) => {
    Console.red(`❌ Worker ${worker.process.pid} died ❌`);
    cluster.fork();
    Console.green(`🚀 Worker ${worker.process.pid} restarted 🚀`);
    Console.blue(`Environment Variables Loaded Successfully in Worker : ${worker.process.pid}`);
    Console.yellow(`Worker ${worker.process.pid} is listening on Port ${NumberKeys.PORT}`);
  });
} else {
  // Create Express Server Instance
  const Server = express(); // Create Express Server Instance

  // Enable All Proxy Settings for Server Security
  Server.set('trust proxy', ()=>true); // Enable All Proxy Settings

  // Link All Router as MainRouter with all main middlewares
  Server.use('/api',
      json({limit: '999mb'}),
      urlencoded({extended: true, limit: 5000000 * 1000, parameterLimit: 5000}),
      rateLimiter, // Rate Limiter Middleware Function
      InjectIP, // Inject IP Middleware Function
  ); // Link Main Router

  Console.magenta(`Linked All API Endpoints with ${StringKeys.AppName} Server`); // Print Success Message for Router Linking

  // Configure Static Folder
  Server.use(express.static(StringKeys.StaticDirectoryName)); // Configure Static Folder

  // Server Listen
  try {
    Server.listen(NumberKeys.PORT, async () => {
      Console.green(`🚀 Database Connected & Server is listening on Port ${NumberKeys.PORT} 🚀`); // Print Message for Server Start
    }); // Start Server on Port
  } catch (error) {
    Console.red(`Error in Starting Server : ${error}`); // Print Error Message for Server Start
  }
}
