const { decode } = require('./resp');

/**
 * @param {string} data
 */
const resolveCommand = (data) => {
    try {
        const { command, args, commandIndex } = decode(data);
        console.log({ command, args, commandIndex });
        switch (command) {
            case 'PING':
                return ping();
            case 'ECHO':
                return echo(args.slice(commandIndex + 1, args.length));
            default:
                return unknownCommand(command);
        }
    } catch (error) {
        const errorMessage = `An error occurred: ${error.message}`;
        console.log(errorMessage);
        return `-ERROR ${errorMessage}`;
    }
};

const ping = () => '+PONG\r\n';

/**
 * @param {string[]} params
 */
const echo = (params) => params.join('\r\n');

/**
 * @param {String} command
 */
const unknownCommand = (command) => `-ERROR unknown command: '${command}'\r\n`

module.exports = resolveCommand;
