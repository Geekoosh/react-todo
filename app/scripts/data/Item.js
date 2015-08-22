'use strict';
var DateService = require("../data/DateService");

Object.defineProperty(module.exports, "STATE", {
	value: {
    OPEN: 'OPEN',
	 DONE: 'DONE'
  },
  writable: false
});
var STATE = module.exports.STATE;

var Item = (function () {
  function Item() {
    this.itemName = null;
    this.date = DateService.nowDate();
    this.state = STATE.OPEN;
  }

  Item.prototype.setDone = function() {
    this.state = STATE.DONE
  }
  Item.prototype.isDone = function() {
    return this.state == STATE.DONE;
  }
  return Item;
})();

module.exports = Item;