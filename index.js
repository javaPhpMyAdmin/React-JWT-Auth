const http = require('http');
const app = require('./app');
const server = http.createServer(app);

const port = 1001;
const portNumber = process.env.PORT || port;

server.listen(port, ()=>{
    console.log(`'Server running on port ${port}`);
});

