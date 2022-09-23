const { decode, encode } = require('./resp');
const { cleanArgs } = require('./utils');
const storage = require('./storage')();

/**
 * @param {string} data
 */
const resolveCommand = (data) => {
    console.log({ data });
    try {
        const { command, args } = decode(data);
        console.log({ command, args });
        switch (command) {
            case 'PING':
                return encode.pong();
            case 'ECHO':
                return encode.echo(args);
            case 'SET':
                return set(cleanArgs(args));
            case 'GET':
                return get(cleanArgs(args));
            default:
                return encode.unknownCommandError(command);
        }
    } catch (error) {
        const errorMessage = `An error occurred: ${error.message}`;
        console.log(errorMessage);
        return encode.error(errorMessage);
    }
};

/**
 * @param {string[]} params
 */
const set = (params) => {
    if (params.length < 2) {
        throw new Error('Invalid parameters length!');
    }
    const [key, ...value] = params;
    storage.set(key, value.join(' '));
    return encode.ok();
};

/**
 * @param {string[]} params
 */
const get = (params) => {
    if (params.length !== 1) {
        throw new Error('Invalid parameters length!');
    }
    const result = storage.get(params[0]) || '';
    return encode.simpleResponse(result);
};

module.exports = resolveCommand;
