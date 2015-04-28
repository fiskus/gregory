// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var moment = require('moment');

var Helpers = require('./helpers.js');
var Day = require('./day.js');

function createWeekdaysElement (props) {
    if (!props.SHOW_WEEKDAYS) {
        return null;
    }
    return Helpers.mapArray(props.WEEKDAYS, function(day, i)  {
        return React.DOM.div({
            key: 'weekday-' + i,
            className: Helpers.getClassName(props, 'weekday')
        }, day);
    });
}

function createWeekdaysHeader (props) {
    return React.DOM.div({
        className: Helpers.getClassName(props, 'headers')
    }, createWeekdaysElement(props));
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
    var range = Helpers.getRange(1, diff);
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(props.DATE, i - diff),
            position: -1
        };
    });
}

function getDaysFromCurrentMonth (props) {
    var range = Helpers.getRange(1, props.DATE.daysInMonth());
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(props.DATE, i),
            position: 0
        };
    });
}

function getDaysFromNextMonth (props, limit) {
    var numberOfDays = props.DATE.daysInMonth();
    var range = Helpers.getRange(1, limit);
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(props.DATE, numberOfDays + i),
            position: 1
        };
    });
}

function getExtraDaysAtTheEnd (props, date, limit) {
    var range = Helpers.getRange(1, limit);
    return Helpers.mapArray(range, function (i) {
        return {
            day: date.clone().add(i - 1, 'days'),
            position: 1
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
    if (props.FORCE_SIX_ROWS && tillEndOfSixRows) {
        var lastDate = days[days.length - 1].day;
        var start = lastDate.clone().add(1, 'days');
        days = Array.prototype.concat.apply(
                days, getExtraDaysAtTheEnd(props, start, tillEndOfSixRows));
    }

    return days;
}

function createDayElement (props, day, i) {
    var dayProps = Helpers.assignObject({}, props, {
        POSITION: day.position, // position related to current month
        DAY: day.day,
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
