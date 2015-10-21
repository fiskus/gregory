import moment from 'moment';

export function getInitialDate (props) {
    // NOTE: there is DEFAUT_DATE and DATE
    // TODO: leave only one date DEFAUT_DATE or DATE
    return props.DATE_CURRENT ? moment(props.DATE_CURRENT) : moment();
}

export function parseSelects (props) {
    let internalSelects = {};
    if (props.DATE_SELECTS) {
        props.DATE_SELECTS.forEach(select => {
            let ymd = moment(select.DATE).format('YYYY-MM-DD');
            internalSelects[ymd] = select.CLASSNAME;
        });
    }
    return internalSelects;
}

export function isAbleToScrollLeft (props, currentMoment) {
    if (props.DATE_MIN) {
        return currentMoment.isAfter(props.DATE_MIN, 'month');
    } else {
        return true;
    }
}

export function isAbleToScrollRight (props, currentMoment) {
    if (props.UI_MONTHS_NUMBER && props.UI_MONTHS_NUMBER > 1) {
        currentMoment = currentMoment.clone().add(
                props.UI_MONTHS_NUMBER - 1, 'month');
    }
    if (props.DATE_MAX) {
        return currentMoment.isBefore(props.DATE_MAX, 'month');
    } else {
        return true;
    }
}
