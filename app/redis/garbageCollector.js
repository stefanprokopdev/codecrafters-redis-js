const storage = require('./storage');

const removeExpiredData = () => Object.keys(key => {
    if (storage.isExpired(storage[key])) {
        storage.clean(key);
    }
});

/**
 * @param {number} interval (in milliseconds)
 */
const clean = (interval = 1000) => setInterval(removeExpiredData, interval);

module.exports = clean;
