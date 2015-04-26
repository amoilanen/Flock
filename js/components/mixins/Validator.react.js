var ValidatorMixin = {

  getInitialState: function() {
    return {
      error: {},
      fieldValidations: []
    };
  },

  componentWillUpdate: function(nextProps, nextState) {
    this._validate(nextState);
  },

  setFieldValidations: function(fieldValidations) {
    this.setState({
      fieldValidations: fieldValidations
    });
  },

  hasErrors: function() {
    return Object.keys(this.state.error).length > 0;
  },

  getErrorMessage: function(fieldName) {
    return this.state.error[fieldName];
  },

  _hasNewFields: function(next, previous) {
    return JSON.stringify(Object.keys(previous)) != JSON.stringify(Object.keys(next));
  },

  _validate: function(state) {
    var error = this.state.fieldValidations.reduce(function(error, fieldValidation) {
      var errorMessage = fieldValidation.validate(state);

      if (errorMessage && (errorMessage.length > 0)) {
        error[fieldValidation.fieldName] = errorMessage;
      }
      return error;
    }, {});
    var newState = Object.assign({}, state, {
      error: error
    });

    if (this._hasNewFields(error, this.state.error)) {
      this.setState(newState);
    }
  }
};

module.exports = ValidatorMixin;