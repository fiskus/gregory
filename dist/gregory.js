(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// vim: set sw=4 ts=4 expandtab:

// jshint strict: false

var Gregory = require('./calendar.js');

(function (global, factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = factory(global);
    } else {
        factory(global);
    }
}(typeof window !== 'undefined' ? window : this, function (window) {
    // jshint undef: false
    if (typeof define === 'function' && define.amd) {
        define( 'gregory', [], function() {
            return Gregory;
        });
    }

    window.Gregory = Gregory;

    return Gregory;
}));

},{"./calendar.js":2}],2:[function(require,module,exports){
(function (process){
// vim: set sw=4 ts=4 expandtab:

'use strict';

var React = require('./react-loader.js');
var moment = require('./moment-loader.js');
var Controls = require('./controls.js');
var Helpers = require('./helpers.js');
var Month = require('./month.js');

var defaultProps = {
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

var defTypes = {
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
        Helpers.forEachInArray(props.DATE_SELECTS, function (select) {
            var ymd = moment(select.DATE).format('YYYY-MM-DD');
            internalSelects[ymd] = select.CLASSNAME;
        });
    }
    return internalSelects;
}

function createMonths (props, state) {
    var range = Helpers.getRange(1, props.UI_MONTHS_NUMBER);
    return Helpers.mapArray(range, function(i) {
        var monthProps = Helpers.assignObject({}, props, {
            key: 'month-' + i,
            DATE: state.date.clone().add(i - 1, 'month'),
            DATE_SELECTS: parseSelects(props)
        });
        return React.createElement(Month, monthProps);
    });
}

function createClass () {
    return React.createClass({
        displayName: 'Calendar',

        propTypes: defTypes,

        getDefaultProps: function() {
            return defaultProps;
        },

        getInitialState: function() {
            return {
                date: getInitialDate(this.props)
            };
        },

        onNext: function() {
            this.setState({
                date: this.state.date.add(1, 'months')
            });
        },

        onPrev: function() {
            this.setState({
                date: this.state.date.subtract(1, 'months')
            });
        },

        render: function() {
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
        getInitialDate: getInitialDate,
        createMonths: createMonths
    };
} else {
    module.exports = createClass();
}

}).call(this,require('_process'))
},{"./controls.js":3,"./helpers.js":5,"./moment-loader.js":6,"./month.js":7,"./react-loader.js":8,"_process":11}],3:[function(require,module,exports){
// vim: set sw=4 ts=4 expandtab:

'use strict';

var React = require('./react-loader.js');
var Helpers = require('./helpers.js');

function stopPropagation (event) {
    if (event.stopImmediatePropagation) {
        event.stopImmediatePropagation();
    }
}

/**
 * @param props {ReactProps}
 */
function onNext (props) {
    return function(event) {
        stopPropagation(event.nativeEvent);

        props.ON_NEXT();
    };
}

/**
 * @param props {ReactProps}
 */
function onPrev (props) {
    return function(event) {
        stopPropagation(event.nativeEvent);

        props.ON_PREV();
    };
}

/**
 * @param props {ReactProps}
 * @return {ReactElement}
 */
function createMainElement (props) {
    var prevButton = React.createElement('div', {
        className: Helpers.getClassName(props, 'prev'),
        onClick: onPrev(props)
    }, props.UI_TEXT_PREV);
    var nextButton = React.createElement('div', {
        className: Helpers.getClassName(props, 'next'),
        onClick: onNext(props)
    }, props.UI_TEXT_NEXT);
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'controls')
    }, prevButton, nextButton);
}

/**
 * @return {ReactClass}
 */
function createClass() {
    return React.createClass({
        displayName: 'CalendarControls',

        render: function() {
            return createMainElement(this.props);
        }
    });
}

module.exports = createClass();

},{"./helpers.js":5,"./react-loader.js":8}],4:[function(require,module,exports){
(function (process){
// vim: set sw=4 ts=4 expandtab:

'use strict';

var React = require('./react-loader.js');
var Helpers = require('./helpers.js');

function isOtherMonth (props) {
    return props.POSITION !== 0;
}

/**
 * Day is unselectable when
 *     it is not from current month and there more than one month
 *     it is out of bounds of min and max dates
 * @returns {boolean}
 */
function isUnselectable (props) {
    function isBeforeMin() {
        var minDate = props.DATE_MIN;
        return !!minDate && props.DAY.isBefore(minDate);
    }
    function isAfterMax() {
        var maxDate = props.DATE_MAX;
        return !!maxDate && props.DAY.isAfter(maxDate);
    }
    return (isOtherMonth(props) && props.UI_MONTHS_NUMBER > 1) ||
            (isBeforeMin()) || (isAfterMax());
}

function isHoliday (props) {
    var dayOfWeek = props.DAY.day();
    return dayOfWeek === 6 || dayOfWeek === 0;
}

function isToday (props) {
    return props.DAY.isSame(new Date(), 'day');
}

function isCurrent (props) {
    return props.DAY.isSame(props.DATE_CURRENT, 'day');
}

function parseProps (props) {
    return {
        isUnselectable: isUnselectable(props),
        isOtherMonth: isOtherMonth(props),
        isHoliday: isHoliday(props),
        isToday: isToday(props),
        isCurrent: isCurrent(props)
    };
}

/**
 * @param props {ReactProps}
 */
function onClick (props, options) {
    if (options.isUnselectable) {
        return null;
    } else {
        return function (event) {
            if (event.nativeEvent.stopImmediatePropagation) {
                event.nativeEvent.stopImmediatePropagation();
            }

            if (props.ON_SELECT) {
                props.ON_SELECT(props.DAY);
            }
        };
    }
}

var classNamesDict = {
    isUnselectable: 'day-unselectable',
    isOtherMonth: 'day-other-month',
    isHoliday: 'day-holiday',
    isToday: 'day-today',
    isCurrent: 'day-current'
};

function getClassName (props, options) {
    var classNames = ['day'];

    Helpers.forEachInObject(options, function (isEnabled, option) {
        if (isEnabled) {
            classNames.push(classNamesDict[option]);
        }
    });

    var ymd = props.DAY.format('YYYY-MM-DD');
    var selectedClassname = props.DATE_SELECTS[ymd];
    if (selectedClassname) {
        classNames.push(selectedClassname);
    }

    if (props.DATE_RANGES) {
        Helpers.forEachInArray(props.DATE_RANGES, function (range) {
            if (props.DAY.isBetween(range.FROM, range.TO, 'day')) {
                classNames.push(range.CLASSNAME);
            }
        });
    }

    return Helpers.getClassName(props, classNames);
}

function createDayNumber (props, options) {
    if (props.UI_MONTHS_NUMBER > 1 && options.isOtherMonth) {
        return null;
    } else {
        return React.createElement('span', {
            className: Helpers.getClassName(props, 'day-number')
        }, props.DAY.date());
    }
}

/**
 * @param props {ReactProps}
 * @return {ReactElement}
 */
function createMainElement (props) {
    var options = parseProps(props);
    var divSettings = {
        onClick: onClick(props, options),
        className: getClassName(props, options)
    };
    return React.createElement('div',
        divSettings,
        createDayNumber(props, options));
}

/**
 * @param globalOptions {Object}
 * @return {ReactClass}
 */
function createClass () {
    return React.createClass({
        displayName: 'Day',

        render: function() {
            return createMainElement(this.props);
        }
    });
}

if (process.env.TESTING) {
    module.exports = {
        createDayNumber: createDayNumber,
        getClassName: getClassName,
        isCurrent: isCurrent,
        isHoliday: isHoliday,
        isOtherMonth: isOtherMonth,
        isToday: isToday,
        isUnselectable: isUnselectable,
        parseProps: parseProps
    };
} else {
    module.exports = createClass();
}

}).call(this,require('_process'))
},{"./helpers.js":5,"./react-loader.js":8,"_process":11}],5:[function(require,module,exports){
// vim: set sw=4 ts=4 expandtab:

'use strict';

function mapArrayInternal (arr, func) {
    return arr.map(func);
}

var mapArray = Array.prototype.map ?
        mapArrayInternal : require('array-map');

function forEachInArrayInternal (arr, func) {
    return arr.forEach(func);
}

var forEachInArray = Array.prototype.forEach ?
        forEachInArrayInternal : require('array-foreach');

/**
 * @param props {ReactProps}
 * @param name {string=}
 * @returns {string}
 */
function getClassName (props, name) {
    if (!name) {
        return props.CLASSNAME;
    } else if (typeof name === 'string') {
        return props.CLASSNAME + '-' + name;
    } else {
        return mapArray(name, function(nameItem) {
            return getClassName(props, nameItem);
        }).join(' ');
    }
}

/**
 * Array of numbers from `start` to `end`
 * If only one argument defined, then from 0 to `arg`
 * @param start {number}
 * @param end {number=}
 * @returns {Array.<number>}
 */
function getRange (start, end) {
    start = start || 0;
    if (!end) {
        end = start;
        start = 0;
    }

    var output = [];

    while (start <= end) {
        output.push(start);
        start++;
    }

    return output;
}

var assignObject = Object.assign || require('object-assign');

var keysOfObject = Object.keys || require('object-keys');

function forEachInObject (obj, func) {
    var keys = keysOfObject(obj);
    var keysLength = keys.length;
    for (var i = 0; i < keysLength; i++) {
        func(obj[keys[i]], keys[i], obj);
    }
    return obj;
}

module.exports = {
    assignObject: assignObject,
    forEachInArray: forEachInArray,
    forEachInObject: forEachInObject,
    getClassName: getClassName,
    getRange: getRange,
    mapArray: mapArray
};

},{"array-foreach":9,"array-map":10,"object-assign":12,"object-keys":13}],6:[function(require,module,exports){
// vim: set sw=4 ts=4 expandtab:
// jshint undef: false
module.exports = typeof moment === 'undefined' ? require('moment') : moment;

},{"moment":undefined}],7:[function(require,module,exports){
(function (process){
// vim: set sw=4 ts=4 expandtab:

'use strict';

var React = require('./react-loader.js');
var moment = require('./moment-loader.js');
var Helpers = require('./helpers.js');
var Day = require('./day.js');

function createWeekdaysElement (props) {
    if (!props.UI_HAS_WEEKDAYS) {
        return null;
    }
    var classNames = ['weekday'];
    return Helpers.mapArray(props.UI_WEEKDAYS, function(day, i) {
        var weekdayClassNames = i === 5 || i === 6 ?
                classNames.concat('weekday-holiday') : classNames;
        return React.createElement('div', {
            key: 'weekday-' + i,
            className: Helpers.getClassName(props, weekdayClassNames)
        }, day);
    });
}

function createCurrentDateElement (props) {
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'current-date')
    }, props.DATE.format(props.UI_FORMAT_MONTH));
}

function createWeekdaysHeader (props) {
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'headers')
    }, createCurrentDateElement(props), createWeekdaysElement(props));
}

