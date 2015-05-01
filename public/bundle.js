webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    Router = __webpack_require__(2);
	
	var Profile = __webpack_require__(4);
	
	__webpack_require__(25);
	
	var App = React.createClass({
	  displayName: 'App',
	
	  render: function render() {
	    return React.createElement(
	      'main',
	      { className: 'app' },
	      React.createElement(Router.RouteHandler, this.props)
	    );
	  }
	});
	
	var routes = React.createElement(
	  Router.Route,
	  { name: 'app', path: '/', handler: App },
	  React.createElement(Router.DefaultRoute, { handler: Profile })
	);
	
	Router.run(routes, Router.HistoryLocation, function (Handler, state) {
	  React.render(React.createElement(Handler, null), document.body);
	});

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var ProfileForm = __webpack_require__(62),
	    ProfileDetails = __webpack_require__(63);
	
	var Profile = React.createClass({
	  displayName: 'Profile',
	
	  render: function render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(ProfileForm, null),
	      React.createElement(ProfileDetails, null)
	    );
	  }
	});
	
	module.exports = Profile;

/***/ },

/***/ 25:
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 62:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    Formsy = __webpack_require__(178);
	
	var InputField = __webpack_require__(129);
	
	var UserActions = __webpack_require__(130);
	var UserStore = __webpack_require__(128);
	
	var ProfileForm = React.createClass({
	  displayName: 'ProfileForm',
	
	  getInitialState: function getInitialState() {
	    return {
	      canSubmit: false,
	      user: UserStore.getInitialState()
	    };
	  },
	  handleSubmit: function handleSubmit(data) {
	    UserActions.profileUpdate(data);
	  },
	  enableButton: function enableButton() {
	    this.setState({ canSubmit: true });
	  },
	  disableButton: function disableButton() {
	    this.setState({ canSubmit: false });
	  },
	  render: function render() {
	    var disabled = !this.state.canSubmit;
	    var user = this.state.user || {};
	    var name = user.name;
	    var email = user.email;
	
	    return React.createElement(
	      Formsy.Form,
	      { onSubmit: this.handleSubmit,
	        onValid: this.enableButton,
	        onInvalid: this.disableButton },
	      React.createElement(InputField, { name: 'name',
	        title: 'Name',
	        value: name,
	        required: true }),
	      React.createElement(InputField, { name: 'email',
	        title: 'Email',
	        value: email,
	        validations: 'isEmail',
	        validationError: 'This is not a valid email',
	        required: true }),
	      React.createElement(
	        'button',
	        { type: 'submit', disabled: disabled },
	        'Test Submit'
	      )
	    );
	  }
	});
	
	module.exports = ProfileForm;

/***/ },

/***/ 63:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var Reflux = __webpack_require__(133);
	
	var UserStore = __webpack_require__(128);
	
	var ProfileDetails = React.createClass({
	  displayName: 'ProfileDetails',
	
	  mixins: [Reflux.connect(UserStore, 'user')],
	  render: function render() {
	    var user = this.state.user || {};
	    var name = user.name;
	    var email = user.email;
	
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'dt',
	        null,
	        React.createElement(
	          'span',
	          null,
	          'Name'
	        )
	      ),
	      React.createElement(
	        'dd',
	        null,
	        name
	      ),
	      React.createElement(
	        'dt',
	        null,
	        React.createElement(
	          'span',
	          null,
	          'Email'
	        )
	      ),
	      React.createElement(
	        'dd',
	        null,
	        email
	      )
	    );
	  }
	});
	
	module.exports = ProfileDetails;

/***/ },

/***/ 128:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Reflux = __webpack_require__(133);
	
	var userActions = __webpack_require__(130);
	
	var UserStore = Reflux.createStore({
	  init: function init() {
	    this.profile = { name: 'chris', email: 'chrisk@carbonfive.com' };
	    this.listenTo(userActions.profileUpdate, this.onProfileUpdate);
	  },
	
	  getInitialState: function getInitialState() {
	    return this.profile;
	  },
	
	  onProfileUpdate: function onProfileUpdate(profile) {
	    this.profile = profile;
	    this.trigger(profile);
	  }
	});
	
	module.exports = UserStore;

/***/ },

/***/ 129:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    Formsy = __webpack_require__(178);
	
	var InputField = React.createClass({
	  displayName: 'InputField',
	
	  mixins: [Formsy.Mixin],
	  getInitialState: function getInitialState() {
	    return { showErrors: false };
	  },
	  changeValue: function changeValue(event) {
	    this.setValue(event.currentTarget.value);
	  },
	  handleChange: function handleChange(event) {
	    this.setValue(event.target.value);
	  },
	  handleBlur: function handleBlur() {
	    this.setState({ showErrors: true });
	  },
	  handleFocus: function handleFocus() {
	    if (!this.isPristine() && !this.showErrors()) this.setState({ showErrors: false });
	  },
	  orEmpty: function orEmpty(str) {
	    return str ? str : '';
	  },
	  render: function render() {
	    var className = this.orEmpty(this.props.className) + ' ' + (this.showRequired() ? 'required' : this.showError() ? 'error' : null);
	    var errorMessage = this.state.showErrors ? this.getErrorMessage() : '';
	
	    return React.createElement(
	      'div',
	      { className: 'form-group' + className },
	      React.createElement(
	        'label',
	        { htmlFor: this.props.name },
	        this.props.title
	      ),
	      React.createElement('input', { type: this.props.type || 'text',
	        name: this.props.name,
	        value: this.getValue(),
	        onChange: this.handleChange,
	        onBlur: this.handleBlur,
	        onFocus: this.handleFocus }),
	      React.createElement(
	        'span',
	        { className: 'validation-error' },
	        errorMessage
	      )
	    );
	  }
	});
	
	module.exports = InputField;

/***/ },

/***/ 130:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Reflux = __webpack_require__(133);
	
	var userActions = Reflux.createActions(['profileUpdate']);
	
	module.exports = userActions;

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(180);


/***/ },

/***/ 178:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var React = global.React || __webpack_require__(1);
	var Formsy = {};
	var validationRules = __webpack_require__(198);
	var utils = __webpack_require__(199);
	var Mixin = __webpack_require__(200);
	var options = {};
	
	Formsy.Mixin = Mixin;
	
	Formsy.defaults = function (passedOptions) {
	  options = passedOptions;
	};
	
	Formsy.addValidationRule = function (name, func) {
	  validationRules[name] = func;
	};
	
	Formsy.Form = React.createClass({
	  getInitialState: function () {
	    return {
	      isValid: true,
	      isSubmitting: false,
	      canChange: false
	    };
	  },
	  getDefaultProps: function () {
	    return {
	      onSuccess: function () {},
	      onError: function () {},
	      onSubmit: function () {},
	      onValidSubmit: function () {},
	      onInvalidSubmit: function () {},
	      onSubmitted: function () {},
	      onValid: function () {},
	      onInvalid: function () {},
	      onChange: function () {},
	      validationErrors: null
	    };
	  },
	
	  // Add a map to store the inputs of the form, a model to store
	  // the values of the form and register child inputs
	  componentWillMount: function () {
	    this.inputs = {};
	    this.model = {};
	  },
	
	  componentDidMount: function () {
	    this.validateForm();
	  },
	
	  componentWillUpdate: function () {
	    var inputKeys = Object.keys(this.inputs);
	
	    // The updated children array is not available here for some reason,
	    // we need to wait for next event loop
	    setTimeout(function () {
	
	      // The component might have been unmounted on an
	      // update
	      if (this.isMounted()) {
	
	        if (this.props.validationErrors) {
	          this.setInputValidationErrors(this.props.validationErrors);
	        }
	
	        var newInputKeys = Object.keys(this.inputs);
	        if (utils.arraysDiffer(inputKeys, newInputKeys)) {
	          this.validateForm();
	        }
	
	      }
	
	    }.bind(this), 0);
	  },
	
	  // Update model, submit to url prop and send the model
	  submit: function (event) {
	
	    event && event.preventDefault();
	
	    // Trigger form as not pristine.
	    // If any inputs have not been touched yet this will make them dirty
	    // so validation becomes visible (if based on isPristine)
	    this.setFormPristine(false);
	    this.updateModel();
	    var model = this.mapModel();
	    this.props.onSubmit(model, this.resetModel, this.updateInputsWithError);
	    this.state.isValid ? this.props.onValidSubmit(model, this.resetModel, this.updateInputsWithError) : this.props.onInvalidSubmit(model, this.resetModel, this.updateInputsWithError);
	
	  },
	
	  mapModel: function () {
	    return this.props.mapping ? this.props.mapping(this.model) : this.model;
	  },
	
	  // Goes through all registered components and
	  // updates the model values
	  updateModel: function () {
	    Object.keys(this.inputs).forEach(function (name) {
	      var component = this.inputs[name];
	      this.model[name] = component.state._value;
	    }.bind(this));
	  },
	
	  // Reset each key in the model to the original / initial value
	  resetModel: function () {
	    Object.keys(this.inputs).forEach(function (name) {
	      this.inputs[name].resetValue();
	    }.bind(this));
	    this.validateForm();
	  },
	
	  setInputValidationErrors: function (errors) {
	    Object.keys(this.inputs).forEach(function (name, index) {
	      var component = this.inputs[name];
	      var args = [{
	        _isValid: !(name in errors),
	        _validationError: errors[name]
	      }];
	      component.setState.apply(component, args);
	    }.bind(this));
	  },
	
	  // Go through errors from server and grab the components
	  // stored in the inputs map. Change their state to invalid
	  // and set the serverError message
	  updateInputsWithError: function (errors) {
	    Object.keys(errors).forEach(function (name, index) {
	      var component = this.inputs[name];
	
	      if (!component) {
	        throw new Error('You are trying to update an input that does not exists. Verify errors object with input names. ' + JSON.stringify(errors));
	      }
	
	      var args = [{
	        _isValid: false,
	        _externalError: errors[name]
	      }];
	      component.setState.apply(component, args);
	    }.bind(this));
	  },
	
	  // Traverse the children and children of children to find
	  // all inputs by checking the name prop. Maybe do a better
	  // check here
	  traverseChildrenAndRegisterInputs: function (children) {
	
	    if (typeof children !== 'object' || children === null) {
	      return children;
	    }
	    return React.Children.map(children, function (child) {
	
	      if (typeof child !== 'object' || child === null) {
	        return child;
	      }
	
	      if (child.props && child.props.name) {
	
	        return React.cloneElement(child, {
	          _attachToForm: this.attachToForm,
	          _detachFromForm: this.detachFromForm,
	          _validate: this.validate,
	          _isFormDisabled: this.isFormDisabled,
	          _isValidValue: function (component, value) {
	            return this.runValidation(component, value).isValid;
	          }.bind(this)
	        }, child.props && child.props.children);
	      } else {
	        return React.cloneElement(child, {}, this.traverseChildrenAndRegisterInputs(child.props && child.props.children));
	      }
	
	    }, this);
	
	  },
	
	  isFormDisabled: function () {
	    return this.props.disabled;
	  },
	
	  getCurrentValues: function () {
	    return Object.keys(this.inputs).reduce(function (data, name) {
	      var component = this.inputs[name];
	      data[name] = component.state._value;
	      return data;
	    }.bind(this), {});
	  },
	
	  setFormPristine: function (isPristine) {
	    var inputs = this.inputs;
	    var inputKeys = Object.keys(inputs);
	
	    // Iterate through each component and set it as pristine
	    // or "dirty".
	    inputKeys.forEach(function (name, index) {
	      var component = inputs[name];
	      component.setState({
	        _isPristine: isPristine
	      });
	    }.bind(this));
	  },
	
	  // Use the binded values and the actual input value to
	  // validate the input and set its state. Then check the
	  // state of the form itself
	  validate: function (component) {
	
	    // Trigger onChange
	    if (this.state.canChange) {
	      this.props.onChange(this.getCurrentValues());
	    }
	
	    var validation = this.runValidation(component);
	    // Run through the validations, split them up and call
	    // the validator IF there is a value or it is required
	    component.setState({
	      _isValid: validation.isValid,
	      _isRequired: validation.isRequired,
	      _validationError: validation.error,
	      _externalError: null
	    }, this.validateForm);
	
	  },
	
	  // Checks validation on current value or a passed value
	  runValidation: function (component, value) {
	
	    var currentValues = this.getCurrentValues();
	    var validationErrors = component.props.validationErrors;
	    var validationError = component.props.validationError;
	    value = arguments.length === 2 ? value : component.state._value;
	
	    var validationResults = this.runRules(value, currentValues, component._validations);
	    var requiredResults = this.runRules(value, currentValues, component._requiredValidations);
	
	    // the component defines an explicit validate function
	    if (typeof component.validate === "function") {
	      validationResults.failed = component.validate() ? [] : ['failed'];
	    }
	
	    var isRequired = Object.keys(component._requiredValidations).length ? !!requiredResults.success.length : false;
	    var isValid = !validationResults.failed.length && !(this.props.validationErrors && this.props.validationErrors[component.props.name]);
	
	    return {
	      isRequired: isRequired,
	      isValid: isRequired ? false : isValid,
	      error: (function () {
	
	        if (isValid && !isRequired) {
	          return '';
	        }
	
	        if (validationResults.errors.length) {
	          return validationResults.errors[0];
	        }
	
	        if (this.props.validationErrors && this.props.validationErrors[component.props.name]) {
	          return this.props.validationErrors[component.props.name];
	        }
	
	        if (isRequired) {
	          return validationErrors[requiredResults.success[0]] || null;
	        }
	
	        if (!isValid) {
	          return validationErrors[validationResults.failed[0]] || validationError;
	        }
	
	      }.call(this))
	    };
	
	  },
	
	  runRules: function (value, currentValues, validations) {
	
	    var results = {
	      errors: [],
	      failed: [],
	      success: []
	    };
	    if (Object.keys(validations).length) {
	      Object.keys(validations).forEach(function (validationMethod) {
	
	        if (validationRules[validationMethod] && typeof validations[validationMethod] === 'function') {
	          throw new Error('Formsy does not allow you to override default validations: ' + validationMethod);
	        }
	
	        if (!validationRules[validationMethod] && typeof validations[validationMethod] !== 'function') {
	          throw new Error('Formsy does not have the validation rule: ' + validationMethod);
	        }
	
	        if (typeof validations[validationMethod] === 'function') {
	          var validation = validations[validationMethod](currentValues, value);
	          if (typeof validation === 'string') {
	            results.errors.push(validation);
	            results.failed.push(validationMethod);
	          } else if (!validation) {
	            results.failed.push(validationMethod);
	          }
	          return;
	
	        } else if (typeof validations[validationMethod] !== 'function') {
	          var validation = validationRules[validationMethod](currentValues, value, validations[validationMethod]);
	          if (typeof validation === 'string') {
	            results.errors.push(validation);
	            results.failed.push(validationMethod);
	          } else if (!validation) {
	            results.failed.push(validationMethod);
	          } else {
	            results.success.push(validationMethod);
	          }
	          return;
	
	        }
	
	        return results.success.push(validationMethod);
	
	      });
	    }
	
	    return results;
	
	  },
	
	  // Validate the form by going through all child input components
	  // and check their state
	  validateForm: function () {
	    var allIsValid = true;
	    var inputs = this.inputs;
	    var inputKeys = Object.keys(inputs);
	
	    // We need a callback as we are validating all inputs again. This will
	    // run when the last component has set its state
	    var onValidationComplete = function () {
	      inputKeys.forEach(function (name) {
	        if (!inputs[name].state._isValid) {
	          allIsValid = false;
	        }
	      }.bind(this));
	
	      this.setState({
	        isValid: allIsValid
	      });
	
	      if (allIsValid) {
	        this.props.onValid();
	      } else {
	        this.props.onInvalid();
	      }
	
	      // Tell the form that it can start to trigger change events
	      this.setState({
	        canChange: true
	      });
	
	    }.bind(this);
	
	    // Run validation again in case affected by other inputs. The
	    // last component validated will run the onValidationComplete callback
	    inputKeys.forEach(function (name, index) {
	      var component = inputs[name];
	      var validation = this.runValidation(component);
	      if (validation.isValid && component.state._externalError) {
	        validation.isValid = false;
	      }
	      component.setState({
	        _isValid: validation.isValid,
	        _isRequired: validation.isRequired,
	        _validationError: validation.error,
	        _externalError: !validation.isValid && component.state._externalError ? component.state._externalError : null
	      }, index === inputKeys.length - 1 ? onValidationComplete : null);
	    }.bind(this));
	
	    // If there are no inputs, set state where form is ready to trigger
	    // change event. New inputs might be added later
	    if (!inputKeys.length && this.isMounted()) {
	      this.setState({
	        canChange: true
	      });
	    }
	  },
	
	  // Method put on each input component to register
	  // itself to the form
	  attachToForm: function (component) {
	    this.inputs[component.props.name] = component;
	    this.model[component.props.name] = component.state._value;
	    this.validate(component);
	  },
	
	  // Method put on each input component to unregister
	  // itself from the form
	  detachFromForm: function (component) {
	    delete this.inputs[component.props.name];
	    delete this.model[component.props.name];
	  },
	  render: function () {
	
	    return React.DOM.form({
	        onSubmit: this.submit,
	        className: this.props.className 
	      },
	      this.traverseChildrenAndRegisterInputs(this.props.children)
	    );
	
	  }
	});
	
	if (!global.exports && !global.module && (!global.define || !global.define.amd)) {
	  global.Formsy = Formsy;
	}
	
	module.exports = Formsy;
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 180:
/***/ function(module, exports, __webpack_require__) {

	exports.ActionMethods = __webpack_require__(203);
	
	exports.ListenerMethods = __webpack_require__(204);
	
	exports.PublisherMethods = __webpack_require__(205);
	
	exports.StoreMethods = __webpack_require__(206);
	
	exports.createAction = __webpack_require__(207);
	
	exports.createStore = __webpack_require__(208);
	
	exports.connect = __webpack_require__(209);
	
	exports.connectFilter = __webpack_require__(210);
	
	exports.ListenerMixin = __webpack_require__(211);
	
	exports.listenTo = __webpack_require__(212);
	
	exports.listenToMany = __webpack_require__(213);
	
	
	var maker = __webpack_require__(214).staticJoinCreator;
	
	exports.joinTrailing = exports.all = maker("last"); // Reflux.all alias for backward compatibility
	
	exports.joinLeading = maker("first");
	
	exports.joinStrict = maker("strict");
	
	exports.joinConcat = maker("all");
	
	var _ = __webpack_require__(215);
	
	exports.EventEmitter = _.EventEmitter;
	
	exports.Promise = _.Promise;
	
	/**
	 * Convenience function for creating a set of actions
	 *
	 * @param definitions the definitions for the actions to be created
	 * @returns an object with actions of corresponding action names
	 */
	exports.createActions = function(definitions) {
	    var actions = {};
	    for (var k in definitions){
	        if (definitions.hasOwnProperty(k)) {
	            var val = definitions[k],
	                actionName = _.isObject(val) ? k : val;
	
	            actions[actionName] = exports.createAction(val);
	        }
	    }
	    return actions;
	};
	
	/**
	 * Sets the eventmitter that Reflux uses
	 */
	exports.setEventEmitter = function(ctx) {
	    var _ = __webpack_require__(215);
	    exports.EventEmitter = _.EventEmitter = ctx;
	};
	
	
	/**
	 * Sets the Promise library that Reflux uses
	 */
	exports.setPromise = function(ctx) {
	    var _ = __webpack_require__(215);
	    exports.Promise = _.Promise = ctx;
	};
	
	
	/**
	 * Sets the Promise factory that creates new promises
	 * @param {Function} factory has the signature `function(resolver) { return [new Promise]; }`
	 */
	exports.setPromiseFactory = function(factory) {
	    var _ = __webpack_require__(215);
	    _.createPromise = factory;
	};
	
	
	/**
	 * Sets the method used for deferring actions and stores
	 */
	exports.nextTick = function(nextTick) {
	    var _ = __webpack_require__(215);
	    _.nextTick = nextTick;
	};
	
	/**
	 * Provides the set of created actions and stores for introspection
	 */
	exports.__keep = __webpack_require__(216);
	
	/**
	 * Warn if Function.prototype.bind not available
	 */
	if (!Function.prototype.bind) {
	  console.error(
	    'Function.prototype.bind not available. ' +
	    'ES5 shim required. ' +
	    'https://github.com/spoike/refluxjs#es5'
	  );
	}


/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  isDefaultRequiredValue: function (values, value) {
	    return value === undefined || value === '';
	  },
	  hasValue: function (values, value) {
	    return !!value;
	  },
	  matchRegexp: function (values, value, regexp) {
	    return !!value && !!value.match(regexp);
	  },
	  isUndefined: function (values, value) {
	    return value === undefined;
	  },
	  isEmptyString: function (values, value) {
	    return value === '';
	  },
	  isEmail: function (values, value) {
	    return !value || value.match(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
	  },
	  isTrue: function (values, value) {
	    return value === true;
	  },
	  isFalse: function (values, value) {
	    return value === false;
	  },
	  isNumeric: function (values, value) {
	    if (!value) {
	        return false;
	    }
	    if (typeof value === 'number') {
	      return true;
	    } else {
	      var matchResults = value.match(/[-+]?(\d*[.])?\d+/);
	      if (!!matchResults) {
	        return matchResults[0] == value;
	      } else {
	        return false;
	      }
	    }
	  },
	  isAlpha: function (values, value) {
	    return value && /^[a-zA-Z]+$/.test(value);
	  },
	  isWords: function (values, value) {
	    return value && /^[a-zA-Z\s]+$/.test(value);
	  },
	  isSpecialWords: function (values, value) {
	    return !value || value.match(/^[a-zA-Z\s\u00C0-\u017F]+$/);
	  },
	  isLength: function (values, value, length) {
	    return value && value.length === length;
	  },
	  equals: function (values, value, eql) {
	    return value == eql;
	  },
	  equalsField: function (values, value, field) {
	    return value == values[field];
	  },
	  maxLength: function (values, value, length) {
	    return value && value.length && value.length <= length;
	  },
	  minLength: function (values, value, length) {
	    return value && value.length && value.length >= length;
	  }
	};


/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	module.exports = {
	  arraysDiffer: function (arrayA, arrayB) {
	    var isDifferent = false;
	    if (arrayA.length !== arrayB.length) {
	      isDifferent = true;
	    } else {
	      arrayA.forEach(function (item, index) {
	        if (item !== arrayB[index]) {
	          isDifferent = true;
	        }
	      });
	    }
	    return isDifferent;
	  }
	};


/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	var convertValidationsToObject = function (validations) {
	
	  if (typeof validations === 'string') {
	
	    return validations.split(/\,(?![^{\[]*[}\]])/g).reduce(function (validations, validation) {
	      var args = validation.split(':');
	      var validateMethod = args.shift();
	      args = args.map(function (arg) {
	        try {
	          return JSON.parse(arg);
	        } catch (e) {
	          return arg; // It is a string if it can not parse it
	        }
	      });
	      
	      if (args.length > 1) {
	        throw new Error('Formsy does not support multiple args on string validations. Use object format of validations instead.');
	      }
	      validations[validateMethod] = args.length ? args[0] : true;
	      return validations;
	    }, {});
	
	  }
	
	  return validations || {};
	
	};
	module.exports = {
	  getInitialState: function () {
	    return {
	      _value: this.props.value,
	      _isRequired: false,
	      _isValid: true,
	      _isPristine: true,
	      _pristineValue: this.props.value,
	      _validationError: '',
	      _externalError: null
	    };
	  },
	  getDefaultProps: function () {
	    return {
	      validationError: '',
	      validationErrors: {}
	    };
	  },
	  componentWillMount: function () {
	
	    var configure = function () {
	      this.setValidations(this.props.validations, this.props.required);
	      this.props._attachToForm(this);
	    }.bind(this);
	
	    if (!this.props.name) {
	      throw new Error('Form Input requires a name property when used');
	    }
	
	    if (!this.props._attachToForm) {
	      return setTimeout(function () {
	        if (!this.isMounted()) return;
	        if (!this.props._attachToForm) {
	          throw new Error('Form Mixin requires component to be nested in a Form');
	        }
	        configure();
	      }.bind(this), 0);
	    }
	    configure();
	
	  },
	
	  // We have to make the validate method is kept when new props are added
	  componentWillReceiveProps: function (nextProps) {
	    this.setValidations(nextProps.validations, nextProps.required);
	  },
	
	  componentDidUpdate: function (prevProps, prevState) {
	
	    var isValueChanged = function () {
	      
	      return this.props.value !== prevProps.value && this.state._value === prevProps.value;
	
	    }.bind(this);
	
	
	    // If validations has changed or something outside changes 
	    // the value, set the value again running a validation
	    if (isValueChanged()) {
	      this.setValue(this.props.value);
	    }
	  },
	
	  // Detach it when component unmounts
	  componentWillUnmount: function () {
	    this.props._detachFromForm(this);
	  },
	
	  setValidations: function (validations, required) {
	
	    // Add validations to the store itself as the props object can not be modified
	    this._validations = convertValidationsToObject(validations) || {};
	    this._requiredValidations = required === true ? {isDefaultRequiredValue: true} : convertValidationsToObject(required);
	
	  },
	
	  // We validate after the value has been set
	  setValue: function (value) {
	    this.setState({
	      _value: value,
	      _isPristine: false
	    }, function () {
	      this.props._validate(this);
	    }.bind(this));
	  },
	  resetValue: function () {
	    this.setState({
	      _value: this.state._pristineValue,
	      _isPristine: true
	    }, function () {
	      this.props._validate(this);
	    });
	  },
	  getValue: function () {
	    return this.state._value;
	  },
	  hasValue: function () {
	    return this.state._value !== '';
	  },
	  getErrorMessage: function () {
	    return !this.isValid() || this.showRequired() ? (this.state._externalError || this.state._validationError) : null;
	  },
	  isFormDisabled: function () {
	    return this.props._isFormDisabled();
	  },
	  isValid: function () {
	    return this.state._isValid;
	  },
	  isPristine: function () {
	    return this.state._isPristine;
	  },
	  isRequired: function () {
	    return !!this.props.required;
	  },
	  showRequired: function () {
	    return this.state._isRequired;
	  },
	  showError: function () {
	    return !this.showRequired() && !this.isValid();
	  },
	  isValidValue: function (value) {
	    return this.props._isValidValue.call(null, this, value);
	  }
	};


/***/ },

/***/ 203:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A module of methods that you want to include in all actions.
	 * This module is consumed by `createAction`.
	 */
	module.exports = {
	};


