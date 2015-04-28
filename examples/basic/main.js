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
    DEFAULT_DATE: new Date('2015-02-12'),
    FORCE_SIX_ROWS: true,
    MONTH_FORMAT: 'MMM YYYY',
    NEXT_TEXT: 'След',
    ON_PICK_DATE: onDatePicked,
    PREV_TEXT: 'Пред',
    SHOW_WEEKDAYS: true,
    WEEKDAYS: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    // ROOT_CLASSNAME: 'calendar'
};
var calendarElement = React.createElement(Calendar, calendarSettings);
React.render(calendarElement, wrapper);