function createClearfix (props) {
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'clearfix')
    });
}

function getDayByNumber (date, num) {
    // FIXME: date from other month is not valid
    // NOTE: http://momentjs.com/docs/#/parsing/array/
    return moment([date.year(), date.month(), num]);
}

function getDaysFromPrevMonth (props) {
    var startOfMonth = props.DATE.startOf('month');
    var diff = startOfMonth.weekday() - props.WEEK_OFFSET;
    if (diff < 0) {
        diff += 7;
    }
    if (!diff) {
        return [];
    }
    var range = Helpers.getRange(1, diff);
    return Helpers.mapArray(range, function (i) {
        return {
            DAY: getDayByNumber(props.DATE, i - diff),
            POSITION: -1
        };
    });
}

function getDaysFromCurrentMonth (props) {
    var range = Helpers.getRange(1, props.DATE.daysInMonth());
    return Helpers.mapArray(range, function (i) {
        return {
            DAY: getDayByNumber(props.DATE, i),
            POSITION: 0
        };
    });
}

function getDaysFromNextMonth (props, limit) {
    var numberOfDays = props.DATE.daysInMonth();
    var range = Helpers.getRange(1, limit);
    return Helpers.mapArray(range, function (i) {
        return {
            DAY: getDayByNumber(props.DATE, numberOfDays + i),
            POSITION: 1
        };
    });
}

