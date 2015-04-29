# react-calendar

[React](http://facebook.github.io/react/) calendar component inspired by [CLNDR.js](http://kylestetz.github.io/CLNDR/).

```
$ npm install react-calendar-component
```

# See the demo
http://hanse.github.io/react-calendar/

```js
var React = require('react');
var Calendar = require('react-calendar-component').Calendar;

function onDatePicked(date) {
  alert(date);
}

React.render(
  <Calendar showDaysOfWeek={true}
            forceSixRows={false}
            onPickDate={onDatePicked} />,
  document.getElementById('calendar')
);
```


# Build it yourself

```bash
$ npm install
$ gulp dev
```

# Options

* DEFAULT_DATE
* FORCE_SIX_ROWS
* MONTH_FORMAT
* NEXT_TEXT
* NUMBER_OF_MONTHS
* ON_PICK_DATE
* PREV_TEXT
* ROOT_CLASSNAME
* SHOW_WEEKDAYS
* WEEKDAYS
* MIN_DATE
* MAX_DATE
* SELECTS
* RANGES

# License
MIT
