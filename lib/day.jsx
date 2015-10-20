// vim: set sw=4 ts=4 expandtab:

import React from 'react';

import Helpers from './helpers.js';
import DayProps from './dayprops.js';

const classNamesDict = {
    isUnselectable: 'day-unselectable',
    isOtherMonth: 'day-other-month',
    isHoliday: 'day-holiday',
    isToday: 'day-today',
    isCurrent: 'day-current'
};

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

export function getClassName (props, options) {
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

export default function Day (props) {
    let options = DayProps(props);
    return (
        <div className={getClassName(props, options)}
             onClick={onClick(props, options)}>
            {createDayNumber(props, options)}
        </div>
    );
}
