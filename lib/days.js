import moment from 'moment';

import Helpers from './helpers.js';

export function getDayByNumber (date, num) {
    var daysDiff = num - 1;
    return moment([date.year(), date.month(), 1]).add(daysDiff, 'days');
}

export function getDaysFromPrevMonth (props) {
    var startOfMonth = props.DATE.startOf('month');
    var diff = startOfMonth.weekday() - props.WEEK_OFFSET;
    if (diff < 0) {
        diff += 7;
    }
    if (!diff) {
        return [];
    }
    var range = Helpers.getRange(1, diff);
    return range.map(i => {
        return {
            DAY: getDayByNumber(props.DATE, i - diff),
            POSITION: -1
        };
    });
}

export function getDaysFromCurrentMonth (props) {
    var range = Helpers.getRange(1, props.DATE.daysInMonth());
    return range.map(i => {
        return {
            DAY: getDayByNumber(props.DATE, i),
            POSITION: 0
        };
    });
}

export function getDaysFromNextMonth (props, limit) {
    var numberOfDays = props.DATE.daysInMonth();
    var range = Helpers.getRange(1, limit);
    return range.map(i => {
        return {
            DAY: getDayByNumber(props.DATE, numberOfDays + i),
            POSITION: 1
        };
    });
}

export function getExtraDaysAtTheEnd (props, date, limit) {
    var range = Helpers.getRange(1, limit);
    return range.map(i => {
        return {
            DAY: date.clone().add(i - 1, 'days'),
            POSITION: 1
        };
    });
}

export default function getDays (props) {
    // jshint maxstatements: 12
    var days = [];

    days = Array.prototype.concat.apply(
            days, getDaysFromPrevMonth(props));

    days = Array.prototype.concat.apply(
            days, getDaysFromCurrentMonth(props));

    var tillEndOfMonth = 7 - (days.length % 7);
    if (tillEndOfMonth) {
        days = Array.prototype.concat.apply(
                days, getDaysFromNextMonth(props, tillEndOfMonth));
    }

    var tillEndOfSixRows = 42 - days.length;
    if (props.UI_HAS_SIX_ROWS && tillEndOfSixRows) {
        var lastDate = days[days.length - 1].DAY;
        var start = lastDate.clone().add(1, 'days');
        days = Array.prototype.concat.apply(
                days, getExtraDaysAtTheEnd(props, start, tillEndOfSixRows));
    }

    return days;
}
