// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var moment = require('moment');
var Day = require('./Day');
var CalendarControls = require('./CalendarControls');

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

function getDays (props, state) {
    var days = [];
    var date = state.date.startOf('month');
    var diff = date.weekday() - props.weekOffset;
    if (diff < 0) {
        diff += 7;
    }

    var i, day;
    for (i = 0; i < diff; i++) {
        day = moment([state.date.year(), state.date.month(), i-diff+1]);
        days.push({day: day, classes: 'prev-month'});
    }

    var numberOfDays = date.daysInMonth();
    for (i = 1; i <= numberOfDays; i++) {
        day = moment([state.date.year(), state.date.month(), i]);
        days.push({day: day});
    }

    i = 1;
    while (days.length % 7 !== 0) {
        day = moment([state.date.year(), state.date.month(), numberOfDays+i]);
        days.push({day: day, classes: 'next-month'});
        i++;
    }

    if (props.forceSixRows && days.length !== 42) {
        var start = moment(days[days.length-1].date).add(1, 'days');
        while (days.length < 42) {
            days.push({day: moment(start), classes: 'next-month'});
            start.add(1, 'days');
        }
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
        className: 'days'
    }, getDays(props, state).map(function(day, i)  {
        return createDayElement(props, day, i);
    }));
}

function createClearfix () {
    return React.DOM.div({
        className: 'clearfix'
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
            className: 'clndr'
        }, React.createElement(CalendarControls, {
            date: this.state.date,
            onNext: this.onNext,
            onPrev: this.onPrev
        }), React.DOM.div({
            className: 'clndr-grid'
        }, React.DOM.div('div', {
            className: 'day-headers'
        }, createWeekdaysElement(this.props)),
                          createDaysElement(this.props, this.state),
                          createClearfix()
        )
      )
    );
  }
});

module.exports = Calendar;
