'use strict';

var React = require('react/addons');
var cx = React.addons.classSet;

var ToDoItem = React.createClass({
	render: function() {
		var item = this.props.item;
		var controls = <div/>;
		if(item.state == 'open') {
			controls = 	<div className="pull-right btn-toolbar">
							<button className={"btn btn-primary"} onClick={this.props.onItemDone.bind(null, item)}>Done!</button>
							<button className={"btn btn-primary"} onClick={this.props.onItemDelete.bind(null, item)}>Delete</button>
						</div>
		}
		var classes = cx({
			'list-group-item': true,
			'clearfix': true,
			'list-group-item-success': item.state == 'done'
		});
		return (
			<li className={classes}>
				<h4>{item.itemName}</h4>
				<span>{item.date.toISOString().substring(0, 10)}</span>
				{controls}
			</li>
		)
	}
});

module.exports = ToDoItem;