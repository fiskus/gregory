// vim: set softtabstop=4 shiftwidth=4:

'use strict';

var React = require('react');

/**
 * @param props {ReactProps}
 */
function onClick (props) {
    return function () {
        if (props.onClick) {
            props.onClick(props.day.day);
        }
    };
}

/**
 * @param props {ReactProps}
 * @return {ReactElement}
 */
function createMainElement (props) {
    var divSettings = {
        onClick: onClick(props),
        className: props.day.classes
    };
    return React.DOM.div(
        divSettings,
        React.DOM.span({
            className: 'day-number'
        }, props.day.day.date()));
}

/**
 * @param globalOptions {Object}
 * @return {ReactClass}
 */
function createClass () {
    return React.createClass({
        displayName: 'Day',

        getDefaultProps: function() {
            return {
                classes: ''
            };
        },

        render: function() {
            return createMainElement(this.props);
        }
    });
}

module.exports = createClass();