/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(215),
	    maker = __webpack_require__(214).instanceJoinCreator;
	
	/**
	 * Extract child listenables from a parent from their
	 * children property and return them in a keyed Object
	 *
	 * @param {Object} listenable The parent listenable
	 */
	var mapChildListenables = function(listenable) {
	    var i = 0, children = {}, childName;
	    for (;i < (listenable.children||[]).length; ++i) {
	        childName = listenable.children[i];
	        if(listenable[childName]){
	            children[childName] = listenable[childName];
	        }
	    }
	    return children;
	};
	
	/**
	 * Make a flat dictionary of all listenables including their
	 * possible children (recursively), concatenating names in camelCase.
	 *
	 * @param {Object} listenables The top-level listenables
	 */
	var flattenListenables = function(listenables) {
	    var flattened = {};
	    for(var key in listenables){
	        var listenable = listenables[key];
	        var childMap = mapChildListenables(listenable);
	
	        // recursively flatten children
	        var children = flattenListenables(childMap);
	
	        // add the primary listenable and chilren
	        flattened[key] = listenable;
	        for(var childKey in children){
	            var childListenable = children[childKey];
	            flattened[key + _.capitalize(childKey)] = childListenable;
	        }
	    }
	
	    return flattened;
	};
	
	/**
	 * A module of methods related to listening.
	 */
	module.exports = {
	
	    /**
	     * An internal utility function used by `validateListening`
	     *
	     * @param {Action|Store} listenable The listenable we want to search for
	     * @returns {Boolean} The result of a recursive search among `this.subscriptions`
	     */
	    hasListener: function(listenable) {
	        var i = 0, j, listener, listenables;
	        for (;i < (this.subscriptions||[]).length; ++i) {
	            listenables = [].concat(this.subscriptions[i].listenable);
	            for (j = 0; j < listenables.length; j++){
	                listener = listenables[j];
	                if (listener === listenable || listener.hasListener && listener.hasListener(listenable)) {
	                    return true;
	                }
	            }
	        }
	        return false;
	    },
	
	    /**
	     * A convenience method that listens to all listenables in the given object.
	     *
	     * @param {Object} listenables An object of listenables. Keys will be used as callback method names.
	     */
	    listenToMany: function(listenables){
	        var allListenables = flattenListenables(listenables);
	        for(var key in allListenables){
	            var cbname = _.callbackName(key),
	                localname = this[cbname] ? cbname : this[key] ? key : undefined;
	            if (localname){
	                this.listenTo(allListenables[key],localname,this[cbname+"Default"]||this[localname+"Default"]||localname);
	            }
	        }
	    },
	
	    /**
	     * Checks if the current context can listen to the supplied listenable
	     *
	     * @param {Action|Store} listenable An Action or Store that should be
	     *  listened to.
	     * @returns {String|Undefined} An error message, or undefined if there was no problem.
	     */
	    validateListening: function(listenable){
	        if (listenable === this) {
	            return "Listener is not able to listen to itself";
	        }
	        if (!_.isFunction(listenable.listen)) {
	            return listenable + " is missing a listen method";
	        }
	        if (listenable.hasListener && listenable.hasListener(this)) {
	            return "Listener cannot listen to this listenable because of circular loop";
	        }
	    },
	
	    /**
	     * Sets up a subscription to the given listenable for the context object
	     *
	     * @param {Action|Store} listenable An Action or Store that should be
	     *  listened to.
	     * @param {Function|String} callback The callback to register as event handler
	     * @param {Function|String} defaultCallback The callback to register as default handler
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is the object being listened to
	     */
	    listenTo: function(listenable, callback, defaultCallback) {
	        var desub, unsubscriber, subscriptionobj, subs = this.subscriptions = this.subscriptions || [];
	        _.throwIf(this.validateListening(listenable));
	        this.fetchInitialState(listenable, defaultCallback);
	        desub = listenable.listen(this[callback]||callback, this);
	        unsubscriber = function() {
	            var index = subs.indexOf(subscriptionobj);
	            _.throwIf(index === -1,'Tried to remove listen already gone from subscriptions list!');
	            subs.splice(index, 1);
	            desub();
	        };
	        subscriptionobj = {
	            stop: unsubscriber,
	            listenable: listenable
	        };
	        subs.push(subscriptionobj);
	        return subscriptionobj;
	    },
	
	    /**
	     * Stops listening to a single listenable
	     *
	     * @param {Action|Store} listenable The action or store we no longer want to listen to
	     * @returns {Boolean} True if a subscription was found and removed, otherwise false.
	     */
	    stopListeningTo: function(listenable){
	        var sub, i = 0, subs = this.subscriptions || [];
	        for(;i < subs.length; i++){
	            sub = subs[i];
	            if (sub.listenable === listenable){
	                sub.stop();
	                _.throwIf(subs.indexOf(sub)!==-1,'Failed to remove listen from subscriptions list!');
	                return true;
	            }
	        }
	        return false;
	    },
	
	    /**
	     * Stops all subscriptions and empties subscriptions array
	     */
	    stopListeningToAll: function(){
	        var remaining, subs = this.subscriptions || [];
	        while((remaining=subs.length)){
	            subs[0].stop();
	            _.throwIf(subs.length!==remaining-1,'Failed to remove listen from subscriptions list!');
	        }
	    },
	
	    /**
	     * Used in `listenTo`. Fetches initial data from a publisher if it has a `getInitialState` method.
	     * @param {Action|Store} listenable The publisher we want to get initial state from
	     * @param {Function|String} defaultCallback The method to receive the data
	     */
	    fetchInitialState: function (listenable, defaultCallback) {
	        defaultCallback = (defaultCallback && this[defaultCallback]) || defaultCallback;
	        var me = this;
	        if (_.isFunction(defaultCallback) && _.isFunction(listenable.getInitialState)) {
	            var data = listenable.getInitialState();
	            if (data && _.isFunction(data.then)) {
	                data.then(function() {
	                    defaultCallback.apply(me, arguments);
	                });
	            } else {
	                defaultCallback.call(this, data);
	            }
	        }
	    },
	
	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with the last emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinTrailing: maker("last"),
	
	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with the first emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinLeading: maker("first"),
	
	    /**
	     * The callback will be called once all listenables have triggered at least once.
	     * It will be invoked with all emission from each listenable.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinConcat: maker("all"),
	
	    /**
	     * The callback will be called once all listenables have triggered.
	     * If a callback triggers twice before that happens, an error is thrown.
	     * @param {...Publishers} publishers Publishers that should be tracked.
	     * @param {Function|String} callback The method to call when all publishers have emitted
	     * @returns {Object} A subscription obj where `stop` is an unsub function and `listenable` is an array of listenables
	     */
	    joinStrict: maker("strict")
	};


/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(215);
	
	/**
	 * A module of methods for object that you want to be able to listen to.
	 * This module is consumed by `createStore` and `createAction`
	 */
	module.exports = {
	
	    /**
	     * Hook used by the publisher that is invoked before emitting
	     * and before `shouldEmit`. The arguments are the ones that the action
	     * is invoked with. If this function returns something other than
	     * undefined, that will be passed on as arguments for shouldEmit and
	     * emission.
	     */
	    preEmit: function() {},
	
	    /**
	     * Hook used by the publisher after `preEmit` to determine if the
	     * event should be emitted with given arguments. This may be overridden
	     * in your application, default implementation always returns true.
	     *
	     * @returns {Boolean} true if event should be emitted
	     */
	    shouldEmit: function() { return true; },
	
	    /**
	     * Subscribes the given callback for action triggered
	     *
	     * @param {Function} callback The callback to register as event handler
	     * @param {Mixed} [optional] bindContext The context to bind the callback with
	     * @returns {Function} Callback that unsubscribes the registered event handler
	     */
	    listen: function(callback, bindContext) {
	        bindContext = bindContext || this;
	        var eventHandler = function(args) {
	            if (aborted){
	                return;
	            }
	            callback.apply(bindContext, args);
	        }, me = this, aborted = false;
	        this.emitter.addListener(this.eventLabel, eventHandler);
	        return function() {
	            aborted = true;
	            me.emitter.removeListener(me.eventLabel, eventHandler);
	        };
	    },
	
	    /**
	     * Attach handlers to promise that trigger the completed and failed
	     * child publishers, if available.
	     *
	     * @param {Object} The promise to attach to
	     */
	    promise: function(promise) {
	        var me = this;
	
	        var canHandlePromise =
	            this.children.indexOf('completed') >= 0 &&
	            this.children.indexOf('failed') >= 0;
	
	        if (!canHandlePromise){
	            throw new Error('Publisher must have "completed" and "failed" child publishers');
	        }
	
	        promise.then(function(response) {
	            return me.completed(response);
	        }, function(error) {
	            return me.failed(error);
	        });
	    },
	
	    /**
	     * Subscribes the given callback for action triggered, which should
	     * return a promise that in turn is passed to `this.promise`
	     *
	     * @param {Function} callback The callback to register as event handler
	     */
	    listenAndPromise: function(callback, bindContext) {
	        var me = this;
	        bindContext = bindContext || this;
	        this.willCallPromise = (this.willCallPromise || 0) + 1;
	
	        var removeListen = this.listen(function() {
	
	            if (!callback) {
	                throw new Error('Expected a function returning a promise but got ' + callback);
	            }
	
	            var args = arguments,
	                promise = callback.apply(bindContext, args);
	            return me.promise.call(me, promise);
	        }, bindContext);
	
	        return function () {
	          me.willCallPromise--;
	          removeListen.call(me);
	        };
	
	    },
	
	    /**
	     * Publishes an event using `this.emitter` (if `shouldEmit` agrees)
	     */
	    trigger: function() {
	        var args = arguments,
	            pre = this.preEmit.apply(this, args);
	        args = pre === undefined ? args : _.isArguments(pre) ? pre : [].concat(pre);
	        if (this.shouldEmit.apply(this, args)) {
	            this.emitter.emit(this.eventLabel, args);
	        }
	    },
	
	    /**
	     * Tries to publish the event on the next tick
	     */
	    triggerAsync: function(){
	        var args = arguments,me = this;
	        _.nextTick(function() {
	            me.trigger.apply(me, args);
	        });
	    },
	
	    /**
	     * Returns a Promise for the triggered action
	     *
	     * @return {Promise}
	     *   Resolved by completed child action.
	     *   Rejected by failed child action.
	     *   If listenAndPromise'd, then promise associated to this trigger.
	     *   Otherwise, the promise is for next child action completion.
	     */
	    triggerPromise: function(){
	        var me = this;
	        var args = arguments;
	
	        var canHandlePromise =
	            this.children.indexOf('completed') >= 0 &&
	            this.children.indexOf('failed') >= 0;
	
	        var promise = _.createPromise(function(resolve, reject) {
	            // If `listenAndPromise` is listening
	            // patch `promise` w/ context-loaded resolve/reject
	            if (me.willCallPromise) {
	                _.nextTick(function() {
	                    var old_promise_method = me.promise;
	                    me.promise = function (promise) {
	                        promise.then(resolve, reject);
	                        // Back to your regularly schedule programming.
	                        me.promise = old_promise_method;
	                        return me.promise.apply(me, arguments);
	                    };
	                    me.trigger.apply(me, args);
	                });
	                return;
	            }
	
	            if (canHandlePromise) {
	                var removeSuccess = me.completed.listen(function(args) {
	                    removeSuccess();
	                    removeFailed();
	                    resolve(args);
	                });
	
	                var removeFailed = me.failed.listen(function(args) {
	                    removeSuccess();
	                    removeFailed();
	                    reject(args);
	                });
	            }
	
	            me.triggerAsync.apply(me, args);
	
	            if (!canHandlePromise) {
	                resolve();
	            }
	        });
	
	        return promise;
	    }
	};


/***/ },

/***/ 206:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * A module of methods that you want to include in all stores.
	 * This module is consumed by `createStore`.
	 */
	module.exports = {
	};


/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(215),
	    Reflux = __webpack_require__(180),
	    Keep = __webpack_require__(216),
	    allowed = {preEmit:1,shouldEmit:1};
	
	/**
	 * Creates an action functor object. It is mixed in with functions
	 * from the `PublisherMethods` mixin. `preEmit` and `shouldEmit` may
	 * be overridden in the definition object.
	 *
	 * @param {Object} definition The action object definition
	 */
	var createAction = function(definition) {
	
	    definition = definition || {};
	    if (!_.isObject(definition)){
	        definition = {actionName: definition};
	    }
	
	    for(var a in Reflux.ActionMethods){
	        if (!allowed[a] && Reflux.PublisherMethods[a]) {
	            throw new Error("Cannot override API method " + a +
	                " in Reflux.ActionMethods. Use another method name or override it on Reflux.PublisherMethods instead."
	            );
	        }
	    }
	
	    for(var d in definition){
	        if (!allowed[d] && Reflux.PublisherMethods[d]) {
	            throw new Error("Cannot override API method " + d +
	                " in action creation. Use another method name or override it on Reflux.PublisherMethods instead."
	            );
	        }
	    }
	
	    definition.children = definition.children || [];
	    if (definition.asyncResult){
	        definition.children = definition.children.concat(["completed","failed"]);
	    }
	
	    var i = 0, childActions = {};
	    for (; i < definition.children.length; i++) {
	        var name = definition.children[i];
	        childActions[name] = createAction(name);
	    }
	
	    var context = _.extend({
	        eventLabel: "action",
	        emitter: new _.EventEmitter(),
	        _isAction: true
	    }, Reflux.PublisherMethods, Reflux.ActionMethods, definition);
	
	    var functor = function() {
	        return functor[functor.sync?"trigger":"triggerPromise"].apply(functor, arguments);
	    };
	
	    _.extend(functor,childActions,context);
	
	    Keep.createdActions.push(functor);
	
	    return functor;
	
	};
	
	module.exports = createAction;


/***/ },

/***/ 208:
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(215),
	    Reflux = __webpack_require__(180),
	    Keep = __webpack_require__(216),
	    mixer = __webpack_require__(224),
	    allowed = {preEmit:1,shouldEmit:1},
	    bindMethods = __webpack_require__(225);
	
	/**
	 * Creates an event emitting Data Store. It is mixed in with functions
	 * from the `ListenerMethods` and `PublisherMethods` mixins. `preEmit`
	 * and `shouldEmit` may be overridden in the definition object.
	 *
	 * @param {Object} definition The data store object definition
	 * @returns {Store} A data store instance
	 */
	module.exports = function(definition) {
	
	    definition = definition || {};
	
	    for(var a in Reflux.StoreMethods){
	        if (!allowed[a] && (Reflux.PublisherMethods[a] || Reflux.ListenerMethods[a])){
	            throw new Error("Cannot override API method " + a +
	                " in Reflux.StoreMethods. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
	            );
	        }
	    }
	
	    for(var d in definition){
	        if (!allowed[d] && (Reflux.PublisherMethods[d] || Reflux.ListenerMethods[d])){
	            throw new Error("Cannot override API method " + d +
	                " in store creation. Use another method name or override it on Reflux.PublisherMethods / Reflux.ListenerMethods instead."
	            );
	        }
	    }
	
	    definition = mixer(definition);
	
	    function Store() {
	        var i=0, arr;
	        this.subscriptions = [];
	        this.emitter = new _.EventEmitter();
	        this.eventLabel = "change";
	        bindMethods(this, definition);
	        if (this.init && _.isFunction(this.init)) {
	            this.init();
	        }
	        if (this.listenables){
	            arr = [].concat(this.listenables);
	            for(;i < arr.length;i++){
	                this.listenToMany(arr[i]);
	            }
	        }
	    }
	
	    _.extend(Store.prototype, Reflux.ListenerMethods, Reflux.PublisherMethods, Reflux.StoreMethods, definition);
	
	    var store = new Store();
	    Keep.createdStores.push(store);
	
	    return store;
	};


/***/ },

/***/ 209:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(180),
	    _ = __webpack_require__(215);
	
	module.exports = function(listenable,key){
	    return {
	        getInitialState: function(){
	            if (!_.isFunction(listenable.getInitialState)) {
	                return {};
	            } else if (key === undefined) {
	                return listenable.getInitialState();
	            } else {
	                return _.object([key],[listenable.getInitialState()]);
	            }
	        },
	        componentDidMount: function(){
	            _.extend(this,Reflux.ListenerMethods);
	            var me = this, cb = (key === undefined ? this.setState : function(v){me.setState(_.object([key],[v]));});
	            this.listenTo(listenable,cb);
	        },
	        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
	    };
	};


/***/ },

/***/ 210:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(180),
	  _ = __webpack_require__(215);
	
	module.exports = function(listenable, key, filterFunc) {
	    filterFunc = _.isFunction(key) ? key : filterFunc;
	    return {
	        getInitialState: function() {
	            if (!_.isFunction(listenable.getInitialState)) {
	                return {};
	            } else if (_.isFunction(key)) {
	                return filterFunc.call(this, listenable.getInitialState());
	            } else {
	                // Filter initial payload from store.
	                var result = filterFunc.call(this, listenable.getInitialState());
	                if (result) {
	                  return _.object([key], [result]);
	                } else {
	                  return {};
	                }
	            }
	        },
	        componentDidMount: function() {
	            _.extend(this, Reflux.ListenerMethods);
	            var me = this;
	            var cb = function(value) {
	                if (_.isFunction(key)) {
	                    me.setState(filterFunc.call(me, value));
	                } else {
	                    var result = filterFunc.call(me, value);
	                    me.setState(_.object([key], [result]));
	                }
	            };
	
	            this.listenTo(listenable, cb);
	        },
	        componentWillUnmount: Reflux.ListenerMixin.componentWillUnmount
	    };
	};
	


/***/ },

/***/ 211:
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(215),
	    ListenerMethods = __webpack_require__(204);
	
	/**
	 * A module meant to be consumed as a mixin by a React component. Supplies the methods from
	 * `ListenerMethods` mixin and takes care of teardown of subscriptions.
	 * Note that if you're using the `connect` mixin you don't need this mixin, as connect will
	 * import everything this mixin contains!
	 */
	module.exports = _.extend({
	
	    /**
	     * Cleans up all listener previously registered.
	     */
	    componentWillUnmount: ListenerMethods.stopListeningToAll
	
	}, ListenerMethods);


/***/ },

/***/ 212:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(180);
	
	
	/**
	 * A mixin factory for a React component. Meant as a more convenient way of using the `ListenerMixin`,
	 * without having to manually set listeners in the `componentDidMount` method.
	 *
	 * @param {Action|Store} listenable An Action or Store that should be
	 *  listened to.
	 * @param {Function|String} callback The callback to register as event handler
	 * @param {Function|String} defaultCallback The callback to register as default handler
	 * @returns {Object} An object to be used as a mixin, which sets up the listener for the given listenable.
	 */
	module.exports = function(listenable,callback,initial){
	    return {
	        /**
	         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
	         * and then make the call to `listenTo` with the arguments provided to the factory function
	         */
	        componentDidMount: function() {
	            for(var m in Reflux.ListenerMethods){
	                if (this[m] !== Reflux.ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenTo!";
	                    }
	                    this[m] = Reflux.ListenerMethods[m];
	                }
	            }
	            this.listenTo(listenable,callback,initial);
	        },
	        /**
	         * Cleans up all listener previously registered.
	         */
	        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
	    };
	};


/***/ },

/***/ 213:
/***/ function(module, exports, __webpack_require__) {

	var Reflux = __webpack_require__(180);
	
	/**
	 * A mixin factory for a React component. Meant as a more convenient way of using the `listenerMixin`,
	 * without having to manually set listeners in the `componentDidMount` method. This version is used
	 * to automatically set up a `listenToMany` call.
	 *
	 * @param {Object} listenables An object of listenables
	 * @returns {Object} An object to be used as a mixin, which sets up the listeners for the given listenables.
	 */
	module.exports = function(listenables){
	    return {
	        /**
	         * Set up the mixin before the initial rendering occurs. Import methods from `ListenerMethods`
	         * and then make the call to `listenTo` with the arguments provided to the factory function
	         */
	        componentDidMount: function() {
	            for(var m in Reflux.ListenerMethods){
	                if (this[m] !== Reflux.ListenerMethods[m]){
	                    if (this[m]){
	                        throw "Can't have other property '"+m+"' when using Reflux.listenToMany!";
	                    }
	                    this[m] = Reflux.ListenerMethods[m];
	                }
	            }
	            this.listenToMany(listenables);
	        },
	        /**
	         * Cleans up all listener previously registered.
	         */
	        componentWillUnmount: Reflux.ListenerMethods.stopListeningToAll
	    };
	};


/***/ },

/***/ 214:
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Internal module used to create static and instance join methods
	 */
	
	var slice = Array.prototype.slice,
	    _ = __webpack_require__(215),
	    createStore = __webpack_require__(208),
	    strategyMethodNames = {
	        strict: "joinStrict",
	        first: "joinLeading",
	        last: "joinTrailing",
	        all: "joinConcat"
	    };
	
	/**
	 * Used in `index.js` to create the static join methods
	 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
	 * @returns {Function} A static function which returns a store with a join listen on the given listenables using the given strategy
	 */
	exports.staticJoinCreator = function(strategy){
	    return function(/* listenables... */) {
	        var listenables = slice.call(arguments);
	        return createStore({
	            init: function(){
	                this[strategyMethodNames[strategy]].apply(this,listenables.concat("triggerAsync"));
	            }
	        });
	    };
	};
	
	/**
	 * Used in `ListenerMethods.js` to create the instance join methods
	 * @param {String} strategy Which strategy to use when tracking listenable trigger arguments
	 * @returns {Function} An instance method which sets up a join listen on the given listenables using the given strategy
	 */
	exports.instanceJoinCreator = function(strategy){
	    return function(/* listenables..., callback*/){
	        _.throwIf(arguments.length < 3,'Cannot create a join with less than 2 listenables!');
	        var listenables = slice.call(arguments),
	            callback = listenables.pop(),
	            numberOfListenables = listenables.length,
	            join = {
	                numberOfListenables: numberOfListenables,
	                callback: this[callback]||callback,
	                listener: this,
	                strategy: strategy
	            }, i, cancels = [], subobj;
	        for (i = 0; i < numberOfListenables; i++) {
	            _.throwIf(this.validateListening(listenables[i]));
	        }
	        for (i = 0; i < numberOfListenables; i++) {
	            cancels.push(listenables[i].listen(newListener(i,join),this));
	        }
	        reset(join);
	        subobj = {listenable: listenables};
	        subobj.stop = makeStopper(subobj,cancels,this);
	        this.subscriptions = (this.subscriptions || []).concat(subobj);
	        return subobj;
	    };
	};
	
	// ---- internal join functions ----
	
	function makeStopper(subobj,cancels,context){
	    return function() {
	        var i, subs = context.subscriptions,
	            index = (subs ? subs.indexOf(subobj) : -1);
	        _.throwIf(index === -1,'Tried to remove join already gone from subscriptions list!');
	        for(i=0;i < cancels.length; i++){
	            cancels[i]();
	        }
	        subs.splice(index, 1);
	    };
	}
	
	function reset(join) {
	    join.listenablesEmitted = new Array(join.numberOfListenables);
	    join.args = new Array(join.numberOfListenables);
	}
	
	function newListener(i,join) {
	    return function() {
	        var callargs = slice.call(arguments);
	        if (join.listenablesEmitted[i]){
	            switch(join.strategy){
	                case "strict": throw new Error("Strict join failed because listener triggered twice.");
	                case "last": join.args[i] = callargs; break;
	                case "all": join.args[i].push(callargs);
	            }
	        } else {
	            join.listenablesEmitted[i] = true;
	            join.args[i] = (join.strategy==="all"?[callargs]:callargs);
	        }
	        emitIfAllListenablesEmitted(join);
	    };
	}
	
	function emitIfAllListenablesEmitted(join) {
	    for (var i = 0; i < join.numberOfListenables; i++) {
	        if (!join.listenablesEmitted[i]) {
	            return;
	        }
	    }
	    join.callback.apply(join.listener,join.args);
	    reset(join);
	}


/***/ },

/***/ 215:
/***/ function(module, exports, __webpack_require__) {

	/*
	 * isObject, extend, isFunction, isArguments are taken from undescore/lodash in
	 * order to remove the dependency
	 */
	var isObject = exports.isObject = function(obj) {
	    var type = typeof obj;
	    return type === 'function' || type === 'object' && !!obj;
	};
	
	exports.extend = function(obj) {
	    if (!isObject(obj)) {
	        return obj;
	    }
	    var source, prop;
	    for (var i = 1, length = arguments.length; i < length; i++) {
	        source = arguments[i];
	        for (prop in source) {
	            if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
	                var propertyDescriptor = Object.getOwnPropertyDescriptor(source, prop);
	                Object.defineProperty(obj, prop, propertyDescriptor);
	            } else {
	                obj[prop] = source[prop];
	            }
	        }
	    }
	    return obj;
	};
	
	exports.isFunction = function(value) {
	    return typeof value === 'function';
	};
	
	exports.EventEmitter = __webpack_require__(227);
	
	exports.nextTick = function(callback) {
	    setTimeout(callback, 0);
	};
	
	exports.capitalize = function(string){
	    return string.charAt(0).toUpperCase()+string.slice(1);
	};
	
	exports.callbackName = function(string){
	    return "on"+exports.capitalize(string);
	};
	
	exports.object = function(keys,vals){
	    var o={}, i=0;
	    for(;i<keys.length;i++){
	        o[keys[i]] = vals[i];
	    }
	    return o;
	};
	
	exports.Promise = __webpack_require__(228);
	
	exports.createPromise = function(resolver) {
	    return new exports.Promise(resolver);
	};
	
	exports.isArguments = function(value) {
	    return typeof value === 'object' && ('callee' in value) && typeof value.length === 'number';
	};
	
	exports.throwIf = function(val,msg){
	    if (val){
	        throw Error(msg||val);
	    }
	};


/***/ },

/***/ 216:
/***/ function(module, exports, __webpack_require__) {

	exports.createdStores = [];
	
	exports.createdActions = [];
	
	exports.reset = function() {
	    while(exports.createdStores.length) {
	        exports.createdStores.pop();
	    }
	    while(exports.createdActions.length) {
	        exports.createdActions.pop();
	    }
	};


/***/ },

/***/ 224:
/***/ function(module, exports, __webpack_require__) {

	var _ = __webpack_require__(215);
	
	module.exports = function mix(def) {
	    var composed = {
	        init: [],
	        preEmit: [],
	        shouldEmit: []
	    };
	
	    var updated = (function mixDef(mixin) {
	        var mixed = {};
	        if (mixin.mixins) {
	            mixin.mixins.forEach(function (subMixin) {
	                _.extend(mixed, mixDef(subMixin));
	            });
	        }
	        _.extend(mixed, mixin);
	        Object.keys(composed).forEach(function (composable) {
	            if (mixin.hasOwnProperty(composable)) {
	                composed[composable].push(mixin[composable]);
	            }
	        });
	        return mixed;
	    }(def));
	
	    if (composed.init.length > 1) {
	        updated.init = function () {
	            var args = arguments;
	            composed.init.forEach(function (init) {
	                init.apply(this, args);
	            }, this);
	        };
	    }
	    if (composed.preEmit.length > 1) {
	        updated.preEmit = function () {
	            return composed.preEmit.reduce(function (args, preEmit) {
	                var newValue = preEmit.apply(this, args);
	                return newValue === undefined ? args : [newValue];
	            }.bind(this), arguments);
	        };
	    }
	    if (composed.shouldEmit.length > 1) {
	        updated.shouldEmit = function () {
	            var args = arguments;
	            return !composed.shouldEmit.some(function (shouldEmit) {
	                return !shouldEmit.apply(this, args);
	            }, this);
	        };
	    }
	    Object.keys(composed).forEach(function (composable) {
	        if (composed[composable].length === 1) {
	            updated[composable] = composed[composable][0];
	        }
	    });
	
	    return updated;
	};


/***/ },

/***/ 225:
/***/ function(module, exports, __webpack_require__) {

	module.exports = function(store, definition) {
	  for (var name in definition) {
	    if (Object.getOwnPropertyDescriptor && Object.defineProperty) {
	        var propertyDescriptor = Object.getOwnPropertyDescriptor(definition, name);
	
	        if (!propertyDescriptor.value || typeof propertyDescriptor.value !== 'function' || !definition.hasOwnProperty(name)) {
	            continue;
	        }
	
	        store[name] = definition[name].bind(store);
	    } else {
	        var property = definition[name];
	
	        if (typeof property !== 'function' || !definition.hasOwnProperty(name)) {
	            continue;
	        }
	
	        store[name] = property.bind(store);
	    }
	  }
	
	  return store;
	};


/***/ },

/***/ 227:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Representation of a single EventEmitter function.
	 *
	 * @param {Function} fn Event handler to be called.
	 * @param {Mixed} context Context for function execution.
	 * @param {Boolean} once Only emit once
	 * @api private
	 */
	function EE(fn, context, once) {
	  this.fn = fn;
	  this.context = context;
	  this.once = once || false;
	}
	
	/**
	 * Minimal EventEmitter interface that is molded against the Node.js
	 * EventEmitter interface.
	 *
	 * @constructor
	 * @api public
	 */
	function EventEmitter() { /* Nothing to set */ }
	
	/**
	 * Holds the assigned EventEmitters by name.
	 *
	 * @type {Object}
	 * @private
	 */
	EventEmitter.prototype._events = undefined;
	
	/**
	 * Return a list of assigned event listeners.
	 *
	 * @param {String} event The events that should be listed.
	 * @returns {Array}
	 * @api public
	 */
	EventEmitter.prototype.listeners = function listeners(event) {
	  if (!this._events || !this._events[event]) return [];
	  if (this._events[event].fn) return [this._events[event].fn];
	
	  for (var i = 0, l = this._events[event].length, ee = new Array(l); i < l; i++) {
	    ee[i] = this._events[event][i].fn;
	  }
	
	  return ee;
	};
	
	/**
	 * Emit an event to all registered event listeners.
	 *
	 * @param {String} event The name of the event.
	 * @returns {Boolean} Indication if we've emitted an event.
	 * @api public
	 */
	EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
	  if (!this._events || !this._events[event]) return false;
	
	  var listeners = this._events[event]
	    , len = arguments.length
	    , args
	    , i;
	
	  if ('function' === typeof listeners.fn) {
	    if (listeners.once) this.removeListener(event, listeners.fn, true);
	
	    switch (len) {
	      case 1: return listeners.fn.call(listeners.context), true;
	      case 2: return listeners.fn.call(listeners.context, a1), true;
	      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
	      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
	      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
	      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
	    }
	
	    for (i = 1, args = new Array(len -1); i < len; i++) {
	      args[i - 1] = arguments[i];
	    }
	
	    listeners.fn.apply(listeners.context, args);
	  } else {
	    var length = listeners.length
	      , j;
	
	    for (i = 0; i < length; i++) {
	      if (listeners[i].once) this.removeListener(event, listeners[i].fn, true);
	
	      switch (len) {
	        case 1: listeners[i].fn.call(listeners[i].context); break;
	        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
	        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
	        default:
	          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
	            args[j - 1] = arguments[j];
	          }
	
	          listeners[i].fn.apply(listeners[i].context, args);
	      }
	    }
	  }
	
	  return true;
	};
	
	/**
	 * Register a new EventListener for the given event.
	 *
	 * @param {String} event Name of the event.
	 * @param {Functon} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.on = function on(event, fn, context) {
	  var listener = new EE(fn, context || this);
	
	  if (!this._events) this._events = {};
	  if (!this._events[event]) this._events[event] = listener;
	  else {
	    if (!this._events[event].fn) this._events[event].push(listener);
	    else this._events[event] = [
	      this._events[event], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Add an EventListener that's only called once.
	 *
	 * @param {String} event Name of the event.
	 * @param {Function} fn Callback function.
	 * @param {Mixed} context The context of the function.
	 * @api public
	 */
	EventEmitter.prototype.once = function once(event, fn, context) {
	  var listener = new EE(fn, context || this, true);
	
	  if (!this._events) this._events = {};
	  if (!this._events[event]) this._events[event] = listener;
	  else {
	    if (!this._events[event].fn) this._events[event].push(listener);
	    else this._events[event] = [
	      this._events[event], listener
	    ];
	  }
	
	  return this;
	};
	
	/**
	 * Remove event listeners.
	 *
	 * @param {String} event The event we want to remove.
	 * @param {Function} fn The listener that we need to find.
	 * @param {Boolean} once Only remove once listeners.
	 * @api public
	 */
	EventEmitter.prototype.removeListener = function removeListener(event, fn, once) {
	  if (!this._events || !this._events[event]) return this;
	
	  var listeners = this._events[event]
	    , events = [];
	
	  if (fn) {
	    if (listeners.fn && (listeners.fn !== fn || (once && !listeners.once))) {
	      events.push(listeners);
	    }
	    if (!listeners.fn) for (var i = 0, length = listeners.length; i < length; i++) {
	      if (listeners[i].fn !== fn || (once && !listeners[i].once)) {
	        events.push(listeners[i]);
	      }
	    }
	  }
	
	  //
	  // Reset the array, or remove it completely if we have no more listeners.
	  //
	  if (events.length) {
	    this._events[event] = events.length === 1 ? events[0] : events;
	  } else {
	    delete this._events[event];
	  }
	
	  return this;
	};
	
	/**
	 * Remove all listeners or only the listeners for the specified event.
	 *
	 * @param {String} event The event want to remove all listeners for.
	 * @api public
	 */
	EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
	  if (!this._events) return this;
	
	  if (event) delete this._events[event];
	  else this._events = {};
	
	  return this;
	};
	
	//
	// Alias methods names because people roll like that.
	//
	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
	EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	//
	// This function doesn't apply anymore.
	//
	EventEmitter.prototype.setMaxListeners = function setMaxListeners() {
	  return this;
	};
	
	//
	// Expose the module.
	//
	EventEmitter.EventEmitter = EventEmitter;
	EventEmitter.EventEmitter2 = EventEmitter;
	EventEmitter.EventEmitter3 = EventEmitter;
	
	//
	// Expose the module.
	//
	module.exports = EventEmitter;


