// vim: set sw=4 ts=4 expandtab:

'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var Gregory = require('../lib/calendar.jsx').default;

function initPopup (input, wrapper) {
    input.addEventListener('focus', function() {
        var element = React.createElement(Gregory, {
            CLASSNAME: 'calendar',
            UI_TEXT_PREV: '',
            UI_TEXT_NEXT: '',
            ON_SELECT: function(date) {
                wrapper.removeChild(wrapper.firstElementChild);
                input.value = date.format('DD MMMM YYYY');
            }
        });
        ReactDOM.render(element, wrapper);
    });
}

function initInputs () {
    var inputsWrapper = document.getElementById('inputs');
    var checkinInput = inputsWrapper.querySelector('#checkin');
    var checkoutInput = inputsWrapper.querySelector('#checkout');

    var checkinCalendar = inputsWrapper.querySelector('#checkin-calendar');
    var checkoutCalendar = inputsWrapper.querySelector('#checkout-calendar');

    initPopup(checkinInput, checkinCalendar);
    initPopup(checkoutInput, checkoutCalendar);

}

function whenReady () {
    initInputs();
}

if (document.readyState !== 'loading') {
    whenReady();
} else {
    window.addEventListener('DOMContentLoaded', whenReady);
}
