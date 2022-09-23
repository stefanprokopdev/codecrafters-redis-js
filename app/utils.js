/**
 * Filter out "unnecessary" `$[0-9]+` or empty string
 * This is needed for later validation
 * @param {string[]} args
 */
const cleanArgs = (args) => args.filter(x => !x.match(/^(\$\d+)|(^.{0}$)$/g));

module.exports = { cleanArgs };
