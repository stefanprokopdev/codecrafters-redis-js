const net = require('net');
const resolveCommand = require('./command');

const server = net.createServer((connection) => {
    connection.on('data', (data) => {
        connection.write(resolveCommand(data.toString('utf8')));
    });
})
    .on('connection', (connection) => {
        console.log(`Connection created on port ${connection.localPort}`)
        // connection.emit('data', '*3\r\n$3\r\nset\r\n$4\r\nheya\r\n$4\r\nheya\r\n')
        // connection.emit('data', '*1\r\n$4\r\nping\r\n')
    })
    .on('listening', () => {
        console.log(`Server is listening ...`);
        // net.connect({ port: 6379, host: '0.0.0.0' });
    })
    .on('close', () => console.log('Closing the connection ...'))
    .on('error', (error) => {
        console.log(`An error occurred: ${error.message}`);
        process.exit(1);
    });

server.listen(6379, '0.0.0.0');
