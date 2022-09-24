const pong = () => simpleResponse('PONG');

const ok = () => simpleResponse('OK');

/**
 * @param {string} message
 */
const unknownCommandError = (message) => error(`unknown command: ${message}`);

/**
 * @param {string} text
 */
const simpleResponse = (text) => `+${text}\r\n`;

/**
 * @param {string[]} params
 */
const echo = (params) => params.join('\r\n');

const error = (message) => `-ERROR ${message}\r\n`;

const nullReply = () => '$-1\r\n';

module.exports = { pong, ok, simpleResponse, echo, error, unknownCommandError, nullReply };
