// vim: set sw=4 ts=4 expandtab:

import React from 'react';

import Helpers from './helpers.js';
import * as DayModel from './daymodel.js';

export default function Day (props) {
    let options = DayModel.default(props);
    let css = Helpers.getClassName.bind(null, props);

    let dayNumber = createDayNumber(props, options, css);
    let classNames = createClassNames(props, options, css);

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

    return (
        <div className={css(classNames)} onClick={clickHandler}>
            {dayNumber}
        </div>
    );
}

function createDayNumber (props, options, css) {
    if (props.UI_DAY_RENDER) {
        let userRenderer = props.UI_DAY_RENDER(props.DAY);
        if (userRenderer) {
            return userRenderer;
        }
    }

    return defaultDayRenderer(props, options, css);
}

function defaultDayRenderer (props, options, css) {
    let date = props.DAY.date();

    if (props.UI_MONTHS_NUMBER === 1 || !options.isOtherMonth) {
        return <span className={css('day-number')}>{date}</span>;
    } else {
        return date;
    }
}

function createClassNames (props, options) {
    let classNames = DayModel.getClassNameParts(props, options);
    if (props.UI_DAY_CLASSNAME) {
        let moreClasses = props.UI_DAY_CLASSNAME(props.DAY);
        return [].concat.apply(classNames, moreClasses);
    }
    return classNames;
}
