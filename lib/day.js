// vim: set sw=4 ts=4 expandtab:

import React from 'react';

import Helpers from './helpers.js';

function isOtherMonth (props) {
    return props.POSITION !== 0;
}

/**
 * Day is unselectable when
 *     it is not from current month and there more than one month
 *     it is out of bounds of min and max dates
 * @param {ReactProps} props
 * @returns {boolean}
 */
function isUnselectable (props) {
    function isBeforeMin () {
        var minDate = props.DATE_MIN;
        return !!minDate && props.DAY.isBefore(minDate);
    }
    function isAfterMax () {
        var maxDate = props.DATE_MAX;
        return !!maxDate && props.DAY.isAfter(maxDate);
    }
    return (isOtherMonth(props) && props.UI_MONTHS_NUMBER > 1) ||
            (isBeforeMin()) || (isAfterMax());
}

function isHoliday (props) {
    var dayOfWeek = props.DAY.day();
    return dayOfWeek === 6 || dayOfWeek === 0;
}

function isToday (props) {
    return props.DAY.isSame(new Date(), 'day');
}

function isCurrent (props) {
    return props.DAY.isSame(props.DATE_CURRENT, 'day');
}

function parseProps (props) {
    return {
        isUnselectable: isUnselectable(props),
        isOtherMonth: isOtherMonth(props),
        isHoliday: isHoliday(props),
        isToday: isToday(props),
        isCurrent: isCurrent(props)
    };
}

/**
 * @param {ReactProps} props
 * @param {Object} options
 * @returns {Function|null}
 */
function onClick (props, options) {
    if (options.isUnselectable) {
        return null;
    } else {
        return function (event) {
            if (event.nativeEvent.stopImmediatePropagation) {
                event.nativeEvent.stopImmediatePropagation();
            }

            if (props.ON_SELECT) {
                props.ON_SELECT(props.DAY);
            }
        };
    }
}

var classNamesDict = {
    isUnselectable: 'day-unselectable',
    isOtherMonth: 'day-other-month',
    isHoliday: 'day-holiday',
    isToday: 'day-today',
    isCurrent: 'day-current'
};

function getClassName (props, options) {
    var classNames = ['day'];

    Helpers.forEachInObject(options, function (isEnabled, option) {
        if (isEnabled) {
            classNames.push(classNamesDict[option]);
        }
    });

    var ymd = props.DAY.format('YYYY-MM-DD');
    var selectedClassname = props.DATE_SELECTS[ymd];
    if (selectedClassname) {
        classNames.push(selectedClassname);
    }

    if (props.DATE_RANGES) {
        props.DATE_RANGES.forEach(range => {
            if (props.DAY.isBetween(range.FROM, range.TO, 'day')) {
                classNames.push(range.CLASSNAME);
            }
        });
    }

    return Helpers.getClassName(props, classNames);
}

function createDayNumber (props, options) {
    if (props.UI_MONTHS_NUMBER > 1 && options.isOtherMonth) {
        return null;
    } else {
        return React.createElement('span', {
            className: Helpers.getClassName(props, 'day-number')
        }, props.DAY.date());
    }
}

/**
 * @param {ReactProps} props
 * @returns {ReactElement}
 */
function createMainElement (props) {
    var options = parseProps(props);
    var divSettings = {
        onClick: onClick(props, options),
        className: getClassName(props, options)
    };
    return React.createElement('div',
        divSettings,
        createDayNumber(props, options));
}

/**
 * @returns {ReactClass}
 */
function createClass () {
    return React.createClass({
        displayName: 'Day',

        render () {
            return createMainElement(this.props);
        }
    });
}

if (process.env.TESTING) {
    module.exports = {
        createDayNumber,
        getClassName,
        isCurrent,
        isHoliday,
        isOtherMonth,
        isToday,
        isUnselectable,
        parseProps
    };
} else {
    module.exports = createClass();
}
