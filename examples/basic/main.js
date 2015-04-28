// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');

var Calendar = require('../../lib/index.js');

require('moment/locale/ru');

function onDatePicked(date) {
    console.log(date, date.format('YYYY-MM-DD'));
}

var wrapper = document.getElementById('calendar');
var calendarSettings = {
    defaultDate: new Date('2015-02-12'),
    forceSixRows: true,
    monthFormat: 'MMM YYYY',
    nextText: 'След',
    onPickDate: onDatePicked,
    prevText: 'Пред',
    showDaysOfWeek: true,
    weekdays: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    // rootClassName: 'calendar'
};
var calendarElement = React.createElement(Calendar, calendarSettings);
React.render(calendarElement, wrapper);
