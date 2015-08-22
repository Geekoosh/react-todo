var React = require('react/addons');
var cx = React.addons.classSet;

var InputValidatorMixin = {
	validators: [],
	componentDidMount: function() {
		$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
	},
	componentDidUpdate: function() {
  		$('[data-toggle="tooltip"]').tooltip({trigger: 'hover'});
  	},
  	addValidators: function(names) {
  		this.validators = this.validators.concat(names);
  	},
  	validInfo: function(name) {
  		var validatorFunc = name + 'Validator';
  		if(!this[validatorFunc])
  			return null;
  		return this[validatorFunc]();
  	},
  	validTooltip: function(name) {
  		var validInfo = this.validInfo(name);
  		if(validInfo) {
  			return {
				'data-toggle': 'tooltip',
				'data-placement': 'top',
				'title': validInfo,
				'data-original-title': validInfo,
			}
  		}
  		return {};
  	},
  	validClasses: function(name, cls) {
  		cls['has-error'] = !!this.validInfo(name);
  		return cx(cls);
  	},
  	hasErrors: function() {
  		var errors = _.some(this.validators, function(name){
  			return this.validInfo(name);
  		}, this);
  		return errors;
  	}
};

module.exports = InputValidatorMixin;