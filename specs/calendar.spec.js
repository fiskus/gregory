// vim: set sw=4 ts=4 expandtab:

'use strict';

// It's workaround for testing with PhantomJS
require('../lib/bindshim.js');

var moment = require('moment');
var C = require('../lib/calendar.jsx');

describe('Calendar', function () {
    xit('getInitialDate, default', function () {
        expect(C.getInitialDate({})._isAMomentObject).toBe(true);
        expect(C.getInitialDate({}).isValid()).toBe(true);
    });

    xit('getInitialDate, set', function () {
        expect(C.getInitialDate({
            DATE_CURRENT: new Date('2015-04-30')
        }).isSame(moment('30-04-2015', 'DD-MM-YYYY'), 'day')).toBe(true);
    });
});
