import React from 'react';
import moment from 'moment';

import Helpers from './helpers.js';

function isHoliday (props, index) {
    switch (props.LANG) {
        case 'en':
            return index === 0 || index === 6;
        case 'ru':
            return index === 5 || index === 6;
        default:
            return false;
    }
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

function getWeekdays (props) {
    if (props.UI_WEEKDAYS) {
        return props.UI_WEEKDAYS;
    } else {
        if (props.LANG === 'ru') {
            let weekdays = [].slice.apply(moment.weekdaysMin());
            let first = weekdays.shift();
            weekdays.push(first);
            return weekdays;
        } else {
            return moment.weekdaysMin();
        }
    }
}

export default function Weekdays (props) {
    if (!props.UI_HAS_WEEKDAYS) {
        return null;
    }
    return (
        <div className={Helpers.getClassName(props, 'weekdays')}>
            {getWeekdays(props).map((day, i) => createWeekday(props, day, i))}
        </div>
    );
}
