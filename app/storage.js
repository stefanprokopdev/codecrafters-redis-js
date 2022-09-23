const initializeStorage = () => {
    let localStorage = {};
    return {
        get: (key) => localStorage[key],
        set: (key, value) => localStorage[key] = value,
    };
};

module.exports = initializeStorage;