/***/ },

/***/ 228:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(global, setImmediate) {/*! Native Promise Only
	    v0.7.6-a (c) Kyle Simpson
	    MIT License: http://getify.mit-license.org
	*/
	!function(t,n,e){n[t]=n[t]||e(),"undefined"!=typeof module&&module.exports?module.exports=n[t]:"function"=="function"&&__webpack_require__(231)&&!(__WEBPACK_AMD_DEFINE_RESULT__ = function(){return n[t]}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))}("Promise","undefined"!=typeof global?global:this,function(){"use strict";function t(t,n){l.add(t,n),h||(h=y(l.drain))}function n(t){var n,e=typeof t;return null==t||"object"!=e&&"function"!=e||(n=t.then),"function"==typeof n?n:!1}function e(){for(var t=0;t<this.chain.length;t++)o(this,1===this.state?this.chain[t].success:this.chain[t].failure,this.chain[t]);this.chain.length=0}function o(t,e,o){var r,i;try{e===!1?o.reject(t.msg):(r=e===!0?t.msg:e.call(void 0,t.msg),r===o.promise?o.reject(TypeError("Promise-chain cycle")):(i=n(r))?i.call(r,o.resolve,o.reject):o.resolve(r))}catch(c){o.reject(c)}}function r(o){var c,u,a=this;if(!a.triggered){a.triggered=!0,a.def&&(a=a.def);try{(c=n(o))?(u=new f(a),c.call(o,function(){r.apply(u,arguments)},function(){i.apply(u,arguments)})):(a.msg=o,a.state=1,a.chain.length>0&&t(e,a))}catch(s){i.call(u||new f(a),s)}}}function i(n){var o=this;o.triggered||(o.triggered=!0,o.def&&(o=o.def),o.msg=n,o.state=2,o.chain.length>0&&t(e,o))}function c(t,n,e,o){for(var r=0;r<n.length;r++)!function(r){t.resolve(n[r]).then(function(t){e(r,t)},o)}(r)}function f(t){this.def=t,this.triggered=!1}function u(t){this.promise=t,this.state=0,this.triggered=!1,this.chain=[],this.msg=void 0}function a(n){if("function"!=typeof n)throw TypeError("Not a function");if(0!==this.__NPO__)throw TypeError("Not a promise");this.__NPO__=1;var o=new u(this);this.then=function(n,r){var i={success:"function"==typeof n?n:!0,failure:"function"==typeof r?r:!1};return i.promise=new this.constructor(function(t,n){if("function"!=typeof t||"function"!=typeof n)throw TypeError("Not a function");i.resolve=t,i.reject=n}),o.chain.push(i),0!==o.state&&t(e,o),i.promise},this["catch"]=function(t){return this.then(void 0,t)};try{n.call(void 0,function(t){r.call(o,t)},function(t){i.call(o,t)})}catch(c){i.call(o,c)}}var s,h,l,p=Object.prototype.toString,y="undefined"!=typeof setImmediate?function(t){return setImmediate(t)}:setTimeout;try{Object.defineProperty({},"x",{}),s=function(t,n,e,o){return Object.defineProperty(t,n,{value:e,writable:!0,configurable:o!==!1})}}catch(d){s=function(t,n,e){return t[n]=e,t}}l=function(){function t(t,n){this.fn=t,this.self=n,this.next=void 0}var n,e,o;return{add:function(r,i){o=new t(r,i),e?e.next=o:n=o,e=o,o=void 0},drain:function(){var t=n;for(n=e=h=void 0;t;)t.fn.call(t.self),t=t.next}}}();var g=s({},"constructor",a,!1);return s(a,"prototype",g,!1),s(g,"__NPO__",0,!1),s(a,"resolve",function(t){var n=this;return t&&"object"==typeof t&&1===t.__NPO__?t:new n(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");n(t)})}),s(a,"reject",function(t){return new this(function(n,e){if("function"!=typeof n||"function"!=typeof e)throw TypeError("Not a function");e(t)})}),s(a,"all",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):0===t.length?n.resolve([]):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");var r=t.length,i=Array(r),f=0;c(n,t,function(t,n){i[t]=n,++f===r&&e(i)},o)})}),s(a,"race",function(t){var n=this;return"[object Array]"!=p.call(t)?n.reject(TypeError("Not an array")):new n(function(e,o){if("function"!=typeof e||"function"!=typeof o)throw TypeError("Not a function");c(n,t,function(t,n){e(n)},o)})}),a});
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }()), __webpack_require__(230).setImmediate))

/***/ },

/***/ 230:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(setImmediate, clearImmediate) {var nextTick = __webpack_require__(64).nextTick;
	var apply = Function.prototype.apply;
	var slice = Array.prototype.slice;
	var immediateIds = {};
	var nextImmediateId = 0;
	
	// DOM APIs, for completeness
	
	exports.setTimeout = function() {
	  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
	};
	exports.setInterval = function() {
	  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
	};
	exports.clearTimeout =
	exports.clearInterval = function(timeout) { timeout.close(); };
	
	function Timeout(id, clearFn) {
	  this._id = id;
	  this._clearFn = clearFn;
	}
	Timeout.prototype.unref = Timeout.prototype.ref = function() {};
	Timeout.prototype.close = function() {
	  this._clearFn.call(window, this._id);
	};
	
	// Does not start the time, just sets up the members needed.
	exports.enroll = function(item, msecs) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = msecs;
	};
	
	exports.unenroll = function(item) {
	  clearTimeout(item._idleTimeoutId);
	  item._idleTimeout = -1;
	};
	
	exports._unrefActive = exports.active = function(item) {
	  clearTimeout(item._idleTimeoutId);
	
	  var msecs = item._idleTimeout;
	  if (msecs >= 0) {
	    item._idleTimeoutId = setTimeout(function onTimeout() {
	      if (item._onTimeout)
	        item._onTimeout();
	    }, msecs);
	  }
	};
	
	// That's not how node.js implements it but the exposed api is the same.
	exports.setImmediate = typeof setImmediate === "function" ? setImmediate : function(fn) {
	  var id = nextImmediateId++;
	  var args = arguments.length < 2 ? false : slice.call(arguments, 1);
	
	  immediateIds[id] = true;
	
	  nextTick(function onNextTick() {
	    if (immediateIds[id]) {
	      // fn.call() is faster so we optimize for the common use-case
	      // @see http://jsperf.com/call-apply-segu
	      if (args) {
	        fn.apply(null, args);
	      } else {
	        fn.call(null);
	      }
	      // Prevent ids from leaking
	      exports.clearImmediate(id);
	    }
	  });
	
	  return id;
	};
	
	exports.clearImmediate = typeof clearImmediate === "function" ? clearImmediate : function(id) {
	  delete immediateIds[id];
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(230).setImmediate, __webpack_require__(230).clearImmediate))

/***/ },

