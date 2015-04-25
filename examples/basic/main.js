// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var Calendar = require('../../lib/index.js');

require('moment/locale/nb');

function onDatePicked(date) {
    console.log(date);
}

var wrapper = document.getElementById('calendar');
var calendarSettings = {
    onPickDate: onDatePicked,
    showDaysOfWeek: true
};
var calendarElement = React.createElement(Calendar, calendarSettings);
React.render(calendarElement, wrapper);
