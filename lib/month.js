// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var moment = require('moment');

var Helpers = require('./helpers.js');
var Day = require('./day.js');

function createWeekdaysElement (props) {
    if (!props.showDaysOfWeek) {
        return null;
    }
    return Helpers.mapArray(props.weekdays, function(day, i)  {
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
    var startOfMonth = props.date.startOf('month');
    var diff = startOfMonth.weekday() - props.weekOffset;
    if (diff < 0) {
        diff += 7;
    }
    var range = Helpers.getRange(1, diff);
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(props.date, i - diff),
            classes: Helpers.getClassName(props, ['day', 'prev-month'])
        };
    });
}

function getDaysFromCurrentMonth (props) {
    var range = Helpers.getRange(1, props.date.daysInMonth());
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(props.date, i),
            classes: Helpers.getClassName(props, 'day')
        };
    });
}

function getDaysFromNextMonth (props, limit) {
    var numberOfDays = props.date.daysInMonth();
    var range = Helpers.getRange(1, limit);
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(props.date, numberOfDays + i),
            classes: Helpers.getClassName(props, ['day', 'next-month'])
        };
    });
}

function getExtraDaysAtTheEnd (props, date, limit) {
    var range = Helpers.getRange(1, limit);
    return Helpers.mapArray(range, function (i) {
        return {
            day: date.clone().add(i - 1, 'days'),
            classes: Helpers.getClassName(props, ['day', 'next-month'])
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
    if (props.forceSixRows && tillEndOfSixRows) {
        var lastDate = days[days.length - 1].day;
        var start = lastDate.clone().add(1, 'days');
        days = Array.prototype.concat.apply(
                days, getExtraDaysAtTheEnd(props, start, tillEndOfSixRows));
    }

    return days;
}

function createDayElement (props, day, i) {
    return React.createElement(Day, {
        key: 'day-' + i,
        day: day,
        onClick: props.onPickDate
    });
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
