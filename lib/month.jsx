import React from 'react';

import Helpers from './helpers.js';
import Weekdays from './weekdays.jsx';
import Day from './day.jsx';
import getDays from './days.js';

export default function Month (props) {
    let css = Helpers.getClassName.bind(null, props);

    let weekdays;
    if (props.UI_HAS_WEEKDAYS) {
        weekdays = <Weekdays {...props} />;
    }

    return (
        <div className={css('grid')}>
            <div className={css('headers')}>
                <div className={css('current-date')}>
                    {props.DATE.format(props.UI_FORMAT_MONTH)}
                </div>
                {weekdays}
            </div>
            <div className={css('days')}>
                {getDays(props).map((day, i) => {
                    return <Day {...props} {...day} key={i} />;
                 })}
            </div>
            <div className={css('clearfix')} />
        </div>
    );
}
