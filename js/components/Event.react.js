var React = require('react');
var FlockConstants = require('../constants/FlockConstants');
var FlockActions = require('../actions/FlockActions');
var Button = require('./widgets/Button.react');
var Util = require('../utils/Util');

var _savedState;

var Event = React.createClass({

  statics: {
    FIELDS: [
      {
        name: 'name',
        validation: 'nonEmpty'
      },
      {
        name: 'organizer',
        validation: 'nonEmpty'
      },
      {
        name: 'details'
      },
      {
        name: 'where'
      },
      {
        name: 'when'
      }
    ]
  },

  getInitialState: function() {
    return {
      name: '',
      organizer: '',
      details: '',
      where: '',
      when: '',
      error: {},
      initialized: false
    };
  },

  componentDidMount: function() {
    if (_savedState) {
      this.setState(_savedState);
    }
  },

  componentWillUnmount: function() {
    _savedState = this.state;
  },

  componentWillReceiveProps: function(properties) {
    this._initializeState(properties);
  },

  componentWillUpdate: function(nextProps, nextState) {
    this._validate(nextState);
  },

  _hasNewFields: function(next, previous) {
    return Object.keys(previous).join(',') != Object.keys(next).join(',');
  },

  _hasErrors: function() {
    return Object.keys(this.state.error).length > 0;
  },

  _validate: function(state) {
    var error = {};

    if (state.name.length === 0) {
      error.name = 'Should be non-empty';
    }
    if (state.organizer.length === 0) {
      error.organizer = 'Should be non-empty';
    }
    var newState = Object.assign({}, state, {
      error: error
    });

    if (this._hasNewFields(error, this.state.error)) {
      this.setState(newState);
    }
  },

  _initializeState: function(properties) {
    var flock = properties.flock;

    this.setState({
      name: flock.name,
      organizer: flock.organizer,
      details: flock.details,
      where: flock.where,
      when: flock.when,
      initialized: true
    });
  },

  _onChange: function(field, event) {
    var newState = {};

    newState[field] = event.target.value;
    this.setState(newState);
  },

  _hasChanges: function() {
    var self = this;

    return Event.FIELDS.some(function(field) {
      return self.props.flock[field.name] !== self.state[field.name];
    }) && this.state.initialized;
  },

  _save: function() {
    if (!this._hasErrors()) {
      FlockActions.save({
        name: this.state.name,
        organizer: this.state.organizer,
        details: this.state.details,
        where: this.state.where,
        when: this.state.when
      });
    }
  },

  _cancel: function() {
    var flock = this.props.flock;

    this.setState({
      name: flock.name,
      organizer: flock.organizer,
      details: flock.details,
      where: flock.where,
      when: flock.when
    });
  },

  render: function() {
    var self = this;
    var hasChanges = this._hasChanges();
    var role = this.props.role;
    var isAdmin = (role === FlockConstants.ROLES.ADMIN);
    var unsavedChangesIndicator;
    var footer;

    var fields = Event.FIELDS.map(function(field, idx) {
      var hasErrorValue = (typeof self.state.error[field.name] !== 'undefined');
      var errorMessage;
      var className = hasErrorValue ? 'error' : '';

      /* jshint ignore:start */
      var fieldValue = isAdmin ?
        (field.name === 'details' ?
          (
            <textarea
              className={className}
              onChange={self._onChange.bind(self, field.name)}
              value={self.state[field.name]}>
            </textarea>
          ) : (
            <input
              className={className}
              type="text"
              value={self.state[field.name]}
              onChange={self._onChange.bind(self, field.name)}>
            </input>
          )
        ) : (
          <label className="field-value">{self.state[field.name]}</label>
        );
      /* jshint ignore:end */

      if (hasErrorValue) {
        /* jshint ignore:start */
        errorMessage = (
          <label className="field-error-message">{self.state.error[field.name]}</label>
        );
        /* jshint ignore:end */
      }

      return (
        /* jshint ignore:start */
        <div key={idx} className="field">
          <label>{Util.capitalize(field.name)}</label>
          {fieldValue}
          {errorMessage}
        </div>
        /* jshint ignore:end */
      );
    });

    if (isAdmin) {
      unsavedChangesIndicator = (
        /* jshint ignore:start */
        <span
          className={(hasChanges ? 'unsaved-changes has-changes': 'unsaved-changes')}>*</span>
        /* jshint ignore:end */
      );
      footer = (
        /* jshint ignore:start */
        <footer>
          <Button
            label="Save"
            onClick={this._save}
            disabled={!hasChanges} />
          <Button
            label="Cancel"
            onClick={this._cancel}
            disabled={!hasChanges} />
        </footer>
        /* jshint ignore:end */
      );
    }

    return (
      /* jshint ignore:start */
      <section className="event-details">
        <header>
          <i className="fa fa-4x fa-calendar"></i>
          <span className="event-details-description">What, when, where and any additional details.</span>
        </header>
        {fields}
        {unsavedChangesIndicator}
        {footer}
      </section>
      /* jshint ignore:end */
    );
  }
});

module.exports = Event;