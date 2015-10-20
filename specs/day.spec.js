// vim: set sw=4 ts=4 expandtab:

'use strict';

// It's workaround for testing with PhantomJS
require('../lib/bindshim.js');

var DayProps = require('../lib/daymodel.js');
var moment = require('moment');

describe('Day', function () {
    it('isOtherMonth', function () {
        expect(DayProps.isOtherMonth({
            POSITION: -1
        })).toBe(true);
        expect(DayProps.isOtherMonth({
            POSITION: 1
        })).toBe(true);
        expect(DayProps.isOtherMonth({
            POSITION: 0
        })).toBe(false);
    });

    it('isHoliday', function () {
        expect(DayProps.isHoliday({
            DAY: moment().day(0)
        })).toBe(true);
        expect(DayProps.isHoliday({
            DAY: moment().day(6)
        })).toBe(true);
        expect(DayProps.isHoliday({
            DAY: moment().day(2)
        })).toBe(false);
        expect(DayProps.isHoliday({
            DAY: moment().day(3)
        })).toBe(false);
    });

    it('isToday', function () {
        expect(DayProps.isToday({
            DAY: moment()
        })).toBe(true);
        expect(DayProps.isToday({
            DAY: moment().add(1, 'day')
        })).toBe(false);
    });

    it('isCurrent', function () {
        expect(DayProps.isCurrent({
            DAY: moment('30-04-2015', 'DD-MM-YYYY'),
            DATE_CURRENT: moment('30-04-2015', 'DD-MM-YYYY')
        })).toBe(true);
        expect(DayProps.isCurrent({
            DAY: moment('30-05-2015', 'DD-MM-YYYY'),
            DATE_CURRENT: moment('30-03-2015', 'DD-MM-YYYY')
        })).toBe(false);
    });

    it('isUnselectable', function () {
        expect(DayProps.isUnselectable({})).toBe(false);

        expect(DayProps.isUnselectable({
            DAY: moment('29-04-2015', 'DD-MM-YYYY'),
            DATE_MIN: moment('30-04-2015', 'DD-MM-YYYY')
        })).toBe(true);

        expect(DayProps.isUnselectable({
            DAY: moment('30-04-2015', 'DD-MM-YYYY'),
            DATE_MAX: moment('29-04-2015', 'DD-MM-YYYY')
        })).toBe(true);

        expect(DayProps.isUnselectable({
            POSITION: -1,
            UI_MONTHS_NUMBER: 2
        })).toBe(true);

        expect(DayProps.isUnselectable({
            POSITION: 1,
            UI_MONTHS_NUMBER: 2
        })).toBe(true);

        expect(DayProps.isUnselectable({
            POSITION: 1,
            UI_MONTHS_NUMBER: 1
        })).toBe(false);
    });

    it('parseProps', function () {
        var props = {
            DAY: moment('30-04-2015', 'DD-MM-YYYY')
        };
        expect(DayProps.default(props)).toEqual({
            isUnselectable: jasmine.any(Boolean),
            isOtherMonth: jasmine.any(Boolean),
            isHoliday: jasmine.any(Boolean),
            isToday: jasmine.any(Boolean),
            isCurrent: jasmine.any(Boolean)
        });
    });

    it('getClassName, basic', function () {
        // jscs:disable maximumLineLength
        expect(DayProps.getClassNameParts({
            DAY: moment(),
            DATE_SELECTS: {},
            CLASSNAME: 'c'
        }, {
            isUnselectable: true,
            isOtherMonth: true,
            isHoliday: true,
            isToday: true,
            isCurrent: true
        })).toEqual(['day',
                     'day-unselectable',
                     'day-other-month',
                     'day-holiday',
                     'day-today',
                     'day-current']);

        expect(DayProps.getClassNameParts({
            DAY: moment(),
            DATE_SELECTS: {},
            CLASSNAME: 'c'
        }, {})).toEqual(['day']);

        expect(DayProps.getClassNameParts({
            DAY: moment('', 'YYYY-MM-DD'),
            DATE_SELECTS: {},
            CLASSNAME: 'c'
        }, {})).toEqual(['day']);
    });

    it('getClassName, selects', function () {
        expect(DayProps.getClassNameParts({
            DAY: moment('2015-03-30', 'YYYY-MM-DD'),
            DATE_SELECTS: {
                '2015-03-30': 'day-select'
            },
            CLASSNAME: 'c'
        }, {})).toEqual(['day', 'day-select']);

        expect(DayProps.getClassNameParts({
            DAY: moment('2015-03-30', 'YYYY-MM-DD'),
            DATE_SELECTS: {
                '2015-03-01': 'day-select'
            },
            CLASSNAME: 'c'
        }, {})).toEqual(['day']);
    });

    it('getClassName, ranges', function () {
        expect(DayProps.getClassNameParts({
            DAY: moment('2015-03-20', 'YYYY-MM-DD'),
            DATE_SELECTS: {},
            DATE_RANGES: [{
                FROM: new Date('2015-03-10'),
                TO: new Date('2015-03-30'),
                CLASSNAME: 'day-range'
            }],
            CLASSNAME: 'c'
        }, {})).toEqual(['day', 'day-range']);

        expect(DayProps.getClassNameParts({
            DAY: moment('2015-03-30', 'YYYY-MM-DD'),
            DATE_SELECTS: {},
            DATE_RANGES: [{
                FROM: new Date('2015-03-10'),
                TO: new Date('2015-03-20'),
                CLASSNAME: 'day-range'
            }],
            CLASSNAME: 'c'
        }, {})).toEqual(['day']);
    });
});
