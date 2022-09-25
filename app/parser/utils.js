/**
 * Filter out "unnecessary" `$[0-9]+` or empty string
 * BE CAREFUL! THIS DATA SERVES FOR INPUT VALIDATION
 * @param {string[]} args
 * @returns {string[]}
 */
const cleanArgs = (args) => args.filter(x => !x.match(/^(\$\d+)|(^.{0}$)$/g));

module.exports = { cleanArgs };
