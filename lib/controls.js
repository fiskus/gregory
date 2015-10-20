// vim: set sw=4 ts=4 expandtab:

import React from './react-loader.js';
import Helpers from './helpers.js';

function stopPropagation (event) {
    if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
    }
}

/**
 * @param props {ReactProps}
 */
function onNext (props) {
    return function (event) {
        stopPropagation(event.nativeEvent);

        props.ON_NEXT();
    };
}

/**
 * @param props {ReactProps}
 */
function onPrev (props) {
    return function (event) {
        stopPropagation(event.nativeEvent);

        props.ON_PREV();
    };
}

/**
 * @param props {ReactProps}
 * @return {ReactElement}
 */
function createMainElement (props) {
    var prevButton = React.createElement('div', {
        className: Helpers.getClassName(props, 'prev'),
        onClick: onPrev(props)
    }, props.UI_TEXT_PREV);
    var nextButton = React.createElement('div', {
        className: Helpers.getClassName(props, 'next'),
        onClick: onNext(props)
    }, props.UI_TEXT_NEXT);
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'controls')
    }, prevButton, nextButton);
}

/**
 * @return {ReactClass}
 */
function createClass () {
    return React.createClass({
        displayName: 'CalendarControls',

        render: function () {
            return createMainElement(this.props);
        }
    });
}

module.exports = createClass();
