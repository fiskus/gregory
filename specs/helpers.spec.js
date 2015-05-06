// vim: set noexpandtab:

'use strict';

// It's workaround for testing with PhantomJS
require('../lib/bindshim.js');

var H = require('../lib/helpers.js');

describe('Helpers', function () {
    it('mapArray', function() {
        function multiple2 (n) {
            return n * 2;
        }
        expect(H.mapArray([1, 2, 3, 4], multiple2)).toEqual([2, 4, 6, 8]);
    });

    it('getClassName', function() {
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

    it('getRange', function() {
        expect(H.getRange()).toEqual([0]);
        expect(H.getRange(1)).toEqual([0, 1]);
        expect(H.getRange(3)).toEqual([0, 1, 2, 3]);
        expect(H.getRange(3, 6)).toEqual([3, 4, 5, 6]);
    });

    it('forEachInArray', function() {
        var output = 0;
        function add (n) {
            output += n;
        }
        H.forEachInArray([1, 2, 3, 4], add);
        expect(output).toEqual(10);
    });

    it('assignObject', function() {
        expect(H.assignObject({a: 1}, {b: 2}, {c: 3})).toEqual({
            a: 1,
            b: 2,
            c: 3
        });
    });

    it('forEachInObject', function() {
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
