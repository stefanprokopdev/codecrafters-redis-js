const AVAILABLE_COMMANDS = ['ECHO', 'PING'];

/**
 * @param {string} data
 */
const decodeResp = (data) => {
    if (data.length <= 0) {
        throw new Error('Command is too short!');
    }
    const command = data[0];
    switch (command) {
        case '*':
            const args = data.split('\r\n');
            return decode(args.slice(1, args.length));
        case '+':
            const params = data.slice(1, data.length).split('\r\n');
            return decode(params);
        default:
            return decode(data.split('\r\n'));
    }
};

/**
 * @param {string[]} args
 */
const decode = (args) => {
    let index = 0;
    for (const element of args) {
        if (isCommand(element)) {
            return {
                args,
                command: element.toUpperCase(),
                commandIndex: index,
            };
        }
        index++;
    }
    throw new Error('Unknown command!');
}

/**
 * @param {string} command
 */
const isCommand = (command) => AVAILABLE_COMMANDS.includes(command.toUpperCase());

module.exports = decodeResp;
