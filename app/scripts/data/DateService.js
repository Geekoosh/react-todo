'use strict';

var DateService = (function () {
	function _updateDate(date) {
		return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
	}
  	return {
  		nowDate: function() {
  			return _updateDate(new Date());
  		},
  		date: function(date) {
  			if(!date) {
  				return null;
  			}
  			return _updateDate(date);
  		},
  		dateMoment: function(moment) {
  			return moment ? this.date(moment.toDate()) : null;
  		}
  	}
})();

module.exports = DateService;