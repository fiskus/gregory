// vim: set softtabstop=4 shiftwidth=4 noexpandtab:

'use strict';

// It's workaround for testing with PhantomJS
require('../lib/bindshim.js');

var moment = require('moment');
var C = require('../lib/calendar.js');

describe('Calendar', function () {
	it('getInitialDate, default', function() {
		expect(C.getInitialDate({})._isAMomentObject).toBe(true);
		expect(C.getInitialDate({}).isValid()).toBe(true);
	});

	it('getInitialDate, set', function() {
		expect(C.getInitialDate({
			DATE_CURRENT: new Date('2015-04-30')
		}).isSame(moment('30-04-2015', 'DD-MM-YYYY'), 'day')).toBe(true);
	});
});
