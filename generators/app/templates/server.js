const cluster = require('cluster');
const cpus = require('os').cpus;
let server;

if (process.env.NODE_ENV === 'production') {
  server = require('./build');
} else {
  server = require('./src');
}

if (process.env.NODE_ENV !== 'production') {
  console.log('Starting application');
  server();
} else if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  for (let i = 0; i < cpus().length; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    if (signal) {
      console.log(`Worker ${worker.process.id} killed by signal: ${signal}`);
    } else if (code !== 0) {
      console.log(`Worker ${worker.process.id} died - code ${code}`);
    } else {
      console.log('Worker success!');
    }
  });
} else {
  server();
  console.log(`Worker ${process.pid} started`);
}
