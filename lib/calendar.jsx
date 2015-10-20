// vim: set sw=4 ts=4 expandtab:

import React from 'react';
import moment from 'moment';

import Controls from './controls.jsx';
import Helpers from './helpers.js';
import Month from './month.jsx';

export default class Calendar extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            date: getInitialDate(props)
        };
    }

    componentWillReceiveProps (newProps) {
        this.setState({
            date: moment(newProps.DATE_CURRENT)
        });
    }

    onNext () {
        var currentMoment = this.state.date;
        if (isAbleToScrollRigtht(this.props, currentMoment)) {
            this.setState({
                date: currentMoment.add(1, 'months')
            });
        }
    }

    onPrev () {
        var currentMoment = this.state.date;
        if (isAbleToScrollLeft(this.props, currentMoment)) {
            this.setState({
                date: currentMoment.subtract(1, 'months')
            });
        }
    }

    render () {
        return (
            <div className={Helpers.getClassName(this.props)}>
                <Controls {...this.props}
                          DATE={this.state.date}
                          ON_NEXT={this.onNext.bind(this)}
                          ON_PREV={this.onPrev.bind(this)} />
                {createMonths(this.props, this.state)}
            </div>
        );
    }
}

Calendar.displayName = 'Gregory';

Calendar.propTypes = {
    CLASSNAME: React.PropTypes.string,
    ON_SELECT: React.PropTypes.func,
    UI_FORMAT_MONTH: React.PropTypes.string,
    UI_HAS_SIX_ROWS: React.PropTypes.bool,
    UI_HAS_WEEKDAYS: React.PropTypes.bool,
    UI_MONTHS_NUMBER: React.PropTypes.number,
    UI_TEXT_NEXT: React.PropTypes.string,
    UI_TEXT_PREV: React.PropTypes.string,
    UI_WEEKDAYS: React.PropTypes.array,
    WEEK_OFFSET: React.PropTypes.number
};

Calendar.defaultProps = {
    CLASSNAME: 'clndr',
    ON_SELECT: null,
    UI_FORMAT_MONTH: 'MMMM YYYY',
    UI_HAS_SIX_ROWS: false,
    UI_HAS_WEEKDAYS: false,
    UI_MONTHS_NUMBER: 1,
    UI_TEXT_NEXT: 'Next',
    UI_TEXT_PREV: 'Prev',
    UI_WEEKDAYS: moment.weekdaysMin(),
    WEEK_OFFSET: 0
};

function createMonths (props, state) {
    var range = Helpers.getRange(1, props.UI_MONTHS_NUMBER);
    return range.map(i => {
        let date = state.date.clone().add(i - 1, 'month');
        let selects = parseSelects(props);
        return <Month {...props} DATE={date} DATE_SELECTS={selects} key={i} />;
    });
}

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
