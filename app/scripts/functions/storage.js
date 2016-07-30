'use strict';

const storage = {
    set: function (name, value, callback) {
        localStorage[name] = value || "";
        if (callback) {
            callback(value);
        }
    },
    get: function (name) {
        return localStorage[name];
    }
};

export default storage;