function getExtraDaysAtTheEnd (props, date, limit) {
    var range = Helpers.getRange(1, limit);
    return Helpers.mapArray(range, function (i) {
        return {
            DAY: date.clone().add(i - 1, 'days'),
            POSITION: 1
        };
    });
}

function getDays (props) {
    // jshint maxstatements: 12
    var days = [];

    days = Array.prototype.concat.apply(
            days, getDaysFromPrevMonth(props));

    days = Array.prototype.concat.apply(
            days, getDaysFromCurrentMonth(props));

    var tillEndOfMonth = 7 - (days.length % 7);
    if (tillEndOfMonth) {
        days = Array.prototype.concat.apply(
                days, getDaysFromNextMonth(props, tillEndOfMonth));
    }

    var tillEndOfSixRows = 42 - days.length;
    if (props.UI_HAS_SIX_ROWS && tillEndOfSixRows) {
        var lastDate = days[days.length - 1].DAY;
        var start = lastDate.clone().add(1, 'days');
        days = Array.prototype.concat.apply(
                days, getExtraDaysAtTheEnd(props, start, tillEndOfSixRows));
    }

    return days;
}

function createDayElement (props, day, i) {
    var dayProps = Helpers.assignObject({}, props, day, {
        key: 'day-' + i
    });
    return React.createElement(Day, dayProps);
}

