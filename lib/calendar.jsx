// vim: set sw=4 ts=4 expandtab:

import React from 'react';
import moment from 'moment';

require('moment/locale/ru.js');

import * as CalendarModel from './calendarmodel.js';
import Controls from './controls.jsx';
import Helpers from './helpers.js';
import Month from './month.jsx';

export default class Calendar extends React.Component {
    constructor (props) {
        super(props);

        moment.locale(props.LANG);

        this.state = {
            date: CalendarModel.getInitialDate(props)
        };
    }

    componentWillReceiveProps (newProps) {
        this.setState({
            date: moment(newProps.DATE_CURRENT)
        });
    }

    onNext () {
        var currentMoment = this.state.date;
        if (CalendarModel.isAbleToScrollRigtht(this.props, currentMoment)) {
            this.setState({
                date: currentMoment.add(1, 'months')
            });
        }
    }

    onPrev () {
        var currentMoment = this.state.date;
        if (CalendarModel.isAbleToScrollLeft(this.props, currentMoment)) {
            this.setState({
                date: currentMoment.subtract(1, 'months')
            });
        }
    }

    render () {
        let months = Helpers.getRange(1, this.props.UI_MONTHS_NUMBER).map(i => {
            let monthProps = {
                DATE: this.state.date.clone().add(i - 1, 'month'),
                DATE_SELECTS: CalendarModel.parseSelects(this.props),
                key: i
            }
            return <Month {...this.props} {...monthProps} />;
        });
        return (
            <div className={Helpers.getClassName(this.props)}>
                <Controls {...this.props}
                          DATE={this.state.date}
                          ON_NEXT={this.onNext.bind(this)}
                          ON_PREV={this.onPrev.bind(this)} />
                {months}
            </div>
        );
    }
}

Calendar.displayName = 'Gregory';

Calendar.propTypes = {
    CLASSNAME: React.PropTypes.string,
    LANG: React.PropTypes.string,
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
    LANG: 'ru',
    ON_SELECT: null,
    UI_FORMAT_MONTH: 'MMMM YYYY',
    UI_HAS_SIX_ROWS: false,
    UI_HAS_WEEKDAYS: false,
    UI_MONTHS_NUMBER: 1,
    UI_TEXT_NEXT: 'Next',
    UI_TEXT_PREV: 'Prev',
    WEEK_OFFSET: 0
};
