// vim: set sw=4 ts=4 expandtab:

/**
 * @param {ReactProps} props
 * @param {string=} name
 * @returns {string}
 */
function getClassName (props, name) {
    if (!name) {
        return props.CLASSNAME;
    } else if (typeof name === 'string') {
        return props.CLASSNAME + '-' + name;
    } else {
        return name.map(nameItem => getClassName(props, nameItem)).join(' ');
    }
}

/**
 * Array of numbers from `start` to `end`
 * If only one argument defined, then from 0 to `arg`
 * @param {number} start
 * @param {number=} end
 * @returns {Array.<number>}
 */
function getRange (start, end) {
    start = start || 0;
    if (!end) {
        end = start;
        start = 0;
    }

    var output = [];

    while (start <= end) {
        output.push(start);
        start++;
    }

    return output;
}

function forEachInObject (obj, func) {
    var keys = Object.keys(obj);
    var keysLength = keys.length;
    for (var i = 0; i < keysLength; i++) {
        func(obj[keys[i]], keys[i], obj);
    }
    return obj;
}

module.exports = {
    forEachInObject,
    getClassName,
    getRange
};
