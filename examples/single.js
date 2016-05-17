// vim: set sw=4 ts=4 expandtab:

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Gregory = require('../lib/calendar.jsx').default;

function initSingleMonthUglyCalendar () {
    var wrapper = document.getElementById('clndr');
    var settings = {
        DATE_CURRENT: new Date('2015-04-12'),
        UI_HAS_SIX_ROWS: false,
        UI_FORMAT_MONTH: 'MMM YYYY',
        UI_TEXT_NEXT: 'След',
        ON_SELECT: function (date) {
            console.log(date, date.format('YYYY-MM-DD'), date);
        },
        UI_TEXT_PREV: 'Пред',
        UI_HAS_WEEKDAYS: true,
        UI_WEEKDAYS: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    };
    var element = React.createElement(Gregory, settings);
    ReactDOM.render(element, wrapper);
}

function whenReady () {
    initSingleMonthUglyCalendar();
}

if (document.readyState !== 'loading') {
    whenReady();
} else {
    window.addEventListener('DOMContentLoaded', whenReady);
}
