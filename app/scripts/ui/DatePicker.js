'use strict';

var React = require('react');
var DateService = require("../data/DateService");

var DatePicker = React.createClass({
	propTypes: {
		date: React.PropTypes.object
	},
	getDefaultProps: function() {
		return {
			date: DateService.nowDate()
		}
	},
	componentDidMount: function() {
		this.dt = $(this.refs.datepicker.getDOMNode()).datetimepicker({format:'DD-MMMM-YYYY'});
		this.dt.data("DateTimePicker").date(this.props.date);
		this.dt.on('dp.change', function(e){
			this.props.onChange(DateService.dateMoment(e.date), DateService.dateMoment(e.oldDate));
		}.bind(this));
	},
	componentWillReceiveProps: function(nextProps) {
		this.dt.data("DateTimePicker").date(DateService.date(nextProps.date));
	},
	
	render: function() {
		return (
			<div ref="datepicker" className={'input-group date'}>
                <input type='text' className={"form-control"} />
                <span className={"input-group-addon"}>
                    <span className={"glyphicon glyphicon-calendar"}></span>
                </span>
            </div>
		)
	}
});

module.exports = DatePicker;