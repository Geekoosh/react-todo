
var React = window.React = require('react'),
    ToDoItem = require("./ui/ToDoItem"),
    ToDoList = require("./ui/ToDoList"),
    ToDoForm = require("./ui/ToDoForm"),
    SearchBar = require("./ui/SearchBar"),
    Search = require("./data/Search"),
    mountNode = document.getElementById("app");

var TodoApp = React.createClass({
  getInitialState: function() {
    return {
      items: [],
      search: new Search()
    };
  },
  newItem: function(item) {
    var newItems = this.state.items.concat(item);
    this.setState({items: newItems});
  },
  onItemDone: function(item) {
    var itemIndex = this.state.items.indexOf(item);
    if(itemIndex >= 0) {
      var item = this.state.items[itemIndex];
      item.setDone();
      this.setState({items: this.state.items});
    }
  },
  onItemDelete: function(item) {
    var itemIndex = this.state.items.indexOf(item);
    if(itemIndex >= 0) {
      this.state.items.splice(itemIndex, 1);
      this.setState({items: this.state.items});
    }
  },
  onSearch: function(search) {
    this.setState({search: search});
  },
  render: function() {
    var listProps = {
      items: this.state.items,
      search: this.state.search,
      onItemDone: this.onItemDone,
      onItemDelete: this.onItemDelete
    }
    return (
      <div>
        <ToDoForm newItem={this.newItem}/>
        <SearchBar onSearch={this.onSearch}/>
        <ToDoList {...listProps} />
      </div>
    );
  }
});


React.render(<TodoApp />, mountNode);

