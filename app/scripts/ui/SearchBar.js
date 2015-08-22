'use strict';

var React = require('react/addons');
var DatePicker = require("./DatePicker");
var cx = React.addons.classSet;

var SearchBar = React.createClass({
	getInitialState: function() {
		return {
			startDate: null,
			endDate: null,
			itemName: null
		}
	},
	changeStartTime: function(date, oldDate) {
		this.setState({startDate: date});
	},
	changeEndTime: function(date, oldDate) {
		this.setState({endDate: date});
	},
	changeItemName: function(event) {
		this.setState({itemName: event.target.value});
	},
	clear: function() {
		var newState = this.getInitialState();
		this.props.onSearch(newState);
		this.setState(newState);
	},
	render: function() {
		return (
			<nav className="navbar navbar-default">
				<div className="navbar-form navbar-left" role="search">
				  <div className="form-group">
				    <label>Search</label>
				    <input className="form-control" value={this.state.itemName} onChange={this.changeItemName} placeholder="Item name"/>
				  </div>
				  <div className="form-group">
				  	<label>From</label>
				  	<DatePicker date={this.state.startDate} onChange={this.changeStartTime}/>
				  </div>
				  <div className="form-group">
				  	<label>To</label>
				  	<DatePicker date={this.state.endDate} onChange={this.changeEndTime}/>
				  </div>
				  <button className="btn btn-primary" onClick={this.props.onSearch.bind(null,this.state)}>Go</button>
				  <button className="btn btn-link" onClick={this.clear}>Clear</button>
				</div>
			</nav>
		);
	}
});

module.exports = SearchBar;