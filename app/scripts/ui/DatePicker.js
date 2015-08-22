'use strict';

var React = require('react');

var DatePicker = React.createClass({
	getDefaultProps: function() {
		return {
			date: new Date()
		}
	},
	componentDidMount: function() {
		this.dt = $(this.refs.datepicker.getDOMNode()).datetimepicker({format:'DD-MMMM-YYYY'});
		this.dt.data("DateTimePicker").date(this.props.date);
		this.dt.on('dp.change', function(e){
			this.props.onChange(e.date, e.oldDate);
		}.bind(this));
	},
	componentWillReceiveProps: function(nextProps) {
		this.dt.off('dp.change');
		this.dt.data("DateTimePicker").date(nextProps.date);
		this.dt.on('dp.change', function(e){
			this.props.onChange(e.date, e.oldDate);
		}.bind(this));
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