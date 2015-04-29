// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');

var Calendar = require('../../lib/index.js');

require('moment/locale/ru');

function onDatePicked(date) {
    console.log(date, date.format('YYYY-MM-DD'));
}

var clndrWrapper = document.getElementById('clndr');
var clndrSettings = {
    DEFAULT_DATE: new Date('2015-02-12'),
    FORCE_SIX_ROWS: false,
    MONTH_FORMAT: 'MMM YYYY',
    NEXT_TEXT: 'След',
    ON_PICK_DATE: onDatePicked,
    PREV_TEXT: 'Пред',
    SHOW_WEEKDAYS: true,
    WEEKDAYS: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
};
var clndrElement = React.createElement(Calendar, clndrSettings);
React.render(clndrElement, clndrWrapper);


var calendarWrapper = document.getElementById('calendar');
var calendarSettings = {
    DEFAULT_DATE: new Date('2015-05-12'),
    FORCE_SIX_ROWS: false,
    MONTH_FORMAT: 'MMMM YYYY',
    NEXT_TEXT: '',
    NUMBER_OF_MONTHS: 3,
    ON_PICK_DATE: onDatePicked,
    PREV_TEXT: '',
    ROOT_CLASSNAME: 'calendar',
    SHOW_WEEKDAYS: true,
    WEEKDAYS: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
    MIN_DATE: new Date('2015-05-10'),
    MAX_DATE: new Date('2015-06-10')
};
var calendarElement = React.createElement(Calendar, calendarSettings);
React.render(calendarElement, calendarWrapper);
