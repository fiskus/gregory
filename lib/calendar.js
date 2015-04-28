// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var Controls = require('./controls.js');
var Helpers = require('./helpers.js');
var Month = require('./month.js');

require('moment/locale/ru');
var moment = require('moment');
moment.locale('ru');

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

function createMonths (props, state, number) {
    var range = Helpers.getRange(1, number);
    return Helpers.mapArray(range, function(i) {
        return React.createElement(Month, {
            key: 'month-' + i,
            date: state.date.clone().add(i, 'month'),
            weekOffset: props.weekOffset,
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
            return React.DOM.div({
                    className: Helpers.getClassName(this.props)
                }, React.createElement(Controls, {
                    date: this.state.date.clone().add(1, 'month'),
                    onNext: this.onNext,
                    onPrev: this.onPrev
                }), createMonths(this.props, this.state, 2));
        }
    });
}

module.exports = createClass();
