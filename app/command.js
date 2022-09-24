const { decode, encode } = require('./resp');
const { cleanArgs } = require('./utils');
const { initializeStorage, STORAGE_OPTIONS } = require('./storage');

const storage = initializeStorage();

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
    const [key, value, ...args] = params;
    storage.set(key, value, getSetArguments(args));
    return encode.ok();
};

/**
 * @param {string[]} params
 */
const getSetArguments = (params) => {
    let index = 0;
    if (arguments.length <= 0) {
        return;
    }
    for (const argument of params) {
        const key = argument.toUpperCase();
        if (STORAGE_OPTIONS.includes(key)) {
            return { [key]: params.slice(index + 1) };
        }
        index++;
    }
};

/**
 * @param {string[]} params
 */
const get = (params) => {
    if (params.length !== 1) {
        throw new Error('Invalid parameters length!');
    }
    const result = storage.get(params[0]);
    if (!result) {
        return encode.nullReply();
    }
    return encode.simpleResponse(result);
};

module.exports = resolveCommand;
