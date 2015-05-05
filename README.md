# react-calendar

[![Build Status](https://travis-ci.org/fiskus/react-calendar.svg?branch=master)](https://travis-ci.org/fiskus/react-calendar)
[![Davis Dependency status](https://david-dm.org/fiskus/react-calendar.svg)](https://david-dm.org/fiskus/react-calendar)
[![experimental](http://badges.github.io/stability-badges/dist/experimental.svg)](http://github.com/badges/stability-badges)

[React](http://facebook.github.io/react/) calendar component inspired by [CLNDR.js](http://kylestetz.github.io/CLNDR/).

# [Examples](https://github.com/fiskus/react-calendar/blob/master/examples/basic/main.js)

```js
var React = require('react');
var Calendar = require('react-calendar-component');

function onDatePicked(date) {
  console.log(date);
}

React.render(
  <Calendar UI_HAS_WEEKDAYS={true}
            UI_HAS_SIX_ROWS={false}
            ON_SELECT={onDatePicked} />,
  document.getElementById('calendar')
);
```

# Options

There are three categories of options

## Base options

* `CLASSNAME` sets prefix for all elements classnames
* `ON_SELECT` is callback on clicked/selected cell with enabled date

## Date options

* `DATE_CURRENT` is default/current date for calendar
* All dates above `DATE_MAX` are disabled/unselectable
* All dates behind `DATE_MIN` are disabled/unselectable
* `DATE_RANGES` is array of hashes a la {FROM: new Date(), TO: new Date(), CLASSNAME: 'top-kek'}
* `DATE_SELECTS` is array of hashes a la {DATE: new Date(), CLASSNAME: 'lol'}

## UI options

* `UI_FORMAT_MONTH` sets format of current month at header ([See moment.js documentation](http://momentjs.com/docs/#/displaying/format/)
* `UI_HAS_SIX_ROWS` sets showing of six rows always even for February
* `UI_HAS_WEEKDAYS` sets visibility of header with weekdays captions
* `UI_MONTHS_NUMBER` sets number of months
* `UI_TEXT_NEXT` sets caption for next-month button
* `UI_TEXT_PREV` sets caption for prev-month button
* `UI_WEEKDAYS` is array of weekdays captions

# Contributing

```bash
$ npm install
$ gulp dev # build code with examples
$ gulp tdd # tests watcher
```

* Tabs for indentation
* No classes or prototypes, just functions
* If function should use this.props, pass it as first argument
* Priority: simplicity > consistency > performance

# License
MIT
