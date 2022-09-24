const STORAGE_OPTIONS = ['PX'];

let localStorage = {};

const removeExpiredData = () => Object.keys(key => {
    if (isExpired(localStorage[key])) {
        delete localStorage[key];
    }
});

setInterval(removeExpiredData, 1000);

const initializeStorage = () => {
    return {
        get: (key) => {
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
        },
        set: (key, value, options = {}) => {
            console.log(options)
            localStorage[key] = {
                value,
                expiresIn: getExpiresIn(options['PX']),
                createdAt: Date.now(),
            };
        },
    };
};

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
};

/**
 * @param {number} createdAt
 * @param {number} expiresIn
 */
const isExpired = ({ createdAt, expiresIn }) => Date.now() > createdAt + expiresIn;

module.exports = { initializeStorage, STORAGE_OPTIONS };
