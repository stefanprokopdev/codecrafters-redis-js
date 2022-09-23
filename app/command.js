/**
 * @param {Buffer} data
 */
const ping = (data) => '+PONG\r\n'

/**
 * @param {Buffer} data
 */
const resolveCommand = (data) => ping(data);

module.exports = resolveCommand;
