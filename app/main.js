const net = require('net');
const resolveCommand = require('./command');

const server = net.createServer((connection) => {
    connection.on('data', (data) => {
        connection.write(resolveCommand(data));
    });
})
    .on('connection', (connection) => console.log(`Connection created on port ${connection.localPort}`))
    .on('listening', () => console.log(`Server is listening ...`))
    .on('close', () => console.log('Closing the connection ...'))
    .on('error', (error) => {
        console.log(`An error occurred: ${error.message}`);
        process.exit(1);
    });

server.listen(6379, '127.0.0.1');
