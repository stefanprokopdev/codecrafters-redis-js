const AVAILABLE_COMMANDS = ['ECHO', 'PING', 'SET', 'GET'];

/**
 * @param {string} data
 * @returns {{args: string[], command: *}|{args: (*|string)[], command: string}}
 */
const decodeResp = (data) => {
    if (data.length <= 0) {
        throw new Error('Command is too short!');
    }
    const command = data[0];
    const args = data.split('\r\n');
    switch (command) {
        case '*':
            return decode(args.slice(1));
        case '+':
            return decode(args.slice(1));
        default:
            return decode(args);
    }
};

/**
 * @param {string[]} args
 * @returns {{args: *, command: string}|{args: (*|string)[], command: string}}
 */
const decode = (args) => {
    let index = 0;
    for (const element of args) {
        if (isCommand(element)) {
            return {
                command: element.toUpperCase(),
                args: args.slice(index + 1),
            };
        }
        index++;
    }
    const result = decodeCommand(args);
    if (!result) {
        throw new Error('Unknown command!');
    }
    return result;
}

/**
 * @param {string[]} params
 * @returns {{args: (*|string)[], command: string}}
 */
const decodeCommand = (params) => {
    if (params.length !== 1) {
        throw new Error('Invalid parameters length!');
    }
    const [command, ...values] = params[0].split(' ');
    if (!isCommand(command)) {
        throw new Error('Unsupported command!');
    }
    return {
        command: command.toUpperCase(),
        args: values,
    };
};

/**
 * @param {string} command
 */
const isCommand = (command) => AVAILABLE_COMMANDS.includes(command.toUpperCase());

module.exports = decodeResp;
