// vim: set sw=4 ts=4 expandtab:

'use strict';

// It's workaround for testing with PhantomJS
require('../lib/bindshim.js');

var H = require('../lib/helpers.js');

describe('Helpers', function () {
    it('getClassName', function () {
        expect(H.getClassName({
            CLASSNAME: 'clndr'
        })).toBe('clndr');

        expect(H.getClassName({
            CLASSNAME: 'clndr'
        }, 'keke')).toBe('clndr-keke');

        expect(H.getClassName({
            CLASSNAME: 'clndr'
        }, ['kekeke', 'ololo'])).toBe('clndr-kekeke clndr-ololo');
    });

    it('getRange', function () {
        expect(H.getRange()).toEqual([0]);
        expect(H.getRange(1)).toEqual([0, 1]);
        expect(H.getRange(3)).toEqual([0, 1, 2, 3]);
        expect(H.getRange(3, 6)).toEqual([3, 4, 5, 6]);
    });

    it('forEachInObject', function () {
        var obj = {
            a: 1,
            b: 2,
            c: 3,
            d: 4
        };
        var outputs = [];
        function stringify (value, key) {
            outputs.push(key + ':' + value);
        }
        H.forEachInObject(obj, stringify);
        expect(outputs.join()).toBe('a:1,b:2,c:3,d:4');
    });
});
