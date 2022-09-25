/**
 * @returns {string}
 */
const pong = () => simpleResponse('PONG');

/**
 * @returns {string}
 */
const ok = () => simpleResponse('OK');

/**
 * @param {string} message
 * @returns {string}
 */
const unknownCommandError = (message) => {
    const response = error(`unknown command: ${message}`);
    console.log({ response });
    return response;
}

/**
 * @param {string} text
 * @returns {string}
 */
const simpleResponse = (text) => {
    const response = `+${text}\r\n`;
    console.log({ response });
    return response;
}

/**
 * @param {string[]} params
 * @returns {string}
 */
const echo = (params) => {
    const response = params.join('\r\n');
    console.log({ response });
    return response;
}

/**
 * @param {string} message
 * @returns {string}
 */
const error = (message) => {
    const error = `-ERROR ${message}\r\n`;
    console.log({ error });
    return error;
}

/**
 * @returns {string}
 */
const nullReply = () => {
    const response = '$-1\r\n';
    console.log({ response });
    return response;
}

module.exports = { pong, ok, simpleResponse, echo, error, unknownCommandError, nullReply };
