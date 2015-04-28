// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');

var Helpers = require('./helpers.js');

/**
 * @param props {ReactProps}
 */
function onNext (props) {
    return function() {
        props.ON_NEXT();
    };
}

/**
 * @param props {ReactProps}
 */
function onPrev (props) {
    return function() {
        props.ON_PREV();
    };
}

function formatCurrentMonth (props) {
    return props.DATE.format(props.MONTH_FORMAT);
}

/**
 * @param props {ReactProps}
 * @return {ReactElement}
 */
function createMainElement (props) {
    var prevButton = React.DOM.div({
        className: Helpers.getClassName(props, 'prev'),
        onClick: onPrev(props)
    }, props.PREV_TEXT);
    var nextButton = React.DOM.div({
        className: Helpers.getClassName(props, 'next'),
        onClick: onNext(props)
    }, props.NEXT_TEXT);
    var monthLabel = React.DOM.div({
        className: Helpers.getClassName(props, 'current-month')
    }, formatCurrentMonth(props));
    return React.DOM.div({
        className: Helpers.getClassName(props, 'controls')
    }, prevButton, monthLabel, nextButton);
}

/**
 * @return {ReactClass}
 */
function createClass() {
    return React.createClass({
        displayName: 'CalendarControls',

        render: function() {
            return createMainElement(this.props);
        }
    });
}


module.exports = createClass();
