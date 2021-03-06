import Helpers from './helpers.js';

export function isOtherMonth (props) {
    return props.POSITION !== 0;
}

function isBeforeMin (props) {
    var minDate = props.DATE_MIN;
    return !!minDate && props.DAY.isBefore(minDate);
}

function isAfterMax (props) {
    var maxDate = props.DATE_MAX;
    return !!maxDate && props.DAY.isAfter(maxDate);
}

/**
 * Day is unselectable when
 *     it is not from current month and there more than one month
 *     it is out of bounds of min and max dates
 * @param {ReactProps} props
 * @returns {boolean}
 */
export function isUnselectable (props) {
    return (isOtherMonth(props) && props.UI_MONTHS_NUMBER > 1) ||
            isBeforeMin(props) || isAfterMax(props);
}

export function isHoliday (props) {
    var dayOfWeek = props.DAY.day();
    return dayOfWeek === 6 || dayOfWeek === 0;
}

export function isToday (props) {
    return props.DAY.isSame(new Date(), 'day');
}

export function isCurrent (props) {
    return props.DAY.isSame(props.DATE_CURRENT, 'day');
}

export default function getProps (props) {
    return {
        isUnselectable: isUnselectable(props),
        isOtherMonth: isOtherMonth(props),
        isHoliday: isHoliday(props),
        isToday: isToday(props),
        isCurrent: isCurrent(props)
    };
}

const classNamesDict = {
    isUnselectable: 'day-unselectable',
    isOtherMonth: 'day-other-month',
    isHoliday: 'day-holiday',
    isToday: 'day-today',
    isCurrent: 'day-current'
};

export function getClassNameParts (props, options) {
    let classNames = ['day'];

    Helpers.forEachInObject(options, (isEnabled, option) => {
        if (isEnabled) {
            classNames.push(classNamesDict[option]);
        }
    });

    return classNames;
}
