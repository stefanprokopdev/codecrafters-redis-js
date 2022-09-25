const storage = (() => {
    const set_options = ['PX'];
    const localStorage = {};

    /**
     * @param {string} key
     * @returns {string | undefined}
     */
    const get = (key) => {
        const data = localStorage[key];
        if (!data) {
            return;
        }
        if (!data.expiresIn) {
            return data.value;
        }
        if (isExpired(data)) {
            delete localStorage[key];
            return;
        }
        return data.value;
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {{ [string]: any }} options
     */
    const set = (key, value, options = {}) => {
        localStorage[key] = {
            value,
            expiresIn: getExpiresIn(options['PX']),
            createdAt: Date.now(),
        };
    }

    /**
     * @param {string} key
     * @returns {boolean}
     */
    const clean = (key) => delete localStorage[key];

    /**
     * @param {number} createdAt
     * @param {number} expiresIn
     * @returns {boolean}
     */
    const isExpired = ({ createdAt, expiresIn }) => Date.now() > createdAt + expiresIn;

    return {
        get,
        set,
        clean,
        isExpired,
        getAvailableSetOptions: () => set_options,
    };
})();

/**
 * @param {string | undefined} expiresIn
 */
const getExpiresIn = (expiresIn) => {
    if (!expiresIn) {
        return;
    }
    const result = Number(expiresIn);
    if (!Number.isInteger(result)) {
        throw new Error('The PX parameter must be a number!');
    }
    return result;
}

module.exports = storage;
