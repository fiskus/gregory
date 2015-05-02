// vim: set softtabstop=4 shiftwidth=4 noexpandtab:

'use strict';

var React = require('react');

var Calendar = require('../../lib/index.js');

require('moment/locale/ru');

function onDatePicked(date) {
	console.log(date, date.format('YYYY-MM-DD'));
}

function initSingleMonthUglyCalendar () {
	var wrapper = document.getElementById('clndr');
	var settings = {
		DEFAULT_DATE: new Date('2015-02-12'),
		FORCE_SIX_ROWS: false,
		MONTH_FORMAT: 'MMM YYYY',
		NEXT_TEXT: 'След',
		ON_PICK_DATE: onDatePicked,
		PREV_TEXT: 'Пред',
		SHOW_WEEKDAYS: true,
		WEEKDAYS: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
	};
	var element = React.createElement(Calendar, settings);
	React.render(element, wrapper);
}

function initTrilpeMonthCalendar () {
	var wrapper = document.getElementById('calendar');
	var settings = {
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
		MIN_DATE: new Date('2015-06-10'),
		MAX_DATE: new Date('2015-07-10'),
		SELECTS: [{
			DATE: new Date('2015-06-14'),
			CLASSNAME: 'day-checkin'
		}, {
			DATE: new Date('2015-06-18'),
			CLASSNAME: 'day-checkout'
		}],
			RANGES: [{
				FROM: new Date('2015-06-19'),
				TO: new Date('2015-06-24'),
				CLASSNAME: 'day-range'
			}]
	};
	var element = React.createElement(Calendar, settings);
	React.render(element, wrapper);
}

function initPopup (input, wrapper) {
	input.addEventListener('focus', function() {
		var element = React.createElement(Calendar, {
			ROOT_CLASSNAME: 'calendar',
			PREV_TEXT: '',
			NEXT_TEXT: '',
			ON_PICK_DATE: function(date) {
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
