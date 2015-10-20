import React from 'react';

import Helpers from './helpers.js';

function isHoliday (props, index) {
    // TODO: eng lang
    return index === 5 || index === 6;
}

function createWeekday (props, day, index) {
    let classNames = isHoliday(props, index) ?
            ['weekday', 'weekday-holiday'] : ['weekday'];
    return (
        <div className={Helpers.getClassName(props, classNames)} key={index}>
            {day}
        </div>
    );
}

export default function Weekdays (props) {
    if (!props.UI_HAS_WEEKDAYS) {
        return null;
    }
    return (
        <div className={Helpers.getClassName(props, 'weekdays')}>
            {props.UI_WEEKDAYS.map((day, i) => createWeekday(props, day, i))}
        </div>
    );
}
