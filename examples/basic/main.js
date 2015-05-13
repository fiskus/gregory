// vim: set sw=4 ts=4 expandtab:

'use strict';

moment.locale('ru');

function onDatePicked(date) {
    console.log(date, date.format('YYYY-MM-DD'), date);
}

function initSingleMonthUglyCalendar () {
    var wrapper = document.getElementById('clndr');
    var settings = {
        DATE_CURRENT: new Date('2015-02-12'),
        UI_HAS_SIX_ROWS: false,
        UI_FORMAT_MONTH: 'MMM YYYY',
        UI_TEXT_NEXT: 'След',
        ON_SELECT: onDatePicked,
        UI_TEXT_PREV: 'Пред',
        UI_HAS_WEEKDAYS: true,
        UI_WEEKDAYS: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
    };
    var element = React.createElement(Gregory, settings);
    React.render(element, wrapper);
}

function initTrilpeMonthCalendar () {
    var wrapper = document.getElementById('calendar');
    var settings = {
        CLASSNAME: 'calendar',
        DATE_CURRENT: new Date('2015-05-12'),
        UI_HAS_SIX_ROWS: false,
        UI_FORMAT_MONTH: 'MMMM YYYY',
        UI_TEXT_NEXT: '',
        UI_MONTHS_NUMBER: 3,
        ON_SELECT: onDatePicked,
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

function initPopup (input, wrapper) {
    input.addEventListener('focus', function() {
        var element = React.createElement(Gregory, {
            CLASSNAME: 'calendar',
            UI_TEXT_PREV: '',
            UI_TEXT_NEXT: '',
            ON_SELECT: function(date) {
                wrapper.removeChild(wrapper.firstElementChild);
                input.value = date.format('DD MMMM YYYY');
            }
        });
        React.render(element, wrapper);
    });
}

function initInputs () {
    var inputsWrapper = document.getElementById('inputs');
    var checkinInput = inputsWrapper.querySelector('#checkin');
    var checkoutInput = inputsWrapper.querySelector('#checkout');

    var checkinCalendar = inputsWrapper.querySelector('#checkin-calendar');
    var checkoutCalendar = inputsWrapper.querySelector('#checkout-calendar');

    initPopup(checkinInput, checkinCalendar);
    initPopup(checkoutInput, checkoutCalendar);

}

function whenReady () {
    initSingleMonthUglyCalendar();
    initTrilpeMonthCalendar();
    initInputs();
}


if (document.readyState !== 'loading') {
    whenReady();
} else {
    window.addEventListener('DOMContentLoaded', whenReady);
}
