// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var Calendar = require('../../lib/index.js');

require('moment/locale/nb');

function onDatePicked(date) {
    console.log(date, date.format('YYYY-MM-DD'));
}

var wrapper = document.getElementById('calendar');
var calendarSettings = {
    defaultDate: new Date('2015-02-12'),
    onPickDate: onDatePicked,
    showDaysOfWeek: true,
    forceSixRows: true
    // rootClassName: 'calendar'
};
var calendarElement = React.createElement(Calendar, calendarSettings);
React.render(calendarElement, wrapper);
