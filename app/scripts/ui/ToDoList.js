'use strict';

var React = require('react');
var ToDoItem = require('./ToDoItem');

var ToDoList = React.createClass({
	propTypes: {
		items: React.PropTypes.arrayOf(
				React.PropTypes.shape({
					itemName: React.PropTypes.string,
					date: React.PropTypes.object,
					state: React.PropTypes.oneOf(['open', 'done'])
				})
			).isRequired,
		search: React.PropTypes.shape({
			startDate: React.PropTypes.object,
			endDate: React.PropTypes.object,
			itemName: React.PropTypes.string
		}),
		onItemDone: React.PropTypes.func,
		onItemDelete: React.PropTypes.func
	},
	getDefaultProps: function() {
		return {
			items: [],
			search: {
				startDate: null,
				endDate: null,
				itemName: null
			},
			onItemDone: $.noop,
      		onItemDelete: $.noop
		}
	},
	renderItems: function() {
		var items = _.filter(this.props.items, function(item){
			var search = this.props.search;
			if(search.itemName && search.itemName.length > 0) {
				if(item.itemName.indexOf(search.itemName) < 0) {
					return false;
				}
			}
			if(search.startDate) {
				if(item.date < search.startDate) {
					return false;
				}
			}
			if(search.endDate) {
				if(item.date > search.endDate) {
					return false;
				}
			}
			return true;
		}.bind(this));
		
		items = _.sortBy(items, function(item){
			return item.date;
		})
		.reverse();
		
		return items.map(function(item, i){
			return <ToDoItem item={item} {...this.props}/>;
		}.bind(this));
	},
	render: function() {
		var display = <div className="well well-sm">Nothing to do!</div>
		if(this.props.items.length > 0) {
			display = <ul className={"list-group"}>
						{this.renderItems()}
						</ul>
		}
		return (
			<div>
				{display}
			</div>
		)
	}
});

module.exports = ToDoList;