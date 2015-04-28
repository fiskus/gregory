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
    // jshint maxcomplexity: 5
    // jshint maxstatements: 10
    var position = props.POSITION;
    var classNames = ['day'];
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
