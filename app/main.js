const net = require('net');
const resolveCommand = require('./parser/command');
const clean = require('./redis/garbageCollector');

const server = net.createServer((connection) => {
    clean();
    connection.on('data', (data) => {
        const text = data.toString('utf8');
        console.log({ command: text });
        connection.write(resolveCommand(text));
    });
})
    .on('connection', (connection) => console.log(`Connection created on port ${connection.localPort}`))
    .on('listening', () => console.log('Server is listening ...'))
    .on('close', () => console.log('Closing the connection ...'))
    .on('error', (error) => {
        console.log(`An error occurred: ${error.message}`);
        process.exit(1);
    });

server.listen(6379, '0.0.0.0');
