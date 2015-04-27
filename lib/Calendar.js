// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
require('moment/locale/ru');
var moment = require('moment');
moment.locale('ru');
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
    forceSixRows: React.PropTypes.bool,
    onPickDate: React.PropTypes.func,
    rootClassName: React.PropTypes.string,
    showDaysOfWeek: React.PropTypes.bool,
    weekOffset: React.PropTypes.number

};

var initialState = {
    date: moment()
};

function getDaysOfWeek (props) {
    var daysOfWeek = props.daysOfWeek;
    if (daysOfWeek) {
        return daysOfWeek;
    } else {
        // TODO: create option for formatting
        moment.locale('ru');
        return Helpers.mapArray(moment.weekdays(), function (weekday) {
            console.log(weekday);
            return weekday.charAt(0);
        });
    }
}

function getDayByNumber (date, num) {
    return moment([date.year(), date.month(), num]);
}

function getDaysFromPrevMonth (props, date) {
    var startOfMonth = date.startOf('month');
    var diff = startOfMonth.weekday() - props.weekOffset;
    if (diff < 0) {
        diff += 7;
    }
    var range = Helpers.getRange(1, diff);
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(date, i - diff),
            classes: Helpers.getClassName(props, ['day', 'prev-month'])
        };
    });
}

function getDaysFromCurrentMonth (props, date) {
    var range = Helpers.getRange(1, date.daysInMonth());
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(date, i),
            classes: Helpers.getClassName(props, 'day')
        };
    });
}

function getDaysFromNextMonth (props, date, limit) {
    var numberOfDays = date.daysInMonth();
    var range = Helpers.getRange(1, limit);
    return Helpers.mapArray(range, function (i) {
        return {
            day: getDayByNumber(date, numberOfDays + i),
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

function getDays (props, state) {
    // jshint maxstatements: 12
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

function createDaysElement (props, state) {
    return React.DOM.div({
        className: Helpers.getClassName(props, 'days')
    }, Helpers.mapArray(getDays(props, state), function(day, i) {
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
    return Helpers.mapArray(getDaysOfWeek(props), function(day, i)  {
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
