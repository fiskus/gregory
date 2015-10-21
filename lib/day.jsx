// vim: set sw=4 ts=4 expandtab:

import React from 'react';

import Helpers from './helpers.js';
import * as DayModel from './daymodel.js';

export default function Day (props) {
    let options = DayModel.default(props);
    let css = Helpers.getClassName.bind(null, props);

    let dayNumber;
    if (props.UI_MONTHS_NUMBER === 1 || !options.isOtherMonth) {
        dayNumber = <span className={css('day-number')}>{props.DAY.date()}</span>
    }

    let clickHandler;
    if (!options.isUnselectable) {
        clickHandler = event => {
            if (event.nativeEvent.stopImmediatePropagation) {
                event.nativeEvent.stopImmediatePropagation();
            }

            if (props.ON_SELECT) {
                props.ON_SELECT(props.DAY);
            }
        }
    }

    let className = css(DayModel.getClassNameParts(props, options));

    return (
        <div className={className} onClick={clickHandler}>
            {dayNumber}
        </div>
    );
}
