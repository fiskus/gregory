// vim: set noexpandtab:

'use strict';

var React = require('react');
var moment = require('moment');

var Helpers = require('./helpers.js');
var Day = require('./day.js');

function createWeekdaysElement (props) {
	if (!props.UI_HAS_WEEKDAYS) {
		return null;
	}
	var classNames = ['weekday'];
	return Helpers.mapArray(props.UI_WEEKDAYS, function(day, i) {
		var weekdayClassNames = i === 5 || i === 6 ?
				classNames.concat('weekday-holiday') : classNames;
		return React.DOM.div({
			key: 'weekday-' + i,
			className: Helpers.getClassName(props, weekdayClassNames)
		}, day);
	});
}

function createCurrentDateElement (props) {
	return React.DOM.div({
		className: Helpers.getClassName(props, 'current-date')
	}, props.DATE.format(props.UI_FORMAT_MONTH));
}

function createWeekdaysHeader (props) {
	return React.DOM.div({
		className: Helpers.getClassName(props, 'headers')
	}, createCurrentDateElement(props), createWeekdaysElement(props));
}

function createClearfix (props) {
	return React.DOM.div({
		className: Helpers.getClassName(props, 'clearfix')
	});
}

function getDayByNumber (date, num) {
	// FIXME: date from other month is not valid
	// NOTE: http://momentjs.com/docs/#/parsing/array/
	return moment([date.year(), date.month(), num]);
}

function getDaysFromPrevMonth (props) {
	var startOfMonth = props.DATE.startOf('month');
	var diff = startOfMonth.weekday() - props.WEEK_OFFSET;
	if (diff < 0) {
		diff += 7;
	}
	if (!diff) {
		return [];
	}
	var range = Helpers.getRange(1, diff);
	return Helpers.mapArray(range, function (i) {
		return {
			DAY: getDayByNumber(props.DATE, i - diff),
			POSITION: -1
		};
	});
}

function getDaysFromCurrentMonth (props) {
	var range = Helpers.getRange(1, props.DATE.daysInMonth());
	return Helpers.mapArray(range, function (i) {
		return {
			DAY: getDayByNumber(props.DATE, i),
			POSITION: 0
		};
	});
}

function getDaysFromNextMonth (props, limit) {
	var numberOfDays = props.DATE.daysInMonth();
	var range = Helpers.getRange(1, limit);
	return Helpers.mapArray(range, function (i) {
		return {
			DAY: getDayByNumber(props.DATE, numberOfDays + i),
			POSITION: 1
		};
	});
}

function getExtraDaysAtTheEnd (props, date, limit) {
	var range = Helpers.getRange(1, limit);
	return Helpers.mapArray(range, function (i) {
		return {
			DAY: date.clone().add(i - 1, 'days'),
			POSITION: 1
		};
	});
}

function getDays (props) {
	// jshint maxstatements: 12
	var days = [];

	days = Array.prototype.concat.apply(
			days, getDaysFromPrevMonth(props));

	days = Array.prototype.concat.apply(
			days, getDaysFromCurrentMonth(props));

	var tillEndOfMonth = 7 - (days.length % 7);
	if (tillEndOfMonth) {
		days = Array.prototype.concat.apply(
				days, getDaysFromNextMonth(props, tillEndOfMonth));
	}

	var tillEndOfSixRows = 42 - days.length;
	if (props.UI_HAS_SIX_ROWS && tillEndOfSixRows) {
		var lastDate = days[days.length - 1].DAY;
		var start = lastDate.clone().add(1, 'days');
		days = Array.prototype.concat.apply(
				days, getExtraDaysAtTheEnd(props, start, tillEndOfSixRows));
	}

	return days;
}

function createDayElement (props, day, i) {
	var dayProps = Helpers.assignObject({}, props, day, {
		key: 'day-' + i
	});
	return React.createElement(Day, dayProps);
}

function createDaysElement (props) {
	return React.DOM.div({
		className: Helpers.getClassName(props, 'days')
	}, Helpers.mapArray(getDays(props), function(day, i) {
		return createDayElement(props, day, i);
	}));
}

function createMainElement (props) {
	return React.DOM.div({
			className: Helpers.getClassName(props, 'grid')
		},
		createWeekdaysHeader(props),
		createDaysElement(props),
		createClearfix(props));
}

function createClass () {
	return React.createClass({
		displayName: 'Month',

		render: function() {
			return createMainElement(this.props);
		}
	});
}

module.exports = createClass();
