// vim: set softtabstop=4 shiftwidth=4 noexpandtab:

'use strict';

var React = require('react');
var moment = require('moment');

var Controls = require('./controls.js');
var Helpers = require('./helpers.js');
var Month = require('./month.js');

var defaultProps = {
	FORCE_SIX_ROWS: false,
	MONTH_FORMAT: 'MMMM YYYY',
	NEXT_TEXT: 'Next',
	NUMBER_OF_MONTHS: 1,
	ON_PICK_DATE: null,
	PREV_TEXT: 'Prev',
	ROOT_CLASSNAME: 'clndr',
	SHOW_WEEKDAYS: false,
	WEEKDAYS: moment.weekdaysMin(),
	WEEK_OFFSET: 0
};

var defTypes = {
	FORCE_SIX_ROWS: React.PropTypes.bool,
	MONTH_FORMAT: React.PropTypes.string,
	NEXT_TEXT: React.PropTypes.string,
	NUMBER_OF_MONTHS: React.PropTypes.number,
	ON_PICK_DATE: React.PropTypes.func,
	PREV_TEXT: React.PropTypes.string,
	ROOT_CLASSNAME: React.PropTypes.string,
	SHOW_WEEKDAYS: React.PropTypes.bool,
	WEEKDAYS: React.PropTypes.array,
	WEEK_OFFSET: React.PropTypes.number
};

function getInitialDate (props) {
	// NOTE: there is DEFAUT_DATE and DATE
	// TODO: leave only one date DEFAUT_DATE or DATE
	return props.DEFAULT_DATE ? moment(props.DEFAULT_DATE) : moment();
}

function createMonths (props, state) {
	var range = Helpers.getRange(1, props.NUMBER_OF_MONTHS);
	return Helpers.mapArray(range, function(i) {
		var monthProps = Helpers.assignObject({}, props, {
			key: 'month-' + i,
			DATE: state.date.clone().add(i - 1, 'month')
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
			return React.DOM.div({
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
