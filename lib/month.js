// vim: set sw=4 ts=4 expandtab:

import React from './react-loader.js';
import moment from './moment-loader.js';
import Helpers from './helpers.js';
import Day from './day.js';

function createWeekdaysElement (props) {
    if (!props.UI_HAS_WEEKDAYS) {
        return null;
    }
    var classNames = ['weekday'];
    return props.UI_WEEKDAYS.map((day, i) => {
        var weekdayClassNames = i === 5 || i === 6 ?
                classNames.concat('weekday-holiday') : classNames;
        return React.createElement('div', {
            key: 'weekday-' + i,
            className: Helpers.getClassName(props, weekdayClassNames)
        }, day);
    });
}

function createCurrentDateElement (props) {
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'current-date')
    }, props.DATE.format(props.UI_FORMAT_MONTH));
}

function createWeekdaysHeader (props) {
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'headers')
    }, createCurrentDateElement(props), createWeekdaysElement(props));
}

function createClearfix (props) {
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'clearfix')
    });
}

function getDayByNumber (date, num) {
    var daysDiff = num - 1;
    return moment([date.year(), date.month(), 1]).add(daysDiff, 'days');
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
    return range.map(i => {
        return {
            DAY: getDayByNumber(props.DATE, i - diff),
            POSITION: -1
        };
    });
}

function getDaysFromCurrentMonth (props) {
    var range = Helpers.getRange(1, props.DATE.daysInMonth());
    return range.map(i => {
        return {
            DAY: getDayByNumber(props.DATE, i),
            POSITION: 0
        };
    });
}

function getDaysFromNextMonth (props, limit) {
    var numberOfDays = props.DATE.daysInMonth();
    var range = Helpers.getRange(1, limit);
    return range.map(i => {
        return {
            DAY: getDayByNumber(props.DATE, numberOfDays + i),
            POSITION: 1
        };
    });
}

function getExtraDaysAtTheEnd (props, date, limit) {
    var range = Helpers.getRange(1, limit);
    return range.map(i => {
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
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'days')
    }, getDays(props).map((day, i) => createDayElement(props, day, i)));
}

function createMainElement (props) {
    return React.createElement('div', {
            className: Helpers.getClassName(props, 'grid')
        },
        createWeekdaysHeader(props),
        createDaysElement(props),
        createClearfix(props));
}

function createClass () {
    return React.createClass({
        displayName: 'Month',

        render () {
            return createMainElement(this.props);
        }
    });
}

if (process.env.TESTING) {
    module.exports = {
        getDayByNumber,
        getDaysFromPrevMonth,
        getDaysFromCurrentMonth,
        getDaysFromNextMonth,
        getExtraDaysAtTheEnd,
        getDays
    };
} else {
    module.exports = createClass();
}
