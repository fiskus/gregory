// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');
var Helpers = require('./helpers.js');

/**
 * @param props {ReactProps}
 */
function onNext (props) {
    return function() {
        props.onNext();
    };
}

/**
 * @param props {ReactProps}
 */
function onPrev (props) {
    return function() {
        props.onPrev();
    };
}

/**
 * @param props {ReactProps}
 * @return {ReactElement}
 */
function createMainElement (props) {
    var prevButton = React.DOM.div({
        onClick: onPrev(props)
    }, 'Prev');
    var nextButton = React.DOM.div({
        onClick: onNext(props)
    }, 'Next');
    var monthLabel = React.DOM.div({
        className: Helpers.getClassName(props, 'current-month')
    }, props.date.format('MMMM YYYY'));
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