function createDaysElement (props) {
    return React.createElement('div', {
        className: Helpers.getClassName(props, 'days')
    }, Helpers.mapArray(getDays(props), function(day, i) {
        return createDayElement(props, day, i);
    }));
}

function createMainElement (props) {
    return React.createElement('div', {
            className: Helpers.getClassName(props, 'grid')
        },
        createWeekdaysHeader(props),
        createDaysElement(props),
        createClearfix(props));
}

function createClass () {
    return React.createClass({
        displayName: 'Month',

        render: function() {
            return createMainElement(this.props);
        }
    });
}

if (process.env.TESTING) {
    module.exports = {
        getDayByNumber: getDayByNumber,
        getDaysFromPrevMonth: getDaysFromPrevMonth,
        getDaysFromCurrentMonth: getDaysFromCurrentMonth,
        getDaysFromNextMonth: getDaysFromNextMonth,
        getExtraDaysAtTheEnd: getExtraDaysAtTheEnd,
        getDays: getDays
    };
} else {
    module.exports = createClass();
}

}).call(this,require('_process'))
},{"./day.js":4,"./helpers.js":5,"./moment-loader.js":6,"./react-loader.js":8,"_process":11}],8:[function(require,module,exports){
// vim: set sw=4 ts=4 expandtab:
// jshint undef: false
module.exports = typeof React === 'undefined' ? require('react') : React;

},{"react":undefined}],9:[function(require,module,exports){
/**
 * array-foreach
 *   Array#forEach ponyfill for older browsers
 *   (Ponyfill: A polyfill that doesn't overwrite the native method)
 * 
 * https://github.com/twada/array-foreach
 *
 * Copyright (c) 2015 Takuto Wada
 * Licensed under the MIT license.
 *   http://twada.mit-license.org/
 */
'use strict';

module.exports = function forEach (ary, callback, thisArg) {
    if (ary.forEach) {
        ary.forEach(callback, thisArg);
        return;
    }
    for (var i = 0; i < ary.length; i+=1) {
        callback.call(thisArg, ary[i], i, ary);
    }
};

},{}],10:[function(require,module,exports){
module.exports = function (xs, f) {
    if (xs.map) return xs.map(f);
    var res = [];
    for (var i = 0; i < xs.length; i++) {
        var x = xs[i];
        if (hasOwn.call(xs, i)) res.push(f(x, i, xs));
    }
    return res;
};

var hasOwn = Object.prototype.hasOwnProperty;

},{}],11:[function(require,module,exports){
// shim for using process in browser

var process = module.exports = {};
var queue = [];
var draining = false;

function drainQueue() {
    if (draining) {
        return;
    }
    draining = true;
    var currentQueue;
    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        var i = -1;
        while (++i < len) {
            currentQueue[i]();
        }
        len = queue.length;
    }
    draining = false;
}
process.nextTick = function (fun) {
    queue.push(fun);
    if (!draining) {
        setTimeout(drainQueue, 0);
    }
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

// TODO(shtylman)
process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],12:[function(require,module,exports){
'use strict';

function ToObject(val) {
	if (val == null) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

module.exports = Object.assign || function (target, source) {
	var from;
	var keys;
	var to = ToObject(target);

	for (var s = 1; s < arguments.length; s++) {
		from = arguments[s];
		keys = Object.keys(Object(from));

		for (var i = 0; i < keys.length; i++) {
			to[keys[i]] = from[keys[i]];
		}
	}

	return to;
};

},{}],13:[function(require,module,exports){
'use strict';

// modified from https://github.com/es-shims/es5-shim
var has = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var isArgs = require('./isArguments');
var hasDontEnumBug = !({ 'toString': null }).propertyIsEnumerable('toString');
var hasProtoEnumBug = function () {}.propertyIsEnumerable('prototype');
var dontEnums = [
	'toString',
	'toLocaleString',
	'valueOf',
	'hasOwnProperty',
	'isPrototypeOf',
	'propertyIsEnumerable',
	'constructor'
];

var keysShim = function keys(object) {
	var isObject = object !== null && typeof object === 'object';
	var isFunction = toStr.call(object) === '[object Function]';
	var isArguments = isArgs(object);
	var isString = isObject && toStr.call(object) === '[object String]';
	var theKeys = [];

	if (!isObject && !isFunction && !isArguments) {
		throw new TypeError('Object.keys called on a non-object');
	}

	var skipProto = hasProtoEnumBug && isFunction;
	if (isString && object.length > 0 && !has.call(object, 0)) {
		for (var i = 0; i < object.length; ++i) {
			theKeys.push(String(i));
		}
	}

	if (isArguments && object.length > 0) {
		for (var j = 0; j < object.length; ++j) {
			theKeys.push(String(j));
		}
	} else {
		for (var name in object) {
			if (!(skipProto && name === 'prototype') && has.call(object, name)) {
				theKeys.push(String(name));
			}
		}
	}

	if (hasDontEnumBug) {
		var ctor = object.constructor;
		var skipConstructor = ctor && ctor.prototype === object;

		for (var k = 0; k < dontEnums.length; ++k) {
			if (!(skipConstructor && dontEnums[k] === 'constructor') && has.call(object, dontEnums[k])) {
				theKeys.push(dontEnums[k]);
			}
		}
	}
	return theKeys;
};

keysShim.shim = function shimObjectKeys() {
	if (!Object.keys) {
		Object.keys = keysShim;
	}
	return Object.keys || keysShim;
};

module.exports = keysShim;

},{"./isArguments":14}],14:[function(require,module,exports){
'use strict';

var toStr = Object.prototype.toString;

module.exports = function isArguments(value) {
	var str = toStr.call(value);
	var isArgs = str === '[object Arguments]';
	if (!isArgs) {
		isArgs = str !== '[object Array]'
			&& value !== null
			&& typeof value === 'object'
			&& typeof value.length === 'number'
			&& value.length >= 0
			&& toStr.call(value.callee) === '[object Function]';
	}
	return isArgs;
};

},{}]},{},[1]);
