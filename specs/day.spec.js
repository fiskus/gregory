// vim: set sw=4 ts=4 expandtab:

'use strict';

// It's workaround for testing with PhantomJS
require('../lib/bindshim.js');

var Day = require('../lib/day.js');
var moment = require('moment');

// TODO:
// createDayNumber
// getClassName
// isUnselectable

describe('Day', function () {
    it('isOtherMonth', function() {
        expect(Day.isOtherMonth({
            POSITION: -1
        })).toBe(true);
        expect(Day.isOtherMonth({
            POSITION: 1
        })).toBe(true);
        expect(Day.isOtherMonth({
            POSITION: 0
        })).toBe(false);
    });

    it('isHoliday', function() {
        expect(Day.isHoliday({
            DAY: moment().day(0)
        })).toBe(true);
        expect(Day.isHoliday({
            DAY: moment().day(6)
        })).toBe(true);
        expect(Day.isHoliday({
            DAY: moment().day(2)
        })).toBe(false);
        expect(Day.isHoliday({
            DAY: moment().day(3)
        })).toBe(false);
    });

    it('isToday', function() {
        expect(Day.isToday({
            DAY: moment()
        })).toBe(true);
        expect(Day.isToday({
            DAY: moment().add(1, 'day')
        })).toBe(false);
    });

    it('isCurrent', function() {
        expect(Day.isCurrent({
            DAY: moment('30-04-2015', 'DD-MM-YYYY'),
            DATE_CURRENT: moment('30-04-2015', 'DD-MM-YYYY')
        })).toBe(true);
        expect(Day.isCurrent({
            DAY: moment('30-05-2015', 'DD-MM-YYYY'),
            DATE_CURRENT: moment('30-03-2015', 'DD-MM-YYYY')
        })).toBe(false);
    });

    it('parseProps', function() {
        var props = {
            DAY: moment('30-04-2015', 'DD-MM-YYYY')
        };
        expect(Day.parseProps(props)).toEqual({
            isUnselectable: jasmine.any(Boolean),
            isOtherMonth: jasmine.any(Boolean),
            isHoliday: jasmine.any(Boolean),
            isToday: jasmine.any(Boolean),
            isCurrent: jasmine.any(Boolean)
        });
    });
});