/***/ 231:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;
	
	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL1Byb2ZpbGUuanN4Iiwid2VicGFjazovLy8uL2FwcC9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9Qcm9maWxlRm9ybS5qc3giLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvUHJvZmlsZURldGFpbHMuanN4Iiwid2VicGFjazovLy8uL2FwcC9zdG9yZXMvVXNlclN0b3JlLmpzIiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL0lucHV0RmllbGQuanN4Iiwid2VicGFjazovLy8uL2FwcC9hY3Rpb25zL1VzZXJBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZm9ybXN5LXJlYWN0L3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2Zvcm1zeS1yZWFjdC9zcmMvdmFsaWRhdGlvblJ1bGVzLmpzIiwid2VicGFjazovLy8uL34vZm9ybXN5LXJlYWN0L3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Zvcm1zeS1yZWFjdC9zcmMvTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL0FjdGlvbk1ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL0xpc3RlbmVyTWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9zcmMvUHVibGlzaGVyTWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9zcmMvU3RvcmVNZXRob2RzLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9jcmVhdGVBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL2NyZWF0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9jb25uZWN0LmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9jb25uZWN0RmlsdGVyLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9MaXN0ZW5lck1peGluLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9saXN0ZW5Uby5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9zcmMvbGlzdGVuVG9NYW55LmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9qb2lucy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL0tlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL21peGVyLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9iaW5kTWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9+L2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvfi9uYXRpdmUtcHJvbWlzZS1vbmx5L25wby5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsS0FBSSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxDQUFPLENBQUM7S0FDeEIsTUFBTSxHQUFHLG1CQUFPLENBQUMsQ0FBYyxDQUFDOztBQUVwQyxLQUFJLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQTBCLENBQUM7O0FBRWpELG9CQUFPLENBQUMsRUFBcUIsQ0FBQzs7QUFFOUIsS0FBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzFCLFNBQU0sb0JBQUc7QUFDUCxZQUNFOztTQUFNLFNBQVMsRUFBQyxLQUFLO09BQ25CLG9CQUFDLE1BQU0sQ0FBQyxZQUFZLEVB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O0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsTUFBSztBQUNMLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYLFVBQVM7QUFDVCxRQUFPO0FBQ1AsNENBQTJDO0FBQzNDOztBQUVBLE1BQUs7O0FBRUwsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSyxlQUFlO0FBQ3BCLElBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTCxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsUUFBTztBQUNQOztBQUVBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLFFBQU87QUFDUDs7QUFFQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVAsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEVBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7QUM1WkE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7OztBQUdBOztBQUVBLG9EQUFtRDs7QUFFbkQ7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0EsWUFBVyxTQUFTLGdEQUFnRCxzQkFBc0IsRUFBRTtBQUM1RjtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUM1R0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQSx3RUFBdUUsR0FBRyxtRkFBbUYsR0FBRztBQUNoSyxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDZEE7O0FBRUE7O0FBRUEsdUNBQXNDLE1BQU07QUFDNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxzQkFBcUI7QUFDckI7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLLElBQUk7O0FBRVQ7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7O0FBRUE7O0FBRUEsTUFBSzs7O0FBR0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0Esc0RBQXFELDZCQUE2Qjs7QUFFbEYsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O0FDdEpBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNMQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQSw2QkFBNEI7QUFDNUIsV0FBVSxxQ0FBcUM7QUFDL0M7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxhQUFhO0FBQzVCLGtCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGVBQWMsb0NBQW9DO0FBQ2xEO0FBQ0Esd0JBQXVCLHdCQUF3QjtBQUMvQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsYUFBYTtBQUM1QjtBQUNBLGtCQUFpQixpQkFBaUI7QUFDbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsYUFBYTtBQUM1QjtBQUNBLGdCQUFlLGdCQUFnQjtBQUMvQixnQkFBZSxnQkFBZ0I7QUFDL0Isa0JBQWlCLE9BQU87QUFDeEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxhQUFhO0FBQzVCLGtCQUFpQixRQUFRO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBLGNBQWEsZ0JBQWdCO0FBQzdCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBLGdCQUFlLGFBQWE7QUFDNUIsZ0JBQWUsZ0JBQWdCO0FBQy9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxjQUFjO0FBQzdCLGdCQUFlLGdCQUFnQjtBQUMvQixrQkFBaUIsT0FBTztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLGNBQWM7QUFDN0IsZ0JBQWUsZ0JBQWdCO0FBQy9CLGtCQUFpQixPQUFPO0FBQ3hCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsY0FBYztBQUM3QixnQkFBZSxnQkFBZ0I7QUFDL0Isa0JBQWlCLE9BQU87QUFDeEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxjQUFjO0FBQzdCLGdCQUFlLGdCQUFnQjtBQUMvQixrQkFBaUIsT0FBTztBQUN4QjtBQUNBO0FBQ0E7Ozs7Ozs7O0FDM05BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwyQkFBMEI7O0FBRTFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsUUFBUTtBQUN6QjtBQUNBLDZCQUE0QixhQUFhLEVBQUU7O0FBRTNDO0FBQ0E7QUFDQTtBQUNBLGdCQUFlLFNBQVM7QUFDeEIsZ0JBQWUsTUFBTTtBQUNyQixrQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsT0FBTztBQUN0QjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0EsVUFBUztBQUNULE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZSxTQUFTO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxpQkFBZ0I7QUFDaEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFTOztBQUVUO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlOztBQUVmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQXNCO0FBQ3RCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsV0FBVSxnQ0FBZ0M7QUFDMUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7Ozs7Ozs7O0FDaEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWUsdUJBQXVCO0FBQ3RDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsY0FBYSxNQUFNO0FBQ25CO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQixlQUFlO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7QUM1REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLGtGQUFpRixrQ0FBa0M7QUFDbkg7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBOzs7Ozs7OztBQ3JCQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQjtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7Ozs7Ozs7O0FDckNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsRUFBQzs7Ozs7Ozs7QUNoQkQ7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxhQUFhO0FBQ3hCO0FBQ0EsWUFBVyxnQkFBZ0I7QUFDM0IsWUFBVyxnQkFBZ0I7QUFDM0IsY0FBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ25DQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsT0FBTztBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLGNBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLFNBQVM7QUFDdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiLG9CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBLG9CQUFtQix5QkFBeUI7QUFDNUM7QUFDQTtBQUNBO0FBQ0EsbUJBQWtCO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFnQixtQkFBbUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBcUQ7QUFDckQ7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQkFBbUIsOEJBQThCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ3pHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBOEMsWUFBWTtBQUMxRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFZO0FBQ1osVUFBUyxjQUFjO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNwRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNYQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBOzs7Ozs7OztBQ3hEQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ3RCQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLFNBQVM7QUFDcEIsWUFBVyxNQUFNO0FBQ2pCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUF5Qjs7QUFFekI7QUFDQTtBQUNBO0FBQ0EsV0FBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUVBQW9FLE9BQU87QUFDM0U7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixjQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLDBDQUF5QyxTQUFTO0FBQ2xEO0FBQ0E7O0FBRUE7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQSxnQkFBZSxZQUFZO0FBQzNCOztBQUVBO0FBQ0EsNERBQTJEO0FBQzNELGdFQUErRDtBQUMvRCxvRUFBbUU7QUFDbkU7QUFDQSwyREFBMEQsU0FBUztBQUNuRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsWUFBVyxPQUFPO0FBQ2xCLFlBQVcsUUFBUTtBQUNuQixZQUFXLE1BQU07QUFDakI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVcsT0FBTztBQUNsQixZQUFXLFNBQVM7QUFDcEIsWUFBVyxNQUFNO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEIsWUFBVyxTQUFTO0FBQ3BCLFlBQVcsUUFBUTtBQUNuQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0VBQWlFLFlBQVk7QUFDN0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXLE9BQU87QUFDbEI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7bUNDcE9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCLDZLQUF1SSxZQUFZLHVKQUFFLDZEQUE2RCxhQUFhLGdCQUFnQiw2QkFBNkIsY0FBYyxpQkFBaUIsaUZBQWlGLGFBQWEsWUFBWSxvQkFBb0IscUZBQXFGLG9CQUFvQixrQkFBa0IsUUFBUSxJQUFJLHlLQUF5SyxTQUFTLGFBQWEsY0FBYyxlQUFlLGlCQUFpQixnQ0FBZ0MsSUFBSSx5Q0FBeUMscUJBQXFCLFlBQVkscUJBQXFCLGdEQUFnRCxTQUFTLHdCQUF3QixjQUFjLFdBQVcsMEZBQTBGLG9CQUFvQixZQUFZLFdBQVcsaUJBQWlCLGlDQUFpQyxPQUFPLElBQUksSUFBSSxjQUFjLDZCQUE2QixjQUFjLDRFQUE0RSxjQUFjLDBEQUEwRCxxREFBcUQsZUFBZSxrQkFBa0Isd0JBQXdCLE9BQU8scUVBQXFFLG9EQUFvRCxnRkFBZ0YsdUJBQXVCLGdEQUFnRCwyQkFBMkIsNEJBQTRCLElBQUksMEJBQTBCLFlBQVksYUFBYSxZQUFZLEVBQUUsU0FBUyxhQUFhLHFGQUFxRix1QkFBdUIsWUFBWSxJQUFJLHdCQUF3QixPQUFPLHNCQUFzQixrQ0FBa0Msd0NBQXdDLEdBQUcsU0FBUyxrQkFBa0IsaUJBQWlCLGFBQWEsZ0JBQWdCLHVDQUF1QyxVQUFVLE9BQU8sa0JBQWtCLHlDQUF5QyxrQkFBa0IsUUFBUSxpQkFBaUIsRUFBRSw4QkFBOEIsR0FBRyxVQUFVLHFCQUFxQiwyRUFBMkUsV0FBVyxrRUFBa0UsZ0ZBQWdGLEtBQUssRUFBRSwyQkFBMkIsOEJBQThCLGdGQUFnRixLQUFLLEVBQUUsd0JBQXdCLFdBQVcscUhBQXFILGdGQUFnRiw4QkFBOEIsb0JBQW9CLHFCQUFxQixJQUFJLEVBQUUseUJBQXlCLFdBQVcsMEZBQTBGLGdGQUFnRixvQkFBb0IsS0FBSyxJQUFJLEVBQUUsSUFBSTs7Ozs7Ozs7O0FDSmo1RztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNENBQTJDLGlCQUFpQjs7QUFFNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHOzs7Ozs7OztBQzNFQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG4gICwgUm91dGVyID0gcmVxdWlyZSgncmVhY3Qtcm91dGVyJylcblxudmFyIFByb2ZpbGUgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUHJvZmlsZS5qc3gnKVxuXG5yZXF1aXJlKCcuL3N0eWxlcy9pbmRleC5zY3NzJylcblxudmFyIEFwcCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8bWFpbiBjbGFzc05hbWU9XCJhcHBcIj5cbiAgICAgICAgPFJvdXRlci5Sb3V0ZUhhbmRsZXIgey4uLnRoaXMucHJvcHN9IC8+XG4gICAgICA8L21haW4+XG4gICAgKVxuICB9XG59KTtcblxudmFyIHJvdXRlcyA9IChcbiAgPFJvdXRlci5Sb3V0ZSBuYW1lPVwiYXBwXCIgcGF0aD1cIi9cIiBoYW5kbGVyPXtBcHB9PlxuICAgIDxSb3V0ZXIuRGVmYXVsdFJvdXRlIGhhbmRsZXI9e1Byb2ZpbGV9IC8+XG4gIDwvUm91dGVyLlJvdXRlPlxuKTtcblxuUm91dGVyLnJ1bihyb3V0ZXMsIFJvdXRlci5IaXN0b3J5TG9jYXRpb24sIChIYW5kbGVyLCBzdGF0ZSkgPT4ge1xuICBSZWFjdC5yZW5kZXIoPEhhbmRsZXIvPiwgZG9jdW1lbnQuYm9keSk7XG59KVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXBwL2luZGV4LmpzeFxuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgUHJvZmlsZUZvcm0gPSByZXF1aXJlKCcuL1Byb2ZpbGVGb3JtLmpzeCcpXG4gICwgUHJvZmlsZURldGFpbHMgPSByZXF1aXJlKCcuL1Byb2ZpbGVEZXRhaWxzLmpzeCcpXG5cbnZhciBQcm9maWxlID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxQcm9maWxlRm9ybSAvPlxuICAgICAgICA8UHJvZmlsZURldGFpbHMgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2ZpbGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvY29tcG9uZW50cy9Qcm9maWxlLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9zdHlsZXMvaW5kZXguc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG4gICwgRm9ybXN5ID0gcmVxdWlyZSgnZm9ybXN5LXJlYWN0JylcblxudmFyIElucHV0RmllbGQgPSByZXF1aXJlKCcuL0lucHV0RmllbGQuanN4JylcblxudmFyIFVzZXJBY3Rpb25zID0gcmVxdWlyZSgnLi4vYWN0aW9ucy9Vc2VyQWN0aW9ucycpXG52YXIgVXNlclN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL1VzZXJTdG9yZScpXG5cbnZhciBQcm9maWxlRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjYW5TdWJtaXQ6IGZhbHNlLFxuICAgICAgdXNlcjogVXNlclN0b3JlLmdldEluaXRpYWxTdGF0ZSgpXG4gICAgfVxuICB9LFxuICBoYW5kbGVTdWJtaXQoZGF0YSkge1xuICAgIFVzZXJBY3Rpb25zLnByb2ZpbGVVcGRhdGUoZGF0YSlcbiAgfSxcbiAgZW5hYmxlQnV0dG9uOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgY2FuU3VibWl0OiB0cnVlIH0pXG4gIH0sXG4gIGRpc2FibGVCdXR0b246IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjYW5TdWJtaXQ6IGZhbHNlIH0pXG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRpc2FibGVkID0gIXRoaXMuc3RhdGUuY2FuU3VibWl0XG4gICAgdmFyIHVzZXIgPSB0aGlzLnN0YXRlLnVzZXIgfHwge31cbiAgICB2YXIgbmFtZSA9IHVzZXIubmFtZVxuICAgIHZhciBlbWFpbCA9IHVzZXIuZW1haWxcblxuICAgIHJldHVybiAoXG4gICAgICA8Rm9ybXN5LkZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fVxuICAgICAgICAgICAgICAgICAgIG9uVmFsaWQ9e3RoaXMuZW5hYmxlQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgIG9uSW52YWxpZD17dGhpcy5kaXNhYmxlQnV0dG9ufT5cbiAgICAgICAgPElucHV0RmllbGQgbmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgdmFsdWU9e25hbWV9XG4gICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cbiAgICAgICAgPElucHV0RmllbGQgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICB0aXRsZT1cIkVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICB2YWx1ZT17ZW1haWx9XG4gICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbnM9XCJpc0VtYWlsXCJcbiAgICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uRXJyb3I9XCJUaGlzIGlzIG5vdCBhIHZhbGlkIGVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICByZXF1aXJlZCAvPlxuICAgICAgICA8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBkaXNhYmxlZD17ZGlzYWJsZWR9PlxuICAgICAgICAgIFRlc3QgU3VibWl0XG4gICAgICAgIDwvYnV0dG9uPlxuICAgICAgPC9Gb3Jtc3kuRm9ybT5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9maWxlRm9ybTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXBwL2NvbXBvbmVudHMvUHJvZmlsZUZvcm0uanN4XG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBSZWZsdXggPSByZXF1aXJlKCdyZWZsdXgnKTtcblxudmFyIFVzZXJTdG9yZSA9IHJlcXVpcmUoJy4uL3N0b3Jlcy9Vc2VyU3RvcmUuanMnKVxuXG52YXIgUHJvZmlsZURldGFpbHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogW1JlZmx1eC5jb25uZWN0KFVzZXJTdG9yZSwgXCJ1c2VyXCIpXSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdXNlciA9IHRoaXMuc3RhdGUudXNlciB8fCB7fVxuICAgIHZhciBuYW1lID0gdXNlci5uYW1lXG4gICAgdmFyIGVtYWlsID0gdXNlci5lbWFpbFxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXY+XG4gICAgICAgIDxkdD5cbiAgICAgICAgICA8c3Bhbj5cbiAgICAgICAgICAgIE5hbWVcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZHQ+XG4gICAgICAgIDxkZD5cbiAgICAgICAgICB7bmFtZX1cbiAgICAgICAgPC9kZD5cbiAgICAgICAgPGR0PlxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgRW1haWxcbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZHQ+XG4gICAgICAgIDxkZD5cbiAgICAgICAgICB7ZW1haWx9XG4gICAgICAgIDwvZGQ+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9maWxlRGV0YWlscztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXBwL2NvbXBvbmVudHMvUHJvZmlsZURldGFpbHMuanN4XG4gKiovIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpXG5cbnZhciB1c2VyQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvVXNlckFjdGlvbnMuanMnKVxuXG52YXIgVXNlclN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgaW5pdDogZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5wcm9maWxlID0geyBuYW1lOiAnY2hyaXMnLCBlbWFpbDogJ2Nocmlza0BjYXJib25maXZlLmNvbScgfVxuICAgIHRoaXMubGlzdGVuVG8odXNlckFjdGlvbnMucHJvZmlsZVVwZGF0ZSwgdGhpcy5vblByb2ZpbGVVcGRhdGUpXG4gIH0sXG5cbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9maWxlXG4gIH0sXG5cbiAgb25Qcm9maWxlVXBkYXRlOiBmdW5jdGlvbihwcm9maWxlKSB7XG4gICAgdGhpcy5wcm9maWxlID0gcHJvZmlsZVxuICAgIHRoaXMudHJpZ2dlcihwcm9maWxlKVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IFVzZXJTdG9yZVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvc3RvcmVzL1VzZXJTdG9yZS5qc1xuICoqLyIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbiAgLCBGb3Jtc3kgPSByZXF1aXJlKCdmb3Jtc3ktcmVhY3QnKVxuXG52YXIgSW5wdXRGaWVsZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbWl4aW5zOiBbRm9ybXN5Lk1peGluXSxcbiAgZ2V0SW5pdGlhbFN0YXRlKCkge1xuICAgIHJldHVybiB7IHNob3dFcnJvcnM6IGZhbHNlIH1cbiAgfSxcbiAgY2hhbmdlVmFsdWU6IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRWYWx1ZShldmVudC5jdXJyZW50VGFyZ2V0LnZhbHVlKTtcbiAgfSxcbiAgaGFuZGxlQ2hhbmdlKGV2ZW50KSB7XG4gICAgdGhpcy5zZXRWYWx1ZShldmVudC50YXJnZXQudmFsdWUpXG4gIH0sXG4gIGhhbmRsZUJsdXIoKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dFcnJvcnM6IHRydWUgfSlcbiAgfSxcbiAgaGFuZGxlRm9jdXMoKSB7XG4gICAgaWYgKCF0aGlzLmlzUHJpc3RpbmUoKSAmJiAhdGhpcy5zaG93RXJyb3JzKCkpXG4gICAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0Vycm9yczogZmFsc2UgfSlcbiAgfSxcbiAgb3JFbXB0eShzdHIpIHtcbiAgICByZXR1cm4gc3RyID8gc3RyIDogJydcbiAgfSxcbiAgcmVuZGVyKCkge1xuICAgIHZhciBjbGFzc05hbWUgPSB0aGlzLm9yRW1wdHkodGhpcy5wcm9wcy5jbGFzc05hbWUpICArICcgJyAgKyAodGhpcy5zaG93UmVxdWlyZWQoKSA/ICdyZXF1aXJlZCcgOiB0aGlzLnNob3dFcnJvcigpID8gJ2Vycm9yJyA6IG51bGwpXG4gICAgdmFyIGVycm9yTWVzc2FnZSA9IHRoaXMuc3RhdGUuc2hvd0Vycm9ycyA/IHRoaXMuZ2V0RXJyb3JNZXNzYWdlKCkgOiAnJ1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXsnZm9ybS1ncm91cCcgKyBjbGFzc05hbWV9PlxuICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5uYW1lfT57dGhpcy5wcm9wcy50aXRsZX08L2xhYmVsPlxuICAgICAgICA8aW5wdXQgdHlwZT17dGhpcy5wcm9wcy50eXBlIHx8ICd0ZXh0J31cbiAgICAgICAgICAgICAgIG5hbWU9e3RoaXMucHJvcHMubmFtZX1cbiAgICAgICAgICAgICAgIHZhbHVlPXt0aGlzLmdldFZhbHVlKCl9XG4gICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XG4gICAgICAgICAgICAgICBvbkJsdXI9e3RoaXMuaGFuZGxlQmx1cn1cbiAgICAgICAgICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9IC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndmFsaWRhdGlvbi1lcnJvcic+e2Vycm9yTWVzc2FnZX08L3NwYW4+XG4gICAgICA8L2Rpdj5cbiAgICApXG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IElucHV0RmllbGRcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9jb21wb25lbnRzL0lucHV0RmllbGQuanN4XG4gKiovIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpXG5cbnZhciB1c2VyQWN0aW9ucyA9IFJlZmx1eC5jcmVhdGVBY3Rpb25zKFtcbiAgJ3Byb2ZpbGVVcGRhdGUnXG5dKTtcblxubW9kdWxlLmV4cG9ydHMgPSB1c2VyQWN0aW9uc1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvYWN0aW9ucy9Vc2VyQWN0aW9ucy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9zcmMnKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDEzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIFJlYWN0ID0gZ2xvYmFsLlJlYWN0IHx8IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRm9ybXN5ID0ge307XG52YXIgdmFsaWRhdGlvblJ1bGVzID0gcmVxdWlyZSgnLi92YWxpZGF0aW9uUnVsZXMuanMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMuanMnKTtcbnZhciBNaXhpbiA9IHJlcXVpcmUoJy4vTWl4aW4uanMnKTtcbnZhciBvcHRpb25zID0ge307XG5cbkZvcm1zeS5NaXhpbiA9IE1peGluO1xuXG5Gb3Jtc3kuZGVmYXVsdHMgPSBmdW5jdGlvbiAocGFzc2VkT3B0aW9ucykge1xuICBvcHRpb25zID0gcGFzc2VkT3B0aW9ucztcbn07XG5cbkZvcm1zeS5hZGRWYWxpZGF0aW9uUnVsZSA9IGZ1bmN0aW9uIChuYW1lLCBmdW5jKSB7XG4gIHZhbGlkYXRpb25SdWxlc1tuYW1lXSA9IGZ1bmM7XG59O1xuXG5Gb3Jtc3kuRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICBpc1N1Ym1pdHRpbmc6IGZhbHNlLFxuICAgICAgY2FuQ2hhbmdlOiBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBvblN1Y2Nlc3M6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgb25FcnJvcjogZnVuY3Rpb24gKCkge30sXG4gICAgICBvblN1Ym1pdDogZnVuY3Rpb24gKCkge30sXG4gICAgICBvblZhbGlkU3VibWl0OiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uSW52YWxpZFN1Ym1pdDogZnVuY3Rpb24gKCkge30sXG4gICAgICBvblN1Ym1pdHRlZDogZnVuY3Rpb24gKCkge30sXG4gICAgICBvblZhbGlkOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uSW52YWxpZDogZnVuY3Rpb24gKCkge30sXG4gICAgICBvbkNoYW5nZTogZnVuY3Rpb24gKCkge30sXG4gICAgICB2YWxpZGF0aW9uRXJyb3JzOiBudWxsXG4gICAgfTtcbiAgfSxcblxuICAvLyBBZGQgYSBtYXAgdG8gc3RvcmUgdGhlIGlucHV0cyBvZiB0aGUgZm9ybSwgYSBtb2RlbCB0byBzdG9yZVxuICAvLyB0aGUgdmFsdWVzIG9mIHRoZSBmb3JtIGFuZCByZWdpc3RlciBjaGlsZCBpbnB1dHNcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5pbnB1dHMgPSB7fTtcbiAgICB0aGlzLm1vZGVsID0ge307XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xuICB9LFxuXG4gIGNvbXBvbmVudFdpbGxVcGRhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgaW5wdXRLZXlzID0gT2JqZWN0LmtleXModGhpcy5pbnB1dHMpO1xuXG4gICAgLy8gVGhlIHVwZGF0ZWQgY2hpbGRyZW4gYXJyYXkgaXMgbm90IGF2YWlsYWJsZSBoZXJlIGZvciBzb21lIHJlYXNvbixcbiAgICAvLyB3ZSBuZWVkIHRvIHdhaXQgZm9yIG5leHQgZXZlbnQgbG9vcFxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuXG4gICAgICAvLyBUaGUgY29tcG9uZW50IG1pZ2h0IGhhdmUgYmVlbiB1bm1vdW50ZWQgb24gYW5cbiAgICAgIC8vIHVwZGF0ZVxuICAgICAgaWYgKHRoaXMuaXNNb3VudGVkKCkpIHtcblxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JzKSB7XG4gICAgICAgICAgdGhpcy5zZXRJbnB1dFZhbGlkYXRpb25FcnJvcnModGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBuZXdJbnB1dEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmlucHV0cyk7XG4gICAgICAgIGlmICh1dGlscy5hcnJheXNEaWZmZXIoaW5wdXRLZXlzLCBuZXdJbnB1dEtleXMpKSB7XG4gICAgICAgICAgdGhpcy52YWxpZGF0ZUZvcm0oKTtcbiAgICAgICAgfVxuXG4gICAgICB9XG5cbiAgICB9LmJpbmQodGhpcyksIDApO1xuICB9LFxuXG4gIC8vIFVwZGF0ZSBtb2RlbCwgc3VibWl0IHRvIHVybCBwcm9wIGFuZCBzZW5kIHRoZSBtb2RlbFxuICBzdWJtaXQ6IGZ1bmN0aW9uIChldmVudCkge1xuXG4gICAgZXZlbnQgJiYgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIC8vIFRyaWdnZXIgZm9ybSBhcyBub3QgcHJpc3RpbmUuXG4gICAgLy8gSWYgYW55IGlucHV0cyBoYXZlIG5vdCBiZWVuIHRvdWNoZWQgeWV0IHRoaXMgd2lsbCBtYWtlIHRoZW0gZGlydHlcbiAgICAvLyBzbyB2YWxpZGF0aW9uIGJlY29tZXMgdmlzaWJsZSAoaWYgYmFzZWQgb24gaXNQcmlzdGluZSlcbiAgICB0aGlzLnNldEZvcm1QcmlzdGluZShmYWxzZSk7XG4gICAgdGhpcy51cGRhdGVNb2RlbCgpO1xuICAgIHZhciBtb2RlbCA9IHRoaXMubWFwTW9kZWwoKTtcbiAgICB0aGlzLnByb3BzLm9uU3VibWl0KG1vZGVsLCB0aGlzLnJlc2V0TW9kZWwsIHRoaXMudXBkYXRlSW5wdXRzV2l0aEVycm9yKTtcbiAgICB0aGlzLnN0YXRlLmlzVmFsaWQgPyB0aGlzLnByb3BzLm9uVmFsaWRTdWJtaXQobW9kZWwsIHRoaXMucmVzZXRNb2RlbCwgdGhpcy51cGRhdGVJbnB1dHNXaXRoRXJyb3IpIDogdGhpcy5wcm9wcy5vbkludmFsaWRTdWJtaXQobW9kZWwsIHRoaXMucmVzZXRNb2RlbCwgdGhpcy51cGRhdGVJbnB1dHNXaXRoRXJyb3IpO1xuXG4gIH0sXG5cbiAgbWFwTW9kZWw6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5tYXBwaW5nID8gdGhpcy5wcm9wcy5tYXBwaW5nKHRoaXMubW9kZWwpIDogdGhpcy5tb2RlbDtcbiAgfSxcblxuICAvLyBHb2VzIHRocm91Z2ggYWxsIHJlZ2lzdGVyZWQgY29tcG9uZW50cyBhbmRcbiAgLy8gdXBkYXRlcyB0aGUgbW9kZWwgdmFsdWVzXG4gIHVwZGF0ZU1vZGVsOiBmdW5jdGlvbiAoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzLmlucHV0c1tuYW1lXTtcbiAgICAgIHRoaXMubW9kZWxbbmFtZV0gPSBjb21wb25lbnQuc3RhdGUuX3ZhbHVlO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgLy8gUmVzZXQgZWFjaCBrZXkgaW4gdGhlIG1vZGVsIHRvIHRoZSBvcmlnaW5hbCAvIGluaXRpYWwgdmFsdWVcbiAgcmVzZXRNb2RlbDogZnVuY3Rpb24gKCkge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuaW5wdXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICB0aGlzLmlucHV0c1tuYW1lXS5yZXNldFZhbHVlKCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xuICB9LFxuXG4gIHNldElucHV0VmFsaWRhdGlvbkVycm9yczogZnVuY3Rpb24gKGVycm9ycykge1xuICAgIE9iamVjdC5rZXlzKHRoaXMuaW5wdXRzKS5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpbmRleCkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IHRoaXMuaW5wdXRzW25hbWVdO1xuICAgICAgdmFyIGFyZ3MgPSBbe1xuICAgICAgICBfaXNWYWxpZDogIShuYW1lIGluIGVycm9ycyksXG4gICAgICAgIF92YWxpZGF0aW9uRXJyb3I6IGVycm9yc1tuYW1lXVxuICAgICAgfV07XG4gICAgICBjb21wb25lbnQuc2V0U3RhdGUuYXBwbHkoY29tcG9uZW50LCBhcmdzKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuXG4gIC8vIEdvIHRocm91Z2ggZXJyb3JzIGZyb20gc2VydmVyIGFuZCBncmFiIHRoZSBjb21wb25lbnRzXG4gIC8vIHN0b3JlZCBpbiB0aGUgaW5wdXRzIG1hcC4gQ2hhbmdlIHRoZWlyIHN0YXRlIHRvIGludmFsaWRcbiAgLy8gYW5kIHNldCB0aGUgc2VydmVyRXJyb3IgbWVzc2FnZVxuICB1cGRhdGVJbnB1dHNXaXRoRXJyb3I6IGZ1bmN0aW9uIChlcnJvcnMpIHtcbiAgICBPYmplY3Qua2V5cyhlcnJvcnMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUsIGluZGV4KSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5pbnB1dHNbbmFtZV07XG5cbiAgICAgIGlmICghY29tcG9uZW50KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignWW91IGFyZSB0cnlpbmcgdG8gdXBkYXRlIGFuIGlucHV0IHRoYXQgZG9lcyBub3QgZXhpc3RzLiBWZXJpZnkgZXJyb3JzIG9iamVjdCB3aXRoIGlucHV0IG5hbWVzLiAnICsgSlNPTi5zdHJpbmdpZnkoZXJyb3JzKSk7XG4gICAgICB9XG5cbiAgICAgIHZhciBhcmdzID0gW3tcbiAgICAgICAgX2lzVmFsaWQ6IGZhbHNlLFxuICAgICAgICBfZXh0ZXJuYWxFcnJvcjogZXJyb3JzW25hbWVdXG4gICAgICB9XTtcbiAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZS5hcHBseShjb21wb25lbnQsIGFyZ3MpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgLy8gVHJhdmVyc2UgdGhlIGNoaWxkcmVuIGFuZCBjaGlsZHJlbiBvZiBjaGlsZHJlbiB0byBmaW5kXG4gIC8vIGFsbCBpbnB1dHMgYnkgY2hlY2tpbmcgdGhlIG5hbWUgcHJvcC4gTWF5YmUgZG8gYSBiZXR0ZXJcbiAgLy8gY2hlY2sgaGVyZVxuICB0cmF2ZXJzZUNoaWxkcmVuQW5kUmVnaXN0ZXJJbnB1dHM6IGZ1bmN0aW9uIChjaGlsZHJlbikge1xuXG4gICAgaWYgKHR5cGVvZiBjaGlsZHJlbiAhPT0gJ29iamVjdCcgfHwgY2hpbGRyZW4gPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBjaGlsZHJlbjtcbiAgICB9XG4gICAgcmV0dXJuIFJlYWN0LkNoaWxkcmVuLm1hcChjaGlsZHJlbiwgZnVuY3Rpb24gKGNoaWxkKSB7XG5cbiAgICAgIGlmICh0eXBlb2YgY2hpbGQgIT09ICdvYmplY3QnIHx8IGNoaWxkID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBjaGlsZDtcbiAgICAgIH1cblxuICAgICAgaWYgKGNoaWxkLnByb3BzICYmIGNoaWxkLnByb3BzLm5hbWUpIHtcblxuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7XG4gICAgICAgICAgX2F0dGFjaFRvRm9ybTogdGhpcy5hdHRhY2hUb0Zvcm0sXG4gICAgICAgICAgX2RldGFjaEZyb21Gb3JtOiB0aGlzLmRldGFjaEZyb21Gb3JtLFxuICAgICAgICAgIF92YWxpZGF0ZTogdGhpcy52YWxpZGF0ZSxcbiAgICAgICAgICBfaXNGb3JtRGlzYWJsZWQ6IHRoaXMuaXNGb3JtRGlzYWJsZWQsXG4gICAgICAgICAgX2lzVmFsaWRWYWx1ZTogZnVuY3Rpb24gKGNvbXBvbmVudCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJ1blZhbGlkYXRpb24oY29tcG9uZW50LCB2YWx1ZSkuaXNWYWxpZDtcbiAgICAgICAgICB9LmJpbmQodGhpcylcbiAgICAgICAgfSwgY2hpbGQucHJvcHMgJiYgY2hpbGQucHJvcHMuY2hpbGRyZW4pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIFJlYWN0LmNsb25lRWxlbWVudChjaGlsZCwge30sIHRoaXMudHJhdmVyc2VDaGlsZHJlbkFuZFJlZ2lzdGVySW5wdXRzKGNoaWxkLnByb3BzICYmIGNoaWxkLnByb3BzLmNoaWxkcmVuKSk7XG4gICAgICB9XG5cbiAgICB9LCB0aGlzKTtcblxuICB9LFxuXG4gIGlzRm9ybURpc2FibGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuZGlzYWJsZWQ7XG4gIH0sXG5cbiAgZ2V0Q3VycmVudFZhbHVlczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmlucHV0cykucmVkdWNlKGZ1bmN0aW9uIChkYXRhLCBuYW1lKSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5pbnB1dHNbbmFtZV07XG4gICAgICBkYXRhW25hbWVdID0gY29tcG9uZW50LnN0YXRlLl92YWx1ZTtcbiAgICAgIHJldHVybiBkYXRhO1xuICAgIH0uYmluZCh0aGlzKSwge30pO1xuICB9LFxuXG4gIHNldEZvcm1QcmlzdGluZTogZnVuY3Rpb24gKGlzUHJpc3RpbmUpIHtcbiAgICB2YXIgaW5wdXRzID0gdGhpcy5pbnB1dHM7XG4gICAgdmFyIGlucHV0S2V5cyA9IE9iamVjdC5rZXlzKGlucHV0cyk7XG5cbiAgICAvLyBJdGVyYXRlIHRocm91Z2ggZWFjaCBjb21wb25lbnQgYW5kIHNldCBpdCBhcyBwcmlzdGluZVxuICAgIC8vIG9yIFwiZGlydHlcIi5cbiAgICBpbnB1dEtleXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBpbnB1dHNbbmFtZV07XG4gICAgICBjb21wb25lbnQuc2V0U3RhdGUoe1xuICAgICAgICBfaXNQcmlzdGluZTogaXNQcmlzdGluZVxuICAgICAgfSk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcblxuICAvLyBVc2UgdGhlIGJpbmRlZCB2YWx1ZXMgYW5kIHRoZSBhY3R1YWwgaW5wdXQgdmFsdWUgdG9cbiAgLy8gdmFsaWRhdGUgdGhlIGlucHV0IGFuZCBzZXQgaXRzIHN0YXRlLiBUaGVuIGNoZWNrIHRoZVxuICAvLyBzdGF0ZSBvZiB0aGUgZm9ybSBpdHNlbGZcbiAgdmFsaWRhdGU6IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcblxuICAgIC8vIFRyaWdnZXIgb25DaGFuZ2VcbiAgICBpZiAodGhpcy5zdGF0ZS5jYW5DaGFuZ2UpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2UodGhpcy5nZXRDdXJyZW50VmFsdWVzKCkpO1xuICAgIH1cblxuICAgIHZhciB2YWxpZGF0aW9uID0gdGhpcy5ydW5WYWxpZGF0aW9uKGNvbXBvbmVudCk7XG4gICAgLy8gUnVuIHRocm91Z2ggdGhlIHZhbGlkYXRpb25zLCBzcGxpdCB0aGVtIHVwIGFuZCBjYWxsXG4gICAgLy8gdGhlIHZhbGlkYXRvciBJRiB0aGVyZSBpcyBhIHZhbHVlIG9yIGl0IGlzIHJlcXVpcmVkXG4gICAgY29tcG9uZW50LnNldFN0YXRlKHtcbiAgICAgIF9pc1ZhbGlkOiB2YWxpZGF0aW9uLmlzVmFsaWQsXG4gICAgICBfaXNSZXF1aXJlZDogdmFsaWRhdGlvbi5pc1JlcXVpcmVkLFxuICAgICAgX3ZhbGlkYXRpb25FcnJvcjogdmFsaWRhdGlvbi5lcnJvcixcbiAgICAgIF9leHRlcm5hbEVycm9yOiBudWxsXG4gICAgfSwgdGhpcy52YWxpZGF0ZUZvcm0pO1xuXG4gIH0sXG5cbiAgLy8gQ2hlY2tzIHZhbGlkYXRpb24gb24gY3VycmVudCB2YWx1ZSBvciBhIHBhc3NlZCB2YWx1ZVxuICBydW5WYWxpZGF0aW9uOiBmdW5jdGlvbiAoY29tcG9uZW50LCB2YWx1ZSkge1xuXG4gICAgdmFyIGN1cnJlbnRWYWx1ZXMgPSB0aGlzLmdldEN1cnJlbnRWYWx1ZXMoKTtcbiAgICB2YXIgdmFsaWRhdGlvbkVycm9ycyA9IGNvbXBvbmVudC5wcm9wcy52YWxpZGF0aW9uRXJyb3JzO1xuICAgIHZhciB2YWxpZGF0aW9uRXJyb3IgPSBjb21wb25lbnQucHJvcHMudmFsaWRhdGlvbkVycm9yO1xuICAgIHZhbHVlID0gYXJndW1lbnRzLmxlbmd0aCA9PT0gMiA/IHZhbHVlIDogY29tcG9uZW50LnN0YXRlLl92YWx1ZTtcblxuICAgIHZhciB2YWxpZGF0aW9uUmVzdWx0cyA9IHRoaXMucnVuUnVsZXModmFsdWUsIGN1cnJlbnRWYWx1ZXMsIGNvbXBvbmVudC5fdmFsaWRhdGlvbnMpO1xuICAgIHZhciByZXF1aXJlZFJlc3VsdHMgPSB0aGlzLnJ1blJ1bGVzKHZhbHVlLCBjdXJyZW50VmFsdWVzLCBjb21wb25lbnQuX3JlcXVpcmVkVmFsaWRhdGlvbnMpO1xuXG4gICAgLy8gdGhlIGNvbXBvbmVudCBkZWZpbmVzIGFuIGV4cGxpY2l0IHZhbGlkYXRlIGZ1bmN0aW9uXG4gICAgaWYgKHR5cGVvZiBjb21wb25lbnQudmFsaWRhdGUgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgdmFsaWRhdGlvblJlc3VsdHMuZmFpbGVkID0gY29tcG9uZW50LnZhbGlkYXRlKCkgPyBbXSA6IFsnZmFpbGVkJ107XG4gICAgfVxuXG4gICAgdmFyIGlzUmVxdWlyZWQgPSBPYmplY3Qua2V5cyhjb21wb25lbnQuX3JlcXVpcmVkVmFsaWRhdGlvbnMpLmxlbmd0aCA/ICEhcmVxdWlyZWRSZXN1bHRzLnN1Y2Nlc3MubGVuZ3RoIDogZmFsc2U7XG4gICAgdmFyIGlzVmFsaWQgPSAhdmFsaWRhdGlvblJlc3VsdHMuZmFpbGVkLmxlbmd0aCAmJiAhKHRoaXMucHJvcHMudmFsaWRhdGlvbkVycm9ycyAmJiB0aGlzLnByb3BzLnZhbGlkYXRpb25FcnJvcnNbY29tcG9uZW50LnByb3BzLm5hbWVdKTtcblxuICAgIHJldHVybiB7XG4gICAgICBpc1JlcXVpcmVkOiBpc1JlcXVpcmVkLFxuICAgICAgaXNWYWxpZDogaXNSZXF1aXJlZCA/IGZhbHNlIDogaXNWYWxpZCxcbiAgICAgIGVycm9yOiAoZnVuY3Rpb24gKCkge1xuXG4gICAgICAgIGlmIChpc1ZhbGlkICYmICFpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbGlkYXRpb25SZXN1bHRzLmVycm9ycy5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gdmFsaWRhdGlvblJlc3VsdHMuZXJyb3JzWzBdO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMudmFsaWRhdGlvbkVycm9ycyAmJiB0aGlzLnByb3BzLnZhbGlkYXRpb25FcnJvcnNbY29tcG9uZW50LnByb3BzLm5hbWVdKSB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmFsaWRhdGlvbkVycm9yc1tjb21wb25lbnQucHJvcHMubmFtZV07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNSZXF1aXJlZCkge1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0aW9uRXJyb3JzW3JlcXVpcmVkUmVzdWx0cy5zdWNjZXNzWzBdXSB8fCBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFpc1ZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25FcnJvcnNbdmFsaWRhdGlvblJlc3VsdHMuZmFpbGVkWzBdXSB8fCB2YWxpZGF0aW9uRXJyb3I7XG4gICAgICAgIH1cblxuICAgICAgfS5jYWxsKHRoaXMpKVxuICAgIH07XG5cbiAgfSxcblxuICBydW5SdWxlczogZnVuY3Rpb24gKHZhbHVlLCBjdXJyZW50VmFsdWVzLCB2YWxpZGF0aW9ucykge1xuXG4gICAgdmFyIHJlc3VsdHMgPSB7XG4gICAgICBlcnJvcnM6IFtdLFxuICAgICAgZmFpbGVkOiBbXSxcbiAgICAgIHN1Y2Nlc3M6IFtdXG4gICAgfTtcbiAgICBpZiAoT2JqZWN0LmtleXModmFsaWRhdGlvbnMpLmxlbmd0aCkge1xuICAgICAgT2JqZWN0LmtleXModmFsaWRhdGlvbnMpLmZvckVhY2goZnVuY3Rpb24gKHZhbGlkYXRpb25NZXRob2QpIHtcblxuICAgICAgICBpZiAodmFsaWRhdGlvblJ1bGVzW3ZhbGlkYXRpb25NZXRob2RdICYmIHR5cGVvZiB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybXN5IGRvZXMgbm90IGFsbG93IHlvdSB0byBvdmVycmlkZSBkZWZhdWx0IHZhbGlkYXRpb25zOiAnICsgdmFsaWRhdGlvbk1ldGhvZCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXZhbGlkYXRpb25SdWxlc1t2YWxpZGF0aW9uTWV0aG9kXSAmJiB0eXBlb2YgdmFsaWRhdGlvbnNbdmFsaWRhdGlvbk1ldGhvZF0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm1zeSBkb2VzIG5vdCBoYXZlIHRoZSB2YWxpZGF0aW9uIHJ1bGU6ICcgKyB2YWxpZGF0aW9uTWV0aG9kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdGlvbnNbdmFsaWRhdGlvbk1ldGhvZF0gPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgdmFsaWRhdGlvbiA9IHZhbGlkYXRpb25zW3ZhbGlkYXRpb25NZXRob2RdKGN1cnJlbnRWYWx1ZXMsIHZhbHVlKTtcbiAgICAgICAgICBpZiAodHlwZW9mIHZhbGlkYXRpb24gPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXN1bHRzLmVycm9ycy5wdXNoKHZhbGlkYXRpb24pO1xuICAgICAgICAgICAgcmVzdWx0cy5mYWlsZWQucHVzaCh2YWxpZGF0aW9uTWV0aG9kKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKCF2YWxpZGF0aW9uKSB7XG4gICAgICAgICAgICByZXN1bHRzLmZhaWxlZC5wdXNoKHZhbGlkYXRpb25NZXRob2QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdmFsaWRhdGlvbnNbdmFsaWRhdGlvbk1ldGhvZF0gIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICB2YXIgdmFsaWRhdGlvbiA9IHZhbGlkYXRpb25SdWxlc1t2YWxpZGF0aW9uTWV0aG9kXShjdXJyZW50VmFsdWVzLCB2YWx1ZSwgdmFsaWRhdGlvbnNbdmFsaWRhdGlvbk1ldGhvZF0pO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlc3VsdHMuZXJyb3JzLnB1c2godmFsaWRhdGlvbik7XG4gICAgICAgICAgICByZXN1bHRzLmZhaWxlZC5wdXNoKHZhbGlkYXRpb25NZXRob2QpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHJlc3VsdHMuZmFpbGVkLnB1c2godmFsaWRhdGlvbk1ldGhvZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc3VsdHMuc3VjY2Vzcy5wdXNoKHZhbGlkYXRpb25NZXRob2QpO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm47XG5cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiByZXN1bHRzLnN1Y2Nlc3MucHVzaCh2YWxpZGF0aW9uTWV0aG9kKTtcblxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdHM7XG5cbiAgfSxcblxuICAvLyBWYWxpZGF0ZSB0aGUgZm9ybSBieSBnb2luZyB0aHJvdWdoIGFsbCBjaGlsZCBpbnB1dCBjb21wb25lbnRzXG4gIC8vIGFuZCBjaGVjayB0aGVpciBzdGF0ZVxuICB2YWxpZGF0ZUZvcm06IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgYWxsSXNWYWxpZCA9IHRydWU7XG4gICAgdmFyIGlucHV0cyA9IHRoaXMuaW5wdXRzO1xuICAgIHZhciBpbnB1dEtleXMgPSBPYmplY3Qua2V5cyhpbnB1dHMpO1xuXG4gICAgLy8gV2UgbmVlZCBhIGNhbGxiYWNrIGFzIHdlIGFyZSB2YWxpZGF0aW5nIGFsbCBpbnB1dHMgYWdhaW4uIFRoaXMgd2lsbFxuICAgIC8vIHJ1biB3aGVuIHRoZSBsYXN0IGNvbXBvbmVudCBoYXMgc2V0IGl0cyBzdGF0ZVxuICAgIHZhciBvblZhbGlkYXRpb25Db21wbGV0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIGlucHV0S2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgICAgIGlmICghaW5wdXRzW25hbWVdLnN0YXRlLl9pc1ZhbGlkKSB7XG4gICAgICAgICAgYWxsSXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgICAgaXNWYWxpZDogYWxsSXNWYWxpZFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChhbGxJc1ZhbGlkKSB7XG4gICAgICAgIHRoaXMucHJvcHMub25WYWxpZCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vbkludmFsaWQoKTtcbiAgICAgIH1cblxuICAgICAgLy8gVGVsbCB0aGUgZm9ybSB0aGF0IGl0IGNhbiBzdGFydCB0byB0cmlnZ2VyIGNoYW5nZSBldmVudHNcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjYW5DaGFuZ2U6IHRydWVcbiAgICAgIH0pO1xuXG4gICAgfS5iaW5kKHRoaXMpO1xuXG4gICAgLy8gUnVuIHZhbGlkYXRpb24gYWdhaW4gaW4gY2FzZSBhZmZlY3RlZCBieSBvdGhlciBpbnB1dHMuIFRoZVxuICAgIC8vIGxhc3QgY29tcG9uZW50IHZhbGlkYXRlZCB3aWxsIHJ1biB0aGUgb25WYWxpZGF0aW9uQ29tcGxldGUgY2FsbGJhY2tcbiAgICBpbnB1dEtleXMuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSBpbnB1dHNbbmFtZV07XG4gICAgICB2YXIgdmFsaWRhdGlvbiA9IHRoaXMucnVuVmFsaWRhdGlvbihjb21wb25lbnQpO1xuICAgICAgaWYgKHZhbGlkYXRpb24uaXNWYWxpZCAmJiBjb21wb25lbnQuc3RhdGUuX2V4dGVybmFsRXJyb3IpIHtcbiAgICAgICAgdmFsaWRhdGlvbi5pc1ZhbGlkID0gZmFsc2U7XG4gICAgICB9XG4gICAgICBjb21wb25lbnQuc2V0U3RhdGUoe1xuICAgICAgICBfaXNWYWxpZDogdmFsaWRhdGlvbi5pc1ZhbGlkLFxuICAgICAgICBfaXNSZXF1aXJlZDogdmFsaWRhdGlvbi5pc1JlcXVpcmVkLFxuICAgICAgICBfdmFsaWRhdGlvbkVycm9yOiB2YWxpZGF0aW9uLmVycm9yLFxuICAgICAgICBfZXh0ZXJuYWxFcnJvcjogIXZhbGlkYXRpb24uaXNWYWxpZCAmJiBjb21wb25lbnQuc3RhdGUuX2V4dGVybmFsRXJyb3IgPyBjb21wb25lbnQuc3RhdGUuX2V4dGVybmFsRXJyb3IgOiBudWxsXG4gICAgICB9LCBpbmRleCA9PT0gaW5wdXRLZXlzLmxlbmd0aCAtIDEgPyBvblZhbGlkYXRpb25Db21wbGV0ZSA6IG51bGwpO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAvLyBJZiB0aGVyZSBhcmUgbm8gaW5wdXRzLCBzZXQgc3RhdGUgd2hlcmUgZm9ybSBpcyByZWFkeSB0byB0cmlnZ2VyXG4gICAgLy8gY2hhbmdlIGV2ZW50LiBOZXcgaW5wdXRzIG1pZ2h0IGJlIGFkZGVkIGxhdGVyXG4gICAgaWYgKCFpbnB1dEtleXMubGVuZ3RoICYmIHRoaXMuaXNNb3VudGVkKCkpIHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBjYW5DaGFuZ2U6IHRydWVcbiAgICAgIH0pO1xuICAgIH1cbiAgfSxcblxuICAvLyBNZXRob2QgcHV0IG9uIGVhY2ggaW5wdXQgY29tcG9uZW50IHRvIHJlZ2lzdGVyXG4gIC8vIGl0c2VsZiB0byB0aGUgZm9ybVxuICBhdHRhY2hUb0Zvcm06IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICB0aGlzLmlucHV0c1tjb21wb25lbnQucHJvcHMubmFtZV0gPSBjb21wb25lbnQ7XG4gICAgdGhpcy5tb2RlbFtjb21wb25lbnQucHJvcHMubmFtZV0gPSBjb21wb25lbnQuc3RhdGUuX3ZhbHVlO1xuICAgIHRoaXMudmFsaWRhdGUoY29tcG9uZW50KTtcbiAgfSxcblxuICAvLyBNZXRob2QgcHV0IG9uIGVhY2ggaW5wdXQgY29tcG9uZW50IHRvIHVucmVnaXN0ZXJcbiAgLy8gaXRzZWxmIGZyb20gdGhlIGZvcm1cbiAgZGV0YWNoRnJvbUZvcm06IGZ1bmN0aW9uIChjb21wb25lbnQpIHtcbiAgICBkZWxldGUgdGhpcy5pbnB1dHNbY29tcG9uZW50LnByb3BzLm5hbWVdO1xuICAgIGRlbGV0ZSB0aGlzLm1vZGVsW2NvbXBvbmVudC5wcm9wcy5uYW1lXTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG5cbiAgICByZXR1cm4gUmVhY3QuRE9NLmZvcm0oe1xuICAgICAgICBvblN1Ym1pdDogdGhpcy5zdWJtaXQsXG4gICAgICAgIGNsYXNzTmFtZTogdGhpcy5wcm9wcy5jbGFzc05hbWUgXG4gICAgICB9LFxuICAgICAgdGhpcy50cmF2ZXJzZUNoaWxkcmVuQW5kUmVnaXN0ZXJJbnB1dHModGhpcy5wcm9wcy5jaGlsZHJlbilcbiAgICApO1xuXG4gIH1cbn0pO1xuXG5pZiAoIWdsb2JhbC5leHBvcnRzICYmICFnbG9iYWwubW9kdWxlICYmICghZ2xvYmFsLmRlZmluZSB8fCAhZ2xvYmFsLmRlZmluZS5hbWQpKSB7XG4gIGdsb2JhbC5Gb3Jtc3kgPSBGb3Jtc3k7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gRm9ybXN5O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZm9ybXN5LXJlYWN0L3NyYy9tYWluLmpzXG4gKiogbW9kdWxlIGlkID0gMTc4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJleHBvcnRzLkFjdGlvbk1ldGhvZHMgPSByZXF1aXJlKCcuL0FjdGlvbk1ldGhvZHMnKTtcblxuZXhwb3J0cy5MaXN0ZW5lck1ldGhvZHMgPSByZXF1aXJlKCcuL0xpc3RlbmVyTWV0aG9kcycpO1xuXG5leHBvcnRzLlB1Ymxpc2hlck1ldGhvZHMgPSByZXF1aXJlKCcuL1B1Ymxpc2hlck1ldGhvZHMnKTtcblxuZXhwb3J0cy5TdG9yZU1ldGhvZHMgPSByZXF1aXJlKCcuL1N0b3JlTWV0aG9kcycpO1xuXG5leHBvcnRzLmNyZWF0ZUFjdGlvbiA9IHJlcXVpcmUoJy4vY3JlYXRlQWN0aW9uJyk7XG5cbmV4cG9ydHMuY3JlYXRlU3RvcmUgPSByZXF1aXJlKCcuL2NyZWF0ZVN0b3JlJyk7XG5cbmV4cG9ydHMuY29ubmVjdCA9IHJlcXVpcmUoJy4vY29ubmVjdCcpO1xuXG5leHBvcnRzLmNvbm5lY3RGaWx0ZXIgPSByZXF1aXJlKCcuL2Nvbm5lY3RGaWx0ZXInKTtcblxuZXhwb3J0cy5MaXN0ZW5lck1peGluID0gcmVxdWlyZSgnLi9MaXN0ZW5lck1peGluJyk7XG5cbmV4cG9ydHMubGlzdGVuVG8gPSByZXF1aXJlKCcuL2xpc3RlblRvJyk7XG5cbmV4cG9ydHMubGlzdGVuVG9NYW55ID0gcmVxdWlyZSgnLi9saXN0ZW5Ub01hbnknKTtcblxuXG52YXIgbWFrZXIgPSByZXF1aXJlKCcuL2pvaW5zJykuc3RhdGljSm9pbkNyZWF0b3I7XG5cbmV4cG9ydHMuam9pblRyYWlsaW5nID0gZXhwb3J0cy5hbGwgPSBtYWtlcihcImxhc3RcIik7IC8vIFJlZmx1eC5hbGwgYWxpYXMgZm9yIGJhY2t3YXJkIGNvbXBhdGliaWxpdHlcblxuZXhwb3J0cy5qb2luTGVhZGluZyA9IG1ha2VyKFwiZmlyc3RcIik7XG5cbmV4cG9ydHMuam9pblN0cmljdCA9IG1ha2VyKFwic3RyaWN0XCIpO1xuXG5leHBvcnRzLmpvaW5Db25jYXQgPSBtYWtlcihcImFsbFwiKTtcblxudmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gXy5FdmVudEVtaXR0ZXI7XG5cbmV4cG9ydHMuUHJvbWlzZSA9IF8uUHJvbWlzZTtcblxuLyoqXG4gKiBDb252ZW5pZW5jZSBmdW5jdGlvbiBmb3IgY3JlYXRpbmcgYSBzZXQgb2YgYWN0aW9uc1xuICpcbiAqIEBwYXJhbSBkZWZpbml0aW9ucyB0aGUgZGVmaW5pdGlvbnMgZm9yIHRoZSBhY3Rpb25zIHRvIGJlIGNyZWF0ZWRcbiAqIEByZXR1cm5zIGFuIG9iamVjdCB3aXRoIGFjdGlvbnMgb2YgY29ycmVzcG9uZGluZyBhY3Rpb24gbmFtZXNcbiAqL1xuZXhwb3J0cy5jcmVhdGVBY3Rpb25zID0gZnVuY3Rpb24oZGVmaW5pdGlvbnMpIHtcbiAgICB2YXIgYWN0aW9ucyA9IHt9O1xuICAgIGZvciAodmFyIGsgaW4gZGVmaW5pdGlvbnMpe1xuICAgICAgICBpZiAoZGVmaW5pdGlvbnMuaGFzT3duUHJvcGVydHkoaykpIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBkZWZpbml0aW9uc1trXSxcbiAgICAgICAgICAgICAgICBhY3Rpb25OYW1lID0gXy5pc09iamVjdCh2YWwpID8gayA6IHZhbDtcblxuICAgICAgICAgICAgYWN0aW9uc1thY3Rpb25OYW1lXSA9IGV4cG9ydHMuY3JlYXRlQWN0aW9uKHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFjdGlvbnM7XG59O1xuXG4vKipcbiAqIFNldHMgdGhlIGV2ZW50bWl0dGVyIHRoYXQgUmVmbHV4IHVzZXNcbiAqL1xuZXhwb3J0cy5zZXRFdmVudEVtaXR0ZXIgPSBmdW5jdGlvbihjdHgpIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgICBleHBvcnRzLkV2ZW50RW1pdHRlciA9IF8uRXZlbnRFbWl0dGVyID0gY3R4O1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIFByb21pc2UgbGlicmFyeSB0aGF0IFJlZmx1eCB1c2VzXG4gKi9cbmV4cG9ydHMuc2V0UHJvbWlzZSA9IGZ1bmN0aW9uKGN0eCkge1xuICAgIHZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuICAgIGV4cG9ydHMuUHJvbWlzZSA9IF8uUHJvbWlzZSA9IGN0eDtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBQcm9taXNlIGZhY3RvcnkgdGhhdCBjcmVhdGVzIG5ldyBwcm9taXNlc1xuICogQHBhcmFtIHtGdW5jdGlvbn0gZmFjdG9yeSBoYXMgdGhlIHNpZ25hdHVyZSBgZnVuY3Rpb24ocmVzb2x2ZXIpIHsgcmV0dXJuIFtuZXcgUHJvbWlzZV07IH1gXG4gKi9cbmV4cG9ydHMuc2V0UHJvbWlzZUZhY3RvcnkgPSBmdW5jdGlvbihmYWN0b3J5KSB7XG4gICAgdmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4gICAgXy5jcmVhdGVQcm9taXNlID0gZmFjdG9yeTtcbn07XG5cblxuLyoqXG4gKiBTZXRzIHRoZSBtZXRob2QgdXNlZCBmb3IgZGVmZXJyaW5nIGFjdGlvbnMgYW5kIHN0b3Jlc1xuICovXG5leHBvcnRzLm5leHRUaWNrID0gZnVuY3Rpb24obmV4dFRpY2spIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgICBfLm5leHRUaWNrID0gbmV4dFRpY2s7XG59O1xuXG4vKipcbiAqIFByb3ZpZGVzIHRoZSBzZXQgb2YgY3JlYXRlZCBhY3Rpb25zIGFuZCBzdG9yZXMgZm9yIGludHJvc3BlY3Rpb25cbiAqL1xuZXhwb3J0cy5fX2tlZXAgPSByZXF1aXJlKCcuL0tlZXAnKTtcblxuLyoqXG4gKiBXYXJuIGlmIEZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kIG5vdCBhdmFpbGFibGVcbiAqL1xuaWYgKCFGdW5jdGlvbi5wcm90b3R5cGUuYmluZCkge1xuICBjb25zb2xlLmVycm9yKFxuICAgICdGdW5jdGlvbi5wcm90b3R5cGUuYmluZCBub3QgYXZhaWxhYmxlLiAnICtcbiAgICAnRVM1IHNoaW0gcmVxdWlyZWQuICcgK1xuICAgICdodHRwczovL2dpdGh1Yi5jb20vc3BvaWtlL3JlZmx1eGpzI2VzNSdcbiAgKTtcbn1cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9zcmMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxODBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0RlZmF1bHRSZXF1aXJlZFZhbHVlOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJztcbiAgfSxcbiAgaGFzVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuICEhdmFsdWU7XG4gIH0sXG4gIG1hdGNoUmVnZXhwOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSwgcmVnZXhwKSB7XG4gICAgcmV0dXJuICEhdmFsdWUgJiYgISF2YWx1ZS5tYXRjaChyZWdleHApO1xuICB9LFxuICBpc1VuZGVmaW5lZDogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZDtcbiAgfSxcbiAgaXNFbXB0eVN0cmluZzogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnO1xuICB9LFxuICBpc0VtYWlsOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiAhdmFsdWUgfHwgdmFsdWUubWF0Y2goL14oKChbYS16XXxcXGR8WyEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkrKFxcLihbYS16XXxcXGR8WyEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkrKSopfCgoXFx4MjIpKCgoKFxceDIwfFxceDA5KSooXFx4MGRcXHgwYSkpPyhcXHgyMHxcXHgwOSkrKT8oKFtcXHgwMS1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZlxceDdmXXxcXHgyMXxbXFx4MjMtXFx4NWJdfFtcXHg1ZC1cXHg3ZV18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfChcXFxcKFtcXHgwMS1cXHgwOVxceDBiXFx4MGNcXHgwZC1cXHg3Zl18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKSkpKigoKFxceDIwfFxceDA5KSooXFx4MGRcXHgwYSkpPyhcXHgyMHxcXHgwOSkrKT8oXFx4MjIpKSlAKCgoW2Etel18XFxkfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkqKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKVxcLikrKChbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KChbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkqKFthLXpdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSkpJC9pKTtcbiAgfSxcbiAgaXNUcnVlOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZTtcbiAgfSxcbiAgaXNGYWxzZTogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IGZhbHNlO1xuICB9LFxuICBpc051bWVyaWM6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hdGNoUmVzdWx0cyA9IHZhbHVlLm1hdGNoKC9bLStdPyhcXGQqWy5dKT9cXGQrLyk7XG4gICAgICBpZiAoISFtYXRjaFJlc3VsdHMpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoUmVzdWx0c1swXSA9PSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGlzQWxwaGE6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIC9eW2EtekEtWl0rJC8udGVzdCh2YWx1ZSk7XG4gIH0sXG4gIGlzV29yZHM6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIC9eW2EtekEtWlxcc10rJC8udGVzdCh2YWx1ZSk7XG4gIH0sXG4gIGlzU3BlY2lhbFdvcmRzOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiAhdmFsdWUgfHwgdmFsdWUubWF0Y2goL15bYS16QS1aXFxzXFx1MDBDMC1cXHUwMTdGXSskLyk7XG4gIH0sXG4gIGlzTGVuZ3RoOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICB9LFxuICBlcXVhbHM6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlLCBlcWwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gZXFsO1xuICB9LFxuICBlcXVhbHNGaWVsZDogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUsIGZpZWxkKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IHZhbHVlc1tmaWVsZF07XG4gIH0sXG4gIG1heExlbmd0aDogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUsIGxlbmd0aCkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggJiYgdmFsdWUubGVuZ3RoIDw9IGxlbmd0aDtcbiAgfSxcbiAgbWluTGVuZ3RoOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPj0gbGVuZ3RoO1xuICB9XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZm9ybXN5LXJlYWN0L3NyYy92YWxpZGF0aW9uUnVsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBhcnJheXNEaWZmZXI6IGZ1bmN0aW9uIChhcnJheUEsIGFycmF5Qikge1xuICAgIHZhciBpc0RpZmZlcmVudCA9IGZhbHNlO1xuICAgIGlmIChhcnJheUEubGVuZ3RoICE9PSBhcnJheUIubGVuZ3RoKSB7XG4gICAgICBpc0RpZmZlcmVudCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5QS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBpZiAoaXRlbSAhPT0gYXJyYXlCW2luZGV4XSkge1xuICAgICAgICAgIGlzRGlmZmVyZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBpc0RpZmZlcmVudDtcbiAgfVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Zvcm1zeS1yZWFjdC9zcmMvdXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxOTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBjb252ZXJ0VmFsaWRhdGlvbnNUb09iamVjdCA9IGZ1bmN0aW9uICh2YWxpZGF0aW9ucykge1xuXG4gIGlmICh0eXBlb2YgdmFsaWRhdGlvbnMgPT09ICdzdHJpbmcnKSB7XG5cbiAgICByZXR1cm4gdmFsaWRhdGlvbnMuc3BsaXQoL1xcLCg/IVtee1xcW10qW31cXF1dKS9nKS5yZWR1Y2UoZnVuY3Rpb24gKHZhbGlkYXRpb25zLCB2YWxpZGF0aW9uKSB7XG4gICAgICB2YXIgYXJncyA9IHZhbGlkYXRpb24uc3BsaXQoJzonKTtcbiAgICAgIHZhciB2YWxpZGF0ZU1ldGhvZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGFyZ3MgPSBhcmdzLm1hcChmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYXJnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBhcmc7IC8vIEl0IGlzIGEgc3RyaW5nIGlmIGl0IGNhbiBub3QgcGFyc2UgaXRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3Jtc3kgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBhcmdzIG9uIHN0cmluZyB2YWxpZGF0aW9ucy4gVXNlIG9iamVjdCBmb3JtYXQgb2YgdmFsaWRhdGlvbnMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhbGlkYXRpb25zW3ZhbGlkYXRlTWV0aG9kXSA9IGFyZ3MubGVuZ3RoID8gYXJnc1swXSA6IHRydWU7XG4gICAgICByZXR1cm4gdmFsaWRhdGlvbnM7XG4gICAgfSwge30pO1xuXG4gIH1cblxuICByZXR1cm4gdmFsaWRhdGlvbnMgfHwge307XG5cbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF92YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgIF9pc1JlcXVpcmVkOiBmYWxzZSxcbiAgICAgIF9pc1ZhbGlkOiB0cnVlLFxuICAgICAgX2lzUHJpc3RpbmU6IHRydWUsXG4gICAgICBfcHJpc3RpbmVWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgIF92YWxpZGF0aW9uRXJyb3I6ICcnLFxuICAgICAgX2V4dGVybmFsRXJyb3I6IG51bGxcbiAgICB9O1xuICB9LFxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWRhdGlvbkVycm9yOiAnJyxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnM6IHt9XG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgY29uZmlndXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRWYWxpZGF0aW9ucyh0aGlzLnByb3BzLnZhbGlkYXRpb25zLCB0aGlzLnByb3BzLnJlcXVpcmVkKTtcbiAgICAgIHRoaXMucHJvcHMuX2F0dGFjaFRvRm9ybSh0aGlzKTtcbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICBpZiAoIXRoaXMucHJvcHMubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIElucHV0IHJlcXVpcmVzIGEgbmFtZSBwcm9wZXJ0eSB3aGVuIHVzZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJvcHMuX2F0dGFjaFRvRm9ybSkge1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNNb3VudGVkKCkpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLl9hdHRhY2hUb0Zvcm0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gTWl4aW4gcmVxdWlyZXMgY29tcG9uZW50IHRvIGJlIG5lc3RlZCBpbiBhIEZvcm0nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25maWd1cmUoKTtcbiAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgfVxuICAgIGNvbmZpZ3VyZSgpO1xuXG4gIH0sXG5cbiAgLy8gV2UgaGF2ZSB0byBtYWtlIHRoZSB2YWxpZGF0ZSBtZXRob2QgaXMga2VwdCB3aGVuIG5ldyBwcm9wcyBhcmUgYWRkZWRcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgIHRoaXMuc2V0VmFsaWRhdGlvbnMobmV4dFByb3BzLnZhbGlkYXRpb25zLCBuZXh0UHJvcHMucmVxdWlyZWQpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24gKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cbiAgICB2YXIgaXNWYWx1ZUNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnZhbHVlICE9PSBwcmV2UHJvcHMudmFsdWUgJiYgdGhpcy5zdGF0ZS5fdmFsdWUgPT09IHByZXZQcm9wcy52YWx1ZTtcblxuICAgIH0uYmluZCh0aGlzKTtcblxuXG4gICAgLy8gSWYgdmFsaWRhdGlvbnMgaGFzIGNoYW5nZWQgb3Igc29tZXRoaW5nIG91dHNpZGUgY2hhbmdlcyBcbiAgICAvLyB0aGUgdmFsdWUsIHNldCB0aGUgdmFsdWUgYWdhaW4gcnVubmluZyBhIHZhbGlkYXRpb25cbiAgICBpZiAoaXNWYWx1ZUNoYW5nZWQoKSkge1xuICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gRGV0YWNoIGl0IHdoZW4gY29tcG9uZW50IHVubW91bnRzXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9wcy5fZGV0YWNoRnJvbUZvcm0odGhpcyk7XG4gIH0sXG5cbiAgc2V0VmFsaWRhdGlvbnM6IGZ1bmN0aW9uICh2YWxpZGF0aW9ucywgcmVxdWlyZWQpIHtcblxuICAgIC8vIEFkZCB2YWxpZGF0aW9ucyB0byB0aGUgc3RvcmUgaXRzZWxmIGFzIHRoZSBwcm9wcyBvYmplY3QgY2FuIG5vdCBiZSBtb2RpZmllZFxuICAgIHRoaXMuX3ZhbGlkYXRpb25zID0gY29udmVydFZhbGlkYXRpb25zVG9PYmplY3QodmFsaWRhdGlvbnMpIHx8IHt9O1xuICAgIHRoaXMuX3JlcXVpcmVkVmFsaWRhdGlvbnMgPSByZXF1aXJlZCA9PT0gdHJ1ZSA/IHtpc0RlZmF1bHRSZXF1aXJlZFZhbHVlOiB0cnVlfSA6IGNvbnZlcnRWYWxpZGF0aW9uc1RvT2JqZWN0KHJlcXVpcmVkKTtcblxuICB9LFxuXG4gIC8vIFdlIHZhbGlkYXRlIGFmdGVyIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXRcbiAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgX3ZhbHVlOiB2YWx1ZSxcbiAgICAgIF9pc1ByaXN0aW5lOiBmYWxzZVxuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucHJvcHMuX3ZhbGlkYXRlKHRoaXMpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG4gIHJlc2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIF92YWx1ZTogdGhpcy5zdGF0ZS5fcHJpc3RpbmVWYWx1ZSxcbiAgICAgIF9pc1ByaXN0aW5lOiB0cnVlXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wcm9wcy5fdmFsaWRhdGUodGhpcyk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3ZhbHVlO1xuICB9LFxuICBoYXNWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl92YWx1ZSAhPT0gJyc7XG4gIH0sXG4gIGdldEVycm9yTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1ZhbGlkKCkgfHwgdGhpcy5zaG93UmVxdWlyZWQoKSA/ICh0aGlzLnN0YXRlLl9leHRlcm5hbEVycm9yIHx8IHRoaXMuc3RhdGUuX3ZhbGlkYXRpb25FcnJvcikgOiBudWxsO1xuICB9LFxuICBpc0Zvcm1EaXNhYmxlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLl9pc0Zvcm1EaXNhYmxlZCgpO1xuICB9LFxuICBpc1ZhbGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX2lzVmFsaWQ7XG4gIH0sXG4gIGlzUHJpc3RpbmU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5faXNQcmlzdGluZTtcbiAgfSxcbiAgaXNSZXF1aXJlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHMucmVxdWlyZWQ7XG4gIH0sXG4gIHNob3dSZXF1aXJlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9pc1JlcXVpcmVkO1xuICB9LFxuICBzaG93RXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIXRoaXMuc2hvd1JlcXVpcmVkKCkgJiYgIXRoaXMuaXNWYWxpZCgpO1xuICB9LFxuICBpc1ZhbGlkVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLl9pc1ZhbGlkVmFsdWUuY2FsbChudWxsLCB0aGlzLCB2YWx1ZSk7XG4gIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mb3Jtc3ktcmVhY3Qvc3JjL01peGluLmpzXG4gKiogbW9kdWxlIGlkID0gMjAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIvKipcbiAqIEEgbW9kdWxlIG9mIG1ldGhvZHMgdGhhdCB5b3Ugd2FudCB0byBpbmNsdWRlIGluIGFsbCBhY3Rpb25zLlxuICogVGhpcyBtb2R1bGUgaXMgY29uc3VtZWQgYnkgYGNyZWF0ZUFjdGlvbmAuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0ge1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9zcmMvQWN0aW9uTWV0aG9kcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyksXG4gICAgbWFrZXIgPSByZXF1aXJlKCcuL2pvaW5zJykuaW5zdGFuY2VKb2luQ3JlYXRvcjtcblxuLyoqXG4gKiBFeHRyYWN0IGNoaWxkIGxpc3RlbmFibGVzIGZyb20gYSBwYXJlbnQgZnJvbSB0aGVpclxuICogY2hpbGRyZW4gcHJvcGVydHkgYW5kIHJldHVybiB0aGVtIGluIGEga2V5ZWQgT2JqZWN0XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmFibGUgVGhlIHBhcmVudCBsaXN0ZW5hYmxlXG4gKi9cbnZhciBtYXBDaGlsZExpc3RlbmFibGVzID0gZnVuY3Rpb24obGlzdGVuYWJsZSkge1xuICAgIHZhciBpID0gMCwgY2hpbGRyZW4gPSB7fSwgY2hpbGROYW1lO1xuICAgIGZvciAoO2kgPCAobGlzdGVuYWJsZS5jaGlsZHJlbnx8W10pLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGNoaWxkTmFtZSA9IGxpc3RlbmFibGUuY2hpbGRyZW5baV07XG4gICAgICAgIGlmKGxpc3RlbmFibGVbY2hpbGROYW1lXSl7XG4gICAgICAgICAgICBjaGlsZHJlbltjaGlsZE5hbWVdID0gbGlzdGVuYWJsZVtjaGlsZE5hbWVdO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBjaGlsZHJlbjtcbn07XG5cbi8qKlxuICogTWFrZSBhIGZsYXQgZGljdGlvbmFyeSBvZiBhbGwgbGlzdGVuYWJsZXMgaW5jbHVkaW5nIHRoZWlyXG4gKiBwb3NzaWJsZSBjaGlsZHJlbiAocmVjdXJzaXZlbHkpLCBjb25jYXRlbmF0aW5nIG5hbWVzIGluIGNhbWVsQ2FzZS5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuYWJsZXMgVGhlIHRvcC1sZXZlbCBsaXN0ZW5hYmxlc1xuICovXG52YXIgZmxhdHRlbkxpc3RlbmFibGVzID0gZnVuY3Rpb24obGlzdGVuYWJsZXMpIHtcbiAgICB2YXIgZmxhdHRlbmVkID0ge307XG4gICAgZm9yKHZhciBrZXkgaW4gbGlzdGVuYWJsZXMpe1xuICAgICAgICB2YXIgbGlzdGVuYWJsZSA9IGxpc3RlbmFibGVzW2tleV07XG4gICAgICAgIHZhciBjaGlsZE1hcCA9IG1hcENoaWxkTGlzdGVuYWJsZXMobGlzdGVuYWJsZSk7XG5cbiAgICAgICAgLy8gcmVjdXJzaXZlbHkgZmxhdHRlbiBjaGlsZHJlblxuICAgICAgICB2YXIgY2hpbGRyZW4gPSBmbGF0dGVuTGlzdGVuYWJsZXMoY2hpbGRNYXApO1xuXG4gICAgICAgIC8vIGFkZCB0aGUgcHJpbWFyeSBsaXN0ZW5hYmxlIGFuZCBjaGlscmVuXG4gICAgICAgIGZsYXR0ZW5lZFtrZXldID0gbGlzdGVuYWJsZTtcbiAgICAgICAgZm9yKHZhciBjaGlsZEtleSBpbiBjaGlsZHJlbil7XG4gICAgICAgICAgICB2YXIgY2hpbGRMaXN0ZW5hYmxlID0gY2hpbGRyZW5bY2hpbGRLZXldO1xuICAgICAgICAgICAgZmxhdHRlbmVkW2tleSArIF8uY2FwaXRhbGl6ZShjaGlsZEtleSldID0gY2hpbGRMaXN0ZW5hYmxlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZsYXR0ZW5lZDtcbn07XG5cbi8qKlxuICogQSBtb2R1bGUgb2YgbWV0aG9kcyByZWxhdGVkIHRvIGxpc3RlbmluZy5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAgKiBBbiBpbnRlcm5hbCB1dGlsaXR5IGZ1bmN0aW9uIHVzZWQgYnkgYHZhbGlkYXRlTGlzdGVuaW5nYFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgVGhlIGxpc3RlbmFibGUgd2Ugd2FudCB0byBzZWFyY2ggZm9yXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFRoZSByZXN1bHQgb2YgYSByZWN1cnNpdmUgc2VhcmNoIGFtb25nIGB0aGlzLnN1YnNjcmlwdGlvbnNgXG4gICAgICovXG4gICAgaGFzTGlzdGVuZXI6IGZ1bmN0aW9uKGxpc3RlbmFibGUpIHtcbiAgICAgICAgdmFyIGkgPSAwLCBqLCBsaXN0ZW5lciwgbGlzdGVuYWJsZXM7XG4gICAgICAgIGZvciAoO2kgPCAodGhpcy5zdWJzY3JpcHRpb25zfHxbXSkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgICAgIGxpc3RlbmFibGVzID0gW10uY29uY2F0KHRoaXMuc3Vic2NyaXB0aW9uc1tpXS5saXN0ZW5hYmxlKTtcbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsaXN0ZW5hYmxlcy5sZW5ndGg7IGorKyl7XG4gICAgICAgICAgICAgICAgbGlzdGVuZXIgPSBsaXN0ZW5hYmxlc1tqXTtcbiAgICAgICAgICAgICAgICBpZiAobGlzdGVuZXIgPT09IGxpc3RlbmFibGUgfHwgbGlzdGVuZXIuaGFzTGlzdGVuZXIgJiYgbGlzdGVuZXIuaGFzTGlzdGVuZXIobGlzdGVuYWJsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQSBjb252ZW5pZW5jZSBtZXRob2QgdGhhdCBsaXN0ZW5zIHRvIGFsbCBsaXN0ZW5hYmxlcyBpbiB0aGUgZ2l2ZW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmFibGVzIEFuIG9iamVjdCBvZiBsaXN0ZW5hYmxlcy4gS2V5cyB3aWxsIGJlIHVzZWQgYXMgY2FsbGJhY2sgbWV0aG9kIG5hbWVzLlxuICAgICAqL1xuICAgIGxpc3RlblRvTWFueTogZnVuY3Rpb24obGlzdGVuYWJsZXMpe1xuICAgICAgICB2YXIgYWxsTGlzdGVuYWJsZXMgPSBmbGF0dGVuTGlzdGVuYWJsZXMobGlzdGVuYWJsZXMpO1xuICAgICAgICBmb3IodmFyIGtleSBpbiBhbGxMaXN0ZW5hYmxlcyl7XG4gICAgICAgICAgICB2YXIgY2JuYW1lID0gXy5jYWxsYmFja05hbWUoa2V5KSxcbiAgICAgICAgICAgICAgICBsb2NhbG5hbWUgPSB0aGlzW2NibmFtZV0gPyBjYm5hbWUgOiB0aGlzW2tleV0gPyBrZXkgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICBpZiAobG9jYWxuYW1lKXtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlblRvKGFsbExpc3RlbmFibGVzW2tleV0sbG9jYWxuYW1lLHRoaXNbY2JuYW1lK1wiRGVmYXVsdFwiXXx8dGhpc1tsb2NhbG5hbWUrXCJEZWZhdWx0XCJdfHxsb2NhbG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgY3VycmVudCBjb250ZXh0IGNhbiBsaXN0ZW4gdG8gdGhlIHN1cHBsaWVkIGxpc3RlbmFibGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIEFuIEFjdGlvbiBvciBTdG9yZSB0aGF0IHNob3VsZCBiZVxuICAgICAqICBsaXN0ZW5lZCB0by5cbiAgICAgKiBAcmV0dXJucyB7U3RyaW5nfFVuZGVmaW5lZH0gQW4gZXJyb3IgbWVzc2FnZSwgb3IgdW5kZWZpbmVkIGlmIHRoZXJlIHdhcyBubyBwcm9ibGVtLlxuICAgICAqL1xuICAgIHZhbGlkYXRlTGlzdGVuaW5nOiBmdW5jdGlvbihsaXN0ZW5hYmxlKXtcbiAgICAgICAgaWYgKGxpc3RlbmFibGUgPT09IHRoaXMpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkxpc3RlbmVyIGlzIG5vdCBhYmxlIHRvIGxpc3RlbiB0byBpdHNlbGZcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihsaXN0ZW5hYmxlLmxpc3RlbikpIHtcbiAgICAgICAgICAgIHJldHVybiBsaXN0ZW5hYmxlICsgXCIgaXMgbWlzc2luZyBhIGxpc3RlbiBtZXRob2RcIjtcbiAgICAgICAgfVxuICAgICAgICBpZiAobGlzdGVuYWJsZS5oYXNMaXN0ZW5lciAmJiBsaXN0ZW5hYmxlLmhhc0xpc3RlbmVyKHRoaXMpKSB7XG4gICAgICAgICAgICByZXR1cm4gXCJMaXN0ZW5lciBjYW5ub3QgbGlzdGVuIHRvIHRoaXMgbGlzdGVuYWJsZSBiZWNhdXNlIG9mIGNpcmN1bGFyIGxvb3BcIjtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTZXRzIHVwIGEgc3Vic2NyaXB0aW9uIHRvIHRoZSBnaXZlbiBsaXN0ZW5hYmxlIGZvciB0aGUgY29udGV4dCBvYmplY3RcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIEFuIEFjdGlvbiBvciBTdG9yZSB0aGF0IHNob3VsZCBiZVxuICAgICAqICBsaXN0ZW5lZCB0by5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGV2ZW50IGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gZGVmYXVsdENhbGxiYWNrIFRoZSBjYWxsYmFjayB0byByZWdpc3RlciBhcyBkZWZhdWx0IGhhbmRsZXJcbiAgICAgKiBAcmV0dXJucyB7T2JqZWN0fSBBIHN1YnNjcmlwdGlvbiBvYmogd2hlcmUgYHN0b3BgIGlzIGFuIHVuc3ViIGZ1bmN0aW9uIGFuZCBgbGlzdGVuYWJsZWAgaXMgdGhlIG9iamVjdCBiZWluZyBsaXN0ZW5lZCB0b1xuICAgICAqL1xuICAgIGxpc3RlblRvOiBmdW5jdGlvbihsaXN0ZW5hYmxlLCBjYWxsYmFjaywgZGVmYXVsdENhbGxiYWNrKSB7XG4gICAgICAgIHZhciBkZXN1YiwgdW5zdWJzY3JpYmVyLCBzdWJzY3JpcHRpb25vYmosIHN1YnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMgfHwgW107XG4gICAgICAgIF8udGhyb3dJZih0aGlzLnZhbGlkYXRlTGlzdGVuaW5nKGxpc3RlbmFibGUpKTtcbiAgICAgICAgdGhpcy5mZXRjaEluaXRpYWxTdGF0ZShsaXN0ZW5hYmxlLCBkZWZhdWx0Q2FsbGJhY2spO1xuICAgICAgICBkZXN1YiA9IGxpc3RlbmFibGUubGlzdGVuKHRoaXNbY2FsbGJhY2tdfHxjYWxsYmFjaywgdGhpcyk7XG4gICAgICAgIHVuc3Vic2NyaWJlciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gc3Vicy5pbmRleE9mKHN1YnNjcmlwdGlvbm9iaik7XG4gICAgICAgICAgICBfLnRocm93SWYoaW5kZXggPT09IC0xLCdUcmllZCB0byByZW1vdmUgbGlzdGVuIGFscmVhZHkgZ29uZSBmcm9tIHN1YnNjcmlwdGlvbnMgbGlzdCEnKTtcbiAgICAgICAgICAgIHN1YnMuc3BsaWNlKGluZGV4LCAxKTtcbiAgICAgICAgICAgIGRlc3ViKCk7XG4gICAgICAgIH07XG4gICAgICAgIHN1YnNjcmlwdGlvbm9iaiA9IHtcbiAgICAgICAgICAgIHN0b3A6IHVuc3Vic2NyaWJlcixcbiAgICAgICAgICAgIGxpc3RlbmFibGU6IGxpc3RlbmFibGVcbiAgICAgICAgfTtcbiAgICAgICAgc3Vicy5wdXNoKHN1YnNjcmlwdGlvbm9iaik7XG4gICAgICAgIHJldHVybiBzdWJzY3JpcHRpb25vYmo7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFN0b3BzIGxpc3RlbmluZyB0byBhIHNpbmdsZSBsaXN0ZW5hYmxlXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBUaGUgYWN0aW9uIG9yIHN0b3JlIHdlIG5vIGxvbmdlciB3YW50IHRvIGxpc3RlbiB0b1xuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSBUcnVlIGlmIGEgc3Vic2NyaXB0aW9uIHdhcyBmb3VuZCBhbmQgcmVtb3ZlZCwgb3RoZXJ3aXNlIGZhbHNlLlxuICAgICAqL1xuICAgIHN0b3BMaXN0ZW5pbmdUbzogZnVuY3Rpb24obGlzdGVuYWJsZSl7XG4gICAgICAgIHZhciBzdWIsIGkgPSAwLCBzdWJzID0gdGhpcy5zdWJzY3JpcHRpb25zIHx8IFtdO1xuICAgICAgICBmb3IoO2kgPCBzdWJzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIHN1YiA9IHN1YnNbaV07XG4gICAgICAgICAgICBpZiAoc3ViLmxpc3RlbmFibGUgPT09IGxpc3RlbmFibGUpe1xuICAgICAgICAgICAgICAgIHN1Yi5zdG9wKCk7XG4gICAgICAgICAgICAgICAgXy50aHJvd0lmKHN1YnMuaW5kZXhPZihzdWIpIT09LTEsJ0ZhaWxlZCB0byByZW1vdmUgbGlzdGVuIGZyb20gc3Vic2NyaXB0aW9ucyBsaXN0IScpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgYWxsIHN1YnNjcmlwdGlvbnMgYW5kIGVtcHRpZXMgc3Vic2NyaXB0aW9ucyBhcnJheVxuICAgICAqL1xuICAgIHN0b3BMaXN0ZW5pbmdUb0FsbDogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIHJlbWFpbmluZywgc3VicyA9IHRoaXMuc3Vic2NyaXB0aW9ucyB8fCBbXTtcbiAgICAgICAgd2hpbGUoKHJlbWFpbmluZz1zdWJzLmxlbmd0aCkpe1xuICAgICAgICAgICAgc3Vic1swXS5zdG9wKCk7XG4gICAgICAgICAgICBfLnRocm93SWYoc3Vicy5sZW5ndGghPT1yZW1haW5pbmctMSwnRmFpbGVkIHRvIHJlbW92ZSBsaXN0ZW4gZnJvbSBzdWJzY3JpcHRpb25zIGxpc3QhJyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVXNlZCBpbiBgbGlzdGVuVG9gLiBGZXRjaGVzIGluaXRpYWwgZGF0YSBmcm9tIGEgcHVibGlzaGVyIGlmIGl0IGhhcyBhIGBnZXRJbml0aWFsU3RhdGVgIG1ldGhvZC5cbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBUaGUgcHVibGlzaGVyIHdlIHdhbnQgdG8gZ2V0IGluaXRpYWwgc3RhdGUgZnJvbVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBkZWZhdWx0Q2FsbGJhY2sgVGhlIG1ldGhvZCB0byByZWNlaXZlIHRoZSBkYXRhXG4gICAgICovXG4gICAgZmV0Y2hJbml0aWFsU3RhdGU6IGZ1bmN0aW9uIChsaXN0ZW5hYmxlLCBkZWZhdWx0Q2FsbGJhY2spIHtcbiAgICAgICAgZGVmYXVsdENhbGxiYWNrID0gKGRlZmF1bHRDYWxsYmFjayAmJiB0aGlzW2RlZmF1bHRDYWxsYmFja10pIHx8IGRlZmF1bHRDYWxsYmFjaztcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgaWYgKF8uaXNGdW5jdGlvbihkZWZhdWx0Q2FsbGJhY2spICYmIF8uaXNGdW5jdGlvbihsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSkpIHtcbiAgICAgICAgICAgIHZhciBkYXRhID0gbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgICAgIGlmIChkYXRhICYmIF8uaXNGdW5jdGlvbihkYXRhLnRoZW4pKSB7XG4gICAgICAgICAgICAgICAgZGF0YS50aGVuKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICBkZWZhdWx0Q2FsbGJhY2suYXBwbHkobWUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRDYWxsYmFjay5jYWxsKHRoaXMsIGRhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFRoZSBjYWxsYmFjayB3aWxsIGJlIGNhbGxlZCBvbmNlIGFsbCBsaXN0ZW5hYmxlcyBoYXZlIHRyaWdnZXJlZCBhdCBsZWFzdCBvbmNlLlxuICAgICAqIEl0IHdpbGwgYmUgaW52b2tlZCB3aXRoIHRoZSBsYXN0IGVtaXNzaW9uIGZyb20gZWFjaCBsaXN0ZW5hYmxlLlxuICAgICAqIEBwYXJhbSB7Li4uUHVibGlzaGVyc30gcHVibGlzaGVycyBQdWJsaXNoZXJzIHRoYXQgc2hvdWxkIGJlIHRyYWNrZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGFsbCBwdWJsaXNoZXJzIGhhdmUgZW1pdHRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyBhbiBhcnJheSBvZiBsaXN0ZW5hYmxlc1xuICAgICAqL1xuICAgIGpvaW5UcmFpbGluZzogbWFrZXIoXCJsYXN0XCIpLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkIGF0IGxlYXN0IG9uY2UuXG4gICAgICogSXQgd2lsbCBiZSBpbnZva2VkIHdpdGggdGhlIGZpcnN0IGVtaXNzaW9uIGZyb20gZWFjaCBsaXN0ZW5hYmxlLlxuICAgICAqIEBwYXJhbSB7Li4uUHVibGlzaGVyc30gcHVibGlzaGVycyBQdWJsaXNoZXJzIHRoYXQgc2hvdWxkIGJlIHRyYWNrZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGFsbCBwdWJsaXNoZXJzIGhhdmUgZW1pdHRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyBhbiBhcnJheSBvZiBsaXN0ZW5hYmxlc1xuICAgICAqL1xuICAgIGpvaW5MZWFkaW5nOiBtYWtlcihcImZpcnN0XCIpLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkIGF0IGxlYXN0IG9uY2UuXG4gICAgICogSXQgd2lsbCBiZSBpbnZva2VkIHdpdGggYWxsIGVtaXNzaW9uIGZyb20gZWFjaCBsaXN0ZW5hYmxlLlxuICAgICAqIEBwYXJhbSB7Li4uUHVibGlzaGVyc30gcHVibGlzaGVycyBQdWJsaXNoZXJzIHRoYXQgc2hvdWxkIGJlIHRyYWNrZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGFsbCBwdWJsaXNoZXJzIGhhdmUgZW1pdHRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyBhbiBhcnJheSBvZiBsaXN0ZW5hYmxlc1xuICAgICAqL1xuICAgIGpvaW5Db25jYXQ6IG1ha2VyKFwiYWxsXCIpLFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkLlxuICAgICAqIElmIGEgY2FsbGJhY2sgdHJpZ2dlcnMgdHdpY2UgYmVmb3JlIHRoYXQgaGFwcGVucywgYW4gZXJyb3IgaXMgdGhyb3duLlxuICAgICAqIEBwYXJhbSB7Li4uUHVibGlzaGVyc30gcHVibGlzaGVycyBQdWJsaXNoZXJzIHRoYXQgc2hvdWxkIGJlIHRyYWNrZWQuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGNhbGxiYWNrIFRoZSBtZXRob2QgdG8gY2FsbCB3aGVuIGFsbCBwdWJsaXNoZXJzIGhhdmUgZW1pdHRlZFxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyBhbiBhcnJheSBvZiBsaXN0ZW5hYmxlc1xuICAgICAqL1xuICAgIGpvaW5TdHJpY3Q6IG1ha2VyKFwic3RyaWN0XCIpXG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9MaXN0ZW5lck1ldGhvZHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG4vKipcbiAqIEEgbW9kdWxlIG9mIG1ldGhvZHMgZm9yIG9iamVjdCB0aGF0IHlvdSB3YW50IHRvIGJlIGFibGUgdG8gbGlzdGVuIHRvLlxuICogVGhpcyBtb2R1bGUgaXMgY29uc3VtZWQgYnkgYGNyZWF0ZVN0b3JlYCBhbmQgYGNyZWF0ZUFjdGlvbmBcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG5cbiAgICAvKipcbiAgICAgKiBIb29rIHVzZWQgYnkgdGhlIHB1Ymxpc2hlciB0aGF0IGlzIGludm9rZWQgYmVmb3JlIGVtaXR0aW5nXG4gICAgICogYW5kIGJlZm9yZSBgc2hvdWxkRW1pdGAuIFRoZSBhcmd1bWVudHMgYXJlIHRoZSBvbmVzIHRoYXQgdGhlIGFjdGlvblxuICAgICAqIGlzIGludm9rZWQgd2l0aC4gSWYgdGhpcyBmdW5jdGlvbiByZXR1cm5zIHNvbWV0aGluZyBvdGhlciB0aGFuXG4gICAgICogdW5kZWZpbmVkLCB0aGF0IHdpbGwgYmUgcGFzc2VkIG9uIGFzIGFyZ3VtZW50cyBmb3Igc2hvdWxkRW1pdCBhbmRcbiAgICAgKiBlbWlzc2lvbi5cbiAgICAgKi9cbiAgICBwcmVFbWl0OiBmdW5jdGlvbigpIHt9LFxuXG4gICAgLyoqXG4gICAgICogSG9vayB1c2VkIGJ5IHRoZSBwdWJsaXNoZXIgYWZ0ZXIgYHByZUVtaXRgIHRvIGRldGVybWluZSBpZiB0aGVcbiAgICAgKiBldmVudCBzaG91bGQgYmUgZW1pdHRlZCB3aXRoIGdpdmVuIGFyZ3VtZW50cy4gVGhpcyBtYXkgYmUgb3ZlcnJpZGRlblxuICAgICAqIGluIHlvdXIgYXBwbGljYXRpb24sIGRlZmF1bHQgaW1wbGVtZW50YXRpb24gYWx3YXlzIHJldHVybnMgdHJ1ZS5cbiAgICAgKlxuICAgICAqIEByZXR1cm5zIHtCb29sZWFufSB0cnVlIGlmIGV2ZW50IHNob3VsZCBiZSBlbWl0dGVkXG4gICAgICovXG4gICAgc2hvdWxkRW1pdDogZnVuY3Rpb24oKSB7IHJldHVybiB0cnVlOyB9LFxuXG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGFjdGlvbiB0cmlnZ2VyZWRcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBjYWxsYmFjayB0byByZWdpc3RlciBhcyBldmVudCBoYW5kbGVyXG4gICAgICogQHBhcmFtIHtNaXhlZH0gW29wdGlvbmFsXSBiaW5kQ29udGV4dCBUaGUgY29udGV4dCB0byBiaW5kIHRoZSBjYWxsYmFjayB3aXRoXG4gICAgICogQHJldHVybnMge0Z1bmN0aW9ufSBDYWxsYmFjayB0aGF0IHVuc3Vic2NyaWJlcyB0aGUgcmVnaXN0ZXJlZCBldmVudCBoYW5kbGVyXG4gICAgICovXG4gICAgbGlzdGVuOiBmdW5jdGlvbihjYWxsYmFjaywgYmluZENvbnRleHQpIHtcbiAgICAgICAgYmluZENvbnRleHQgPSBiaW5kQ29udGV4dCB8fCB0aGlzO1xuICAgICAgICB2YXIgZXZlbnRIYW5kbGVyID0gZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgaWYgKGFib3J0ZWQpe1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxiYWNrLmFwcGx5KGJpbmRDb250ZXh0LCBhcmdzKTtcbiAgICAgICAgfSwgbWUgPSB0aGlzLCBhYm9ydGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZW1pdHRlci5hZGRMaXN0ZW5lcih0aGlzLmV2ZW50TGFiZWwsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGFib3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgbWUuZW1pdHRlci5yZW1vdmVMaXN0ZW5lcihtZS5ldmVudExhYmVsLCBldmVudEhhbmRsZXIpO1xuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBdHRhY2ggaGFuZGxlcnMgdG8gcHJvbWlzZSB0aGF0IHRyaWdnZXIgdGhlIGNvbXBsZXRlZCBhbmQgZmFpbGVkXG4gICAgICogY2hpbGQgcHVibGlzaGVycywgaWYgYXZhaWxhYmxlLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtPYmplY3R9IFRoZSBwcm9taXNlIHRvIGF0dGFjaCB0b1xuICAgICAqL1xuICAgIHByb21pc2U6IGZ1bmN0aW9uKHByb21pc2UpIHtcbiAgICAgICAgdmFyIG1lID0gdGhpcztcblxuICAgICAgICB2YXIgY2FuSGFuZGxlUHJvbWlzZSA9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmluZGV4T2YoJ2NvbXBsZXRlZCcpID49IDAgJiZcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uaW5kZXhPZignZmFpbGVkJykgPj0gMDtcblxuICAgICAgICBpZiAoIWNhbkhhbmRsZVByb21pc2Upe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdQdWJsaXNoZXIgbXVzdCBoYXZlIFwiY29tcGxldGVkXCIgYW5kIFwiZmFpbGVkXCIgY2hpbGQgcHVibGlzaGVycycpO1xuICAgICAgICB9XG5cbiAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICByZXR1cm4gbWUuY29tcGxldGVkKHJlc3BvbnNlKTtcbiAgICAgICAgfSwgZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICAgIHJldHVybiBtZS5mYWlsZWQoZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3Vic2NyaWJlcyB0aGUgZ2l2ZW4gY2FsbGJhY2sgZm9yIGFjdGlvbiB0cmlnZ2VyZWQsIHdoaWNoIHNob3VsZFxuICAgICAqIHJldHVybiBhIHByb21pc2UgdGhhdCBpbiB0dXJuIGlzIHBhc3NlZCB0byBgdGhpcy5wcm9taXNlYFxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBsaXN0ZW5BbmRQcm9taXNlOiBmdW5jdGlvbihjYWxsYmFjaywgYmluZENvbnRleHQpIHtcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgYmluZENvbnRleHQgPSBiaW5kQ29udGV4dCB8fCB0aGlzO1xuICAgICAgICB0aGlzLndpbGxDYWxsUHJvbWlzZSA9ICh0aGlzLndpbGxDYWxsUHJvbWlzZSB8fCAwKSArIDE7XG5cbiAgICAgICAgdmFyIHJlbW92ZUxpc3RlbiA9IHRoaXMubGlzdGVuKGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBpZiAoIWNhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIGZ1bmN0aW9uIHJldHVybmluZyBhIHByb21pc2UgYnV0IGdvdCAnICsgY2FsbGJhY2spO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxcbiAgICAgICAgICAgICAgICBwcm9taXNlID0gY2FsbGJhY2suYXBwbHkoYmluZENvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgcmV0dXJuIG1lLnByb21pc2UuY2FsbChtZSwgcHJvbWlzZSk7XG4gICAgICAgIH0sIGJpbmRDb250ZXh0KTtcblxuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIG1lLndpbGxDYWxsUHJvbWlzZS0tO1xuICAgICAgICAgIHJlbW92ZUxpc3Rlbi5jYWxsKG1lKTtcbiAgICAgICAgfTtcblxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBQdWJsaXNoZXMgYW4gZXZlbnQgdXNpbmcgYHRoaXMuZW1pdHRlcmAgKGlmIGBzaG91bGRFbWl0YCBhZ3JlZXMpXG4gICAgICovXG4gICAgdHJpZ2dlcjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgICAgcHJlID0gdGhpcy5wcmVFbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICBhcmdzID0gcHJlID09PSB1bmRlZmluZWQgPyBhcmdzIDogXy5pc0FyZ3VtZW50cyhwcmUpID8gcHJlIDogW10uY29uY2F0KHByZSk7XG4gICAgICAgIGlmICh0aGlzLnNob3VsZEVtaXQuYXBwbHkodGhpcywgYXJncykpIHtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRlci5lbWl0KHRoaXMuZXZlbnRMYWJlbCwgYXJncyk7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVHJpZXMgdG8gcHVibGlzaCB0aGUgZXZlbnQgb24gdGhlIG5leHQgdGlja1xuICAgICAqL1xuICAgIHRyaWdnZXJBc3luYzogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsbWUgPSB0aGlzO1xuICAgICAgICBfLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgbWUudHJpZ2dlci5hcHBseShtZSwgYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgUHJvbWlzZSBmb3IgdGhlIHRyaWdnZXJlZCBhY3Rpb25cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge1Byb21pc2V9XG4gICAgICogICBSZXNvbHZlZCBieSBjb21wbGV0ZWQgY2hpbGQgYWN0aW9uLlxuICAgICAqICAgUmVqZWN0ZWQgYnkgZmFpbGVkIGNoaWxkIGFjdGlvbi5cbiAgICAgKiAgIElmIGxpc3RlbkFuZFByb21pc2UnZCwgdGhlbiBwcm9taXNlIGFzc29jaWF0ZWQgdG8gdGhpcyB0cmlnZ2VyLlxuICAgICAqICAgT3RoZXJ3aXNlLCB0aGUgcHJvbWlzZSBpcyBmb3IgbmV4dCBjaGlsZCBhY3Rpb24gY29tcGxldGlvbi5cbiAgICAgKi9cbiAgICB0cmlnZ2VyUHJvbWlzZTogZnVuY3Rpb24oKXtcbiAgICAgICAgdmFyIG1lID0gdGhpcztcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG5cbiAgICAgICAgdmFyIGNhbkhhbmRsZVByb21pc2UgPVxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmRleE9mKCdjb21wbGV0ZWQnKSA+PSAwICYmXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmluZGV4T2YoJ2ZhaWxlZCcpID49IDA7XG5cbiAgICAgICAgdmFyIHByb21pc2UgPSBfLmNyZWF0ZVByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgICAvLyBJZiBgbGlzdGVuQW5kUHJvbWlzZWAgaXMgbGlzdGVuaW5nXG4gICAgICAgICAgICAvLyBwYXRjaCBgcHJvbWlzZWAgdy8gY29udGV4dC1sb2FkZWQgcmVzb2x2ZS9yZWplY3RcbiAgICAgICAgICAgIGlmIChtZS53aWxsQ2FsbFByb21pc2UpIHtcbiAgICAgICAgICAgICAgICBfLm5leHRUaWNrKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgb2xkX3Byb21pc2VfbWV0aG9kID0gbWUucHJvbWlzZTtcbiAgICAgICAgICAgICAgICAgICAgbWUucHJvbWlzZSA9IGZ1bmN0aW9uIChwcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwcm9taXNlLnRoZW4ocmVzb2x2ZSwgcmVqZWN0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJhY2sgdG8geW91ciByZWd1bGFybHkgc2NoZWR1bGUgcHJvZ3JhbW1pbmcuXG4gICAgICAgICAgICAgICAgICAgICAgICBtZS5wcm9taXNlID0gb2xkX3Byb21pc2VfbWV0aG9kO1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG1lLnByb21pc2UuYXBwbHkobWUsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIG1lLnRyaWdnZXIuYXBwbHkobWUsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGNhbkhhbmRsZVByb21pc2UpIHtcbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlU3VjY2VzcyA9IG1lLmNvbXBsZXRlZC5saXN0ZW4oZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVTdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZhaWxlZCgpO1xuICAgICAgICAgICAgICAgICAgICByZXNvbHZlKGFyZ3MpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgdmFyIHJlbW92ZUZhaWxlZCA9IG1lLmZhaWxlZC5saXN0ZW4oZnVuY3Rpb24oYXJncykge1xuICAgICAgICAgICAgICAgICAgICByZW1vdmVTdWNjZXNzKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZUZhaWxlZCgpO1xuICAgICAgICAgICAgICAgICAgICByZWplY3QoYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIG1lLnRyaWdnZXJBc3luYy5hcHBseShtZSwgYXJncyk7XG5cbiAgICAgICAgICAgIGlmICghY2FuSGFuZGxlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIHByb21pc2U7XG4gICAgfVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9zcmMvUHVibGlzaGVyTWV0aG9kcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiLyoqXG4gKiBBIG1vZHVsZSBvZiBtZXRob2RzIHRoYXQgeW91IHdhbnQgdG8gaW5jbHVkZSBpbiBhbGwgc3RvcmVzLlxuICogVGhpcyBtb2R1bGUgaXMgY29uc3VtZWQgYnkgYGNyZWF0ZVN0b3JlYC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9TdG9yZU1ldGhvZHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBLZWVwID0gcmVxdWlyZSgnLi9LZWVwJyksXG4gICAgYWxsb3dlZCA9IHtwcmVFbWl0OjEsc2hvdWxkRW1pdDoxfTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGFjdGlvbiBmdW5jdG9yIG9iamVjdC4gSXQgaXMgbWl4ZWQgaW4gd2l0aCBmdW5jdGlvbnNcbiAqIGZyb20gdGhlIGBQdWJsaXNoZXJNZXRob2RzYCBtaXhpbi4gYHByZUVtaXRgIGFuZCBgc2hvdWxkRW1pdGAgbWF5XG4gKiBiZSBvdmVycmlkZGVuIGluIHRoZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmaW5pdGlvbiBUaGUgYWN0aW9uIG9iamVjdCBkZWZpbml0aW9uXG4gKi9cbnZhciBjcmVhdGVBY3Rpb24gPSBmdW5jdGlvbihkZWZpbml0aW9uKSB7XG5cbiAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbiB8fCB7fTtcbiAgICBpZiAoIV8uaXNPYmplY3QoZGVmaW5pdGlvbikpe1xuICAgICAgICBkZWZpbml0aW9uID0ge2FjdGlvbk5hbWU6IGRlZmluaXRpb259O1xuICAgIH1cblxuICAgIGZvcih2YXIgYSBpbiBSZWZsdXguQWN0aW9uTWV0aG9kcyl7XG4gICAgICAgIGlmICghYWxsb3dlZFthXSAmJiBSZWZsdXguUHVibGlzaGVyTWV0aG9kc1thXSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IG92ZXJyaWRlIEFQSSBtZXRob2QgXCIgKyBhICtcbiAgICAgICAgICAgICAgICBcIiBpbiBSZWZsdXguQWN0aW9uTWV0aG9kcy4gVXNlIGFub3RoZXIgbWV0aG9kIG5hbWUgb3Igb3ZlcnJpZGUgaXQgb24gUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMgaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcih2YXIgZCBpbiBkZWZpbml0aW9uKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2RdICYmIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2RdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGQgK1xuICAgICAgICAgICAgICAgIFwiIGluIGFjdGlvbiBjcmVhdGlvbi4gVXNlIGFub3RoZXIgbWV0aG9kIG5hbWUgb3Igb3ZlcnJpZGUgaXQgb24gUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMgaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluaXRpb24uY2hpbGRyZW4gPSBkZWZpbml0aW9uLmNoaWxkcmVuIHx8IFtdO1xuICAgIGlmIChkZWZpbml0aW9uLmFzeW5jUmVzdWx0KXtcbiAgICAgICAgZGVmaW5pdGlvbi5jaGlsZHJlbiA9IGRlZmluaXRpb24uY2hpbGRyZW4uY29uY2F0KFtcImNvbXBsZXRlZFwiLFwiZmFpbGVkXCJdKTtcbiAgICB9XG5cbiAgICB2YXIgaSA9IDAsIGNoaWxkQWN0aW9ucyA9IHt9O1xuICAgIGZvciAoOyBpIDwgZGVmaW5pdGlvbi5jaGlsZHJlbi5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgbmFtZSA9IGRlZmluaXRpb24uY2hpbGRyZW5baV07XG4gICAgICAgIGNoaWxkQWN0aW9uc1tuYW1lXSA9IGNyZWF0ZUFjdGlvbihuYW1lKTtcbiAgICB9XG5cbiAgICB2YXIgY29udGV4dCA9IF8uZXh0ZW5kKHtcbiAgICAgICAgZXZlbnRMYWJlbDogXCJhY3Rpb25cIixcbiAgICAgICAgZW1pdHRlcjogbmV3IF8uRXZlbnRFbWl0dGVyKCksXG4gICAgICAgIF9pc0FjdGlvbjogdHJ1ZVxuICAgIH0sIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzLCBSZWZsdXguQWN0aW9uTWV0aG9kcywgZGVmaW5pdGlvbik7XG5cbiAgICB2YXIgZnVuY3RvciA9IGZ1bmN0aW9uKCkge1xuICAgICAgICByZXR1cm4gZnVuY3RvcltmdW5jdG9yLnN5bmM/XCJ0cmlnZ2VyXCI6XCJ0cmlnZ2VyUHJvbWlzZVwiXS5hcHBseShmdW5jdG9yLCBhcmd1bWVudHMpO1xuICAgIH07XG5cbiAgICBfLmV4dGVuZChmdW5jdG9yLGNoaWxkQWN0aW9ucyxjb250ZXh0KTtcblxuICAgIEtlZXAuY3JlYXRlZEFjdGlvbnMucHVzaChmdW5jdG9yKTtcblxuICAgIHJldHVybiBmdW5jdG9yO1xuXG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGNyZWF0ZUFjdGlvbjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9zcmMvY3JlYXRlQWN0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMjA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcbiAgICBSZWZsdXggPSByZXF1aXJlKCcuL2luZGV4JyksXG4gICAgS2VlcCA9IHJlcXVpcmUoJy4vS2VlcCcpLFxuICAgIG1peGVyID0gcmVxdWlyZSgnLi9taXhlcicpLFxuICAgIGFsbG93ZWQgPSB7cHJlRW1pdDoxLHNob3VsZEVtaXQ6MX0sXG4gICAgYmluZE1ldGhvZHMgPSByZXF1aXJlKCcuL2JpbmRNZXRob2RzJyk7XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBldmVudCBlbWl0dGluZyBEYXRhIFN0b3JlLiBJdCBpcyBtaXhlZCBpbiB3aXRoIGZ1bmN0aW9uc1xuICogZnJvbSB0aGUgYExpc3RlbmVyTWV0aG9kc2AgYW5kIGBQdWJsaXNoZXJNZXRob2RzYCBtaXhpbnMuIGBwcmVFbWl0YFxuICogYW5kIGBzaG91bGRFbWl0YCBtYXkgYmUgb3ZlcnJpZGRlbiBpbiB0aGUgZGVmaW5pdGlvbiBvYmplY3QuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGRlZmluaXRpb24gVGhlIGRhdGEgc3RvcmUgb2JqZWN0IGRlZmluaXRpb25cbiAqIEByZXR1cm5zIHtTdG9yZX0gQSBkYXRhIHN0b3JlIGluc3RhbmNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZGVmaW5pdGlvbikge1xuXG4gICAgZGVmaW5pdGlvbiA9IGRlZmluaXRpb24gfHwge307XG5cbiAgICBmb3IodmFyIGEgaW4gUmVmbHV4LlN0b3JlTWV0aG9kcyl7XG4gICAgICAgIGlmICghYWxsb3dlZFthXSAmJiAoUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHNbYV0gfHwgUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1thXSkpe1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IG92ZXJyaWRlIEFQSSBtZXRob2QgXCIgKyBhICtcbiAgICAgICAgICAgICAgICBcIiBpbiBSZWZsdXguU3RvcmVNZXRob2RzLiBVc2UgYW5vdGhlciBtZXRob2QgbmFtZSBvciBvdmVycmlkZSBpdCBvbiBSZWZsdXguUHVibGlzaGVyTWV0aG9kcyAvIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMgaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZvcih2YXIgZCBpbiBkZWZpbml0aW9uKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2RdICYmIChSZWZsdXguUHVibGlzaGVyTWV0aG9kc1tkXSB8fCBSZWZsdXguTGlzdGVuZXJNZXRob2RzW2RdKSl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGQgK1xuICAgICAgICAgICAgICAgIFwiIGluIHN0b3JlIGNyZWF0aW9uLiBVc2UgYW5vdGhlciBtZXRob2QgbmFtZSBvciBvdmVycmlkZSBpdCBvbiBSZWZsdXguUHVibGlzaGVyTWV0aG9kcyAvIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMgaW5zdGVhZC5cIlxuICAgICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlZmluaXRpb24gPSBtaXhlcihkZWZpbml0aW9uKTtcblxuICAgIGZ1bmN0aW9uIFN0b3JlKCkge1xuICAgICAgICB2YXIgaT0wLCBhcnI7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9IFtdO1xuICAgICAgICB0aGlzLmVtaXR0ZXIgPSBuZXcgXy5FdmVudEVtaXR0ZXIoKTtcbiAgICAgICAgdGhpcy5ldmVudExhYmVsID0gXCJjaGFuZ2VcIjtcbiAgICAgICAgYmluZE1ldGhvZHModGhpcywgZGVmaW5pdGlvbik7XG4gICAgICAgIGlmICh0aGlzLmluaXQgJiYgXy5pc0Z1bmN0aW9uKHRoaXMuaW5pdCkpIHtcbiAgICAgICAgICAgIHRoaXMuaW5pdCgpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0aGlzLmxpc3RlbmFibGVzKXtcbiAgICAgICAgICAgIGFyciA9IFtdLmNvbmNhdCh0aGlzLmxpc3RlbmFibGVzKTtcbiAgICAgICAgICAgIGZvcig7aSA8IGFyci5sZW5ndGg7aSsrKXtcbiAgICAgICAgICAgICAgICB0aGlzLmxpc3RlblRvTWFueShhcnJbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgXy5leHRlbmQoU3RvcmUucHJvdG90eXBlLCBSZWZsdXguTGlzdGVuZXJNZXRob2RzLCBSZWZsdXguUHVibGlzaGVyTWV0aG9kcywgUmVmbHV4LlN0b3JlTWV0aG9kcywgZGVmaW5pdGlvbik7XG5cbiAgICB2YXIgc3RvcmUgPSBuZXcgU3RvcmUoKTtcbiAgICBLZWVwLmNyZWF0ZWRTdG9yZXMucHVzaChzdG9yZSk7XG5cbiAgICByZXR1cm4gc3RvcmU7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9jcmVhdGVTdG9yZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGUsa2V5KXtcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICBpZiAoIV8uaXNGdW5jdGlvbihsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGtleSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBfLm9iamVjdChba2V5XSxbbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIF8uZXh0ZW5kKHRoaXMsUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyk7XG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzLCBjYiA9IChrZXkgPT09IHVuZGVmaW5lZCA/IHRoaXMuc2V0U3RhdGUgOiBmdW5jdGlvbih2KXttZS5zZXRTdGF0ZShfLm9iamVjdChba2V5XSxbdl0pKTt9KTtcbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG8obGlzdGVuYWJsZSxjYik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNaXhpbi5jb21wb25lbnRXaWxsVW5tb3VudFxuICAgIH07XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9jb25uZWN0LmpzXG4gKiogbW9kdWxlIGlkID0gMjA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpLFxuICBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGUsIGtleSwgZmlsdGVyRnVuYykge1xuICAgIGZpbHRlckZ1bmMgPSBfLmlzRnVuY3Rpb24oa2V5KSA/IGtleSA6IGZpbHRlckZ1bmM7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICghXy5pc0Z1bmN0aW9uKGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoXy5pc0Z1bmN0aW9uKGtleSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmlsdGVyRnVuYy5jYWxsKHRoaXMsIGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKCkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgaW5pdGlhbCBwYXlsb2FkIGZyb20gc3RvcmUuXG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZpbHRlckZ1bmMuY2FsbCh0aGlzLCBsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSgpKTtcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gXy5vYmplY3QoW2tleV0sIFtyZXN1bHRdKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgXy5leHRlbmQodGhpcywgUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyk7XG4gICAgICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICAgICAgdmFyIGNiID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGtleSkpIHtcbiAgICAgICAgICAgICAgICAgICAgbWUuc2V0U3RhdGUoZmlsdGVyRnVuYy5jYWxsKG1lLCB2YWx1ZSkpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciByZXN1bHQgPSBmaWx0ZXJGdW5jLmNhbGwobWUsIHZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgbWUuc2V0U3RhdGUoXy5vYmplY3QoW2tleV0sIFtyZXN1bHRdKSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5saXN0ZW5UbyhsaXN0ZW5hYmxlLCBjYik7XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNaXhpbi5jb21wb25lbnRXaWxsVW5tb3VudFxuICAgIH07XG59O1xuXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL2Nvbm5lY3RGaWx0ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIExpc3RlbmVyTWV0aG9kcyA9IHJlcXVpcmUoJy4vTGlzdGVuZXJNZXRob2RzJyk7XG5cbi8qKlxuICogQSBtb2R1bGUgbWVhbnQgdG8gYmUgY29uc3VtZWQgYXMgYSBtaXhpbiBieSBhIFJlYWN0IGNvbXBvbmVudC4gU3VwcGxpZXMgdGhlIG1ldGhvZHMgZnJvbVxuICogYExpc3RlbmVyTWV0aG9kc2AgbWl4aW4gYW5kIHRha2VzIGNhcmUgb2YgdGVhcmRvd24gb2Ygc3Vic2NyaXB0aW9ucy5cbiAqIE5vdGUgdGhhdCBpZiB5b3UncmUgdXNpbmcgdGhlIGBjb25uZWN0YCBtaXhpbiB5b3UgZG9uJ3QgbmVlZCB0aGlzIG1peGluLCBhcyBjb25uZWN0IHdpbGxcbiAqIGltcG9ydCBldmVyeXRoaW5nIHRoaXMgbWl4aW4gY29udGFpbnMhXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gXy5leHRlbmQoe1xuXG4gICAgLyoqXG4gICAgICogQ2xlYW5zIHVwIGFsbCBsaXN0ZW5lciBwcmV2aW91c2x5IHJlZ2lzdGVyZWQuXG4gICAgICovXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQ6IExpc3RlbmVyTWV0aG9kcy5zdG9wTGlzdGVuaW5nVG9BbGxcblxufSwgTGlzdGVuZXJNZXRob2RzKTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9zcmMvTGlzdGVuZXJNaXhpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDIxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxuXG4vKipcbiAqIEEgbWl4aW4gZmFjdG9yeSBmb3IgYSBSZWFjdCBjb21wb25lbnQuIE1lYW50IGFzIGEgbW9yZSBjb252ZW5pZW50IHdheSBvZiB1c2luZyB0aGUgYExpc3RlbmVyTWl4aW5gLFxuICogd2l0aG91dCBoYXZpbmcgdG8gbWFudWFsbHkgc2V0IGxpc3RlbmVycyBpbiB0aGUgYGNvbXBvbmVudERpZE1vdW50YCBtZXRob2QuXG4gKlxuICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gKiAgbGlzdGVuZWQgdG8uXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGV2ZW50IGhhbmRsZXJcbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBkZWZhdWx0Q2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGRlZmF1bHQgaGFuZGxlclxuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHRvIGJlIHVzZWQgYXMgYSBtaXhpbiwgd2hpY2ggc2V0cyB1cCB0aGUgbGlzdGVuZXIgZm9yIHRoZSBnaXZlbiBsaXN0ZW5hYmxlLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGUsY2FsbGJhY2ssaW5pdGlhbCl7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldCB1cCB0aGUgbWl4aW4gYmVmb3JlIHRoZSBpbml0aWFsIHJlbmRlcmluZyBvY2N1cnMuIEltcG9ydCBtZXRob2RzIGZyb20gYExpc3RlbmVyTWV0aG9kc2BcbiAgICAgICAgICogYW5kIHRoZW4gbWFrZSB0aGUgY2FsbCB0byBgbGlzdGVuVG9gIHdpdGggdGhlIGFyZ3VtZW50cyBwcm92aWRlZCB0byB0aGUgZmFjdG9yeSBmdW5jdGlvblxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgZm9yKHZhciBtIGluIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMpe1xuICAgICAgICAgICAgICAgIGlmICh0aGlzW21dICE9PSBSZWZsdXguTGlzdGVuZXJNZXRob2RzW21dKXtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXNbbV0pe1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgXCJDYW4ndCBoYXZlIG90aGVyIHByb3BlcnR5ICdcIittK1wiJyB3aGVuIHVzaW5nIFJlZmx1eC5saXN0ZW5UbyFcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzW21dID0gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1ttXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKGxpc3RlbmFibGUsY2FsbGJhY2ssaW5pdGlhbCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhbnMgdXAgYWxsIGxpc3RlbmVyIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNZXRob2RzLnN0b3BMaXN0ZW5pbmdUb0FsbFxuICAgIH07XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9saXN0ZW5Uby5qc1xuICoqIG1vZHVsZSBpZCA9IDIxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKTtcblxuLyoqXG4gKiBBIG1peGluIGZhY3RvcnkgZm9yIGEgUmVhY3QgY29tcG9uZW50LiBNZWFudCBhcyBhIG1vcmUgY29udmVuaWVudCB3YXkgb2YgdXNpbmcgdGhlIGBsaXN0ZW5lck1peGluYCxcbiAqIHdpdGhvdXQgaGF2aW5nIHRvIG1hbnVhbGx5IHNldCBsaXN0ZW5lcnMgaW4gdGhlIGBjb21wb25lbnREaWRNb3VudGAgbWV0aG9kLiBUaGlzIHZlcnNpb24gaXMgdXNlZFxuICogdG8gYXV0b21hdGljYWxseSBzZXQgdXAgYSBgbGlzdGVuVG9NYW55YCBjYWxsLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5hYmxlcyBBbiBvYmplY3Qgb2YgbGlzdGVuYWJsZXNcbiAqIEByZXR1cm5zIHtPYmplY3R9IEFuIG9iamVjdCB0byBiZSB1c2VkIGFzIGEgbWl4aW4sIHdoaWNoIHNldHMgdXAgdGhlIGxpc3RlbmVycyBmb3IgdGhlIGdpdmVuIGxpc3RlbmFibGVzLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3RlbmFibGVzKXtcbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHVwIHRoZSBtaXhpbiBiZWZvcmUgdGhlIGluaXRpYWwgcmVuZGVyaW5nIG9jY3Vycy4gSW1wb3J0IG1ldGhvZHMgZnJvbSBgTGlzdGVuZXJNZXRob2RzYFxuICAgICAgICAgKiBhbmQgdGhlbiBtYWtlIHRoZSBjYWxsIHRvIGBsaXN0ZW5Ub2Agd2l0aCB0aGUgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IodmFyIG0gaW4gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbbV0gIT09IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbbV0pe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1ttXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbid0IGhhdmUgb3RoZXIgcHJvcGVydHkgJ1wiK20rXCInIHdoZW4gdXNpbmcgUmVmbHV4Lmxpc3RlblRvTWFueSFcIjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB0aGlzW21dID0gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1ttXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvTWFueShsaXN0ZW5hYmxlcyk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDbGVhbnMgdXAgYWxsIGxpc3RlbmVyIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC5cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudFdpbGxVbm1vdW50OiBSZWZsdXguTGlzdGVuZXJNZXRob2RzLnN0b3BMaXN0ZW5pbmdUb0FsbFxuICAgIH07XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9saXN0ZW5Ub01hbnkuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIi8qKlxuICogSW50ZXJuYWwgbW9kdWxlIHVzZWQgdG8gY3JlYXRlIHN0YXRpYyBhbmQgaW5zdGFuY2Ugam9pbiBtZXRob2RzXG4gKi9cblxudmFyIHNsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLFxuICAgIF8gPSByZXF1aXJlKFwiLi91dGlsc1wiKSxcbiAgICBjcmVhdGVTdG9yZSA9IHJlcXVpcmUoXCIuL2NyZWF0ZVN0b3JlXCIpLFxuICAgIHN0cmF0ZWd5TWV0aG9kTmFtZXMgPSB7XG4gICAgICAgIHN0cmljdDogXCJqb2luU3RyaWN0XCIsXG4gICAgICAgIGZpcnN0OiBcImpvaW5MZWFkaW5nXCIsXG4gICAgICAgIGxhc3Q6IFwiam9pblRyYWlsaW5nXCIsXG4gICAgICAgIGFsbDogXCJqb2luQ29uY2F0XCJcbiAgICB9O1xuXG4vKipcbiAqIFVzZWQgaW4gYGluZGV4LmpzYCB0byBjcmVhdGUgdGhlIHN0YXRpYyBqb2luIG1ldGhvZHNcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHJhdGVneSBXaGljaCBzdHJhdGVneSB0byB1c2Ugd2hlbiB0cmFja2luZyBsaXN0ZW5hYmxlIHRyaWdnZXIgYXJndW1lbnRzXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IEEgc3RhdGljIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgYSBzdG9yZSB3aXRoIGEgam9pbiBsaXN0ZW4gb24gdGhlIGdpdmVuIGxpc3RlbmFibGVzIHVzaW5nIHRoZSBnaXZlbiBzdHJhdGVneVxuICovXG5leHBvcnRzLnN0YXRpY0pvaW5DcmVhdG9yID0gZnVuY3Rpb24oc3RyYXRlZ3kpe1xuICAgIHJldHVybiBmdW5jdGlvbigvKiBsaXN0ZW5hYmxlcy4uLiAqLykge1xuICAgICAgICB2YXIgbGlzdGVuYWJsZXMgPSBzbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHJldHVybiBjcmVhdGVTdG9yZSh7XG4gICAgICAgICAgICBpbml0OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgIHRoaXNbc3RyYXRlZ3lNZXRob2ROYW1lc1tzdHJhdGVneV1dLmFwcGx5KHRoaXMsbGlzdGVuYWJsZXMuY29uY2F0KFwidHJpZ2dlckFzeW5jXCIpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfTtcbn07XG5cbi8qKlxuICogVXNlZCBpbiBgTGlzdGVuZXJNZXRob2RzLmpzYCB0byBjcmVhdGUgdGhlIGluc3RhbmNlIGpvaW4gbWV0aG9kc1xuICogQHBhcmFtIHtTdHJpbmd9IHN0cmF0ZWd5IFdoaWNoIHN0cmF0ZWd5IHRvIHVzZSB3aGVuIHRyYWNraW5nIGxpc3RlbmFibGUgdHJpZ2dlciBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQW4gaW5zdGFuY2UgbWV0aG9kIHdoaWNoIHNldHMgdXAgYSBqb2luIGxpc3RlbiBvbiB0aGUgZ2l2ZW4gbGlzdGVuYWJsZXMgdXNpbmcgdGhlIGdpdmVuIHN0cmF0ZWd5XG4gKi9cbmV4cG9ydHMuaW5zdGFuY2VKb2luQ3JlYXRvciA9IGZ1bmN0aW9uKHN0cmF0ZWd5KXtcbiAgICByZXR1cm4gZnVuY3Rpb24oLyogbGlzdGVuYWJsZXMuLi4sIGNhbGxiYWNrKi8pe1xuICAgICAgICBfLnRocm93SWYoYXJndW1lbnRzLmxlbmd0aCA8IDMsJ0Nhbm5vdCBjcmVhdGUgYSBqb2luIHdpdGggbGVzcyB0aGFuIDIgbGlzdGVuYWJsZXMhJyk7XG4gICAgICAgIHZhciBsaXN0ZW5hYmxlcyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKSxcbiAgICAgICAgICAgIGNhbGxiYWNrID0gbGlzdGVuYWJsZXMucG9wKCksXG4gICAgICAgICAgICBudW1iZXJPZkxpc3RlbmFibGVzID0gbGlzdGVuYWJsZXMubGVuZ3RoLFxuICAgICAgICAgICAgam9pbiA9IHtcbiAgICAgICAgICAgICAgICBudW1iZXJPZkxpc3RlbmFibGVzOiBudW1iZXJPZkxpc3RlbmFibGVzLFxuICAgICAgICAgICAgICAgIGNhbGxiYWNrOiB0aGlzW2NhbGxiYWNrXXx8Y2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgbGlzdGVuZXI6IHRoaXMsXG4gICAgICAgICAgICAgICAgc3RyYXRlZ3k6IHN0cmF0ZWd5XG4gICAgICAgICAgICB9LCBpLCBjYW5jZWxzID0gW10sIHN1Ym9iajtcbiAgICAgICAgZm9yIChpID0gMDsgaSA8IG51bWJlck9mTGlzdGVuYWJsZXM7IGkrKykge1xuICAgICAgICAgICAgXy50aHJvd0lmKHRoaXMudmFsaWRhdGVMaXN0ZW5pbmcobGlzdGVuYWJsZXNbaV0pKTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtYmVyT2ZMaXN0ZW5hYmxlczsgaSsrKSB7XG4gICAgICAgICAgICBjYW5jZWxzLnB1c2gobGlzdGVuYWJsZXNbaV0ubGlzdGVuKG5ld0xpc3RlbmVyKGksam9pbiksdGhpcykpO1xuICAgICAgICB9XG4gICAgICAgIHJlc2V0KGpvaW4pO1xuICAgICAgICBzdWJvYmogPSB7bGlzdGVuYWJsZTogbGlzdGVuYWJsZXN9O1xuICAgICAgICBzdWJvYmouc3RvcCA9IG1ha2VTdG9wcGVyKHN1Ym9iaixjYW5jZWxzLHRoaXMpO1xuICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbnMgPSAodGhpcy5zdWJzY3JpcHRpb25zIHx8IFtdKS5jb25jYXQoc3Vib2JqKTtcbiAgICAgICAgcmV0dXJuIHN1Ym9iajtcbiAgICB9O1xufTtcblxuLy8gLS0tLSBpbnRlcm5hbCBqb2luIGZ1bmN0aW9ucyAtLS0tXG5cbmZ1bmN0aW9uIG1ha2VTdG9wcGVyKHN1Ym9iaixjYW5jZWxzLGNvbnRleHQpe1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGksIHN1YnMgPSBjb250ZXh0LnN1YnNjcmlwdGlvbnMsXG4gICAgICAgICAgICBpbmRleCA9IChzdWJzID8gc3Vicy5pbmRleE9mKHN1Ym9iaikgOiAtMSk7XG4gICAgICAgIF8udGhyb3dJZihpbmRleCA9PT0gLTEsJ1RyaWVkIHRvIHJlbW92ZSBqb2luIGFscmVhZHkgZ29uZSBmcm9tIHN1YnNjcmlwdGlvbnMgbGlzdCEnKTtcbiAgICAgICAgZm9yKGk9MDtpIDwgY2FuY2Vscy5sZW5ndGg7IGkrKyl7XG4gICAgICAgICAgICBjYW5jZWxzW2ldKCk7XG4gICAgICAgIH1cbiAgICAgICAgc3Vicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIHJlc2V0KGpvaW4pIHtcbiAgICBqb2luLmxpc3RlbmFibGVzRW1pdHRlZCA9IG5ldyBBcnJheShqb2luLm51bWJlck9mTGlzdGVuYWJsZXMpO1xuICAgIGpvaW4uYXJncyA9IG5ldyBBcnJheShqb2luLm51bWJlck9mTGlzdGVuYWJsZXMpO1xufVxuXG5mdW5jdGlvbiBuZXdMaXN0ZW5lcihpLGpvaW4pIHtcbiAgICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgICAgIHZhciBjYWxsYXJncyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgaWYgKGpvaW4ubGlzdGVuYWJsZXNFbWl0dGVkW2ldKXtcbiAgICAgICAgICAgIHN3aXRjaChqb2luLnN0cmF0ZWd5KXtcbiAgICAgICAgICAgICAgICBjYXNlIFwic3RyaWN0XCI6IHRocm93IG5ldyBFcnJvcihcIlN0cmljdCBqb2luIGZhaWxlZCBiZWNhdXNlIGxpc3RlbmVyIHRyaWdnZXJlZCB0d2ljZS5cIik7XG4gICAgICAgICAgICAgICAgY2FzZSBcImxhc3RcIjogam9pbi5hcmdzW2ldID0gY2FsbGFyZ3M7IGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgXCJhbGxcIjogam9pbi5hcmdzW2ldLnB1c2goY2FsbGFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgam9pbi5saXN0ZW5hYmxlc0VtaXR0ZWRbaV0gPSB0cnVlO1xuICAgICAgICAgICAgam9pbi5hcmdzW2ldID0gKGpvaW4uc3RyYXRlZ3k9PT1cImFsbFwiP1tjYWxsYXJnc106Y2FsbGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIGVtaXRJZkFsbExpc3RlbmFibGVzRW1pdHRlZChqb2luKTtcbiAgICB9O1xufVxuXG5mdW5jdGlvbiBlbWl0SWZBbGxMaXN0ZW5hYmxlc0VtaXR0ZWQoam9pbikge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgam9pbi5udW1iZXJPZkxpc3RlbmFibGVzOyBpKyspIHtcbiAgICAgICAgaWYgKCFqb2luLmxpc3RlbmFibGVzRW1pdHRlZFtpXSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgfVxuICAgIGpvaW4uY2FsbGJhY2suYXBwbHkoam9pbi5saXN0ZW5lcixqb2luLmFyZ3MpO1xuICAgIHJlc2V0KGpvaW4pO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9qb2lucy5qc1xuICoqIG1vZHVsZSBpZCA9IDIxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiLypcbiAqIGlzT2JqZWN0LCBleHRlbmQsIGlzRnVuY3Rpb24sIGlzQXJndW1lbnRzIGFyZSB0YWtlbiBmcm9tIHVuZGVzY29yZS9sb2Rhc2ggaW5cbiAqIG9yZGVyIHRvIHJlbW92ZSB0aGUgZGVwZW5kZW5jeVxuICovXG52YXIgaXNPYmplY3QgPSBleHBvcnRzLmlzT2JqZWN0ID0gZnVuY3Rpb24ob2JqKSB7XG4gICAgdmFyIHR5cGUgPSB0eXBlb2Ygb2JqO1xuICAgIHJldHVybiB0eXBlID09PSAnZnVuY3Rpb24nIHx8IHR5cGUgPT09ICdvYmplY3QnICYmICEhb2JqO1xufTtcblxuZXhwb3J0cy5leHRlbmQgPSBmdW5jdGlvbihvYmopIHtcbiAgICBpZiAoIWlzT2JqZWN0KG9iaikpIHtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG4gICAgdmFyIHNvdXJjZSwgcHJvcDtcbiAgICBmb3IgKHZhciBpID0gMSwgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHNvdXJjZSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgZm9yIChwcm9wIGluIHNvdXJjZSkge1xuICAgICAgICAgICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgICAgICAgICAgdmFyIHByb3BlcnR5RGVzY3JpcHRvciA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Ioc291cmNlLCBwcm9wKTtcbiAgICAgICAgICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkob2JqLCBwcm9wLCBwcm9wZXJ0eURlc2NyaXB0b3IpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBvYmpbcHJvcF0gPSBzb3VyY2VbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbn07XG5cbmV4cG9ydHMuaXNGdW5jdGlvbiA9IGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbn07XG5cbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gcmVxdWlyZSgnZXZlbnRlbWl0dGVyMycpO1xuXG5leHBvcnRzLm5leHRUaWNrID0gZnVuY3Rpb24oY2FsbGJhY2spIHtcbiAgICBzZXRUaW1lb3V0KGNhbGxiYWNrLCAwKTtcbn07XG5cbmV4cG9ydHMuY2FwaXRhbGl6ZSA9IGZ1bmN0aW9uKHN0cmluZyl7XG4gICAgcmV0dXJuIHN0cmluZy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKStzdHJpbmcuc2xpY2UoMSk7XG59O1xuXG5leHBvcnRzLmNhbGxiYWNrTmFtZSA9IGZ1bmN0aW9uKHN0cmluZyl7XG4gICAgcmV0dXJuIFwib25cIitleHBvcnRzLmNhcGl0YWxpemUoc3RyaW5nKTtcbn07XG5cbmV4cG9ydHMub2JqZWN0ID0gZnVuY3Rpb24oa2V5cyx2YWxzKXtcbiAgICB2YXIgbz17fSwgaT0wO1xuICAgIGZvcig7aTxrZXlzLmxlbmd0aDtpKyspe1xuICAgICAgICBvW2tleXNbaV1dID0gdmFsc1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIG87XG59O1xuXG5leHBvcnRzLlByb21pc2UgPSByZXF1aXJlKFwibmF0aXZlLXByb21pc2Utb25seVwiKTtcblxuZXhwb3J0cy5jcmVhdGVQcm9taXNlID0gZnVuY3Rpb24ocmVzb2x2ZXIpIHtcbiAgICByZXR1cm4gbmV3IGV4cG9ydHMuUHJvbWlzZShyZXNvbHZlcik7XG59O1xuXG5leHBvcnRzLmlzQXJndW1lbnRzID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiAoJ2NhbGxlZScgaW4gdmFsdWUpICYmIHR5cGVvZiB2YWx1ZS5sZW5ndGggPT09ICdudW1iZXInO1xufTtcblxuZXhwb3J0cy50aHJvd0lmID0gZnVuY3Rpb24odmFsLG1zZyl7XG4gICAgaWYgKHZhbCl7XG4gICAgICAgIHRocm93IEVycm9yKG1zZ3x8dmFsKTtcbiAgICB9XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy91dGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDIxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiZXhwb3J0cy5jcmVhdGVkU3RvcmVzID0gW107XG5cbmV4cG9ydHMuY3JlYXRlZEFjdGlvbnMgPSBbXTtcblxuZXhwb3J0cy5yZXNldCA9IGZ1bmN0aW9uKCkge1xuICAgIHdoaWxlKGV4cG9ydHMuY3JlYXRlZFN0b3Jlcy5sZW5ndGgpIHtcbiAgICAgICAgZXhwb3J0cy5jcmVhdGVkU3RvcmVzLnBvcCgpO1xuICAgIH1cbiAgICB3aGlsZShleHBvcnRzLmNyZWF0ZWRBY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICBleHBvcnRzLmNyZWF0ZWRBY3Rpb25zLnBvcCgpO1xuICAgIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL0tlZXAuanNcbiAqKiBtb2R1bGUgaWQgPSAyMTZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG1peChkZWYpIHtcbiAgICB2YXIgY29tcG9zZWQgPSB7XG4gICAgICAgIGluaXQ6IFtdLFxuICAgICAgICBwcmVFbWl0OiBbXSxcbiAgICAgICAgc2hvdWxkRW1pdDogW11cbiAgICB9O1xuXG4gICAgdmFyIHVwZGF0ZWQgPSAoZnVuY3Rpb24gbWl4RGVmKG1peGluKSB7XG4gICAgICAgIHZhciBtaXhlZCA9IHt9O1xuICAgICAgICBpZiAobWl4aW4ubWl4aW5zKSB7XG4gICAgICAgICAgICBtaXhpbi5taXhpbnMuZm9yRWFjaChmdW5jdGlvbiAoc3ViTWl4aW4pIHtcbiAgICAgICAgICAgICAgICBfLmV4dGVuZChtaXhlZCwgbWl4RGVmKHN1Yk1peGluKSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBfLmV4dGVuZChtaXhlZCwgbWl4aW4pO1xuICAgICAgICBPYmplY3Qua2V5cyhjb21wb3NlZCkuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9zYWJsZSkge1xuICAgICAgICAgICAgaWYgKG1peGluLmhhc093blByb3BlcnR5KGNvbXBvc2FibGUpKSB7XG4gICAgICAgICAgICAgICAgY29tcG9zZWRbY29tcG9zYWJsZV0ucHVzaChtaXhpbltjb21wb3NhYmxlXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbWl4ZWQ7XG4gICAgfShkZWYpKTtcblxuICAgIGlmIChjb21wb3NlZC5pbml0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdXBkYXRlZC5pbml0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICBjb21wb3NlZC5pbml0LmZvckVhY2goZnVuY3Rpb24gKGluaXQpIHtcbiAgICAgICAgICAgICAgICBpbml0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgfSwgdGhpcyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChjb21wb3NlZC5wcmVFbWl0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdXBkYXRlZC5wcmVFbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvc2VkLnByZUVtaXQucmVkdWNlKGZ1bmN0aW9uIChhcmdzLCBwcmVFbWl0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gcHJlRW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3VmFsdWUgPT09IHVuZGVmaW5lZCA/IGFyZ3MgOiBbbmV3VmFsdWVdO1xuICAgICAgICAgICAgfS5iaW5kKHRoaXMpLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBpZiAoY29tcG9zZWQuc2hvdWxkRW1pdC5sZW5ndGggPiAxKSB7XG4gICAgICAgIHVwZGF0ZWQuc2hvdWxkRW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgcmV0dXJuICFjb21wb3NlZC5zaG91bGRFbWl0LnNvbWUoZnVuY3Rpb24gKHNob3VsZEVtaXQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gIXNob3VsZEVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgT2JqZWN0LmtleXMoY29tcG9zZWQpLmZvckVhY2goZnVuY3Rpb24gKGNvbXBvc2FibGUpIHtcbiAgICAgICAgaWYgKGNvbXBvc2VkW2NvbXBvc2FibGVdLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgdXBkYXRlZFtjb21wb3NhYmxlXSA9IGNvbXBvc2VkW2NvbXBvc2FibGVdWzBdO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICByZXR1cm4gdXBkYXRlZDtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL21peGVyLmpzXG4gKiogbW9kdWxlIGlkID0gMjI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0b3JlLCBkZWZpbml0aW9uKSB7XG4gIGZvciAodmFyIG5hbWUgaW4gZGVmaW5pdGlvbikge1xuICAgIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICYmIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSkge1xuICAgICAgICB2YXIgcHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihkZWZpbml0aW9uLCBuYW1lKTtcblxuICAgICAgICBpZiAoIXByb3BlcnR5RGVzY3JpcHRvci52YWx1ZSB8fCB0eXBlb2YgcHJvcGVydHlEZXNjcmlwdG9yLnZhbHVlICE9PSAnZnVuY3Rpb24nIHx8ICFkZWZpbml0aW9uLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHN0b3JlW25hbWVdID0gZGVmaW5pdGlvbltuYW1lXS5iaW5kKHN0b3JlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgcHJvcGVydHkgPSBkZWZpbml0aW9uW25hbWVdO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcGVydHkgIT09ICdmdW5jdGlvbicgfHwgIWRlZmluaXRpb24uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcmVbbmFtZV0gPSBwcm9wZXJ0eS5iaW5kKHN0b3JlKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RvcmU7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9iaW5kTWV0aG9kcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIyNVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIFJlcHJlc2VudGF0aW9uIG9mIGEgc2luZ2xlIEV2ZW50RW1pdHRlciBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBFdmVudCBoYW5kbGVyIHRvIGJlIGNhbGxlZC5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgQ29udGV4dCBmb3IgZnVuY3Rpb24gZXhlY3V0aW9uLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgZW1pdCBvbmNlXG4gKiBAYXBpIHByaXZhdGVcbiAqL1xuZnVuY3Rpb24gRUUoZm4sIGNvbnRleHQsIG9uY2UpIHtcbiAgdGhpcy5mbiA9IGZuO1xuICB0aGlzLmNvbnRleHQgPSBjb250ZXh0O1xuICB0aGlzLm9uY2UgPSBvbmNlIHx8IGZhbHNlO1xufVxuXG4vKipcbiAqIE1pbmltYWwgRXZlbnRFbWl0dGVyIGludGVyZmFjZSB0aGF0IGlzIG1vbGRlZCBhZ2FpbnN0IHRoZSBOb2RlLmpzXG4gKiBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlLlxuICpcbiAqIEBjb25zdHJ1Y3RvclxuICogQGFwaSBwdWJsaWNcbiAqL1xuZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkgeyAvKiBOb3RoaW5nIHRvIHNldCAqLyB9XG5cbi8qKlxuICogSG9sZHMgdGhlIGFzc2lnbmVkIEV2ZW50RW1pdHRlcnMgYnkgbmFtZS5cbiAqXG4gKiBAdHlwZSB7T2JqZWN0fVxuICogQHByaXZhdGVcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuXG4vKipcbiAqIFJldHVybiBhIGxpc3Qgb2YgYXNzaWduZWQgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgZXZlbnRzIHRoYXQgc2hvdWxkIGJlIGxpc3RlZC5cbiAqIEByZXR1cm5zIHtBcnJheX1cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUubGlzdGVuZXJzID0gZnVuY3Rpb24gbGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gW107XG4gIGlmICh0aGlzLl9ldmVudHNbZXZlbnRdLmZuKSByZXR1cm4gW3RoaXMuX2V2ZW50c1tldmVudF0uZm5dO1xuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gdGhpcy5fZXZlbnRzW2V2ZW50XS5sZW5ndGgsIGVlID0gbmV3IEFycmF5KGwpOyBpIDwgbDsgaSsrKSB7XG4gICAgZWVbaV0gPSB0aGlzLl9ldmVudHNbZXZlbnRdW2ldLmZuO1xuICB9XG5cbiAgcmV0dXJuIGVlO1xufTtcblxuLyoqXG4gKiBFbWl0IGFuIGV2ZW50IHRvIGFsbCByZWdpc3RlcmVkIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIG5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHJldHVybnMge0Jvb2xlYW59IEluZGljYXRpb24gaWYgd2UndmUgZW1pdHRlZCBhbiBldmVudC5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIGVtaXQoZXZlbnQsIGExLCBhMiwgYTMsIGE0LCBhNSkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIGZhbHNlO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBsZW4gPSBhcmd1bWVudHMubGVuZ3RoXG4gICAgLCBhcmdzXG4gICAgLCBpO1xuXG4gIGlmICgnZnVuY3Rpb24nID09PSB0eXBlb2YgbGlzdGVuZXJzLmZuKSB7XG4gICAgaWYgKGxpc3RlbmVycy5vbmNlKSB0aGlzLnJlbW92ZUxpc3RlbmVyKGV2ZW50LCBsaXN0ZW5lcnMuZm4sIHRydWUpO1xuXG4gICAgc3dpdGNoIChsZW4pIHtcbiAgICAgIGNhc2UgMTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgMjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSksIHRydWU7XG4gICAgICBjYXNlIDM6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNDogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzKSwgdHJ1ZTtcbiAgICAgIGNhc2UgNTogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCksIHRydWU7XG4gICAgICBjYXNlIDY6IHJldHVybiBsaXN0ZW5lcnMuZm4uY2FsbChsaXN0ZW5lcnMuY29udGV4dCwgYTEsIGEyLCBhMywgYTQsIGE1KSwgdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGkgPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGkgPCBsZW47IGkrKykge1xuICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgfVxuXG4gICAgbGlzdGVuZXJzLmZuLmFwcGx5KGxpc3RlbmVycy5jb250ZXh0LCBhcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aFxuICAgICAgLCBqO1xuXG4gICAgZm9yIChpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVyc1tpXS5mbiwgdHJ1ZSk7XG5cbiAgICAgIHN3aXRjaCAobGVuKSB7XG4gICAgICAgIGNhc2UgMTogbGlzdGVuZXJzW2ldLmZuLmNhbGwobGlzdGVuZXJzW2ldLmNvbnRleHQpOyBicmVhaztcbiAgICAgICAgY2FzZSAyOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEpOyBicmVhaztcbiAgICAgICAgY2FzZSAzOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCwgYTEsIGEyKTsgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgaWYgKCFhcmdzKSBmb3IgKGogPSAxLCBhcmdzID0gbmV3IEFycmF5KGxlbiAtMSk7IGogPCBsZW47IGorKykge1xuICAgICAgICAgICAgYXJnc1tqIC0gMV0gPSBhcmd1bWVudHNbal07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgbGlzdGVuZXJzW2ldLmZuLmFwcGx5KGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhcmdzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gdHJ1ZTtcbn07XG5cbi8qKlxuICogUmVnaXN0ZXIgYSBuZXcgRXZlbnRMaXN0ZW5lciBmb3IgdGhlIGdpdmVuIGV2ZW50LlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBOYW1lIG9mIHRoZSBldmVudC5cbiAqIEBwYXJhbSB7RnVuY3Rvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiBvbihldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IHRoaXMpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdKSB0aGlzLl9ldmVudHNbZXZlbnRdID0gbGlzdGVuZXI7XG4gIGVsc2Uge1xuICAgIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XS5mbikgdGhpcy5fZXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICBlbHNlIHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXG4gICAgICB0aGlzLl9ldmVudHNbZXZlbnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogQWRkIGFuIEV2ZW50TGlzdGVuZXIgdGhhdCdzIG9ubHkgY2FsbGVkIG9uY2UuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQ2FsbGJhY2sgZnVuY3Rpb24uXG4gKiBAcGFyYW0ge01peGVkfSBjb250ZXh0IFRoZSBjb250ZXh0IG9mIHRoZSBmdW5jdGlvbi5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uIG9uY2UoZXZlbnQsIGZuLCBjb250ZXh0KSB7XG4gIHZhciBsaXN0ZW5lciA9IG5ldyBFRShmbiwgY29udGV4dCB8fCB0aGlzLCB0cnVlKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cykgdGhpcy5fZXZlbnRzID0ge307XG4gIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XSkgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IGxpc3RlbmVyO1xuICBlbHNlIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0uZm4pIHRoaXMuX2V2ZW50c1tldmVudF0ucHVzaChsaXN0ZW5lcik7XG4gICAgZWxzZSB0aGlzLl9ldmVudHNbZXZlbnRdID0gW1xuICAgICAgdGhpcy5fZXZlbnRzW2V2ZW50XSwgbGlzdGVuZXJcbiAgICBdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3ZSB3YW50IHRvIHJlbW92ZS5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBsaXN0ZW5lciB0aGF0IHdlIG5lZWQgdG8gZmluZC5cbiAqIEBwYXJhbSB7Qm9vbGVhbn0gb25jZSBPbmx5IHJlbW92ZSBvbmNlIGxpc3RlbmVycy5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbiByZW1vdmVMaXN0ZW5lcihldmVudCwgZm4sIG9uY2UpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiB0aGlzO1xuXG4gIHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbZXZlbnRdXG4gICAgLCBldmVudHMgPSBbXTtcblxuICBpZiAoZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLmZuICYmIChsaXN0ZW5lcnMuZm4gIT09IGZuIHx8IChvbmNlICYmICFsaXN0ZW5lcnMub25jZSkpKSB7XG4gICAgICBldmVudHMucHVzaChsaXN0ZW5lcnMpO1xuICAgIH1cbiAgICBpZiAoIWxpc3RlbmVycy5mbikgZm9yICh2YXIgaSA9IDAsIGxlbmd0aCA9IGxpc3RlbmVycy5sZW5ndGg7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGxpc3RlbmVyc1tpXS5mbiAhPT0gZm4gfHwgKG9uY2UgJiYgIWxpc3RlbmVyc1tpXS5vbmNlKSkge1xuICAgICAgICBldmVudHMucHVzaChsaXN0ZW5lcnNbaV0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vXG4gIC8vIFJlc2V0IHRoZSBhcnJheSwgb3IgcmVtb3ZlIGl0IGNvbXBsZXRlbHkgaWYgd2UgaGF2ZSBubyBtb3JlIGxpc3RlbmVycy5cbiAgLy9cbiAgaWYgKGV2ZW50cy5sZW5ndGgpIHtcbiAgICB0aGlzLl9ldmVudHNbZXZlbnRdID0gZXZlbnRzLmxlbmd0aCA9PT0gMSA/IGV2ZW50c1swXSA6IGV2ZW50cztcbiAgfSBlbHNlIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW2V2ZW50XTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBSZW1vdmUgYWxsIGxpc3RlbmVycyBvciBvbmx5IHRoZSBsaXN0ZW5lcnMgZm9yIHRoZSBzcGVjaWZpZWQgZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudCB3YW50IHRvIHJlbW92ZSBhbGwgbGlzdGVuZXJzIGZvci5cbiAqIEBhcGkgcHVibGljXG4gKi9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlQWxsTGlzdGVuZXJzID0gZnVuY3Rpb24gcmVtb3ZlQWxsTGlzdGVuZXJzKGV2ZW50KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzKSByZXR1cm4gdGhpcztcblxuICBpZiAoZXZlbnQpIGRlbGV0ZSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICBlbHNlIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy9cbi8vIEFsaWFzIG1ldGhvZHMgbmFtZXMgYmVjYXVzZSBwZW9wbGUgcm9sbCBsaWtlIHRoYXQuXG4vL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBFdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUub247XG5cbi8vXG4vLyBUaGlzIGZ1bmN0aW9uIGRvZXNuJ3QgYXBwbHkgYW55bW9yZS5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnNldE1heExpc3RlbmVycyA9IGZ1bmN0aW9uIHNldE1heExpc3RlbmVycygpIHtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gRXhwb3NlIHRoZSBtb2R1bGUuXG4vL1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIyID0gRXZlbnRFbWl0dGVyO1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcjMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5tb2R1bGUuZXhwb3J0cyA9IEV2ZW50RW1pdHRlcjtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9+L2V2ZW50ZW1pdHRlcjMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIi8qISBOYXRpdmUgUHJvbWlzZSBPbmx5XG4gICAgdjAuNy42LWEgKGMpIEt5bGUgU2ltcHNvblxuICAgIE1JVCBMaWNlbnNlOiBodHRwOi8vZ2V0aWZ5Lm1pdC1saWNlbnNlLm9yZ1xuKi9cbiFmdW5jdGlvbih0LG4sZSl7blt0XT1uW3RdfHxlKCksXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZSYmbW9kdWxlLmV4cG9ydHM/bW9kdWxlLmV4cG9ydHM9blt0XTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQmJmRlZmluZShmdW5jdGlvbigpe3JldHVybiBuW3RdfSl9KFwiUHJvbWlzZVwiLFwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWw/Z2xvYmFsOnRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQsbil7bC5hZGQodCxuKSxofHwoaD15KGwuZHJhaW4pKX1mdW5jdGlvbiBuKHQpe3ZhciBuLGU9dHlwZW9mIHQ7cmV0dXJuIG51bGw9PXR8fFwib2JqZWN0XCIhPWUmJlwiZnVuY3Rpb25cIiE9ZXx8KG49dC50aGVuKSxcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246ITF9ZnVuY3Rpb24gZSgpe2Zvcih2YXIgdD0wO3Q8dGhpcy5jaGFpbi5sZW5ndGg7dCsrKW8odGhpcywxPT09dGhpcy5zdGF0ZT90aGlzLmNoYWluW3RdLnN1Y2Nlc3M6dGhpcy5jaGFpblt0XS5mYWlsdXJlLHRoaXMuY2hhaW5bdF0pO3RoaXMuY2hhaW4ubGVuZ3RoPTB9ZnVuY3Rpb24gbyh0LGUsbyl7dmFyIHIsaTt0cnl7ZT09PSExP28ucmVqZWN0KHQubXNnKToocj1lPT09ITA/dC5tc2c6ZS5jYWxsKHZvaWQgMCx0Lm1zZykscj09PW8ucHJvbWlzZT9vLnJlamVjdChUeXBlRXJyb3IoXCJQcm9taXNlLWNoYWluIGN5Y2xlXCIpKTooaT1uKHIpKT9pLmNhbGwocixvLnJlc29sdmUsby5yZWplY3QpOm8ucmVzb2x2ZShyKSl9Y2F0Y2goYyl7by5yZWplY3QoYyl9fWZ1bmN0aW9uIHIobyl7dmFyIGMsdSxhPXRoaXM7aWYoIWEudHJpZ2dlcmVkKXthLnRyaWdnZXJlZD0hMCxhLmRlZiYmKGE9YS5kZWYpO3RyeXsoYz1uKG8pKT8odT1uZXcgZihhKSxjLmNhbGwobyxmdW5jdGlvbigpe3IuYXBwbHkodSxhcmd1bWVudHMpfSxmdW5jdGlvbigpe2kuYXBwbHkodSxhcmd1bWVudHMpfSkpOihhLm1zZz1vLGEuc3RhdGU9MSxhLmNoYWluLmxlbmd0aD4wJiZ0KGUsYSkpfWNhdGNoKHMpe2kuY2FsbCh1fHxuZXcgZihhKSxzKX19fWZ1bmN0aW9uIGkobil7dmFyIG89dGhpcztvLnRyaWdnZXJlZHx8KG8udHJpZ2dlcmVkPSEwLG8uZGVmJiYobz1vLmRlZiksby5tc2c9bixvLnN0YXRlPTIsby5jaGFpbi5sZW5ndGg+MCYmdChlLG8pKX1mdW5jdGlvbiBjKHQsbixlLG8pe2Zvcih2YXIgcj0wO3I8bi5sZW5ndGg7cisrKSFmdW5jdGlvbihyKXt0LnJlc29sdmUobltyXSkudGhlbihmdW5jdGlvbih0KXtlKHIsdCl9LG8pfShyKX1mdW5jdGlvbiBmKHQpe3RoaXMuZGVmPXQsdGhpcy50cmlnZ2VyZWQ9ITF9ZnVuY3Rpb24gdSh0KXt0aGlzLnByb21pc2U9dCx0aGlzLnN0YXRlPTAsdGhpcy50cmlnZ2VyZWQ9ITEsdGhpcy5jaGFpbj1bXSx0aGlzLm1zZz12b2lkIDB9ZnVuY3Rpb24gYShuKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2lmKDAhPT10aGlzLl9fTlBPX18pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgcHJvbWlzZVwiKTt0aGlzLl9fTlBPX189MTt2YXIgbz1uZXcgdSh0aGlzKTt0aGlzLnRoZW49ZnVuY3Rpb24obixyKXt2YXIgaT17c3VjY2VzczpcImZ1bmN0aW9uXCI9PXR5cGVvZiBuP246ITAsZmFpbHVyZTpcImZ1bmN0aW9uXCI9PXR5cGVvZiByP3I6ITF9O3JldHVybiBpLnByb21pc2U9bmV3IHRoaXMuY29uc3RydWN0b3IoZnVuY3Rpb24odCxuKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiB0fHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBuKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2kucmVzb2x2ZT10LGkucmVqZWN0PW59KSxvLmNoYWluLnB1c2goaSksMCE9PW8uc3RhdGUmJnQoZSxvKSxpLnByb21pc2V9LHRoaXNbXCJjYXRjaFwiXT1mdW5jdGlvbih0KXtyZXR1cm4gdGhpcy50aGVuKHZvaWQgMCx0KX07dHJ5e24uY2FsbCh2b2lkIDAsZnVuY3Rpb24odCl7ci5jYWxsKG8sdCl9LGZ1bmN0aW9uKHQpe2kuY2FsbChvLHQpfSl9Y2F0Y2goYyl7aS5jYWxsKG8sYyl9fXZhciBzLGgsbCxwPU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcseT1cInVuZGVmaW5lZFwiIT10eXBlb2Ygc2V0SW1tZWRpYXRlP2Z1bmN0aW9uKHQpe3JldHVybiBzZXRJbW1lZGlhdGUodCl9OnNldFRpbWVvdXQ7dHJ5e09iamVjdC5kZWZpbmVQcm9wZXJ0eSh7fSxcInhcIix7fSkscz1mdW5jdGlvbih0LG4sZSxvKXtyZXR1cm4gT2JqZWN0LmRlZmluZVByb3BlcnR5KHQsbix7dmFsdWU6ZSx3cml0YWJsZTohMCxjb25maWd1cmFibGU6byE9PSExfSl9fWNhdGNoKGQpe3M9ZnVuY3Rpb24odCxuLGUpe3JldHVybiB0W25dPWUsdH19bD1mdW5jdGlvbigpe2Z1bmN0aW9uIHQodCxuKXt0aGlzLmZuPXQsdGhpcy5zZWxmPW4sdGhpcy5uZXh0PXZvaWQgMH12YXIgbixlLG87cmV0dXJue2FkZDpmdW5jdGlvbihyLGkpe289bmV3IHQocixpKSxlP2UubmV4dD1vOm49byxlPW8sbz12b2lkIDB9LGRyYWluOmZ1bmN0aW9uKCl7dmFyIHQ9bjtmb3Iobj1lPWg9dm9pZCAwO3Q7KXQuZm4uY2FsbCh0LnNlbGYpLHQ9dC5uZXh0fX19KCk7dmFyIGc9cyh7fSxcImNvbnN0cnVjdG9yXCIsYSwhMSk7cmV0dXJuIHMoYSxcInByb3RvdHlwZVwiLGcsITEpLHMoZyxcIl9fTlBPX19cIiwwLCExKSxzKGEsXCJyZXNvbHZlXCIsZnVuY3Rpb24odCl7dmFyIG49dGhpcztyZXR1cm4gdCYmXCJvYmplY3RcIj09dHlwZW9mIHQmJjE9PT10Ll9fTlBPX18/dDpuZXcgbihmdW5jdGlvbihuLGUpe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG58fFwiZnVuY3Rpb25cIiE9dHlwZW9mIGUpdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7bih0KX0pfSkscyhhLFwicmVqZWN0XCIsZnVuY3Rpb24odCl7cmV0dXJuIG5ldyB0aGlzKGZ1bmN0aW9uKG4sZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbnx8XCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtlKHQpfSl9KSxzKGEsXCJhbGxcIixmdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVyblwiW29iamVjdCBBcnJheV1cIiE9cC5jYWxsKHQpP24ucmVqZWN0KFR5cGVFcnJvcihcIk5vdCBhbiBhcnJheVwiKSk6MD09PXQubGVuZ3RoP24ucmVzb2x2ZShbXSk6bmV3IG4oZnVuY3Rpb24oZSxvKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBvKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO3ZhciByPXQubGVuZ3RoLGk9QXJyYXkociksZj0wO2Mobix0LGZ1bmN0aW9uKHQsbil7aVt0XT1uLCsrZj09PXImJmUoaSl9LG8pfSl9KSxzKGEsXCJyYWNlXCIsZnVuY3Rpb24odCl7dmFyIG49dGhpcztyZXR1cm5cIltvYmplY3QgQXJyYXldXCIhPXAuY2FsbCh0KT9uLnJlamVjdChUeXBlRXJyb3IoXCJOb3QgYW4gYXJyYXlcIikpOm5ldyBuKGZ1bmN0aW9uKGUsbyl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2YgZXx8XCJmdW5jdGlvblwiIT10eXBlb2Ygbyl0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtjKG4sdCxmdW5jdGlvbih0LG4pe2Uobil9LG8pfSl9KSxhfSk7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvfi9uYXRpdmUtcHJvbWlzZS1vbmx5L25wby5qc1xuICoqIG1vZHVsZSBpZCA9IDIyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIG5leHRUaWNrID0gcmVxdWlyZSgncHJvY2Vzcy9icm93c2VyLmpzJykubmV4dFRpY2s7XG52YXIgYXBwbHkgPSBGdW5jdGlvbi5wcm90b3R5cGUuYXBwbHk7XG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgaW1tZWRpYXRlSWRzID0ge307XG52YXIgbmV4dEltbWVkaWF0ZUlkID0gMDtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJUaW1lb3V0KTtcbn07XG5leHBvcnRzLnNldEludGVydmFsID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldEludGVydmFsLCB3aW5kb3csIGFyZ3VtZW50cyksIGNsZWFySW50ZXJ2YWwpO1xufTtcbmV4cG9ydHMuY2xlYXJUaW1lb3V0ID1cbmV4cG9ydHMuY2xlYXJJbnRlcnZhbCA9IGZ1bmN0aW9uKHRpbWVvdXQpIHsgdGltZW91dC5jbG9zZSgpOyB9O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHdpbmRvdywgdGhpcy5faWQpO1xufTtcblxuLy8gRG9lcyBub3Qgc3RhcnQgdGhlIHRpbWUsIGp1c3Qgc2V0cyB1cCB0aGUgbWVtYmVycyBuZWVkZWQuXG5leHBvcnRzLmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0sIG1zZWNzKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSBtc2Vjcztcbn07XG5cbmV4cG9ydHMudW5lbnJvbGwgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcbiAgaXRlbS5faWRsZVRpbWVvdXQgPSAtMTtcbn07XG5cbmV4cG9ydHMuX3VucmVmQWN0aXZlID0gZXhwb3J0cy5hY3RpdmUgPSBmdW5jdGlvbihpdGVtKSB7XG4gIGNsZWFyVGltZW91dChpdGVtLl9pZGxlVGltZW91dElkKTtcblxuICB2YXIgbXNlY3MgPSBpdGVtLl9pZGxlVGltZW91dDtcbiAgaWYgKG1zZWNzID49IDApIHtcbiAgICBpdGVtLl9pZGxlVGltZW91dElkID0gc2V0VGltZW91dChmdW5jdGlvbiBvblRpbWVvdXQoKSB7XG4gICAgICBpZiAoaXRlbS5fb25UaW1lb3V0KVxuICAgICAgICBpdGVtLl9vblRpbWVvdXQoKTtcbiAgICB9LCBtc2Vjcyk7XG4gIH1cbn07XG5cbi8vIFRoYXQncyBub3QgaG93IG5vZGUuanMgaW1wbGVtZW50cyBpdCBidXQgdGhlIGV4cG9zZWQgYXBpIGlzIHRoZSBzYW1lLlxuZXhwb3J0cy5zZXRJbW1lZGlhdGUgPSB0eXBlb2Ygc2V0SW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBzZXRJbW1lZGlhdGUgOiBmdW5jdGlvbihmbikge1xuICB2YXIgaWQgPSBuZXh0SW1tZWRpYXRlSWQrKztcbiAgdmFyIGFyZ3MgPSBhcmd1bWVudHMubGVuZ3RoIDwgMiA/IGZhbHNlIDogc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuXG4gIGltbWVkaWF0ZUlkc1tpZF0gPSB0cnVlO1xuXG4gIG5leHRUaWNrKGZ1bmN0aW9uIG9uTmV4dFRpY2soKSB7XG4gICAgaWYgKGltbWVkaWF0ZUlkc1tpZF0pIHtcbiAgICAgIC8vIGZuLmNhbGwoKSBpcyBmYXN0ZXIgc28gd2Ugb3B0aW1pemUgZm9yIHRoZSBjb21tb24gdXNlLWNhc2VcbiAgICAgIC8vIEBzZWUgaHR0cDovL2pzcGVyZi5jb20vY2FsbC1hcHBseS1zZWd1XG4gICAgICBpZiAoYXJncykge1xuICAgICAgICBmbi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZuLmNhbGwobnVsbCk7XG4gICAgICB9XG4gICAgICAvLyBQcmV2ZW50IGlkcyBmcm9tIGxlYWtpbmdcbiAgICAgIGV4cG9ydHMuY2xlYXJJbW1lZGlhdGUoaWQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGlkO1xufTtcblxuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9IHR5cGVvZiBjbGVhckltbWVkaWF0ZSA9PT0gXCJmdW5jdGlvblwiID8gY2xlYXJJbW1lZGlhdGUgOiBmdW5jdGlvbihpZCkge1xuICBkZWxldGUgaW1tZWRpYXRlSWRzW2lkXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvfi9ub2RlLWxpYnMtYnJvd3Nlci9+L3RpbWVycy1icm93c2VyaWZ5L21haW4uanNcbiAqKiBtb2R1bGUgaWQgPSAyMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX193ZWJwYWNrX2FtZF9vcHRpb25zX187XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogKHdlYnBhY2spL2J1aWxkaW4vYW1kLW9wdGlvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMzFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=