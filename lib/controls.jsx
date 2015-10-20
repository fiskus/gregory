// vim: set sw=4 ts=4 expandtab:

import React from 'react';

import Helpers from './helpers.js';

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
    return (
        <div className={css('controls')}>
            <div className={css('prev')} onClick={event => onPrev(event, props)}>
                {props.UI_TEXT_PREV}
            </div>
            <div className={css('next')} onClick={event => onNext(event, props)}>
                {props.UI_TEXT_NEXT}
            </div>
        </div>
    );
}
