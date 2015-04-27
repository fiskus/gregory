// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var moment = require('moment');
var Day = require('./Day.js');
var CalendarControls = require('./CalendarControls.js');
var Helpers = require('./helpers.js');

var defaultProps = {
    weekOffset: 0,
    forceSixRows: false,
    showDaysOfWeek: false,
    onPickDate: null
};

var defTypes = {
    weekOffset: React.PropTypes.number,
    forceSixRows: React.PropTypes.bool,
    showDaysOfWeek: React.PropTypes.bool
};

var initialState = {
    date: moment()
};

function getDaysOfWeek (props) {
    var daysOfWeek = props.daysOfWeek;
    if (daysOfWeek) {
        return daysOfWeek;
    } else {
        // FIXME: not implemented in IE8
        // TODO: create option for formatting
        return moment.weekdays().map(function (weekday) {
            return weekday.charAt(0);
        });
    }
}

function getDayByNumber (date, num) {
    return moment([date.year(), date.month(), num]);
}

function getDaysFromPrevMonth (props, date) {
    var days = [];
    var startOfMonth = date.startOf('month');
    var diff = startOfMonth.weekday() - props.weekOffset;
    if (diff < 0) {
        diff += 7;
    }
    for (var i = 1; i <= diff; i++) {
        days.push({
            day: getDayByNumber(date, i - diff),
            classes: Helpers.getClassName(props, 'prev-month')
        });
    }
    return days;
}

function getDaysFromCurrentMonth (props, date) {
    var days = [];
    var numberOfDays = date.daysInMonth();
    for (var i = 1; i <= numberOfDays; i++) {
        days.push({
            day: getDayByNumber(date, i)
        });
    }
    return days;
}

function getDaysFromNextMonth (props, date, limit) {
    var days = [];
    var numberOfDays = date.daysInMonth();
    for (var i = 1; i <= limit; i++) {
        days.push({
            day: getDayByNumber(date, numberOfDays + i),
            classes: Helpers.getClassName(props, 'next-month')
        });
    }
    return days;
}

function getExtraDaysAtTheEnd (props, date, limit) {
    var days = [];
    for (var i = 1; i <= limit; i++) {
        days.push({
            day: date.add(i - 1, 'days'),
            classes: Helpers.getClassName(props, 'next-month')
        });
    }
    return days;
}

function getDays (props, state) {
    var days = [];

    days = Array.prototype.concat.apply(
            days, getDaysFromPrevMonth(props, state.date));

    days = Array.prototype.concat.apply(
            days, getDaysFromCurrentMonth(props, state.date));

    var tillEndOfMonth = 7 - (days.length % 7);
    if (tillEndOfMonth) {
        days = Array.prototype.concat.apply(
                days, getDaysFromNextMonth(props, state.date, tillEndOfMonth));
    }

    if (props.forceSixRows && days.length !== 42) {
        var lastDate = days[days.length - 1].day;
        var start = lastDate.add(1, 'days');
        var tillEndOfRow = 42 - days.length;
        days = Array.prototype.concat.apply(
                days, getExtraDaysAtTheEnd(props, start, tillEndOfRow));
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

function createDaysElement (props, state) {
    return React.DOM.div({
        className: Helpers.getClassName(props, 'days')
    }, getDays(props, state).map(function(day, i)  {
        return createDayElement(props, day, i);
    }));
}

function createClearfix (props) {
    return React.DOM.div({
        className: Helpers.getClassName(props, 'clearfix')
    });
}

function createWeekdaysElement (props) {
    if (!props.showDaysOfWeek) {
        return null;
    }
    return getDaysOfWeek(props).map(function(day, i)  {
        return React.DOM.div({
            key: 'weekday-' + i
        }, day);
    });
}

function createWeekdaysHeader (props) {
    return React.DOM.div({
        className: Helpers.getClassName(props, 'headers')
    }, createWeekdaysElement(props));
}

var Calendar = React.createClass({
    displayName: 'Calendar',

    propTypes: defTypes,

    getDefaultProps: function() {
        return defaultProps;
    },

    getInitialState: function() {
        return initialState;
    },

    onNext: function() {
        this.setState({
            date: this.state.date.add(1, 'months')
        });
    },

    onPrev: function() {
        this.setState({
            date: this.state.date.subtract(1, 'months')
        });
    },

    render: function() {
        return (
            React.DOM.div({
                className: Helpers.getClassName(this.props)
            }, React.createElement(CalendarControls, {
                date: this.state.date,
                onNext: this.onNext,
                onPrev: this.onPrev
            }), React.DOM.div({
                className: Helpers.getClassName(this.props, 'grid')
            },
                              createWeekdaysHeader(this.props),
                              createDaysElement(this.props, this.state),
                              createClearfix(this.props)
                             )
                         )
        );
    }
});

module.exports = Calendar;
