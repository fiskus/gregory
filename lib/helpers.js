// vim: set noexpandtab:

'use strict';

function mapArrayInternal (arr, func) {
    return arr.map(func);
}

var mapArray = Array.prototype.map ?
        mapArrayInternal : require('array-map');

function forEachInArrayInternal (arr, func) {
    return arr.forEach(func);
}

var forEachInArray = Array.prototype.forEach ?
        forEachInArrayInternal : require('array-foreach');

/**
 * @param props {ReactProps}
 * @param name {string=}
 * @returns {string}
 */
function getClassName (props, name) {
    if (!name) {
        return props.CLASSNAME;
    } else if (typeof name === 'string') {
        return props.CLASSNAME + '-' + name;
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

var assignObject = Object.assign || require('object-assign');

var keysOfObject = Object.keys || require('object-keys');

function forEachInObject (obj, func) {
    var keys = keysOfObject(obj);
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
