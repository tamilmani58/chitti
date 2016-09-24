/**
 * Created by pritam on 24/9/16.
 */

var isArray = function (item) {
    return Object.prototype.toString.call(item) === '[object Array]';
};
var isSet = function (val) {
    switch (typeof val) {
        case "string":
            return val !== undefined && val !== "" && val !== null;
        case "object":
            return val !== null;
        case "number":
        case "boolean":
            return true;
        default:
            return false;
    }
};

var each = function (obj, callback) {
    if (!isSet(obj)) {
        return;
    }
    var i = 0,
        length = obj.length;

    if (isArray(obj)) {
        for (; i < length; i++) {
            callback.call(obj[i], obj[i], i, length);
        }
    } else {
        for (i in obj) {
            if (obj.hasOwnProperty(i)) {
                callback.call(obj[i], obj[i], i, 0);
            }
        }
    }
};
var util = {
    isArray: isArray,
    each: each,
    isSet: isSet
};
module.exports = util;
