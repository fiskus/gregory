// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var Controls = require('./controls.js');
var Helpers = require('./helpers.js');
var Month = require('./month.js');

require('moment/locale/ru');
var moment = require('moment');

var defaultProps = {
    forceSixRows: false,
    numberOfMonths: 1,
    onPickDate: null,
    rootClassName: 'clndr',
    showDaysOfWeek: false,
    weekOffset: 0
};

var defTypes = {
    forceSixRows: React.PropTypes.bool,
    numberOfMonths: React.PropTypes.number,
    onPickDate: React.PropTypes.func,
    rootClassName: React.PropTypes.string,
    showDaysOfWeek: React.PropTypes.bool,
    weekOffset: React.PropTypes.number

};

function getInitialDate (props) {
    moment.locale('ru');
    return props.defaultDate ? moment(props.defaultDate) : moment();
}

function createMonths (props, state) {
    var range = Helpers.getRange(1, props.numberOfMonths);
    return Helpers.mapArray(range, function(i) {
        return React.createElement(Month, {
            key: 'month-' + i,
            date: state.date.clone().add(i - 1, 'month'),
            weekOffset: props.weekOffset,
            rootClassName: props.rootClassName,
            forceSixRows: props.forceSixRows,
            showDaysOfWeek: props.showDaysOfWeek,
            onPickDate: props.onPickDate
        });
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
            return React.DOM.div({
                    className: Helpers.getClassName(this.props)
                }, React.createElement(Controls, {
                    date: this.state.date,
                    onNext: this.onNext,
                    onPrev: this.onPrev,
                    rootClassName: this.props.rootClassName
                }), createMonths(this.props, this.state));
        }
    });
}

module.exports = createClass();
