function NonEmptyValidation(fieldName) {
  this.fieldName = fieldName;
}

NonEmptyValidation.prototype.validate = function(state) {
  return state[this.fieldName].length === 0 ? 'Should be non-empty' : '';
};

module.exports = {
  NonEmptyValidation: NonEmptyValidation
};