// vim: set sw=4 ts=4 expandtab:

import React from 'react';

import Helpers from './helpers.js';
import {isAbleToScrollLeft, isAbleToScrollRight} from './calendarmodel.js';

/**
 * @param {Event} event
 * @param {ReactProps} props
 */
function stopPropagation (event) {
    if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
    }
}

/**
 * @param {Event} event
 * @param {ReactProps} props
 */
function onNext (event, props) {
    stopPropagation(event.nativeEvent);
    props.ON_NEXT();
}

/**
 * @param {Event} event
 * @param {ReactProps} props
 */
function onPrev (event, props) {
    stopPropagation(event.nativeEvent);
    props.ON_PREV();
}

export default function Controls (props) {
    let css = Helpers.getClassName.bind(null, props);
    let prevClassName = isAbleToScrollLeft(props, props.DATE) ?
            css('prev') : css(['prev', 'prev-inactive']);
    let nextClassName = isAbleToScrollRight(props, props.DATE) ?
            css('next') : css(['next', 'next-inactive']);
    return (
        <div className={css('controls')}>
            <div className={prevClassName}
                 onClick={event => onPrev(event, props)}>
                {props.UI_TEXT_PREV}
            </div>
            <div className={nextClassName}
                 onClick={event => onNext(event, props)}>
                {props.UI_TEXT_NEXT}
            </div>
        </div>
    );
}
