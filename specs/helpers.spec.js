'use strict';

// It's workaround for testing with PhantomJS
require('../lib/bindshim.js');

var H = require('../lib/helpers.js');

// TODO:
// forEachInArray
// assignObject
// forEachInObject

describe('Helpers', function () {
    it('mapArray', function() {
        expect(H.mapArray([1, 2, 3, 4], function(n) {
            return n * 2;
        })).toEqual([2, 4, 6, 8]);
    });

    it('getClassName', function() {
        expect(H.getClassName({
            ROOT_CLASSNAME: 'clndr'
        })).toBe('clndr');

        expect(H.getClassName({
            ROOT_CLASSNAME: 'clndr'
        }, 'keke')).toBe('clndr-keke');

        expect(H.getClassName({
            ROOT_CLASSNAME: 'clndr'
        }, ['kekeke', 'ololo'])).toBe('clndr-kekeke clndr-ololo');
    });

    it('getRange', function() {
        expect(H.getRange()).toEqual([0]);
        expect(H.getRange(1)).toEqual([0, 1]);
        expect(H.getRange(3)).toEqual([0, 1, 2, 3]);
        expect(H.getRange(3, 6)).toEqual([3, 4, 5, 6]);
    });
});
