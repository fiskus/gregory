// vim: set sw=4 ts=4 expandtab:

'use strict';

var React = require('react');
var Gregory = require('../lib/calendar.js');

function initTrilpeMonthCalendar () {
    var wrapper = document.getElementById('calendar');
    var settings = {
        CLASSNAME: 'calendar',
        DATE_CURRENT: new Date('2015-05-12'),
        UI_HAS_SIX_ROWS: false,
        UI_FORMAT_MONTH: 'MMMM YYYY',
        UI_TEXT_NEXT: '',
        UI_MONTHS_NUMBER: 3,
        ON_SELECT: function (date) {
            console.log(date, date.format('YYYY-MM-DD'), date);
        },
        UI_TEXT_PREV: '',
        UI_HAS_WEEKDAYS: true,
        UI_WEEKDAYS: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'],
        DATE_MIN: new Date('2015-06-10'),
        DATE_MAX: new Date('2015-07-10'),
        DATE_SELECTS: [{
            DATE: new Date('2015-06-14'),
            CLASSNAME: 'day-checkin'
        }, {
            DATE: new Date('2015-06-18'),
            CLASSNAME: 'day-checkout'
        }],
        DATE_RANGES: [{
            FROM: new Date('2015-06-19'),
            TO: new Date('2015-06-24'),
            CLASSNAME: 'day-range'
        }]
    };
    var element = React.createElement(Gregory, settings);
    React.render(element, wrapper);
}

function whenReady () {
    initTrilpeMonthCalendar();
}

if (document.readyState !== 'loading') {
    whenReady();
} else {
    window.addEventListener('DOMContentLoaded', whenReady);
}
