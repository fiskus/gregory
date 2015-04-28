// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var moment = require('moment');

var Controls = require('./controls.js');
var Helpers = require('./helpers.js');
var Month = require('./month.js');

var defaultProps = {
    forceSixRows: false,
    monthFormat: 'MMMM YYYY',
    nextText: 'Next',
    numberOfMonths: 1,
    onPickDate: null,
    prevText: 'Prev',
    rootClassName: 'clndr',
    showDaysOfWeek: false,
    weekdays: moment.weekdaysMin(),
    weekOffset: 0
};

var defTypes = {
    forceSixRows: React.PropTypes.bool,
    monthFormat: React.PropTypes.string,
    nextText: React.PropTypes.string,
    numberOfMonths: React.PropTypes.number,
    onPickDate: React.PropTypes.func,
    prevText: React.PropTypes.string,
    rootClassName: React.PropTypes.string,
    showDaysOfWeek: React.PropTypes.bool,
    weekdays: React.PropTypes.array,
    weekOffset: React.PropTypes.number
};

function getInitialDate (props) {
    return props.defaultDate ? moment(props.defaultDate) : moment();
}

function createMonths (props, state) {
    var range = Helpers.getRange(1, props.numberOfMonths);
    return Helpers.mapArray(range, function(i) {
        var monthProps = Helpers.assignObject({}, props, {
            key: 'month-' + i,
            date: state.date.clone().add(i - 1, 'month')
        });
        return React.createElement(Month, monthProps);
    });
}

function createClass () {
    return React.createClass({
        displayName: 'Calendar',

        propTypes: defTypes,

        getDefaultProps: function() {
            return defaultProps;
        },

        getInitialState: function() {
            return {
                date: getInitialDate(this.props)
            };
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
            var controlsProps = Helpers.assignObject({}, this.props, {
                date: this.state.date,
                onNext: this.onNext,
                onPrev: this.onPrev
            });
            return React.DOM.div({
                    className: Helpers.getClassName(this.props)
                },
                React.createElement(Controls, controlsProps),
                createMonths(this.props, this.state));
        }
    });
}

module.exports = createClass();
