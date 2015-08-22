'use strict';

var React = require('react/addons');
var DatePicker = require("./DatePicker");
var cx = React.addons.classSet;

var ToDoForm = React.createClass({
	getInitialState: function() {
		var tomorrow = new Date();
		//tomorrow.setDate(tomorrow.getDate() + 1); 
	    return {
	    	itemName: null,
	    	date: tomorrow,
	    	state: 'open'	    		
	    }
	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.props.newItem(this.state);
		this.setState(this.getInitialState());
	},
	changeItemName: function(event) {
		this.setState({itemName: event.target.value});
	},
	changeTime: function(date, oldDate) {
		this.setState({date: date});
  	},
  	hasNameError: function() {
  		return !this.state.itemName || this.state.itemName.length == 0;
  	},
  	hasDateError: function() {
  		var now = new Date();
  		return this.state.date < now;
  	},
  	hasErrors: function() {
  		return this.hasNameError() || this.hasDateError();
  	},
  	componentDidMount: function() {
  		$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  	},
  	componentDidUpdate: function() {
  		$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  	},
	render: function() {
		var cxGroupName = cx({
			'input-group': true,
			'form-group': true,
			'has-error' : this.hasNameError()
		});
		var nameTitle = this.hasNameError() ? 'Name must not be empty' : '';
		var cxGroupDate = cx({
			'form-group': true,
			'has-error' : this.hasDateError()
		});
		var dateTitle = this.hasDateError() ? 'Please select a future deadline' : '';
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">Add ToDo Item</div>
				<div className="panel-body">
					<form onSubmit={this.handleSubmit} className="form-inline">
						<div className={cxGroupDate}
							data-toggle="tooltip" data-placement="top"
							title={dateTitle}
				          	data-original-title={dateTitle}>
				        	<DatePicker date={this.state.date} onChange={this.changeTime}/>
				        </div>
						<div className={cxGroupName}>
				          <input type="text" className={"form-control"} 
				          		value={this.state.itemName} 
				          		onChange={this.changeItemName}
				          		data-toggle="tooltip" data-placement="top"
				          		title={nameTitle}
				          		data-original-title={nameTitle}
				          		placeholder="Item name..."/>
				        </div>
			            <button className={"btn btn-primary form-group"} type="submit" disabled={this.hasErrors()}>Add</button>
				    </form>
			    </div>
		    </div>
  		)
	}
});

module.exports = ToDoForm;