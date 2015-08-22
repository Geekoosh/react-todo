'use strict';

var React = require('react/addons');
var DatePicker = require("./DatePicker");
var Search = require("../data/Search");
var cx = React.addons.classSet;

var SearchBar = React.createClass({
	propTypes: {
		onSearch: React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			onSearch: $.noop
		}
	},
	getInitialState: function() {
		return {
			search: new Search()
		}
	},
	changeStartTime: function(date, oldDate) {
		this.state.search.startDate = date;
		this.setState(this.state.search);
	},
	changeEndTime: function(date, oldDate) {
		this.state.search.endDate = date;
		this.setState(this.state.search);
	},
	changeItemName: function(event) {
		this.state.search.itemName = event.target.value;
		this.setState(this.state.search);
	},
	clear: function() {
		var newState = this.getInitialState();
		this.props.onSearch(newState.search);
		this.setState(newState);
	},
	render: function() {
		return (
			<nav className="navbar navbar-default">
				<div className="navbar-form navbar-left" role="search">
				  <div className="form-group">
				    <label>Search</label>
				    <input className="form-control" value={this.state.search.itemName} onChange={this.changeItemName} placeholder="Item name"/>
				  </div>
				  <div className="form-group">
				  	<label>From</label>
				  	<DatePicker date={this.state.search.startDate} onChange={this.changeStartTime}/>
				  </div>
				  <div className="form-group">
				  	<label>To</label>
				  	<DatePicker date={this.state.search.endDate} onChange={this.changeEndTime}/>
				  </div>
				  <button className="btn btn-primary" onClick={this.props.onSearch.bind(null,this.state.search)}>Go</button>
				  <button className="btn btn-link" onClick={this.clear}>Clear</button>
				</div>
			</nav>
		);
	}
});

module.exports = SearchBar;