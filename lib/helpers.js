// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var ObjectAssignPonyfill = require('object-assign');

function mapArray (arr, func) {
    return arr.map(func);
}

function forEachInArray (arr, func) {
    return arr.forEach(func);
}

/**
 * @param props {ReactProps}
 * @param name {string=}
 * @returns {string}
 */
function getClassName (props, name) {
    if (!name) {
        return props.ROOT_CLASSNAME;
    } else if (typeof name === 'string') {
        return props.ROOT_CLASSNAME + '-' + name;
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

function assignObject () {
    if (Object.assign) {
        return Object.assign.apply(Object, arguments);
    } else {
        return ObjectAssignPonyfill.apply(Object, arguments);
    }
}

function forEachInObject(obj, func) {
    var keys = Object.keys(obj);
    var keysLength = keys.length;
    for (var i = 0; i < keysLength; i++) {
        func(obj[keys[i]], keys[i], obj);
    }
    return obj;
}


module.exports = {
    assignObject: assignObject,
    forEachInArray: forEachInArray,
    forEachInObject: forEachInObject,
    getClassName: getClassName,
    getRange: getRange,
    mapArray: mapArray
};
