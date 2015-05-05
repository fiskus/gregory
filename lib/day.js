// vim: set softtabstop=4 shiftwidth=4 noexpandtab:

'use strict';

var React = require('react');
var Helpers = require('./helpers.js');

function isOtherMonth (props) {
	return props.POSITION !== 0;
}

/**
 * Day is unselectable when
 *	 it is not from current month and there more than one month
 *	 it is out of bounds of min and max dates
 * @returns {boolean}
 */
function isUnselectable (props) {
	function isBeforeMin() {
		var minDate = props.MIN_DATE;
		return !!minDate && props.DAY.isBefore(minDate);
	}
	function isAfterMax() {
		var maxDate = props.MAX_DATE;
		return !!maxDate && props.DAY.isAfter(maxDate);
	}
	return (isOtherMonth(props) && props.NUMBER_OF_MONTHS > 1) ||
			(isBeforeMin()) || (isAfterMax());
}

function isHoliday (props) {
	var dayOfWeek = props.DAY.day();
	return dayOfWeek === 6 || dayOfWeek === 0;
}

function isToday (props) {
	return props.DAY.isSame(new Date(), 'day');
}

function isCurrent (props) {
	return props.DAY.isSame(props.DEFAULT_DATE, 'day');
}

function parseProps (props) {
	return {
		isUnselectable: isUnselectable(props),
		isOtherMonth: isOtherMonth(props),
		isHoliday: isHoliday(props),
		isToday: isToday(props),
		isCurrent: isCurrent(props)
	};
}

// TODO: special case, set date and some callback for that date

/**
 * @param props {ReactProps}
 */
function onClick (props, options) {
	if (options.isUnselectable) {
		return null;
	} else {
		return function () {
			if (props.ON_PICK_DATE) {
				props.ON_PICK_DATE(props.DAY);
			}
		};
	}
}

function getClassName (props, options) {
	var optionsToClasses = {
		isUnselectable: 'day-unselectable',
		isOtherMonth: 'day-other-month',
		isHoliday: 'day-holiday',
		isToday: 'day-today',
		isCurrent: 'day-current'
	};

	var classNames = ['day'];

	Helpers.forEachInObject(options, function (isEnabled, option) {
		if (isEnabled) {
			classNames.push(optionsToClasses[option]);
		}
	});

	if (props.SELECTS) {
		Helpers.forEachInArray(props.SELECTS, function (select) {
			if (props.DAY.isSame(select.DATE, 'day')) {
				classNames.push(select.CLASSNAME);
			}
		});
	}

	if (props.RANGES) {
		Helpers.forEachInArray(props.RANGES, function (range) {
			if (props.DAY.isBetween(range.FROM, range.TO, 'day')) {
				classNames.push(range.CLASSNAME);
			}
		});
	}

	return Helpers.getClassName(props, classNames);
}

function createDayNumber (props, options) {
	if (props.NUMBER_OF_MONTHS > 1 && options.isOtherMonth) {
		return null;
	} else {
		return React.DOM.span({
			className: Helpers.getClassName(props, 'day-number')
		}, props.DAY.date());
	}
}

/**
 * @param props {ReactProps}
 * @return {ReactElement}
 */
function createMainElement (props) {
	var options = parseProps(props);
	var divSettings = {
		onClick: onClick(props, options),
		className: getClassName(props, options)
	};
	return React.DOM.div(
		divSettings,
		createDayNumber(props, options));
}

/**
 * @param globalOptions {Object}
 * @return {ReactClass}
 */
function createClass () {
	return React.createClass({
		displayName: 'Day',

		render: function() {
			return createMainElement(this.props);
		}
	});
}

module.exports = createClass();

if (process.env.TESTING) {
	module.exports = {
		createDayNumber: createDayNumber,
		getClassName: getClassName,
		isCurrent: isCurrent,
		isHoliday: isHoliday,
		isOtherMonth: isOtherMonth,
		isToday: isToday,
		isUnselectable: isUnselectable,
		parseProps: parseProps
	};
} else {
	module.exports = createClass();
}
