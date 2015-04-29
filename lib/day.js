// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var Helpers = require('./helpers.js');

function isDisabled (props) {
    return props.NUMBER_OF_MONTHS > 1 && props.POSITION;
}

/**
 * @param props {ReactProps}
 */
function onClick (props) {
    if (isDisabled(props)) {
        return null;
    } else {
        return function () {
            if (props.ON_PICK_DATE) {
                props.ON_PICK_DATE(props.DAY);
            }
        };
    }
}

function getClassName (props, isDisabled) {
    // TODO: refactor, decrease complexity
    // jshint maxcomplexity: 10
    // jshint maxstatements: 19
    var position = props.POSITION;
    var classNames = ['day'];
    var dayOfWeek = props.DAY.day();
    if (position !== 0) {
        if (isDisabled) {
            classNames.push('day-disabled');
        }
        if (position < 0) {
            classNames.push('day-prev-month');
        }
        if (position > 0) {
            classNames.push('day-next-month');
        }
    }
    if (dayOfWeek === 6 || dayOfWeek === 0) {
        classNames.push('day-holiday');
    }
    if (props.DAY.isSame(props.DEFAULT_DATE, 'day')) {
        classNames.push('day-current');
    }
    if (props.MIN_DATE && props.DAY.isBefore(props.MIN_DATE)) {
        classNames.push('day-before-min');
    }
    if (props.MAX_DATE && props.DAY.isAfter(props.MAX_DATE)) {
        classNames.push('day-after-max');
    }
    return Helpers.getClassName(props, classNames);
}

function createDayNumber (props, isDisabled) {
    if (isDisabled) {
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
    var isDisabled = props.NUMBER_OF_MONTHS > 1 && props.POSITION;
    var divSettings = {
        onClick: onClick(props, isDisabled),
        className: getClassName(props, isDisabled)
    };
    return React.DOM.div(
        divSettings,
        createDayNumber(props, isDisabled));
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
