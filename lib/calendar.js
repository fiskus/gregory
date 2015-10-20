// vim: set sw=4 ts=4 expandtab:

import React from 'react';
import moment from 'moment';

import Controls from './controls.jsx';
import Helpers from './helpers.js';
import Month from './month.js';

let defaultProps = {
    UI_HAS_SIX_ROWS: false,
    UI_FORMAT_MONTH: 'MMMM YYYY',
    UI_TEXT_NEXT: 'Next',
    UI_MONTHS_NUMBER: 1,
    ON_SELECT: null,
    UI_TEXT_PREV: 'Prev',
    CLASSNAME: 'clndr',
    UI_HAS_WEEKDAYS: false,
    UI_WEEKDAYS: moment.weekdaysMin(),
    WEEK_OFFSET: 0
};

let defTypes = {
    UI_HAS_SIX_ROWS: React.PropTypes.bool,
    UI_FORMAT_MONTH: React.PropTypes.string,
    UI_TEXT_NEXT: React.PropTypes.string,
    UI_MONTHS_NUMBER: React.PropTypes.number,
    ON_SELECT: React.PropTypes.func,
    UI_TEXT_PREV: React.PropTypes.string,
    CLASSNAME: React.PropTypes.string,
    UI_HAS_WEEKDAYS: React.PropTypes.bool,
    UI_WEEKDAYS: React.PropTypes.array,
    WEEK_OFFSET: React.PropTypes.number
};

function getInitialDate (props) {
    // NOTE: there is DEFAUT_DATE and DATE
    // TODO: leave only one date DEFAUT_DATE or DATE
    return props.DATE_CURRENT ? moment(props.DATE_CURRENT) : moment();
}

function parseSelects (props) {
    var internalSelects = {};
    if (props.DATE_SELECTS) {
        props.DATE_SELECTS.forEach(select => {
            var ymd = moment(select.DATE).format('YYYY-MM-DD');
            internalSelects[ymd] = select.CLASSNAME;
        });
    }
    return internalSelects;
}

function createMonths (props, state) {
    var range = Helpers.getRange(1, props.UI_MONTHS_NUMBER);
    return range.map(i => {
        let monthProps = Helpers.assignObject({}, props, {
            key: 'month-' + i,
            DATE: state.date.clone().add(i - 1, 'month'),
            DATE_SELECTS: parseSelects(props)
        });
        return React.createElement(Month, monthProps);
    });
}

function isAbleToScrollLeft (props, currentMoment) {
    var minDate = props.DATE_MIN;
    if (minDate) {
        return currentMoment.isAfter(minDate, 'month');
    } else {
        return true;
    }
}

function isAbleToScrollRigtht (props, currentMoment) {
    var maxDate = props.DATE_MAX;
    if (props.UI_MONTHS_NUMBER && props.UI_MONTHS_NUMBER > 1) {
        currentMoment = currentMoment.clone().add(
                props.UI_MONTHS_NUMBER - 1, 'month');
    }
    if (maxDate) {
        return currentMoment.isBefore(maxDate, 'month');
    } else {
        return true;
    }
}

function createClass () {
    return React.createClass({
        displayName: 'Calendar',

        propTypes: defTypes,

        getDefaultProps () {
            return defaultProps;
        },

        componentWillReceiveProps (newProps) {
            this.setState({
                date: moment(newProps.DATE_CURRENT)
            });
        },

        getInitialState () {
            return {
                date: getInitialDate(this.props)
            };
        },

        onNext () {
            var currentMoment = this.state.date;
            if (isAbleToScrollRigtht(this.props, currentMoment)) {
                this.setState({
                    date: currentMoment.add(1, 'months')
                });
            }
        },

        onPrev () {
            var currentMoment = this.state.date;
            if (isAbleToScrollLeft(this.props, currentMoment)) {
                this.setState({
                    date: currentMoment.subtract(1, 'months')
                });
            }
        },

        render () {
            var controlsProps = Helpers.assignObject({}, this.props, {
                DATE: this.state.date,
                ON_NEXT: this.onNext,
                ON_PREV: this.onPrev
            });
            return React.createElement('div', {
                    className: Helpers.getClassName(this.props)
                },
                React.createElement(Controls, controlsProps),
                createMonths(this.props, this.state));
        }
    });
}

if (process.env.TESTING) {
    module.exports = {
        getInitialDate,
        createMonths
    };
} else {
    module.exports = createClass();
}
