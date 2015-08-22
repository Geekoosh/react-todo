'use strict';

var React = require('react/addons');
var DatePicker = require("./DatePicker");
var Item = require("../data/Item");
var DateService = require("../data/DateService");
var InputValidatorMixin = require("./InputValidatorMixin");
var cx = React.addons.classSet;

var ToDoForm = React.createClass({
	mixins: [InputValidatorMixin],
	propTypes: {
		newItem: React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			newItem: $.noop
		}
	},
	getInitialState: function() {
	    return {
	    	item: new Item()
	    }
	},
	handleSubmit: function(e) {
		e.preventDefault();
		this.props.newItem(this.state.item);
		this.setState(this.getInitialState());
	},
	changeItemName: function(event) {
		this.state.item.itemName = event.target.value;
		this.setState(this.state);
	},
	changeTime: function(date, oldDate) {
		this.state.item.date = date;
		this.setState(this.state);
  	},
  	nameValidator: function() {
  		if(!this.state.item.itemName || this.state.item.itemName.length == 0) {
  			return 'Name must not be empty';
  		}
  		return null;
  	},
  	dateValidator: function() {
  		if(this.state.item.date < DateService.nowDate()) {
  			return 'Please select a future deadline';
  		}
  		return null;
  	},
  	componentWillMount: function() {
  		this.addValidators(['name', 'date']);
  	},
	render: function() {
		return (
			<div className="panel panel-primary">
				<div className="panel-heading">Add ToDo Item</div>
				<div className="panel-body">
					<form onSubmit={this.handleSubmit} className="form-inline">
						<div className={this.validClasses('date', {'form-group': true})}
							{...this.validTooltip('date')}>
				        	<DatePicker date={this.state.item.date} onChange={this.changeTime}/>
				        </div>
						<div className={this.validClasses('name', {'form-group': true, 'input-group': true})}>
				          <input type="text" className={"form-control"} 
				          		value={this.state.item.itemName} 
				          		onChange={this.changeItemName}
				          		{...this.validTooltip('name')}
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