// vim: set sw=4 ts=4 expandtab:

'use strict';

// It's workaround for testing with PhantomJS
require('../lib/bindshim.js');

var moment = require('moment');
var CalendarModel = require('../lib/calendarmodel.js');

describe('Calendar', function () {
    it('getInitialDate, default', function () {
        expect(CalendarModel.getInitialDate({})._isAMomentObject).toBe(true);
        expect(CalendarModel.getInitialDate({}).isValid()).toBe(true);
    });

    it('getInitialDate, set', function () {
        expect(CalendarModel.getInitialDate({
            DATE_CURRENT: new Date('2015-04-30')
        }).isSame(moment('30-04-2015', 'DD-MM-YYYY'), 'day')).toBe(true);
    });
});
