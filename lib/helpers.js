// vim: set softtabstop=4 shiftwidth=4:

'use strict';

/**
 * @param props {ReactProps}
 * @param name {string=}
 * @returns {string}
 */
function getClassName (props, name) {
    var rootClassName = props.rootClassName || 'clndr';
    if (!name) {
        return rootClassName;
    } else if (typeof name === 'string') {
        return rootClassName + '-' + name;
    } else {
        return mapArray(name, function(nameItem) {
            return getClassName(props, nameItem);
        }).join(' ');
    }
}

/**
 * Array of numbers from `start` to `end`
 * If only one argument defined, then from 0 to `arg`
 * @param start {number}
 * @param end {number=}
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

function mapArray (arr, func) {
    return arr.map(func);
}

module.exports = {
    getClassName: getClassName,
    getRange: getRange,
    mapArray: mapArray
};
