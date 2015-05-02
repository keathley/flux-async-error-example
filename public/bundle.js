webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    Router = __webpack_require__(2);
	
	var Profile = __webpack_require__(23);
	
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

/***/ 23:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var ProfileForm = __webpack_require__(42),
	    ProfileDetails = __webpack_require__(43);
	
	var Profile = React.createClass({
	  displayName: 'Profile',
	
	  render: function render() {
	    return React.createElement(
	      'div',
	      { className: 'profile' },
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

/***/ 42:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    Reflux = __webpack_require__(133),
	    Formsy = __webpack_require__(135);
	
	var InputField = __webpack_require__(67);
	
	var UserActions = __webpack_require__(68);
	var UserStore = __webpack_require__(69);
	
	var ProfileForm = React.createClass({
	  displayName: 'ProfileForm',
	
	  mixins: [Reflux.connect(UserStore, 'user')],
	  getInitialState: function getInitialState() {
	    return { canSubmit: false };
	  },
	  handleSubmit: function handleSubmit(data) {
	    UserActions.updateProfile(data);
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
	    var errors = user.errors;
	
	    console.log(user);
	
	    return React.createElement(
	      'section',
	      { className: 'group' },
	      React.createElement(
	        Formsy.Form,
	        { onSubmit: this.handleSubmit,
	          onValid: this.enableButton,
	          onInvalid: this.disableButton },
	        React.createElement(InputField, { name: 'name',
	          title: 'Name',
	          value: name,
	          errors: errors.name,
	          required: true }),
	        React.createElement(InputField, { name: 'email',
	          title: 'Email',
	          value: email,
	          validations: 'isEmail',
	          validationError: 'This is not a valid email',
	          errors: errors.email,
	          required: true }),
	        React.createElement(
	          'button',
	          { type: 'submit', disabled: disabled },
	          'Test Submit'
	        )
	      )
	    );
	  }
	});
	
	module.exports = ProfileForm;

/***/ },

/***/ 43:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1);
	var Reflux = __webpack_require__(133);
	
	var UserStore = __webpack_require__(69);
	
	var ProfileDetails = React.createClass({
	  displayName: 'ProfileDetails',
	
	  mixins: [Reflux.connect(UserStore, 'user')],
	  render: function render() {
	    var user = this.state.user || {};
	    var name = user.name;
	    var email = user.email;
	
	    return React.createElement(
	      'section',
	      { className: 'group' },
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

/***/ 67:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    Formsy = __webpack_require__(135);
	
	var InputField = React.createClass({
	  displayName: 'InputField',
	
	  mixins: [Formsy.Mixin],
	  getInitialState: function getInitialState() {
	    return { showErrors: true };
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
	    if (!this.isPristine() && !this.showError()) this.setState({ showErrors: false });
	  },
	  className: function className() {
	    return propClassName(this.props) + ' ' + required(this.showRequired()) + ' ' + error(this.showError() || this.props.errors);
	
	    function propClassName(props) {
	      return props.className ? props.className : '';
	    }
	
	    function required(isRequired) {
	      return isRequired ? 'required' : null;
	    }
	
	    function error(isError) {
	      return isError ? 'error' : null;
	    }
	  },
	  render: function render() {
	    var className = this.className();
	    var errorMessage = this.state.showErrors ? this.getErrorMessage() : '';
	    var asyncErrors = this.props.errors || '';
	
	    console.log(className);
	
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
	        onFocus: this.handleFocus,
	        autoComplete: 'off' }),
	      React.createElement(
	        'span',
	        { className: 'validation-error' },
	        errorMessage
	      ),
	      React.createElement(
	        'span',
	        { className: 'validation-error' },
	        asyncErrors
	      )
	    );
	  }
	});
	
	module.exports = InputField;

/***/ },

/***/ 68:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Reflux = __webpack_require__(133);
	
	var userActions = Reflux.createActions(['updateProfile', 'updateProfileFailed', 'updateProfileCompleted']);
	
	userActions.updateProfile.listen(function (newProfile) {
	  setTimeout(updateAPICall.bind(this), 1000);
	
	  function updateAPICall() {
	    console.log('loaded');
	    if (newProfile.email === 'taken@carbonfive.com') {
	      userActions.updateProfileFailed({ email: 'Email has been taken' });
	    } else {
	      newProfile.errors = {};
	      userActions.updateProfileCompleted(newProfile);
	    }
	  }
	});
	
	module.exports = userActions;

/***/ },

/***/ 69:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var Reflux = __webpack_require__(133);
	
	var userActions = __webpack_require__(68);
	
	var UserStore = Reflux.createStore({
	  listenables: userActions,
	
	  init: function init() {
	    this.profile = {
	      name: 'chris',
	      email: 'chrisk@carbonfive.com',
	      errors: {}
	    };
	  },
	
	  getInitialState: function getInitialState() {
	    return this.profile;
	  },
	
	  onUpdateProfile: function onUpdateProfile(profile) {
	    console.log(profile);
	  },
	
	  onUpdateProfileCompleted: function onUpdateProfileCompleted(newProfile) {
	    console.log(newProfile);
	    this.profile = newProfile;
	    this.trigger(this.profile);
	  },
	
	  onUpdateProfileFailed: function onUpdateProfileFailed(errors) {
	    console.log(errors);
	    this.profile.errors = errors;
	    this.trigger(this.profile);
	  }
	});
	
	module.exports = UserStore;

/***/ },

/***/ 133:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(180);


/***/ },

/***/ 135:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var React = global.React || __webpack_require__(1);
	var Formsy = {};
	var validationRules = __webpack_require__(181);
	var utils = __webpack_require__(182);
	var Mixin = __webpack_require__(183);
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

/***/ 181:
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

/***/ 182:
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

/***/ 183:
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL1Byb2ZpbGUuanN4Iiwid2VicGFjazovLy8uL2FwcC9zdHlsZXMvaW5kZXguc2NzcyIsIndlYnBhY2s6Ly8vLi9hcHAvY29tcG9uZW50cy9Qcm9maWxlRm9ybS5qc3giLCJ3ZWJwYWNrOi8vLy4vYXBwL2NvbXBvbmVudHMvUHJvZmlsZURldGFpbHMuanN4Iiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL0lucHV0RmllbGQuanN4Iiwid2VicGFjazovLy8uL2FwcC9hY3Rpb25zL1VzZXJBY3Rpb25zLmpzIiwid2VicGFjazovLy8uL2FwcC9zdG9yZXMvVXNlclN0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L2luZGV4LmpzIiwid2VicGFjazovLy8uL34vZm9ybXN5LXJlYWN0L3NyYy9tYWluLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9+L2Zvcm1zeS1yZWFjdC9zcmMvdmFsaWRhdGlvblJ1bGVzLmpzIiwid2VicGFjazovLy8uL34vZm9ybXN5LXJlYWN0L3NyYy91dGlscy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Zvcm1zeS1yZWFjdC9zcmMvTWl4aW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL0FjdGlvbk1ldGhvZHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL0xpc3RlbmVyTWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9zcmMvUHVibGlzaGVyTWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9zcmMvU3RvcmVNZXRob2RzLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9jcmVhdGVBY3Rpb24uanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL2NyZWF0ZVN0b3JlLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9jb25uZWN0LmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9jb25uZWN0RmlsdGVyLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9MaXN0ZW5lck1peGluLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9saXN0ZW5Uby5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9zcmMvbGlzdGVuVG9NYW55LmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9qb2lucy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL0tlZXAuanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvc3JjL21peGVyLmpzIiwid2VicGFjazovLy8uL34vcmVmbHV4L3NyYy9iaW5kTWV0aG9kcy5qcyIsIndlYnBhY2s6Ly8vLi9+L3JlZmx1eC9+L2V2ZW50ZW1pdHRlcjMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vfi9yZWZsdXgvfi9uYXRpdmUtcHJvbWlzZS1vbmx5L25wby5qcyIsIndlYnBhY2s6Ly8vKHdlYnBhY2spL34vbm9kZS1saWJzLWJyb3dzZXIvfi90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovLy8od2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsS0FBSSxLQUFLLEdBQUcsbUJBQU8sQ0FBQyxDQUFPLENBQUM7S0FDeEIsTUFBTSxHQUFHLG1CQUFPLENBQUMsQ0FBYyxDQUFDOztBQUVwQyxLQUFJLE9BQU8sR0FBRyxtQkFBTyxDQUFDLEVBQTBCLENBQUM7O0FBRWpELG9CQUFPLENBQUMsRUFBcUIsQ0FBQzs7QUFFOUIsS0FBSSxHQUFHLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQzs7O0FBQzFCLFNBQU0sb0JBQUc7QUFDUCxZQUNFOztTQUFNLFNBQVMsRUFBQyxLQUFLO09BQ25CLG9CQUFDLE1BQU0sQ0FBQyxZQUFZLEVB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RUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsTUFBSztBQUNMLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsVUFBUztBQUNULFFBQU87QUFDUCw0Q0FBMkM7QUFDM0M7O0FBRUEsTUFBSzs7QUFFTCxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLLGVBQWU7QUFDcEIsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7QUFDTCxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMLElBQUc7O0FBRUg7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxRQUFPO0FBQ1A7O0FBRUEsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBOztBQUVBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsUUFBTztBQUNQOztBQUVBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTzs7QUFFUCxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBO0FBQ0EsRUFBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7OztBQzVaQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7O0FBR0E7O0FBRUEsb0RBQW1EOztBQUVuRDs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQSxZQUFXLFNBQVMsZ0RBQWdELHNCQUFzQixFQUFFO0FBQzVGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQzVHQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBLHdFQUF1RSxHQUFHLG1GQUFtRixHQUFHO0FBQ2hLLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7QUNkQTs7QUFFQTs7QUFFQSx1Q0FBc0MsTUFBTTtBQUM1QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULHNCQUFxQjtBQUNyQjtBQUNBLFFBQU87O0FBRVA7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUssSUFBSTs7QUFFVDs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxNQUFLOzs7QUFHTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQSxzREFBcUQsNkJBQTZCOztBQUVsRixJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsTUFBSztBQUNMLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNB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O0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7Ozs7O0FDM0VBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbiAgLCBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKVxuXG52YXIgUHJvZmlsZSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9Qcm9maWxlLmpzeCcpXG5cbnJlcXVpcmUoJy4vc3R5bGVzL2luZGV4LnNjc3MnKVxuXG52YXIgQXBwID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXIoKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cImFwcFwiPlxuICAgICAgICA8Um91dGVyLlJvdXRlSGFuZGxlciB7Li4udGhpcy5wcm9wc30gLz5cbiAgICAgIDwvbWFpbj5cbiAgICApXG4gIH1cbn0pO1xuXG52YXIgcm91dGVzID0gKFxuICA8Um91dGVyLlJvdXRlIG5hbWU9XCJhcHBcIiBwYXRoPVwiL1wiIGhhbmRsZXI9e0FwcH0+XG4gICAgPFJvdXRlci5EZWZhdWx0Um91dGUgaGFuZGxlcj17UHJvZmlsZX0gLz5cbiAgPC9Sb3V0ZXIuUm91dGU+XG4pO1xuXG5Sb3V0ZXIucnVuKHJvdXRlcywgUm91dGVyLkhpc3RvcnlMb2NhdGlvbiwgKEhhbmRsZXIsIHN0YXRlKSA9PiB7XG4gIFJlYWN0LnJlbmRlcig8SGFuZGxlci8+LCBkb2N1bWVudC5ib2R5KTtcbn0pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvaW5kZXguanN4XG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBQcm9maWxlRm9ybSA9IHJlcXVpcmUoJy4vUHJvZmlsZUZvcm0uanN4JylcbiAgLCBQcm9maWxlRGV0YWlscyA9IHJlcXVpcmUoJy4vUHJvZmlsZURldGFpbHMuanN4JylcblxudmFyIFByb2ZpbGUgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG5cbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcm9maWxlXCI+XG4gICAgICAgIDxQcm9maWxlRm9ybSAvPlxuICAgICAgICA8UHJvZmlsZURldGFpbHMgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2ZpbGU7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvY29tcG9uZW50cy9Qcm9maWxlLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9zdHlsZXMvaW5kZXguc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpXG4gICwgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4JylcbiAgLCBGb3Jtc3kgPSByZXF1aXJlKCdmb3Jtc3ktcmVhY3QnKVxuXG52YXIgSW5wdXRGaWVsZCA9IHJlcXVpcmUoJy4vSW5wdXRGaWVsZC5qc3gnKVxuXG52YXIgVXNlckFjdGlvbnMgPSByZXF1aXJlKCcuLi9hY3Rpb25zL1VzZXJBY3Rpb25zJylcbnZhciBVc2VyU3RvcmUgPSByZXF1aXJlKCcuLi9zdG9yZXMvVXNlclN0b3JlJylcblxudmFyIFByb2ZpbGVGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBtaXhpbnM6IFtSZWZsdXguY29ubmVjdChVc2VyU3RvcmUsICd1c2VyJyldLFxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHsgY2FuU3VibWl0OiBmYWxzZSB9XG4gIH0sXG4gIGhhbmRsZVN1Ym1pdChkYXRhKSB7XG4gICAgVXNlckFjdGlvbnMudXBkYXRlUHJvZmlsZShkYXRhKVxuICB9LFxuICBlbmFibGVCdXR0b24oKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGNhblN1Ym1pdDogdHJ1ZSB9KVxuICB9LFxuICBkaXNhYmxlQnV0dG9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjYW5TdWJtaXQ6IGZhbHNlIH0pXG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgZGlzYWJsZWQgPSAhdGhpcy5zdGF0ZS5jYW5TdWJtaXRcbiAgICB2YXIgdXNlciA9IHRoaXMuc3RhdGUudXNlciB8fCB7fVxuICAgIHZhciBuYW1lID0gdXNlci5uYW1lXG4gICAgdmFyIGVtYWlsID0gdXNlci5lbWFpbFxuICAgIHZhciBlcnJvcnMgPSB1c2VyLmVycm9yc1xuXG4gICAgY29uc29sZS5sb2codXNlcilcblxuICAgIHJldHVybiAoXG4gICAgICA8c2VjdGlvbiBjbGFzc05hbWU9XCJncm91cFwiPlxuICAgICAgICA8Rm9ybXN5LkZvcm0gb25TdWJtaXQ9e3RoaXMuaGFuZGxlU3VibWl0fVxuICAgICAgICAgICAgICAgICAgICAgb25WYWxpZD17dGhpcy5lbmFibGVCdXR0b259XG4gICAgICAgICAgICAgICAgICAgICBvbkludmFsaWQ9e3RoaXMuZGlzYWJsZUJ1dHRvbn0+XG4gICAgICAgICAgPElucHV0RmllbGQgbmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgICAgdGl0bGU9XCJOYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgIHZhbHVlPXtuYW1lfVxuICAgICAgICAgICAgICAgICAgICAgZXJyb3JzPXtlcnJvcnNbJ25hbWUnXX1cbiAgICAgICAgICAgICAgICAgICAgIHJlcXVpcmVkIC8+XG4gICAgICAgICAgPElucHV0RmllbGQgbmFtZT1cImVtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgdmFsdWU9e2VtYWlsfVxuICAgICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbnM9XCJpc0VtYWlsXCJcbiAgICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25FcnJvcj1cIlRoaXMgaXMgbm90IGEgdmFsaWQgZW1haWxcIlxuICAgICAgICAgICAgICAgICAgICAgZXJyb3JzPXtlcnJvcnNbJ2VtYWlsJ119XG4gICAgICAgICAgICAgICAgICAgICByZXF1aXJlZCAvPlxuICAgICAgICAgIDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGRpc2FibGVkPXtkaXNhYmxlZH0+XG4gICAgICAgICAgICBUZXN0IFN1Ym1pdFxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L0Zvcm1zeS5Gb3JtPlxuICAgICAgPC9zZWN0aW9uPlxuICAgICk7XG4gIH1cbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFByb2ZpbGVGb3JtO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvY29tcG9uZW50cy9Qcm9maWxlRm9ybS5qc3hcbiAqKi8iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpO1xuXG52YXIgVXNlclN0b3JlID0gcmVxdWlyZSgnLi4vc3RvcmVzL1VzZXJTdG9yZS5qcycpXG5cbnZhciBQcm9maWxlRGV0YWlscyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbWl4aW5zOiBbUmVmbHV4LmNvbm5lY3QoVXNlclN0b3JlLCBcInVzZXJcIildLFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB1c2VyID0gdGhpcy5zdGF0ZS51c2VyIHx8IHt9XG4gICAgdmFyIG5hbWUgPSB1c2VyLm5hbWVcbiAgICB2YXIgZW1haWwgPSB1c2VyLmVtYWlsXG5cbiAgICByZXR1cm4gKFxuICAgICAgPHNlY3Rpb24gY2xhc3NOYW1lPVwiZ3JvdXBcIj5cbiAgICAgICAgPGR0PlxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgTmFtZVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kdD5cbiAgICAgICAgPGRkPlxuICAgICAgICAgIHtuYW1lfVxuICAgICAgICA8L2RkPlxuICAgICAgICA8ZHQ+XG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICBFbWFpbFxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kdD5cbiAgICAgICAgPGRkPlxuICAgICAgICAgIHtlbWFpbH1cbiAgICAgICAgPC9kZD5cbiAgICAgIDwvc2VjdGlvbj5cbiAgICApO1xuICB9XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBQcm9maWxlRGV0YWlscztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXBwL2NvbXBvbmVudHMvUHJvZmlsZURldGFpbHMuanN4XG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxuICAsIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpXG5cbnZhciBJbnB1dEZpZWxkID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBtaXhpbnM6IFtGb3Jtc3kuTWl4aW5dLFxuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHsgc2hvd0Vycm9yczogdHJ1ZSB9XG4gIH0sXG4gIGNoYW5nZVZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gIH0sXG4gIGhhbmRsZUNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKVxuICB9LFxuICBoYW5kbGVCbHVyKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RXJyb3JzOiB0cnVlIH0pXG4gIH0sXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIGlmICghdGhpcy5pc1ByaXN0aW5lKCkgJiYgIXRoaXMuc2hvd0Vycm9yKCkpXG4gICAgICB0aGlzLnNldFN0YXRlKHsgc2hvd0Vycm9yczogZmFsc2UgfSlcbiAgfSxcbiAgY2xhc3NOYW1lKCkge1xuICAgIHJldHVybiBwcm9wQ2xhc3NOYW1lKHRoaXMucHJvcHMpXG4gICAgICArICcgJ1xuICAgICAgKyByZXF1aXJlZCh0aGlzLnNob3dSZXF1aXJlZCgpKVxuICAgICAgKyAnICdcbiAgICAgICsgZXJyb3IodGhpcy5zaG93RXJyb3IoKSB8fCB0aGlzLnByb3BzLmVycm9ycylcblxuICAgIGZ1bmN0aW9uIHByb3BDbGFzc05hbWUocHJvcHMpIHtcbiAgICAgIHJldHVybiBwcm9wcy5jbGFzc05hbWUgPyBwcm9wcy5jbGFzc05hbWUgOiAnJ1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlcXVpcmVkKGlzUmVxdWlyZWQpIHtcbiAgICAgIHJldHVybiBpc1JlcXVpcmVkID8gJ3JlcXVpcmVkJyA6IG51bGxcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBlcnJvcihpc0Vycm9yKSB7XG4gICAgICByZXR1cm4gaXNFcnJvciA/ICdlcnJvcicgOiBudWxsXG4gICAgfVxuICB9LFxuICByZW5kZXIoKSB7XG4gICAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuY2xhc3NOYW1lKClcbiAgICB2YXIgZXJyb3JNZXNzYWdlID0gdGhpcy5zdGF0ZS5zaG93RXJyb3JzID8gdGhpcy5nZXRFcnJvck1lc3NhZ2UoKSA6ICcnXG4gICAgdmFyIGFzeW5jRXJyb3JzID0gdGhpcy5wcm9wcy5lcnJvcnMgfHwgJydcblxuICAgIGNvbnNvbGUubG9nKGNsYXNzTmFtZSlcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J2Zvcm0tZ3JvdXAnICsgY2xhc3NOYW1lfT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9e3RoaXMucHJvcHMubmFtZX0+e3RoaXMucHJvcHMudGl0bGV9PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9e3RoaXMucHJvcHMudHlwZSB8fCAndGV4dCd9XG4gICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRWYWx1ZSgpfVxuICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfVxuICAgICAgICAgICAgICAgYXV0b0NvbXBsZXRlPSdvZmYnIC8+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndmFsaWRhdGlvbi1lcnJvcic+e2Vycm9yTWVzc2FnZX08L3NwYW4+XG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT0ndmFsaWRhdGlvbi1lcnJvcic+e2FzeW5jRXJyb3JzfTwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgIClcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXRGaWVsZFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vYXBwL2NvbXBvbmVudHMvSW5wdXRGaWVsZC5qc3hcbiAqKi8iLCJ2YXIgUmVmbHV4ID0gcmVxdWlyZSgncmVmbHV4JylcblxudmFyIHVzZXJBY3Rpb25zID0gUmVmbHV4LmNyZWF0ZUFjdGlvbnMoW1xuICAndXBkYXRlUHJvZmlsZScsXG4gICd1cGRhdGVQcm9maWxlRmFpbGVkJyxcbiAgJ3VwZGF0ZVByb2ZpbGVDb21wbGV0ZWQnXG5dKTtcblxudXNlckFjdGlvbnMudXBkYXRlUHJvZmlsZS5saXN0ZW4oZnVuY3Rpb24obmV3UHJvZmlsZSkge1xuICBzZXRUaW1lb3V0KCAodXBkYXRlQVBJQ2FsbCkuYmluZCh0aGlzKSwgMTAwMCApXG5cbiAgZnVuY3Rpb24gdXBkYXRlQVBJQ2FsbCgpIHtcbiAgICBjb25zb2xlLmxvZygnbG9hZGVkJylcbiAgICBpZiAobmV3UHJvZmlsZS5lbWFpbCA9PT0gJ3Rha2VuQGNhcmJvbmZpdmUuY29tJykge1xuICAgICAgdXNlckFjdGlvbnMudXBkYXRlUHJvZmlsZUZhaWxlZCh7ZW1haWw6ICdFbWFpbCBoYXMgYmVlbiB0YWtlbid9KVxuICAgIH0gZWxzZSB7XG4gICAgICBuZXdQcm9maWxlLmVycm9ycyA9IHt9XG4gICAgICB1c2VyQWN0aW9ucy51cGRhdGVQcm9maWxlQ29tcGxldGVkKG5ld1Byb2ZpbGUpXG4gICAgfVxuICB9XG59KVxuXG5tb2R1bGUuZXhwb3J0cyA9IHVzZXJBY3Rpb25zXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9hY3Rpb25zL1VzZXJBY3Rpb25zLmpzXG4gKiovIiwidmFyIFJlZmx1eCA9IHJlcXVpcmUoJ3JlZmx1eCcpXG5cbnZhciB1c2VyQWN0aW9ucyA9IHJlcXVpcmUoJy4uL2FjdGlvbnMvVXNlckFjdGlvbnMuanMnKVxuXG52YXIgVXNlclN0b3JlID0gUmVmbHV4LmNyZWF0ZVN0b3JlKHtcbiAgbGlzdGVuYWJsZXM6IHVzZXJBY3Rpb25zLFxuXG4gIGluaXQ6IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucHJvZmlsZSA9IHtcbiAgICAgIG5hbWU6ICdjaHJpcycsXG4gICAgICBlbWFpbDogJ2Nocmlza0BjYXJib25maXZlLmNvbScsXG4gICAgICBlcnJvcnM6IHt9XG4gICAgfVxuICB9LFxuXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvZmlsZVxuICB9LFxuXG4gIG9uVXBkYXRlUHJvZmlsZTogZnVuY3Rpb24ocHJvZmlsZSkge1xuICAgIGNvbnNvbGUubG9nKHByb2ZpbGUpXG4gIH0sXG5cbiAgb25VcGRhdGVQcm9maWxlQ29tcGxldGVkOiBmdW5jdGlvbihuZXdQcm9maWxlKSB7XG4gICAgY29uc29sZS5sb2cobmV3UHJvZmlsZSlcbiAgICB0aGlzLnByb2ZpbGUgPSBuZXdQcm9maWxlXG4gICAgdGhpcy50cmlnZ2VyKHRoaXMucHJvZmlsZSlcbiAgfSxcblxuICBvblVwZGF0ZVByb2ZpbGVGYWlsZWQ6IGZ1bmN0aW9uKGVycm9ycykge1xuICAgIGNvbnNvbGUubG9nKGVycm9ycyk7XG4gICAgdGhpcy5wcm9maWxlLmVycm9ycyA9IGVycm9yc1xuICAgIHRoaXMudHJpZ2dlcih0aGlzLnByb2ZpbGUpXG4gIH1cbn0pXG5cbm1vZHVsZS5leHBvcnRzID0gVXNlclN0b3JlXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9zdG9yZXMvVXNlclN0b3JlLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL3NyYycpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMTMzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVhY3QgPSBnbG9iYWwuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBGb3Jtc3kgPSB7fTtcbnZhciB2YWxpZGF0aW9uUnVsZXMgPSByZXF1aXJlKCcuL3ZhbGlkYXRpb25SdWxlcy5qcycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xudmFyIE1peGluID0gcmVxdWlyZSgnLi9NaXhpbi5qcycpO1xudmFyIG9wdGlvbnMgPSB7fTtcblxuRm9ybXN5Lk1peGluID0gTWl4aW47XG5cbkZvcm1zeS5kZWZhdWx0cyA9IGZ1bmN0aW9uIChwYXNzZWRPcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBwYXNzZWRPcHRpb25zO1xufTtcblxuRm9ybXN5LmFkZFZhbGlkYXRpb25SdWxlID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcbiAgdmFsaWRhdGlvblJ1bGVzW25hbWVdID0gZnVuYztcbn07XG5cbkZvcm1zeS5Gb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNWYWxpZDogdHJ1ZSxcbiAgICAgIGlzU3VibWl0dGluZzogZmFsc2UsXG4gICAgICBjYW5DaGFuZ2U6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKCkge30sXG4gICAgICBvbkVycm9yOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uU3VibWl0OiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uVmFsaWRTdWJtaXQ6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgb25JbnZhbGlkU3VibWl0OiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uU3VibWl0dGVkOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uVmFsaWQ6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgb25JbnZhbGlkOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnM6IG51bGxcbiAgICB9O1xuICB9LFxuXG4gIC8vIEFkZCBhIG1hcCB0byBzdG9yZSB0aGUgaW5wdXRzIG9mIHRoZSBmb3JtLCBhIG1vZGVsIHRvIHN0b3JlXG4gIC8vIHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gYW5kIHJlZ2lzdGVyIGNoaWxkIGlucHV0c1xuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlucHV0cyA9IHt9O1xuICAgIHRoaXMubW9kZWwgPSB7fTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmlucHV0cyk7XG5cbiAgICAvLyBUaGUgdXBkYXRlZCBjaGlsZHJlbiBhcnJheSBpcyBub3QgYXZhaWxhYmxlIGhlcmUgZm9yIHNvbWUgcmVhc29uLFxuICAgIC8vIHdlIG5lZWQgdG8gd2FpdCBmb3IgbmV4dCBldmVudCBsb29wXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIFRoZSBjb21wb25lbnQgbWlnaHQgaGF2ZSBiZWVuIHVubW91bnRlZCBvbiBhblxuICAgICAgLy8gdXBkYXRlXG4gICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSkge1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZhbGlkYXRpb25FcnJvcnMpIHtcbiAgICAgICAgICB0aGlzLnNldElucHV0VmFsaWRhdGlvbkVycm9ycyh0aGlzLnByb3BzLnZhbGlkYXRpb25FcnJvcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld0lucHV0S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuaW5wdXRzKTtcbiAgICAgICAgaWYgKHV0aWxzLmFycmF5c0RpZmZlcihpbnB1dEtleXMsIG5ld0lucHV0S2V5cykpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gIH0sXG5cbiAgLy8gVXBkYXRlIG1vZGVsLCBzdWJtaXQgdG8gdXJsIHByb3AgYW5kIHNlbmQgdGhlIG1vZGVsXG4gIHN1Ym1pdDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICBldmVudCAmJiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gVHJpZ2dlciBmb3JtIGFzIG5vdCBwcmlzdGluZS5cbiAgICAvLyBJZiBhbnkgaW5wdXRzIGhhdmUgbm90IGJlZW4gdG91Y2hlZCB5ZXQgdGhpcyB3aWxsIG1ha2UgdGhlbSBkaXJ0eVxuICAgIC8vIHNvIHZhbGlkYXRpb24gYmVjb21lcyB2aXNpYmxlIChpZiBiYXNlZCBvbiBpc1ByaXN0aW5lKVxuICAgIHRoaXMuc2V0Rm9ybVByaXN0aW5lKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKCk7XG4gICAgdmFyIG1vZGVsID0gdGhpcy5tYXBNb2RlbCgpO1xuICAgIHRoaXMucHJvcHMub25TdWJtaXQobW9kZWwsIHRoaXMucmVzZXRNb2RlbCwgdGhpcy51cGRhdGVJbnB1dHNXaXRoRXJyb3IpO1xuICAgIHRoaXMuc3RhdGUuaXNWYWxpZCA/IHRoaXMucHJvcHMub25WYWxpZFN1Ym1pdChtb2RlbCwgdGhpcy5yZXNldE1vZGVsLCB0aGlzLnVwZGF0ZUlucHV0c1dpdGhFcnJvcikgOiB0aGlzLnByb3BzLm9uSW52YWxpZFN1Ym1pdChtb2RlbCwgdGhpcy5yZXNldE1vZGVsLCB0aGlzLnVwZGF0ZUlucHV0c1dpdGhFcnJvcik7XG5cbiAgfSxcblxuICBtYXBNb2RlbDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1hcHBpbmcgPyB0aGlzLnByb3BzLm1hcHBpbmcodGhpcy5tb2RlbCkgOiB0aGlzLm1vZGVsO1xuICB9LFxuXG4gIC8vIEdvZXMgdGhyb3VnaCBhbGwgcmVnaXN0ZXJlZCBjb21wb25lbnRzIGFuZFxuICAvLyB1cGRhdGVzIHRoZSBtb2RlbCB2YWx1ZXNcbiAgdXBkYXRlTW9kZWw6IGZ1bmN0aW9uICgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmlucHV0cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IHRoaXMuaW5wdXRzW25hbWVdO1xuICAgICAgdGhpcy5tb2RlbFtuYW1lXSA9IGNvbXBvbmVudC5zdGF0ZS5fdmFsdWU7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcblxuICAvLyBSZXNldCBlYWNoIGtleSBpbiB0aGUgbW9kZWwgdG8gdGhlIG9yaWdpbmFsIC8gaW5pdGlhbCB2YWx1ZVxuICByZXNldE1vZGVsOiBmdW5jdGlvbiAoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHRoaXMuaW5wdXRzW25hbWVdLnJlc2V0VmFsdWUoKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XG4gIH0sXG5cbiAgc2V0SW5wdXRWYWxpZGF0aW9uRXJyb3JzOiBmdW5jdGlvbiAoZXJyb3JzKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUsIGluZGV4KSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5pbnB1dHNbbmFtZV07XG4gICAgICB2YXIgYXJncyA9IFt7XG4gICAgICAgIF9pc1ZhbGlkOiAhKG5hbWUgaW4gZXJyb3JzKSxcbiAgICAgICAgX3ZhbGlkYXRpb25FcnJvcjogZXJyb3JzW25hbWVdXG4gICAgICB9XTtcbiAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZS5hcHBseShjb21wb25lbnQsIGFyZ3MpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgLy8gR28gdGhyb3VnaCBlcnJvcnMgZnJvbSBzZXJ2ZXIgYW5kIGdyYWIgdGhlIGNvbXBvbmVudHNcbiAgLy8gc3RvcmVkIGluIHRoZSBpbnB1dHMgbWFwLiBDaGFuZ2UgdGhlaXIgc3RhdGUgdG8gaW52YWxpZFxuICAvLyBhbmQgc2V0IHRoZSBzZXJ2ZXJFcnJvciBtZXNzYWdlXG4gIHVwZGF0ZUlucHV0c1dpdGhFcnJvcjogZnVuY3Rpb24gKGVycm9ycykge1xuICAgIE9iamVjdC5rZXlzKGVycm9ycykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzLmlucHV0c1tuYW1lXTtcblxuICAgICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgYXJlIHRyeWluZyB0byB1cGRhdGUgYW4gaW5wdXQgdGhhdCBkb2VzIG5vdCBleGlzdHMuIFZlcmlmeSBlcnJvcnMgb2JqZWN0IHdpdGggaW5wdXQgbmFtZXMuICcgKyBKU09OLnN0cmluZ2lmeShlcnJvcnMpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyZ3MgPSBbe1xuICAgICAgICBfaXNWYWxpZDogZmFsc2UsXG4gICAgICAgIF9leHRlcm5hbEVycm9yOiBlcnJvcnNbbmFtZV1cbiAgICAgIH1dO1xuICAgICAgY29tcG9uZW50LnNldFN0YXRlLmFwcGx5KGNvbXBvbmVudCwgYXJncyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcblxuICAvLyBUcmF2ZXJzZSB0aGUgY2hpbGRyZW4gYW5kIGNoaWxkcmVuIG9mIGNoaWxkcmVuIHRvIGZpbmRcbiAgLy8gYWxsIGlucHV0cyBieSBjaGVja2luZyB0aGUgbmFtZSBwcm9wLiBNYXliZSBkbyBhIGJldHRlclxuICAvLyBjaGVjayBoZXJlXG4gIHRyYXZlcnNlQ2hpbGRyZW5BbmRSZWdpc3RlcklucHV0czogZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG5cbiAgICBpZiAodHlwZW9mIGNoaWxkcmVuICE9PSAnb2JqZWN0JyB8fCBjaGlsZHJlbiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcblxuICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ29iamVjdCcgfHwgY2hpbGQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQucHJvcHMgJiYgY2hpbGQucHJvcHMubmFtZSkge1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICBfYXR0YWNoVG9Gb3JtOiB0aGlzLmF0dGFjaFRvRm9ybSxcbiAgICAgICAgICBfZGV0YWNoRnJvbUZvcm06IHRoaXMuZGV0YWNoRnJvbUZvcm0sXG4gICAgICAgICAgX3ZhbGlkYXRlOiB0aGlzLnZhbGlkYXRlLFxuICAgICAgICAgIF9pc0Zvcm1EaXNhYmxlZDogdGhpcy5pc0Zvcm1EaXNhYmxlZCxcbiAgICAgICAgICBfaXNWYWxpZFZhbHVlOiBmdW5jdGlvbiAoY29tcG9uZW50LCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuVmFsaWRhdGlvbihjb21wb25lbnQsIHZhbHVlKS5pc1ZhbGlkO1xuICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICB9LCBjaGlsZC5wcm9wcyAmJiBjaGlsZC5wcm9wcy5jaGlsZHJlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7fSwgdGhpcy50cmF2ZXJzZUNoaWxkcmVuQW5kUmVnaXN0ZXJJbnB1dHMoY2hpbGQucHJvcHMgJiYgY2hpbGQucHJvcHMuY2hpbGRyZW4pKTtcbiAgICAgIH1cblxuICAgIH0sIHRoaXMpO1xuXG4gIH0sXG5cbiAgaXNGb3JtRGlzYWJsZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5kaXNhYmxlZDtcbiAgfSxcblxuICBnZXRDdXJyZW50VmFsdWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuaW5wdXRzKS5yZWR1Y2UoZnVuY3Rpb24gKGRhdGEsIG5hbWUpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzLmlucHV0c1tuYW1lXTtcbiAgICAgIGRhdGFbbmFtZV0gPSBjb21wb25lbnQuc3RhdGUuX3ZhbHVlO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfS5iaW5kKHRoaXMpLCB7fSk7XG4gIH0sXG5cbiAgc2V0Rm9ybVByaXN0aW5lOiBmdW5jdGlvbiAoaXNQcmlzdGluZSkge1xuICAgIHZhciBpbnB1dHMgPSB0aGlzLmlucHV0cztcbiAgICB2YXIgaW5wdXRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRzKTtcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIGNvbXBvbmVudCBhbmQgc2V0IGl0IGFzIHByaXN0aW5lXG4gICAgLy8gb3IgXCJkaXJ0eVwiLlxuICAgIGlucHV0S2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpbmRleCkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IGlucHV0c1tuYW1lXTtcbiAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZSh7XG4gICAgICAgIF9pc1ByaXN0aW5lOiBpc1ByaXN0aW5lXG4gICAgICB9KTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuXG4gIC8vIFVzZSB0aGUgYmluZGVkIHZhbHVlcyBhbmQgdGhlIGFjdHVhbCBpbnB1dCB2YWx1ZSB0b1xuICAvLyB2YWxpZGF0ZSB0aGUgaW5wdXQgYW5kIHNldCBpdHMgc3RhdGUuIFRoZW4gY2hlY2sgdGhlXG4gIC8vIHN0YXRlIG9mIHRoZSBmb3JtIGl0c2VsZlxuICB2YWxpZGF0ZTogZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXG4gICAgLy8gVHJpZ2dlciBvbkNoYW5nZVxuICAgIGlmICh0aGlzLnN0YXRlLmNhbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmdldEN1cnJlbnRWYWx1ZXMoKSk7XG4gICAgfVxuXG4gICAgdmFyIHZhbGlkYXRpb24gPSB0aGlzLnJ1blZhbGlkYXRpb24oY29tcG9uZW50KTtcbiAgICAvLyBSdW4gdGhyb3VnaCB0aGUgdmFsaWRhdGlvbnMsIHNwbGl0IHRoZW0gdXAgYW5kIGNhbGxcbiAgICAvLyB0aGUgdmFsaWRhdG9yIElGIHRoZXJlIGlzIGEgdmFsdWUgb3IgaXQgaXMgcmVxdWlyZWRcbiAgICBjb21wb25lbnQuc2V0U3RhdGUoe1xuICAgICAgX2lzVmFsaWQ6IHZhbGlkYXRpb24uaXNWYWxpZCxcbiAgICAgIF9pc1JlcXVpcmVkOiB2YWxpZGF0aW9uLmlzUmVxdWlyZWQsXG4gICAgICBfdmFsaWRhdGlvbkVycm9yOiB2YWxpZGF0aW9uLmVycm9yLFxuICAgICAgX2V4dGVybmFsRXJyb3I6IG51bGxcbiAgICB9LCB0aGlzLnZhbGlkYXRlRm9ybSk7XG5cbiAgfSxcblxuICAvLyBDaGVja3MgdmFsaWRhdGlvbiBvbiBjdXJyZW50IHZhbHVlIG9yIGEgcGFzc2VkIHZhbHVlXG4gIHJ1blZhbGlkYXRpb246IGZ1bmN0aW9uIChjb21wb25lbnQsIHZhbHVlKSB7XG5cbiAgICB2YXIgY3VycmVudFZhbHVlcyA9IHRoaXMuZ2V0Q3VycmVudFZhbHVlcygpO1xuICAgIHZhciB2YWxpZGF0aW9uRXJyb3JzID0gY29tcG9uZW50LnByb3BzLnZhbGlkYXRpb25FcnJvcnM7XG4gICAgdmFyIHZhbGlkYXRpb25FcnJvciA9IGNvbXBvbmVudC5wcm9wcy52YWxpZGF0aW9uRXJyb3I7XG4gICAgdmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09PSAyID8gdmFsdWUgOiBjb21wb25lbnQuc3RhdGUuX3ZhbHVlO1xuXG4gICAgdmFyIHZhbGlkYXRpb25SZXN1bHRzID0gdGhpcy5ydW5SdWxlcyh2YWx1ZSwgY3VycmVudFZhbHVlcywgY29tcG9uZW50Ll92YWxpZGF0aW9ucyk7XG4gICAgdmFyIHJlcXVpcmVkUmVzdWx0cyA9IHRoaXMucnVuUnVsZXModmFsdWUsIGN1cnJlbnRWYWx1ZXMsIGNvbXBvbmVudC5fcmVxdWlyZWRWYWxpZGF0aW9ucyk7XG5cbiAgICAvLyB0aGUgY29tcG9uZW50IGRlZmluZXMgYW4gZXhwbGljaXQgdmFsaWRhdGUgZnVuY3Rpb25cbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudC52YWxpZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB2YWxpZGF0aW9uUmVzdWx0cy5mYWlsZWQgPSBjb21wb25lbnQudmFsaWRhdGUoKSA/IFtdIDogWydmYWlsZWQnXTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXF1aXJlZCA9IE9iamVjdC5rZXlzKGNvbXBvbmVudC5fcmVxdWlyZWRWYWxpZGF0aW9ucykubGVuZ3RoID8gISFyZXF1aXJlZFJlc3VsdHMuc3VjY2Vzcy5sZW5ndGggOiBmYWxzZTtcbiAgICB2YXIgaXNWYWxpZCA9ICF2YWxpZGF0aW9uUmVzdWx0cy5mYWlsZWQubGVuZ3RoICYmICEodGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JzICYmIHRoaXMucHJvcHMudmFsaWRhdGlvbkVycm9yc1tjb21wb25lbnQucHJvcHMubmFtZV0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlzUmVxdWlyZWQ6IGlzUmVxdWlyZWQsXG4gICAgICBpc1ZhbGlkOiBpc1JlcXVpcmVkID8gZmFsc2UgOiBpc1ZhbGlkLFxuICAgICAgZXJyb3I6IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKGlzVmFsaWQgJiYgIWlzUmVxdWlyZWQpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWRhdGlvblJlc3VsdHMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0aW9uUmVzdWx0cy5lcnJvcnNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JzICYmIHRoaXMucHJvcHMudmFsaWRhdGlvbkVycm9yc1tjb21wb25lbnQucHJvcHMubmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JzW2NvbXBvbmVudC5wcm9wcy5uYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25FcnJvcnNbcmVxdWlyZWRSZXN1bHRzLnN1Y2Nlc3NbMF1dIHx8IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICByZXR1cm4gdmFsaWRhdGlvbkVycm9yc1t2YWxpZGF0aW9uUmVzdWx0cy5mYWlsZWRbMF1dIHx8IHZhbGlkYXRpb25FcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICB9LmNhbGwodGhpcykpXG4gICAgfTtcblxuICB9LFxuXG4gIHJ1blJ1bGVzOiBmdW5jdGlvbiAodmFsdWUsIGN1cnJlbnRWYWx1ZXMsIHZhbGlkYXRpb25zKSB7XG5cbiAgICB2YXIgcmVzdWx0cyA9IHtcbiAgICAgIGVycm9yczogW10sXG4gICAgICBmYWlsZWQ6IFtdLFxuICAgICAgc3VjY2VzczogW11cbiAgICB9O1xuICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0aW9ucykubGVuZ3RoKSB7XG4gICAgICBPYmplY3Qua2V5cyh2YWxpZGF0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAodmFsaWRhdGlvbk1ldGhvZCkge1xuXG4gICAgICAgIGlmICh2YWxpZGF0aW9uUnVsZXNbdmFsaWRhdGlvbk1ldGhvZF0gJiYgdHlwZW9mIHZhbGlkYXRpb25zW3ZhbGlkYXRpb25NZXRob2RdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3Jtc3kgZG9lcyBub3QgYWxsb3cgeW91IHRvIG92ZXJyaWRlIGRlZmF1bHQgdmFsaWRhdGlvbnM6ICcgKyB2YWxpZGF0aW9uTWV0aG9kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmFsaWRhdGlvblJ1bGVzW3ZhbGlkYXRpb25NZXRob2RdICYmIHR5cGVvZiB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybXN5IGRvZXMgbm90IGhhdmUgdGhlIHZhbGlkYXRpb24gcnVsZTogJyArIHZhbGlkYXRpb25NZXRob2QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciB2YWxpZGF0aW9uID0gdmFsaWRhdGlvbnNbdmFsaWRhdGlvbk1ldGhvZF0oY3VycmVudFZhbHVlcywgdmFsdWUpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlc3VsdHMuZXJyb3JzLnB1c2godmFsaWRhdGlvbik7XG4gICAgICAgICAgICByZXN1bHRzLmZhaWxlZC5wdXNoKHZhbGlkYXRpb25NZXRob2QpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHJlc3VsdHMuZmFpbGVkLnB1c2godmFsaWRhdGlvbk1ldGhvZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciB2YWxpZGF0aW9uID0gdmFsaWRhdGlvblJ1bGVzW3ZhbGlkYXRpb25NZXRob2RdKGN1cnJlbnRWYWx1ZXMsIHZhbHVlLCB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVzdWx0cy5lcnJvcnMucHVzaCh2YWxpZGF0aW9uKTtcbiAgICAgICAgICAgIHJlc3VsdHMuZmFpbGVkLnB1c2godmFsaWRhdGlvbk1ldGhvZCk7XG4gICAgICAgICAgfSBlbHNlIGlmICghdmFsaWRhdGlvbikge1xuICAgICAgICAgICAgcmVzdWx0cy5mYWlsZWQucHVzaCh2YWxpZGF0aW9uTWV0aG9kKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cy5zdWNjZXNzLnB1c2godmFsaWRhdGlvbk1ldGhvZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHMuc3VjY2Vzcy5wdXNoKHZhbGlkYXRpb25NZXRob2QpO1xuXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcblxuICB9LFxuXG4gIC8vIFZhbGlkYXRlIHRoZSBmb3JtIGJ5IGdvaW5nIHRocm91Z2ggYWxsIGNoaWxkIGlucHV0IGNvbXBvbmVudHNcbiAgLy8gYW5kIGNoZWNrIHRoZWlyIHN0YXRlXG4gIHZhbGlkYXRlRm9ybTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhbGxJc1ZhbGlkID0gdHJ1ZTtcbiAgICB2YXIgaW5wdXRzID0gdGhpcy5pbnB1dHM7XG4gICAgdmFyIGlucHV0S2V5cyA9IE9iamVjdC5rZXlzKGlucHV0cyk7XG5cbiAgICAvLyBXZSBuZWVkIGEgY2FsbGJhY2sgYXMgd2UgYXJlIHZhbGlkYXRpbmcgYWxsIGlucHV0cyBhZ2Fpbi4gVGhpcyB3aWxsXG4gICAgLy8gcnVuIHdoZW4gdGhlIGxhc3QgY29tcG9uZW50IGhhcyBzZXQgaXRzIHN0YXRlXG4gICAgdmFyIG9uVmFsaWRhdGlvbkNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaW5wdXRLZXlzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKCFpbnB1dHNbbmFtZV0uc3RhdGUuX2lzVmFsaWQpIHtcbiAgICAgICAgICBhbGxJc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1ZhbGlkOiBhbGxJc1ZhbGlkXG4gICAgICB9KTtcblxuICAgICAgaWYgKGFsbElzVmFsaWQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbGlkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW52YWxpZCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBUZWxsIHRoZSBmb3JtIHRoYXQgaXQgY2FuIHN0YXJ0IHRvIHRyaWdnZXIgY2hhbmdlIGV2ZW50c1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNhbkNoYW5nZTogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAvLyBSdW4gdmFsaWRhdGlvbiBhZ2FpbiBpbiBjYXNlIGFmZmVjdGVkIGJ5IG90aGVyIGlucHV0cy4gVGhlXG4gICAgLy8gbGFzdCBjb21wb25lbnQgdmFsaWRhdGVkIHdpbGwgcnVuIHRoZSBvblZhbGlkYXRpb25Db21wbGV0ZSBjYWxsYmFja1xuICAgIGlucHV0S2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpbmRleCkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IGlucHV0c1tuYW1lXTtcbiAgICAgIHZhciB2YWxpZGF0aW9uID0gdGhpcy5ydW5WYWxpZGF0aW9uKGNvbXBvbmVudCk7XG4gICAgICBpZiAodmFsaWRhdGlvbi5pc1ZhbGlkICYmIGNvbXBvbmVudC5zdGF0ZS5fZXh0ZXJuYWxFcnJvcikge1xuICAgICAgICB2YWxpZGF0aW9uLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZSh7XG4gICAgICAgIF9pc1ZhbGlkOiB2YWxpZGF0aW9uLmlzVmFsaWQsXG4gICAgICAgIF9pc1JlcXVpcmVkOiB2YWxpZGF0aW9uLmlzUmVxdWlyZWQsXG4gICAgICAgIF92YWxpZGF0aW9uRXJyb3I6IHZhbGlkYXRpb24uZXJyb3IsXG4gICAgICAgIF9leHRlcm5hbEVycm9yOiAhdmFsaWRhdGlvbi5pc1ZhbGlkICYmIGNvbXBvbmVudC5zdGF0ZS5fZXh0ZXJuYWxFcnJvciA/IGNvbXBvbmVudC5zdGF0ZS5fZXh0ZXJuYWxFcnJvciA6IG51bGxcbiAgICAgIH0sIGluZGV4ID09PSBpbnB1dEtleXMubGVuZ3RoIC0gMSA/IG9uVmFsaWRhdGlvbkNvbXBsZXRlIDogbnVsbCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBpbnB1dHMsIHNldCBzdGF0ZSB3aGVyZSBmb3JtIGlzIHJlYWR5IHRvIHRyaWdnZXJcbiAgICAvLyBjaGFuZ2UgZXZlbnQuIE5ldyBpbnB1dHMgbWlnaHQgYmUgYWRkZWQgbGF0ZXJcbiAgICBpZiAoIWlucHV0S2V5cy5sZW5ndGggJiYgdGhpcy5pc01vdW50ZWQoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNhbkNoYW5nZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1ldGhvZCBwdXQgb24gZWFjaCBpbnB1dCBjb21wb25lbnQgdG8gcmVnaXN0ZXJcbiAgLy8gaXRzZWxmIHRvIHRoZSBmb3JtXG4gIGF0dGFjaFRvRm9ybTogZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgIHRoaXMuaW5wdXRzW2NvbXBvbmVudC5wcm9wcy5uYW1lXSA9IGNvbXBvbmVudDtcbiAgICB0aGlzLm1vZGVsW2NvbXBvbmVudC5wcm9wcy5uYW1lXSA9IGNvbXBvbmVudC5zdGF0ZS5fdmFsdWU7XG4gICAgdGhpcy52YWxpZGF0ZShjb21wb25lbnQpO1xuICB9LFxuXG4gIC8vIE1ldGhvZCBwdXQgb24gZWFjaCBpbnB1dCBjb21wb25lbnQgdG8gdW5yZWdpc3RlclxuICAvLyBpdHNlbGYgZnJvbSB0aGUgZm9ybVxuICBkZXRhY2hGcm9tRm9ybTogZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgIGRlbGV0ZSB0aGlzLmlucHV0c1tjb21wb25lbnQucHJvcHMubmFtZV07XG4gICAgZGVsZXRlIHRoaXMubW9kZWxbY29tcG9uZW50LnByb3BzLm5hbWVdO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiBSZWFjdC5ET00uZm9ybSh7XG4gICAgICAgIG9uU3VibWl0OiB0aGlzLnN1Ym1pdCxcbiAgICAgICAgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSBcbiAgICAgIH0sXG4gICAgICB0aGlzLnRyYXZlcnNlQ2hpbGRyZW5BbmRSZWdpc3RlcklucHV0cyh0aGlzLnByb3BzLmNoaWxkcmVuKVxuICAgICk7XG5cbiAgfVxufSk7XG5cbmlmICghZ2xvYmFsLmV4cG9ydHMgJiYgIWdsb2JhbC5tb2R1bGUgJiYgKCFnbG9iYWwuZGVmaW5lIHx8ICFnbG9iYWwuZGVmaW5lLmFtZCkpIHtcbiAgZ2xvYmFsLkZvcm1zeSA9IEZvcm1zeTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb3Jtc3k7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mb3Jtc3ktcmVhY3Qvc3JjL21haW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxMzVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsImV4cG9ydHMuQWN0aW9uTWV0aG9kcyA9IHJlcXVpcmUoJy4vQWN0aW9uTWV0aG9kcycpO1xuXG5leHBvcnRzLkxpc3RlbmVyTWV0aG9kcyA9IHJlcXVpcmUoJy4vTGlzdGVuZXJNZXRob2RzJyk7XG5cbmV4cG9ydHMuUHVibGlzaGVyTWV0aG9kcyA9IHJlcXVpcmUoJy4vUHVibGlzaGVyTWV0aG9kcycpO1xuXG5leHBvcnRzLlN0b3JlTWV0aG9kcyA9IHJlcXVpcmUoJy4vU3RvcmVNZXRob2RzJyk7XG5cbmV4cG9ydHMuY3JlYXRlQWN0aW9uID0gcmVxdWlyZSgnLi9jcmVhdGVBY3Rpb24nKTtcblxuZXhwb3J0cy5jcmVhdGVTdG9yZSA9IHJlcXVpcmUoJy4vY3JlYXRlU3RvcmUnKTtcblxuZXhwb3J0cy5jb25uZWN0ID0gcmVxdWlyZSgnLi9jb25uZWN0Jyk7XG5cbmV4cG9ydHMuY29ubmVjdEZpbHRlciA9IHJlcXVpcmUoJy4vY29ubmVjdEZpbHRlcicpO1xuXG5leHBvcnRzLkxpc3RlbmVyTWl4aW4gPSByZXF1aXJlKCcuL0xpc3RlbmVyTWl4aW4nKTtcblxuZXhwb3J0cy5saXN0ZW5UbyA9IHJlcXVpcmUoJy4vbGlzdGVuVG8nKTtcblxuZXhwb3J0cy5saXN0ZW5Ub01hbnkgPSByZXF1aXJlKCcuL2xpc3RlblRvTWFueScpO1xuXG5cbnZhciBtYWtlciA9IHJlcXVpcmUoJy4vam9pbnMnKS5zdGF0aWNKb2luQ3JlYXRvcjtcblxuZXhwb3J0cy5qb2luVHJhaWxpbmcgPSBleHBvcnRzLmFsbCA9IG1ha2VyKFwibGFzdFwiKTsgLy8gUmVmbHV4LmFsbCBhbGlhcyBmb3IgYmFja3dhcmQgY29tcGF0aWJpbGl0eVxuXG5leHBvcnRzLmpvaW5MZWFkaW5nID0gbWFrZXIoXCJmaXJzdFwiKTtcblxuZXhwb3J0cy5qb2luU3RyaWN0ID0gbWFrZXIoXCJzdHJpY3RcIik7XG5cbmV4cG9ydHMuam9pbkNvbmNhdCA9IG1ha2VyKFwiYWxsXCIpO1xuXG52YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcblxuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBfLkV2ZW50RW1pdHRlcjtcblxuZXhwb3J0cy5Qcm9taXNlID0gXy5Qcm9taXNlO1xuXG4vKipcbiAqIENvbnZlbmllbmNlIGZ1bmN0aW9uIGZvciBjcmVhdGluZyBhIHNldCBvZiBhY3Rpb25zXG4gKlxuICogQHBhcmFtIGRlZmluaXRpb25zIHRoZSBkZWZpbml0aW9ucyBmb3IgdGhlIGFjdGlvbnMgdG8gYmUgY3JlYXRlZFxuICogQHJldHVybnMgYW4gb2JqZWN0IHdpdGggYWN0aW9ucyBvZiBjb3JyZXNwb25kaW5nIGFjdGlvbiBuYW1lc1xuICovXG5leHBvcnRzLmNyZWF0ZUFjdGlvbnMgPSBmdW5jdGlvbihkZWZpbml0aW9ucykge1xuICAgIHZhciBhY3Rpb25zID0ge307XG4gICAgZm9yICh2YXIgayBpbiBkZWZpbml0aW9ucyl7XG4gICAgICAgIGlmIChkZWZpbml0aW9ucy5oYXNPd25Qcm9wZXJ0eShrKSkge1xuICAgICAgICAgICAgdmFyIHZhbCA9IGRlZmluaXRpb25zW2tdLFxuICAgICAgICAgICAgICAgIGFjdGlvbk5hbWUgPSBfLmlzT2JqZWN0KHZhbCkgPyBrIDogdmFsO1xuXG4gICAgICAgICAgICBhY3Rpb25zW2FjdGlvbk5hbWVdID0gZXhwb3J0cy5jcmVhdGVBY3Rpb24odmFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gYWN0aW9ucztcbn07XG5cbi8qKlxuICogU2V0cyB0aGUgZXZlbnRtaXR0ZXIgdGhhdCBSZWZsdXggdXNlc1xuICovXG5leHBvcnRzLnNldEV2ZW50RW1pdHRlciA9IGZ1bmN0aW9uKGN0eCkge1xuICAgIHZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuICAgIGV4cG9ydHMuRXZlbnRFbWl0dGVyID0gXy5FdmVudEVtaXR0ZXIgPSBjdHg7XG59O1xuXG5cbi8qKlxuICogU2V0cyB0aGUgUHJvbWlzZSBsaWJyYXJ5IHRoYXQgUmVmbHV4IHVzZXNcbiAqL1xuZXhwb3J0cy5zZXRQcm9taXNlID0gZnVuY3Rpb24oY3R4KSB7XG4gICAgdmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG4gICAgZXhwb3J0cy5Qcm9taXNlID0gXy5Qcm9taXNlID0gY3R4O1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIFByb21pc2UgZmFjdG9yeSB0aGF0IGNyZWF0ZXMgbmV3IHByb21pc2VzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmYWN0b3J5IGhhcyB0aGUgc2lnbmF0dXJlIGBmdW5jdGlvbihyZXNvbHZlcikgeyByZXR1cm4gW25ldyBQcm9taXNlXTsgfWBcbiAqL1xuZXhwb3J0cy5zZXRQcm9taXNlRmFjdG9yeSA9IGZ1bmN0aW9uKGZhY3RvcnkpIHtcbiAgICB2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbiAgICBfLmNyZWF0ZVByb21pc2UgPSBmYWN0b3J5O1xufTtcblxuXG4vKipcbiAqIFNldHMgdGhlIG1ldGhvZCB1c2VkIGZvciBkZWZlcnJpbmcgYWN0aW9ucyBhbmQgc3RvcmVzXG4gKi9cbmV4cG9ydHMubmV4dFRpY2sgPSBmdW5jdGlvbihuZXh0VGljaykge1xuICAgIHZhciBfID0gcmVxdWlyZSgnLi91dGlscycpO1xuICAgIF8ubmV4dFRpY2sgPSBuZXh0VGljaztcbn07XG5cbi8qKlxuICogUHJvdmlkZXMgdGhlIHNldCBvZiBjcmVhdGVkIGFjdGlvbnMgYW5kIHN0b3JlcyBmb3IgaW50cm9zcGVjdGlvblxuICovXG5leHBvcnRzLl9fa2VlcCA9IHJlcXVpcmUoJy4vS2VlcCcpO1xuXG4vKipcbiAqIFdhcm4gaWYgRnVuY3Rpb24ucHJvdG90eXBlLmJpbmQgbm90IGF2YWlsYWJsZVxuICovXG5pZiAoIUZ1bmN0aW9uLnByb3RvdHlwZS5iaW5kKSB7XG4gIGNvbnNvbGUuZXJyb3IoXG4gICAgJ0Z1bmN0aW9uLnByb3RvdHlwZS5iaW5kIG5vdCBhdmFpbGFibGUuICcgK1xuICAgICdFUzUgc2hpbSByZXF1aXJlZC4gJyArXG4gICAgJ2h0dHBzOi8vZ2l0aHViLmNvbS9zcG9pa2UvcmVmbHV4anMjZXM1J1xuICApO1xufVxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDE4MFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzRGVmYXVsdFJlcXVpcmVkVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB1bmRlZmluZWQgfHwgdmFsdWUgPT09ICcnO1xuICB9LFxuICBoYXNWYWx1ZTogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gISF2YWx1ZTtcbiAgfSxcbiAgbWF0Y2hSZWdleHA6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlLCByZWdleHApIHtcbiAgICByZXR1cm4gISF2YWx1ZSAmJiAhIXZhbHVlLm1hdGNoKHJlZ2V4cCk7XG4gIH0sXG4gIGlzVW5kZWZpbmVkOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xuICB9LFxuICBpc0VtcHR5U3RyaW5nOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gJyc7XG4gIH0sXG4gIGlzRW1haWw6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuICF2YWx1ZSB8fCB2YWx1ZS5tYXRjaCgvXigoKFthLXpdfFxcZHxbISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5dfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSsoXFwuKFthLXpdfFxcZHxbISNcXCQlJidcXCpcXCtcXC1cXC89XFw/XFxeX2B7XFx8fX5dfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSspKil8KChcXHgyMikoKCgoXFx4MjB8XFx4MDkpKihcXHgwZFxceDBhKSk/KFxceDIwfFxceDA5KSspPygoW1xceDAxLVxceDA4XFx4MGJcXHgwY1xceDBlLVxceDFmXFx4N2ZdfFxceDIxfFtcXHgyMy1cXHg1Yl18W1xceDVkLVxceDdlXXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KFxcXFwoW1xceDAxLVxceDA5XFx4MGJcXHgwY1xceDBkLVxceDdmXXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKSkqKCgoXFx4MjB8XFx4MDkpKihcXHgwZFxceDBhKSk/KFxceDIwfFxceDA5KSspPyhcXHgyMikpKUAoKChbYS16XXxcXGR8W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCgoW2Etel18XFxkfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKShbYS16XXxcXGR8LXxcXC58X3x+fFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSooW2Etel18XFxkfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSkpXFwuKSsoKFthLXpdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoKFthLXpdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKShbYS16XXxcXGR8LXxcXC58X3x+fFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSooW2Etel18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKSkkL2kpO1xuICB9LFxuICBpc1RydWU6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSB0cnVlO1xuICB9LFxuICBpc0ZhbHNlOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gZmFsc2U7XG4gIH0sXG4gIGlzTnVtZXJpYzogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgbWF0Y2hSZXN1bHRzID0gdmFsdWUubWF0Y2goL1stK10/KFxcZCpbLl0pP1xcZCsvKTtcbiAgICAgIGlmICghIW1hdGNoUmVzdWx0cykge1xuICAgICAgICByZXR1cm4gbWF0Y2hSZXN1bHRzWzBdID09IHZhbHVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgaXNBbHBoYTogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgL15bYS16QS1aXSskLy50ZXN0KHZhbHVlKTtcbiAgfSxcbiAgaXNXb3JkczogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgL15bYS16QS1aXFxzXSskLy50ZXN0KHZhbHVlKTtcbiAgfSxcbiAgaXNTcGVjaWFsV29yZHM6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuICF2YWx1ZSB8fCB2YWx1ZS5tYXRjaCgvXlthLXpBLVpcXHNcXHUwMEMwLVxcdTAxN0ZdKyQvKTtcbiAgfSxcbiAgaXNMZW5ndGg6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlLCBsZW5ndGgpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoID09PSBsZW5ndGg7XG4gIH0sXG4gIGVxdWFsczogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUsIGVxbCkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBlcWw7XG4gIH0sXG4gIGVxdWFsc0ZpZWxkOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSwgZmllbGQpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gdmFsdWVzW2ZpZWxkXTtcbiAgfSxcbiAgbWF4TGVuZ3RoOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPD0gbGVuZ3RoO1xuICB9LFxuICBtaW5MZW5ndGg6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlLCBsZW5ndGgpIHtcbiAgICByZXR1cm4gdmFsdWUgJiYgdmFsdWUubGVuZ3RoICYmIHZhbHVlLmxlbmd0aCA+PSBsZW5ndGg7XG4gIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mb3Jtc3ktcmVhY3Qvc3JjL3ZhbGlkYXRpb25SdWxlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE4MVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gIGFycmF5c0RpZmZlcjogZnVuY3Rpb24gKGFycmF5QSwgYXJyYXlCKSB7XG4gICAgdmFyIGlzRGlmZmVyZW50ID0gZmFsc2U7XG4gICAgaWYgKGFycmF5QS5sZW5ndGggIT09IGFycmF5Qi5sZW5ndGgpIHtcbiAgICAgIGlzRGlmZmVyZW50ID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXJyYXlBLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0sIGluZGV4KSB7XG4gICAgICAgIGlmIChpdGVtICE9PSBhcnJheUJbaW5kZXhdKSB7XG4gICAgICAgICAgaXNEaWZmZXJlbnQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIGlzRGlmZmVyZW50O1xuICB9XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZm9ybXN5LXJlYWN0L3NyYy91dGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDE4MlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIGNvbnZlcnRWYWxpZGF0aW9uc1RvT2JqZWN0ID0gZnVuY3Rpb24gKHZhbGlkYXRpb25zKSB7XG5cbiAgaWYgKHR5cGVvZiB2YWxpZGF0aW9ucyA9PT0gJ3N0cmluZycpIHtcblxuICAgIHJldHVybiB2YWxpZGF0aW9ucy5zcGxpdCgvXFwsKD8hW157XFxbXSpbfVxcXV0pL2cpLnJlZHVjZShmdW5jdGlvbiAodmFsaWRhdGlvbnMsIHZhbGlkYXRpb24pIHtcbiAgICAgIHZhciBhcmdzID0gdmFsaWRhdGlvbi5zcGxpdCgnOicpO1xuICAgICAgdmFyIHZhbGlkYXRlTWV0aG9kID0gYXJncy5zaGlmdCgpO1xuICAgICAgYXJncyA9IGFyZ3MubWFwKGZ1bmN0aW9uIChhcmcpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShhcmcpO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmV0dXJuIGFyZzsgLy8gSXQgaXMgYSBzdHJpbmcgaWYgaXQgY2FuIG5vdCBwYXJzZSBpdFxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIFxuICAgICAgaWYgKGFyZ3MubGVuZ3RoID4gMSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm1zeSBkb2VzIG5vdCBzdXBwb3J0IG11bHRpcGxlIGFyZ3Mgb24gc3RyaW5nIHZhbGlkYXRpb25zLiBVc2Ugb2JqZWN0IGZvcm1hdCBvZiB2YWxpZGF0aW9ucyBpbnN0ZWFkLicpO1xuICAgICAgfVxuICAgICAgdmFsaWRhdGlvbnNbdmFsaWRhdGVNZXRob2RdID0gYXJncy5sZW5ndGggPyBhcmdzWzBdIDogdHJ1ZTtcbiAgICAgIHJldHVybiB2YWxpZGF0aW9ucztcbiAgICB9LCB7fSk7XG5cbiAgfVxuXG4gIHJldHVybiB2YWxpZGF0aW9ucyB8fCB7fTtcblxufTtcbm1vZHVsZS5leHBvcnRzID0ge1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgX3ZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgX2lzUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgX2lzVmFsaWQ6IHRydWUsXG4gICAgICBfaXNQcmlzdGluZTogdHJ1ZSxcbiAgICAgIF9wcmlzdGluZVZhbHVlOiB0aGlzLnByb3BzLnZhbHVlLFxuICAgICAgX3ZhbGlkYXRpb25FcnJvcjogJycsXG4gICAgICBfZXh0ZXJuYWxFcnJvcjogbnVsbFxuICAgIH07XG4gIH0sXG4gIGdldERlZmF1bHRQcm9wczogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICB2YWxpZGF0aW9uRXJyb3I6ICcnLFxuICAgICAgdmFsaWRhdGlvbkVycm9yczoge31cbiAgICB9O1xuICB9LFxuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcblxuICAgIHZhciBjb25maWd1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnNldFZhbGlkYXRpb25zKHRoaXMucHJvcHMudmFsaWRhdGlvbnMsIHRoaXMucHJvcHMucmVxdWlyZWQpO1xuICAgICAgdGhpcy5wcm9wcy5fYXR0YWNoVG9Gb3JtKHRoaXMpO1xuICAgIH0uYmluZCh0aGlzKTtcblxuICAgIGlmICghdGhpcy5wcm9wcy5uYW1lKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gSW5wdXQgcmVxdWlyZXMgYSBuYW1lIHByb3BlcnR5IHdoZW4gdXNlZCcpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5wcm9wcy5fYXR0YWNoVG9Gb3JtKSB7XG4gICAgICByZXR1cm4gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc01vdW50ZWQoKSkgcmV0dXJuO1xuICAgICAgICBpZiAoIXRoaXMucHJvcHMuX2F0dGFjaFRvRm9ybSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybSBNaXhpbiByZXF1aXJlcyBjb21wb25lbnQgdG8gYmUgbmVzdGVkIGluIGEgRm9ybScpO1xuICAgICAgICB9XG4gICAgICAgIGNvbmZpZ3VyZSgpO1xuICAgICAgfS5iaW5kKHRoaXMpLCAwKTtcbiAgICB9XG4gICAgY29uZmlndXJlKCk7XG5cbiAgfSxcblxuICAvLyBXZSBoYXZlIHRvIG1ha2UgdGhlIHZhbGlkYXRlIG1ldGhvZCBpcyBrZXB0IHdoZW4gbmV3IHByb3BzIGFyZSBhZGRlZFxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzOiBmdW5jdGlvbiAobmV4dFByb3BzKSB7XG4gICAgdGhpcy5zZXRWYWxpZGF0aW9ucyhuZXh0UHJvcHMudmFsaWRhdGlvbnMsIG5leHRQcm9wcy5yZXF1aXJlZCk7XG4gIH0sXG5cbiAgY29tcG9uZW50RGlkVXBkYXRlOiBmdW5jdGlvbiAocHJldlByb3BzLCBwcmV2U3RhdGUpIHtcblxuICAgIHZhciBpc1ZhbHVlQ2hhbmdlZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgIFxuICAgICAgcmV0dXJuIHRoaXMucHJvcHMudmFsdWUgIT09IHByZXZQcm9wcy52YWx1ZSAmJiB0aGlzLnN0YXRlLl92YWx1ZSA9PT0gcHJldlByb3BzLnZhbHVlO1xuXG4gICAgfS5iaW5kKHRoaXMpO1xuXG5cbiAgICAvLyBJZiB2YWxpZGF0aW9ucyBoYXMgY2hhbmdlZCBvciBzb21ldGhpbmcgb3V0c2lkZSBjaGFuZ2VzIFxuICAgIC8vIHRoZSB2YWx1ZSwgc2V0IHRoZSB2YWx1ZSBhZ2FpbiBydW5uaW5nIGEgdmFsaWRhdGlvblxuICAgIGlmIChpc1ZhbHVlQ2hhbmdlZCgpKSB7XG4gICAgICB0aGlzLnNldFZhbHVlKHRoaXMucHJvcHMudmFsdWUpO1xuICAgIH1cbiAgfSxcblxuICAvLyBEZXRhY2ggaXQgd2hlbiBjb21wb25lbnQgdW5tb3VudHNcbiAgY29tcG9uZW50V2lsbFVubW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnByb3BzLl9kZXRhY2hGcm9tRm9ybSh0aGlzKTtcbiAgfSxcblxuICBzZXRWYWxpZGF0aW9uczogZnVuY3Rpb24gKHZhbGlkYXRpb25zLCByZXF1aXJlZCkge1xuXG4gICAgLy8gQWRkIHZhbGlkYXRpb25zIHRvIHRoZSBzdG9yZSBpdHNlbGYgYXMgdGhlIHByb3BzIG9iamVjdCBjYW4gbm90IGJlIG1vZGlmaWVkXG4gICAgdGhpcy5fdmFsaWRhdGlvbnMgPSBjb252ZXJ0VmFsaWRhdGlvbnNUb09iamVjdCh2YWxpZGF0aW9ucykgfHwge307XG4gICAgdGhpcy5fcmVxdWlyZWRWYWxpZGF0aW9ucyA9IHJlcXVpcmVkID09PSB0cnVlID8ge2lzRGVmYXVsdFJlcXVpcmVkVmFsdWU6IHRydWV9IDogY29udmVydFZhbGlkYXRpb25zVG9PYmplY3QocmVxdWlyZWQpO1xuXG4gIH0sXG5cbiAgLy8gV2UgdmFsaWRhdGUgYWZ0ZXIgdGhlIHZhbHVlIGhhcyBiZWVuIHNldFxuICBzZXRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBfdmFsdWU6IHZhbHVlLFxuICAgICAgX2lzUHJpc3RpbmU6IGZhbHNlXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wcm9wcy5fdmFsaWRhdGUodGhpcyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcbiAgcmVzZXRWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgX3ZhbHVlOiB0aGlzLnN0YXRlLl9wcmlzdGluZVZhbHVlLFxuICAgICAgX2lzUHJpc3RpbmU6IHRydWVcbiAgICB9LCBmdW5jdGlvbiAoKSB7XG4gICAgICB0aGlzLnByb3BzLl92YWxpZGF0ZSh0aGlzKTtcbiAgICB9KTtcbiAgfSxcbiAgZ2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5fdmFsdWU7XG4gIH0sXG4gIGhhc1ZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3ZhbHVlICE9PSAnJztcbiAgfSxcbiAgZ2V0RXJyb3JNZXNzYWdlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzVmFsaWQoKSB8fCB0aGlzLnNob3dSZXF1aXJlZCgpID8gKHRoaXMuc3RhdGUuX2V4dGVybmFsRXJyb3IgfHwgdGhpcy5zdGF0ZS5fdmFsaWRhdGlvbkVycm9yKSA6IG51bGw7XG4gIH0sXG4gIGlzRm9ybURpc2FibGVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuX2lzRm9ybURpc2FibGVkKCk7XG4gIH0sXG4gIGlzVmFsaWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5faXNWYWxpZDtcbiAgfSxcbiAgaXNQcmlzdGluZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9pc1ByaXN0aW5lO1xuICB9LFxuICBpc1JlcXVpcmVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICEhdGhpcy5wcm9wcy5yZXF1aXJlZDtcbiAgfSxcbiAgc2hvd1JlcXVpcmVkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX2lzUmVxdWlyZWQ7XG4gIH0sXG4gIHNob3dFcnJvcjogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhdGhpcy5zaG93UmVxdWlyZWQoKSAmJiAhdGhpcy5pc1ZhbGlkKCk7XG4gIH0sXG4gIGlzVmFsaWRWYWx1ZTogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvcHMuX2lzVmFsaWRWYWx1ZS5jYWxsKG51bGwsIHRoaXMsIHZhbHVlKTtcbiAgfVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Zvcm1zeS1yZWFjdC9zcmMvTWl4aW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxODNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIi8qKlxuICogQSBtb2R1bGUgb2YgbWV0aG9kcyB0aGF0IHlvdSB3YW50IHRvIGluY2x1ZGUgaW4gYWxsIGFjdGlvbnMuXG4gKiBUaGlzIG1vZHVsZSBpcyBjb25zdW1lZCBieSBgY3JlYXRlQWN0aW9uYC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSB7XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9BY3Rpb25NZXRob2RzLmpzXG4gKiogbW9kdWxlIGlkID0gMjAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgXyA9IHJlcXVpcmUoJy4vdXRpbHMnKSxcbiAgICBtYWtlciA9IHJlcXVpcmUoJy4vam9pbnMnKS5pbnN0YW5jZUpvaW5DcmVhdG9yO1xuXG4vKipcbiAqIEV4dHJhY3QgY2hpbGQgbGlzdGVuYWJsZXMgZnJvbSBhIHBhcmVudCBmcm9tIHRoZWlyXG4gKiBjaGlsZHJlbiBwcm9wZXJ0eSBhbmQgcmV0dXJuIHRoZW0gaW4gYSBrZXllZCBPYmplY3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuYWJsZSBUaGUgcGFyZW50IGxpc3RlbmFibGVcbiAqL1xudmFyIG1hcENoaWxkTGlzdGVuYWJsZXMgPSBmdW5jdGlvbihsaXN0ZW5hYmxlKSB7XG4gICAgdmFyIGkgPSAwLCBjaGlsZHJlbiA9IHt9LCBjaGlsZE5hbWU7XG4gICAgZm9yICg7aSA8IChsaXN0ZW5hYmxlLmNoaWxkcmVufHxbXSkubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgY2hpbGROYW1lID0gbGlzdGVuYWJsZS5jaGlsZHJlbltpXTtcbiAgICAgICAgaWYobGlzdGVuYWJsZVtjaGlsZE5hbWVdKXtcbiAgICAgICAgICAgIGNoaWxkcmVuW2NoaWxkTmFtZV0gPSBsaXN0ZW5hYmxlW2NoaWxkTmFtZV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGNoaWxkcmVuO1xufTtcblxuLyoqXG4gKiBNYWtlIGEgZmxhdCBkaWN0aW9uYXJ5IG9mIGFsbCBsaXN0ZW5hYmxlcyBpbmNsdWRpbmcgdGhlaXJcbiAqIHBvc3NpYmxlIGNoaWxkcmVuIChyZWN1cnNpdmVseSksIGNvbmNhdGVuYXRpbmcgbmFtZXMgaW4gY2FtZWxDYXNlLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBsaXN0ZW5hYmxlcyBUaGUgdG9wLWxldmVsIGxpc3RlbmFibGVzXG4gKi9cbnZhciBmbGF0dGVuTGlzdGVuYWJsZXMgPSBmdW5jdGlvbihsaXN0ZW5hYmxlcykge1xuICAgIHZhciBmbGF0dGVuZWQgPSB7fTtcbiAgICBmb3IodmFyIGtleSBpbiBsaXN0ZW5hYmxlcyl7XG4gICAgICAgIHZhciBsaXN0ZW5hYmxlID0gbGlzdGVuYWJsZXNba2V5XTtcbiAgICAgICAgdmFyIGNoaWxkTWFwID0gbWFwQ2hpbGRMaXN0ZW5hYmxlcyhsaXN0ZW5hYmxlKTtcblxuICAgICAgICAvLyByZWN1cnNpdmVseSBmbGF0dGVuIGNoaWxkcmVuXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IGZsYXR0ZW5MaXN0ZW5hYmxlcyhjaGlsZE1hcCk7XG5cbiAgICAgICAgLy8gYWRkIHRoZSBwcmltYXJ5IGxpc3RlbmFibGUgYW5kIGNoaWxyZW5cbiAgICAgICAgZmxhdHRlbmVkW2tleV0gPSBsaXN0ZW5hYmxlO1xuICAgICAgICBmb3IodmFyIGNoaWxkS2V5IGluIGNoaWxkcmVuKXtcbiAgICAgICAgICAgIHZhciBjaGlsZExpc3RlbmFibGUgPSBjaGlsZHJlbltjaGlsZEtleV07XG4gICAgICAgICAgICBmbGF0dGVuZWRba2V5ICsgXy5jYXBpdGFsaXplKGNoaWxkS2V5KV0gPSBjaGlsZExpc3RlbmFibGU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmxhdHRlbmVkO1xufTtcblxuLyoqXG4gKiBBIG1vZHVsZSBvZiBtZXRob2RzIHJlbGF0ZWQgdG8gbGlzdGVuaW5nLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8qKlxuICAgICAqIEFuIGludGVybmFsIHV0aWxpdHkgZnVuY3Rpb24gdXNlZCBieSBgdmFsaWRhdGVMaXN0ZW5pbmdgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBUaGUgbGlzdGVuYWJsZSB3ZSB3YW50IHRvIHNlYXJjaCBmb3JcbiAgICAgKiBAcmV0dXJucyB7Qm9vbGVhbn0gVGhlIHJlc3VsdCBvZiBhIHJlY3Vyc2l2ZSBzZWFyY2ggYW1vbmcgYHRoaXMuc3Vic2NyaXB0aW9uc2BcbiAgICAgKi9cbiAgICBoYXNMaXN0ZW5lcjogZnVuY3Rpb24obGlzdGVuYWJsZSkge1xuICAgICAgICB2YXIgaSA9IDAsIGosIGxpc3RlbmVyLCBsaXN0ZW5hYmxlcztcbiAgICAgICAgZm9yICg7aSA8ICh0aGlzLnN1YnNjcmlwdGlvbnN8fFtdKS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgICAgbGlzdGVuYWJsZXMgPSBbXS5jb25jYXQodGhpcy5zdWJzY3JpcHRpb25zW2ldLmxpc3RlbmFibGUpO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxpc3RlbmFibGVzLmxlbmd0aDsgaisrKXtcbiAgICAgICAgICAgICAgICBsaXN0ZW5lciA9IGxpc3RlbmFibGVzW2pdO1xuICAgICAgICAgICAgICAgIGlmIChsaXN0ZW5lciA9PT0gbGlzdGVuYWJsZSB8fCBsaXN0ZW5lci5oYXNMaXN0ZW5lciAmJiBsaXN0ZW5lci5oYXNMaXN0ZW5lcihsaXN0ZW5hYmxlKSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBBIGNvbnZlbmllbmNlIG1ldGhvZCB0aGF0IGxpc3RlbnMgdG8gYWxsIGxpc3RlbmFibGVzIGluIHRoZSBnaXZlbiBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gbGlzdGVuYWJsZXMgQW4gb2JqZWN0IG9mIGxpc3RlbmFibGVzLiBLZXlzIHdpbGwgYmUgdXNlZCBhcyBjYWxsYmFjayBtZXRob2QgbmFtZXMuXG4gICAgICovXG4gICAgbGlzdGVuVG9NYW55OiBmdW5jdGlvbihsaXN0ZW5hYmxlcyl7XG4gICAgICAgIHZhciBhbGxMaXN0ZW5hYmxlcyA9IGZsYXR0ZW5MaXN0ZW5hYmxlcyhsaXN0ZW5hYmxlcyk7XG4gICAgICAgIGZvcih2YXIga2V5IGluIGFsbExpc3RlbmFibGVzKXtcbiAgICAgICAgICAgIHZhciBjYm5hbWUgPSBfLmNhbGxiYWNrTmFtZShrZXkpLFxuICAgICAgICAgICAgICAgIGxvY2FsbmFtZSA9IHRoaXNbY2JuYW1lXSA/IGNibmFtZSA6IHRoaXNba2V5XSA/IGtleSA6IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGlmIChsb2NhbG5hbWUpe1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG8oYWxsTGlzdGVuYWJsZXNba2V5XSxsb2NhbG5hbWUsdGhpc1tjYm5hbWUrXCJEZWZhdWx0XCJdfHx0aGlzW2xvY2FsbmFtZStcIkRlZmF1bHRcIl18fGxvY2FsbmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogQ2hlY2tzIGlmIHRoZSBjdXJyZW50IGNvbnRleHQgY2FuIGxpc3RlbiB0byB0aGUgc3VwcGxpZWQgbGlzdGVuYWJsZVxuICAgICAqXG4gICAgICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gICAgICogIGxpc3RlbmVkIHRvLlxuICAgICAqIEByZXR1cm5zIHtTdHJpbmd8VW5kZWZpbmVkfSBBbiBlcnJvciBtZXNzYWdlLCBvciB1bmRlZmluZWQgaWYgdGhlcmUgd2FzIG5vIHByb2JsZW0uXG4gICAgICovXG4gICAgdmFsaWRhdGVMaXN0ZW5pbmc6IGZ1bmN0aW9uKGxpc3RlbmFibGUpe1xuICAgICAgICBpZiAobGlzdGVuYWJsZSA9PT0gdGhpcykge1xuICAgICAgICAgICAgcmV0dXJuIFwiTGlzdGVuZXIgaXMgbm90IGFibGUgdG8gbGlzdGVuIHRvIGl0c2VsZlwiO1xuICAgICAgICB9XG4gICAgICAgIGlmICghXy5pc0Z1bmN0aW9uKGxpc3RlbmFibGUubGlzdGVuKSkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3RlbmFibGUgKyBcIiBpcyBtaXNzaW5nIGEgbGlzdGVuIG1ldGhvZFwiO1xuICAgICAgICB9XG4gICAgICAgIGlmIChsaXN0ZW5hYmxlLmhhc0xpc3RlbmVyICYmIGxpc3RlbmFibGUuaGFzTGlzdGVuZXIodGhpcykpIHtcbiAgICAgICAgICAgIHJldHVybiBcIkxpc3RlbmVyIGNhbm5vdCBsaXN0ZW4gdG8gdGhpcyBsaXN0ZW5hYmxlIGJlY2F1c2Ugb2YgY2lyY3VsYXIgbG9vcFwiO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFNldHMgdXAgYSBzdWJzY3JpcHRpb24gdG8gdGhlIGdpdmVuIGxpc3RlbmFibGUgZm9yIHRoZSBjb250ZXh0IG9iamVjdFxuICAgICAqXG4gICAgICogQHBhcmFtIHtBY3Rpb258U3RvcmV9IGxpc3RlbmFibGUgQW4gQWN0aW9uIG9yIFN0b3JlIHRoYXQgc2hvdWxkIGJlXG4gICAgICogIGxpc3RlbmVkIHRvLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBkZWZhdWx0Q2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGRlZmF1bHQgaGFuZGxlclxuICAgICAqIEByZXR1cm5zIHtPYmplY3R9IEEgc3Vic2NyaXB0aW9uIG9iaiB3aGVyZSBgc3RvcGAgaXMgYW4gdW5zdWIgZnVuY3Rpb24gYW5kIGBsaXN0ZW5hYmxlYCBpcyB0aGUgb2JqZWN0IGJlaW5nIGxpc3RlbmVkIHRvXG4gICAgICovXG4gICAgbGlzdGVuVG86IGZ1bmN0aW9uKGxpc3RlbmFibGUsIGNhbGxiYWNrLCBkZWZhdWx0Q2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGRlc3ViLCB1bnN1YnNjcmliZXIsIHN1YnNjcmlwdGlvbm9iaiwgc3VicyA9IHRoaXMuc3Vic2NyaXB0aW9ucyA9IHRoaXMuc3Vic2NyaXB0aW9ucyB8fCBbXTtcbiAgICAgICAgXy50aHJvd0lmKHRoaXMudmFsaWRhdGVMaXN0ZW5pbmcobGlzdGVuYWJsZSkpO1xuICAgICAgICB0aGlzLmZldGNoSW5pdGlhbFN0YXRlKGxpc3RlbmFibGUsIGRlZmF1bHRDYWxsYmFjayk7XG4gICAgICAgIGRlc3ViID0gbGlzdGVuYWJsZS5saXN0ZW4odGhpc1tjYWxsYmFja118fGNhbGxiYWNrLCB0aGlzKTtcbiAgICAgICAgdW5zdWJzY3JpYmVyID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBzdWJzLmluZGV4T2Yoc3Vic2NyaXB0aW9ub2JqKTtcbiAgICAgICAgICAgIF8udGhyb3dJZihpbmRleCA9PT0gLTEsJ1RyaWVkIHRvIHJlbW92ZSBsaXN0ZW4gYWxyZWFkeSBnb25lIGZyb20gc3Vic2NyaXB0aW9ucyBsaXN0IScpO1xuICAgICAgICAgICAgc3Vicy5zcGxpY2UoaW5kZXgsIDEpO1xuICAgICAgICAgICAgZGVzdWIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgc3Vic2NyaXB0aW9ub2JqID0ge1xuICAgICAgICAgICAgc3RvcDogdW5zdWJzY3JpYmVyLFxuICAgICAgICAgICAgbGlzdGVuYWJsZTogbGlzdGVuYWJsZVxuICAgICAgICB9O1xuICAgICAgICBzdWJzLnB1c2goc3Vic2NyaXB0aW9ub2JqKTtcbiAgICAgICAgcmV0dXJuIHN1YnNjcmlwdGlvbm9iajtcbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogU3RvcHMgbGlzdGVuaW5nIHRvIGEgc2luZ2xlIGxpc3RlbmFibGVcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIFRoZSBhY3Rpb24gb3Igc3RvcmUgd2Ugbm8gbG9uZ2VyIHdhbnQgdG8gbGlzdGVuIHRvXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IFRydWUgaWYgYSBzdWJzY3JpcHRpb24gd2FzIGZvdW5kIGFuZCByZW1vdmVkLCBvdGhlcndpc2UgZmFsc2UuXG4gICAgICovXG4gICAgc3RvcExpc3RlbmluZ1RvOiBmdW5jdGlvbihsaXN0ZW5hYmxlKXtcbiAgICAgICAgdmFyIHN1YiwgaSA9IDAsIHN1YnMgPSB0aGlzLnN1YnNjcmlwdGlvbnMgfHwgW107XG4gICAgICAgIGZvcig7aSA8IHN1YnMubGVuZ3RoOyBpKyspe1xuICAgICAgICAgICAgc3ViID0gc3Vic1tpXTtcbiAgICAgICAgICAgIGlmIChzdWIubGlzdGVuYWJsZSA9PT0gbGlzdGVuYWJsZSl7XG4gICAgICAgICAgICAgICAgc3ViLnN0b3AoKTtcbiAgICAgICAgICAgICAgICBfLnRocm93SWYoc3Vicy5pbmRleE9mKHN1YikhPT0tMSwnRmFpbGVkIHRvIHJlbW92ZSBsaXN0ZW4gZnJvbSBzdWJzY3JpcHRpb25zIGxpc3QhJyk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdG9wcyBhbGwgc3Vic2NyaXB0aW9ucyBhbmQgZW1wdGllcyBzdWJzY3JpcHRpb25zIGFycmF5XG4gICAgICovXG4gICAgc3RvcExpc3RlbmluZ1RvQWxsOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgcmVtYWluaW5nLCBzdWJzID0gdGhpcy5zdWJzY3JpcHRpb25zIHx8IFtdO1xuICAgICAgICB3aGlsZSgocmVtYWluaW5nPXN1YnMubGVuZ3RoKSl7XG4gICAgICAgICAgICBzdWJzWzBdLnN0b3AoKTtcbiAgICAgICAgICAgIF8udGhyb3dJZihzdWJzLmxlbmd0aCE9PXJlbWFpbmluZy0xLCdGYWlsZWQgdG8gcmVtb3ZlIGxpc3RlbiBmcm9tIHN1YnNjcmlwdGlvbnMgbGlzdCEnKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBVc2VkIGluIGBsaXN0ZW5Ub2AuIEZldGNoZXMgaW5pdGlhbCBkYXRhIGZyb20gYSBwdWJsaXNoZXIgaWYgaXQgaGFzIGEgYGdldEluaXRpYWxTdGF0ZWAgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7QWN0aW9ufFN0b3JlfSBsaXN0ZW5hYmxlIFRoZSBwdWJsaXNoZXIgd2Ugd2FudCB0byBnZXQgaW5pdGlhbCBzdGF0ZSBmcm9tXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGRlZmF1bHRDYWxsYmFjayBUaGUgbWV0aG9kIHRvIHJlY2VpdmUgdGhlIGRhdGFcbiAgICAgKi9cbiAgICBmZXRjaEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKGxpc3RlbmFibGUsIGRlZmF1bHRDYWxsYmFjaykge1xuICAgICAgICBkZWZhdWx0Q2FsbGJhY2sgPSAoZGVmYXVsdENhbGxiYWNrICYmIHRoaXNbZGVmYXVsdENhbGxiYWNrXSkgfHwgZGVmYXVsdENhbGxiYWNrO1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICBpZiAoXy5pc0Z1bmN0aW9uKGRlZmF1bHRDYWxsYmFjaykgJiYgXy5pc0Z1bmN0aW9uKGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKSkge1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSgpO1xuICAgICAgICAgICAgaWYgKGRhdGEgJiYgXy5pc0Z1bmN0aW9uKGRhdGEudGhlbikpIHtcbiAgICAgICAgICAgICAgICBkYXRhLnRoZW4oZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHRDYWxsYmFjay5hcHBseShtZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdENhbGxiYWNrLmNhbGwodGhpcywgZGF0YSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgLyoqXG4gICAgICogVGhlIGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIG9uY2UgYWxsIGxpc3RlbmFibGVzIGhhdmUgdHJpZ2dlcmVkIGF0IGxlYXN0IG9uY2UuXG4gICAgICogSXQgd2lsbCBiZSBpbnZva2VkIHdpdGggdGhlIGxhc3QgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pblRyYWlsaW5nOiBtYWtlcihcImxhc3RcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQgYXQgbGVhc3Qgb25jZS5cbiAgICAgKiBJdCB3aWxsIGJlIGludm9rZWQgd2l0aCB0aGUgZmlyc3QgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pbkxlYWRpbmc6IG1ha2VyKFwiZmlyc3RcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQgYXQgbGVhc3Qgb25jZS5cbiAgICAgKiBJdCB3aWxsIGJlIGludm9rZWQgd2l0aCBhbGwgZW1pc3Npb24gZnJvbSBlYWNoIGxpc3RlbmFibGUuXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pbkNvbmNhdDogbWFrZXIoXCJhbGxcIiksXG5cbiAgICAvKipcbiAgICAgKiBUaGUgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgb25jZSBhbGwgbGlzdGVuYWJsZXMgaGF2ZSB0cmlnZ2VyZWQuXG4gICAgICogSWYgYSBjYWxsYmFjayB0cmlnZ2VycyB0d2ljZSBiZWZvcmUgdGhhdCBoYXBwZW5zLCBhbiBlcnJvciBpcyB0aHJvd24uXG4gICAgICogQHBhcmFtIHsuLi5QdWJsaXNoZXJzfSBwdWJsaXNoZXJzIFB1Ymxpc2hlcnMgdGhhdCBzaG91bGQgYmUgdHJhY2tlZC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufFN0cmluZ30gY2FsbGJhY2sgVGhlIG1ldGhvZCB0byBjYWxsIHdoZW4gYWxsIHB1Ymxpc2hlcnMgaGF2ZSBlbWl0dGVkXG4gICAgICogQHJldHVybnMge09iamVjdH0gQSBzdWJzY3JpcHRpb24gb2JqIHdoZXJlIGBzdG9wYCBpcyBhbiB1bnN1YiBmdW5jdGlvbiBhbmQgYGxpc3RlbmFibGVgIGlzIGFuIGFycmF5IG9mIGxpc3RlbmFibGVzXG4gICAgICovXG4gICAgam9pblN0cmljdDogbWFrZXIoXCJzdHJpY3RcIilcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL0xpc3RlbmVyTWV0aG9kcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbi8qKlxuICogQSBtb2R1bGUgb2YgbWV0aG9kcyBmb3Igb2JqZWN0IHRoYXQgeW91IHdhbnQgdG8gYmUgYWJsZSB0byBsaXN0ZW4gdG8uXG4gKiBUaGlzIG1vZHVsZSBpcyBjb25zdW1lZCBieSBgY3JlYXRlU3RvcmVgIGFuZCBgY3JlYXRlQWN0aW9uYFxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcblxuICAgIC8qKlxuICAgICAqIEhvb2sgdXNlZCBieSB0aGUgcHVibGlzaGVyIHRoYXQgaXMgaW52b2tlZCBiZWZvcmUgZW1pdHRpbmdcbiAgICAgKiBhbmQgYmVmb3JlIGBzaG91bGRFbWl0YC4gVGhlIGFyZ3VtZW50cyBhcmUgdGhlIG9uZXMgdGhhdCB0aGUgYWN0aW9uXG4gICAgICogaXMgaW52b2tlZCB3aXRoLiBJZiB0aGlzIGZ1bmN0aW9uIHJldHVybnMgc29tZXRoaW5nIG90aGVyIHRoYW5cbiAgICAgKiB1bmRlZmluZWQsIHRoYXQgd2lsbCBiZSBwYXNzZWQgb24gYXMgYXJndW1lbnRzIGZvciBzaG91bGRFbWl0IGFuZFxuICAgICAqIGVtaXNzaW9uLlxuICAgICAqL1xuICAgIHByZUVtaXQ6IGZ1bmN0aW9uKCkge30sXG5cbiAgICAvKipcbiAgICAgKiBIb29rIHVzZWQgYnkgdGhlIHB1Ymxpc2hlciBhZnRlciBgcHJlRW1pdGAgdG8gZGV0ZXJtaW5lIGlmIHRoZVxuICAgICAqIGV2ZW50IHNob3VsZCBiZSBlbWl0dGVkIHdpdGggZ2l2ZW4gYXJndW1lbnRzLiBUaGlzIG1heSBiZSBvdmVycmlkZGVuXG4gICAgICogaW4geW91ciBhcHBsaWNhdGlvbiwgZGVmYXVsdCBpbXBsZW1lbnRhdGlvbiBhbHdheXMgcmV0dXJucyB0cnVlLlxuICAgICAqXG4gICAgICogQHJldHVybnMge0Jvb2xlYW59IHRydWUgaWYgZXZlbnQgc2hvdWxkIGJlIGVtaXR0ZWRcbiAgICAgKi9cbiAgICBzaG91bGRFbWl0OiBmdW5jdGlvbigpIHsgcmV0dXJuIHRydWU7IH0sXG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYWN0aW9uIHRyaWdnZXJlZFxuICAgICAqXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGNhbGxiYWNrIHRvIHJlZ2lzdGVyIGFzIGV2ZW50IGhhbmRsZXJcbiAgICAgKiBAcGFyYW0ge01peGVkfSBbb3B0aW9uYWxdIGJpbmRDb250ZXh0IFRoZSBjb250ZXh0IHRvIGJpbmQgdGhlIGNhbGxiYWNrIHdpdGhcbiAgICAgKiBAcmV0dXJucyB7RnVuY3Rpb259IENhbGxiYWNrIHRoYXQgdW5zdWJzY3JpYmVzIHRoZSByZWdpc3RlcmVkIGV2ZW50IGhhbmRsZXJcbiAgICAgKi9cbiAgICBsaXN0ZW46IGZ1bmN0aW9uKGNhbGxiYWNrLCBiaW5kQ29udGV4dCkge1xuICAgICAgICBiaW5kQ29udGV4dCA9IGJpbmRDb250ZXh0IHx8IHRoaXM7XG4gICAgICAgIHZhciBldmVudEhhbmRsZXIgPSBmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICBpZiAoYWJvcnRlZCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkoYmluZENvbnRleHQsIGFyZ3MpO1xuICAgICAgICB9LCBtZSA9IHRoaXMsIGFib3J0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5lbWl0dGVyLmFkZExpc3RlbmVyKHRoaXMuZXZlbnRMYWJlbCwgZXZlbnRIYW5kbGVyKTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgYWJvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICBtZS5lbWl0dGVyLnJlbW92ZUxpc3RlbmVyKG1lLmV2ZW50TGFiZWwsIGV2ZW50SGFuZGxlcik7XG4gICAgICAgIH07XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEF0dGFjaCBoYW5kbGVycyB0byBwcm9taXNlIHRoYXQgdHJpZ2dlciB0aGUgY29tcGxldGVkIGFuZCBmYWlsZWRcbiAgICAgKiBjaGlsZCBwdWJsaXNoZXJzLCBpZiBhdmFpbGFibGUuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gVGhlIHByb21pc2UgdG8gYXR0YWNoIHRvXG4gICAgICovXG4gICAgcHJvbWlzZTogZnVuY3Rpb24ocHJvbWlzZSkge1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuXG4gICAgICAgIHZhciBjYW5IYW5kbGVQcm9taXNlID1cbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uaW5kZXhPZignY29tcGxldGVkJykgPj0gMCAmJlxuICAgICAgICAgICAgdGhpcy5jaGlsZHJlbi5pbmRleE9mKCdmYWlsZWQnKSA+PSAwO1xuXG4gICAgICAgIGlmICghY2FuSGFuZGxlUHJvbWlzZSl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1B1Ymxpc2hlciBtdXN0IGhhdmUgXCJjb21wbGV0ZWRcIiBhbmQgXCJmYWlsZWRcIiBjaGlsZCBwdWJsaXNoZXJzJyk7XG4gICAgICAgIH1cblxuICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBtZS5jb21wbGV0ZWQocmVzcG9uc2UpO1xuICAgICAgICB9LCBmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgICAgcmV0dXJuIG1lLmZhaWxlZChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBTdWJzY3JpYmVzIHRoZSBnaXZlbiBjYWxsYmFjayBmb3IgYWN0aW9uIHRyaWdnZXJlZCwgd2hpY2ggc2hvdWxkXG4gICAgICogcmV0dXJuIGEgcHJvbWlzZSB0aGF0IGluIHR1cm4gaXMgcGFzc2VkIHRvIGB0aGlzLnByb21pc2VgXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICAgICAqL1xuICAgIGxpc3RlbkFuZFByb21pc2U6IGZ1bmN0aW9uKGNhbGxiYWNrLCBiaW5kQ29udGV4dCkge1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICBiaW5kQ29udGV4dCA9IGJpbmRDb250ZXh0IHx8IHRoaXM7XG4gICAgICAgIHRoaXMud2lsbENhbGxQcm9taXNlID0gKHRoaXMud2lsbENhbGxQcm9taXNlIHx8IDApICsgMTtcblxuICAgICAgICB2YXIgcmVtb3ZlTGlzdGVuID0gdGhpcy5saXN0ZW4oZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIGlmICghY2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIGEgZnVuY3Rpb24gcmV0dXJuaW5nIGEgcHJvbWlzZSBidXQgZ290ICcgKyBjYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzLFxuICAgICAgICAgICAgICAgIHByb21pc2UgPSBjYWxsYmFjay5hcHBseShiaW5kQ29udGV4dCwgYXJncyk7XG4gICAgICAgICAgICByZXR1cm4gbWUucHJvbWlzZS5jYWxsKG1lLCBwcm9taXNlKTtcbiAgICAgICAgfSwgYmluZENvbnRleHQpO1xuXG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgbWUud2lsbENhbGxQcm9taXNlLS07XG4gICAgICAgICAgcmVtb3ZlTGlzdGVuLmNhbGwobWUpO1xuICAgICAgICB9O1xuXG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFB1Ymxpc2hlcyBhbiBldmVudCB1c2luZyBgdGhpcy5lbWl0dGVyYCAoaWYgYHNob3VsZEVtaXRgIGFncmVlcylcbiAgICAgKi9cbiAgICB0cmlnZ2VyOiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHMsXG4gICAgICAgICAgICBwcmUgPSB0aGlzLnByZUVtaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIGFyZ3MgPSBwcmUgPT09IHVuZGVmaW5lZCA/IGFyZ3MgOiBfLmlzQXJndW1lbnRzKHByZSkgPyBwcmUgOiBbXS5jb25jYXQocHJlKTtcbiAgICAgICAgaWYgKHRoaXMuc2hvdWxkRW1pdC5hcHBseSh0aGlzLCBhcmdzKSkge1xuICAgICAgICAgICAgdGhpcy5lbWl0dGVyLmVtaXQodGhpcy5ldmVudExhYmVsLCBhcmdzKTtcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICAvKipcbiAgICAgKiBUcmllcyB0byBwdWJsaXNoIHRoZSBldmVudCBvbiB0aGUgbmV4dCB0aWNrXG4gICAgICovXG4gICAgdHJpZ2dlckFzeW5jOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cyxtZSA9IHRoaXM7XG4gICAgICAgIF8ubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBtZS50cmlnZ2VyLmFwcGx5KG1lLCBhcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBQcm9taXNlIGZvciB0aGUgdHJpZ2dlcmVkIGFjdGlvblxuICAgICAqXG4gICAgICogQHJldHVybiB7UHJvbWlzZX1cbiAgICAgKiAgIFJlc29sdmVkIGJ5IGNvbXBsZXRlZCBjaGlsZCBhY3Rpb24uXG4gICAgICogICBSZWplY3RlZCBieSBmYWlsZWQgY2hpbGQgYWN0aW9uLlxuICAgICAqICAgSWYgbGlzdGVuQW5kUHJvbWlzZSdkLCB0aGVuIHByb21pc2UgYXNzb2NpYXRlZCB0byB0aGlzIHRyaWdnZXIuXG4gICAgICogICBPdGhlcndpc2UsIHRoZSBwcm9taXNlIGlzIGZvciBuZXh0IGNoaWxkIGFjdGlvbiBjb21wbGV0aW9uLlxuICAgICAqL1xuICAgIHRyaWdnZXJQcm9taXNlOiBmdW5jdGlvbigpe1xuICAgICAgICB2YXIgbWUgPSB0aGlzO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcblxuICAgICAgICB2YXIgY2FuSGFuZGxlUHJvbWlzZSA9XG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuLmluZGV4T2YoJ2NvbXBsZXRlZCcpID49IDAgJiZcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW4uaW5kZXhPZignZmFpbGVkJykgPj0gMDtcblxuICAgICAgICB2YXIgcHJvbWlzZSA9IF8uY3JlYXRlUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgIC8vIElmIGBsaXN0ZW5BbmRQcm9taXNlYCBpcyBsaXN0ZW5pbmdcbiAgICAgICAgICAgIC8vIHBhdGNoIGBwcm9taXNlYCB3LyBjb250ZXh0LWxvYWRlZCByZXNvbHZlL3JlamVjdFxuICAgICAgICAgICAgaWYgKG1lLndpbGxDYWxsUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIF8ubmV4dFRpY2soZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBvbGRfcHJvbWlzZV9tZXRob2QgPSBtZS5wcm9taXNlO1xuICAgICAgICAgICAgICAgICAgICBtZS5wcm9taXNlID0gZnVuY3Rpb24gKHByb21pc2UpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2UudGhlbihyZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmFjayB0byB5b3VyIHJlZ3VsYXJseSBzY2hlZHVsZSBwcm9ncmFtbWluZy5cbiAgICAgICAgICAgICAgICAgICAgICAgIG1lLnByb21pc2UgPSBvbGRfcHJvbWlzZV9tZXRob2Q7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbWUucHJvbWlzZS5hcHBseShtZSwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbWUudHJpZ2dlci5hcHBseShtZSwgYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoY2FuSGFuZGxlUHJvbWlzZSkge1xuICAgICAgICAgICAgICAgIHZhciByZW1vdmVTdWNjZXNzID0gbWUuY29tcGxldGVkLmxpc3RlbihmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoYXJncyk7XG4gICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICB2YXIgcmVtb3ZlRmFpbGVkID0gbWUuZmFpbGVkLmxpc3RlbihmdW5jdGlvbihhcmdzKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlbW92ZVN1Y2Nlc3MoKTtcbiAgICAgICAgICAgICAgICAgICAgcmVtb3ZlRmFpbGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIHJlamVjdChhcmdzKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgbWUudHJpZ2dlckFzeW5jLmFwcGx5KG1lLCBhcmdzKTtcblxuICAgICAgICAgICAgaWYgKCFjYW5IYW5kbGVQcm9taXNlKSB7XG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9QdWJsaXNoZXJNZXRob2RzLmpzXG4gKiogbW9kdWxlIGlkID0gMjA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIvKipcbiAqIEEgbW9kdWxlIG9mIG1ldGhvZHMgdGhhdCB5b3Ugd2FudCB0byBpbmNsdWRlIGluIGFsbCBzdG9yZXMuXG4gKiBUaGlzIG1vZHVsZSBpcyBjb25zdW1lZCBieSBgY3JlYXRlU3RvcmVgLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IHtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL1N0b3JlTWV0aG9kcy5qc1xuICoqIG1vZHVsZSBpZCA9IDIwNlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyksXG4gICAgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpLFxuICAgIEtlZXAgPSByZXF1aXJlKCcuL0tlZXAnKSxcbiAgICBhbGxvd2VkID0ge3ByZUVtaXQ6MSxzaG91bGRFbWl0OjF9O1xuXG4vKipcbiAqIENyZWF0ZXMgYW4gYWN0aW9uIGZ1bmN0b3Igb2JqZWN0LiBJdCBpcyBtaXhlZCBpbiB3aXRoIGZ1bmN0aW9uc1xuICogZnJvbSB0aGUgYFB1Ymxpc2hlck1ldGhvZHNgIG1peGluLiBgcHJlRW1pdGAgYW5kIGBzaG91bGRFbWl0YCBtYXlcbiAqIGJlIG92ZXJyaWRkZW4gaW4gdGhlIGRlZmluaXRpb24gb2JqZWN0LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZpbml0aW9uIFRoZSBhY3Rpb24gb2JqZWN0IGRlZmluaXRpb25cbiAqL1xudmFyIGNyZWF0ZUFjdGlvbiA9IGZ1bmN0aW9uKGRlZmluaXRpb24pIHtcblxuICAgIGRlZmluaXRpb24gPSBkZWZpbml0aW9uIHx8IHt9O1xuICAgIGlmICghXy5pc09iamVjdChkZWZpbml0aW9uKSl7XG4gICAgICAgIGRlZmluaXRpb24gPSB7YWN0aW9uTmFtZTogZGVmaW5pdGlvbn07XG4gICAgfVxuXG4gICAgZm9yKHZhciBhIGluIFJlZmx1eC5BY3Rpb25NZXRob2RzKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2FdICYmIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2FdKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGEgK1xuICAgICAgICAgICAgICAgIFwiIGluIFJlZmx1eC5BY3Rpb25NZXRob2RzLiBVc2UgYW5vdGhlciBtZXRob2QgbmFtZSBvciBvdmVycmlkZSBpdCBvbiBSZWZsdXguUHVibGlzaGVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKHZhciBkIGluIGRlZmluaXRpb24pe1xuICAgICAgICBpZiAoIWFsbG93ZWRbZF0gJiYgUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHNbZF0pIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBvdmVycmlkZSBBUEkgbWV0aG9kIFwiICsgZCArXG4gICAgICAgICAgICAgICAgXCIgaW4gYWN0aW9uIGNyZWF0aW9uLiBVc2UgYW5vdGhlciBtZXRob2QgbmFtZSBvciBvdmVycmlkZSBpdCBvbiBSZWZsdXguUHVibGlzaGVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVmaW5pdGlvbi5jaGlsZHJlbiA9IGRlZmluaXRpb24uY2hpbGRyZW4gfHwgW107XG4gICAgaWYgKGRlZmluaXRpb24uYXN5bmNSZXN1bHQpe1xuICAgICAgICBkZWZpbml0aW9uLmNoaWxkcmVuID0gZGVmaW5pdGlvbi5jaGlsZHJlbi5jb25jYXQoW1wiY29tcGxldGVkXCIsXCJmYWlsZWRcIl0pO1xuICAgIH1cblxuICAgIHZhciBpID0gMCwgY2hpbGRBY3Rpb25zID0ge307XG4gICAgZm9yICg7IGkgPCBkZWZpbml0aW9uLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHZhciBuYW1lID0gZGVmaW5pdGlvbi5jaGlsZHJlbltpXTtcbiAgICAgICAgY2hpbGRBY3Rpb25zW25hbWVdID0gY3JlYXRlQWN0aW9uKG5hbWUpO1xuICAgIH1cblxuICAgIHZhciBjb250ZXh0ID0gXy5leHRlbmQoe1xuICAgICAgICBldmVudExhYmVsOiBcImFjdGlvblwiLFxuICAgICAgICBlbWl0dGVyOiBuZXcgXy5FdmVudEVtaXR0ZXIoKSxcbiAgICAgICAgX2lzQWN0aW9uOiB0cnVlXG4gICAgfSwgUmVmbHV4LlB1Ymxpc2hlck1ldGhvZHMsIFJlZmx1eC5BY3Rpb25NZXRob2RzLCBkZWZpbml0aW9uKTtcblxuICAgIHZhciBmdW5jdG9yID0gZnVuY3Rpb24oKSB7XG4gICAgICAgIHJldHVybiBmdW5jdG9yW2Z1bmN0b3Iuc3luYz9cInRyaWdnZXJcIjpcInRyaWdnZXJQcm9taXNlXCJdLmFwcGx5KGZ1bmN0b3IsIGFyZ3VtZW50cyk7XG4gICAgfTtcblxuICAgIF8uZXh0ZW5kKGZ1bmN0b3IsY2hpbGRBY3Rpb25zLGNvbnRleHQpO1xuXG4gICAgS2VlcC5jcmVhdGVkQWN0aW9ucy5wdXNoKGZ1bmN0b3IpO1xuXG4gICAgcmV0dXJuIGZ1bmN0b3I7XG5cbn07XG5cbm1vZHVsZS5leHBvcnRzID0gY3JlYXRlQWN0aW9uO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9jcmVhdGVBY3Rpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAyMDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBfID0gcmVxdWlyZSgnLi91dGlscycpLFxuICAgIFJlZmx1eCA9IHJlcXVpcmUoJy4vaW5kZXgnKSxcbiAgICBLZWVwID0gcmVxdWlyZSgnLi9LZWVwJyksXG4gICAgbWl4ZXIgPSByZXF1aXJlKCcuL21peGVyJyksXG4gICAgYWxsb3dlZCA9IHtwcmVFbWl0OjEsc2hvdWxkRW1pdDoxfSxcbiAgICBiaW5kTWV0aG9kcyA9IHJlcXVpcmUoJy4vYmluZE1ldGhvZHMnKTtcblxuLyoqXG4gKiBDcmVhdGVzIGFuIGV2ZW50IGVtaXR0aW5nIERhdGEgU3RvcmUuIEl0IGlzIG1peGVkIGluIHdpdGggZnVuY3Rpb25zXG4gKiBmcm9tIHRoZSBgTGlzdGVuZXJNZXRob2RzYCBhbmQgYFB1Ymxpc2hlck1ldGhvZHNgIG1peGlucy4gYHByZUVtaXRgXG4gKiBhbmQgYHNob3VsZEVtaXRgIG1heSBiZSBvdmVycmlkZGVuIGluIHRoZSBkZWZpbml0aW9uIG9iamVjdC5cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gZGVmaW5pdGlvbiBUaGUgZGF0YSBzdG9yZSBvYmplY3QgZGVmaW5pdGlvblxuICogQHJldHVybnMge1N0b3JlfSBBIGRhdGEgc3RvcmUgaW5zdGFuY2VcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihkZWZpbml0aW9uKSB7XG5cbiAgICBkZWZpbml0aW9uID0gZGVmaW5pdGlvbiB8fCB7fTtcblxuICAgIGZvcih2YXIgYSBpbiBSZWZsdXguU3RvcmVNZXRob2RzKXtcbiAgICAgICAgaWYgKCFhbGxvd2VkW2FdICYmIChSZWZsdXguUHVibGlzaGVyTWV0aG9kc1thXSB8fCBSZWZsdXguTGlzdGVuZXJNZXRob2RzW2FdKSl7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3Qgb3ZlcnJpZGUgQVBJIG1ldGhvZCBcIiArIGEgK1xuICAgICAgICAgICAgICAgIFwiIGluIFJlZmx1eC5TdG9yZU1ldGhvZHMuIFVzZSBhbm90aGVyIG1ldGhvZCBuYW1lIG9yIG92ZXJyaWRlIGl0IG9uIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzIC8gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9yKHZhciBkIGluIGRlZmluaXRpb24pe1xuICAgICAgICBpZiAoIWFsbG93ZWRbZF0gJiYgKFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzW2RdIHx8IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbZF0pKXtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBvdmVycmlkZSBBUEkgbWV0aG9kIFwiICsgZCArXG4gICAgICAgICAgICAgICAgXCIgaW4gc3RvcmUgY3JlYXRpb24uIFVzZSBhbm90aGVyIG1ldGhvZCBuYW1lIG9yIG92ZXJyaWRlIGl0IG9uIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzIC8gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyBpbnN0ZWFkLlwiXG4gICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVmaW5pdGlvbiA9IG1peGVyKGRlZmluaXRpb24pO1xuXG4gICAgZnVuY3Rpb24gU3RvcmUoKSB7XG4gICAgICAgIHZhciBpPTAsIGFycjtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb25zID0gW107XG4gICAgICAgIHRoaXMuZW1pdHRlciA9IG5ldyBfLkV2ZW50RW1pdHRlcigpO1xuICAgICAgICB0aGlzLmV2ZW50TGFiZWwgPSBcImNoYW5nZVwiO1xuICAgICAgICBiaW5kTWV0aG9kcyh0aGlzLCBkZWZpbml0aW9uKTtcbiAgICAgICAgaWYgKHRoaXMuaW5pdCAmJiBfLmlzRnVuY3Rpb24odGhpcy5pbml0KSkge1xuICAgICAgICAgICAgdGhpcy5pbml0KCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMubGlzdGVuYWJsZXMpe1xuICAgICAgICAgICAgYXJyID0gW10uY29uY2F0KHRoaXMubGlzdGVuYWJsZXMpO1xuICAgICAgICAgICAgZm9yKDtpIDwgYXJyLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgICAgIHRoaXMubGlzdGVuVG9NYW55KGFycltpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBfLmV4dGVuZChTdG9yZS5wcm90b3R5cGUsIFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMsIFJlZmx1eC5QdWJsaXNoZXJNZXRob2RzLCBSZWZsdXguU3RvcmVNZXRob2RzLCBkZWZpbml0aW9uKTtcblxuICAgIHZhciBzdG9yZSA9IG5ldyBTdG9yZSgpO1xuICAgIEtlZXAuY3JlYXRlZFN0b3Jlcy5wdXNoKHN0b3JlKTtcblxuICAgIHJldHVybiBzdG9yZTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL2NyZWF0ZVN0b3JlLmpzXG4gKiogbW9kdWxlIGlkID0gMjA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpLFxuICAgIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdGVuYWJsZSxrZXkpe1xuICAgIHJldHVybiB7XG4gICAgICAgIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIGlmICghXy5pc0Z1bmN0aW9uKGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7fTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoa2V5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8ub2JqZWN0KFtrZXldLFtsaXN0ZW5hYmxlLmdldEluaXRpYWxTdGF0ZSgpXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgICAgICAgICAgXy5leHRlbmQodGhpcyxSZWZsdXguTGlzdGVuZXJNZXRob2RzKTtcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXMsIGNiID0gKGtleSA9PT0gdW5kZWZpbmVkID8gdGhpcy5zZXRTdGF0ZSA6IGZ1bmN0aW9uKHYpe21lLnNldFN0YXRlKF8ub2JqZWN0KFtrZXldLFt2XSkpO30pO1xuICAgICAgICAgICAgdGhpcy5saXN0ZW5UbyhsaXN0ZW5hYmxlLGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQ6IFJlZmx1eC5MaXN0ZW5lck1peGluLmNvbXBvbmVudFdpbGxVbm1vdW50XG4gICAgfTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL2Nvbm5lY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAyMDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsInZhciBSZWZsdXggPSByZXF1aXJlKCcuL2luZGV4JyksXG4gIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdGVuYWJsZSwga2V5LCBmaWx0ZXJGdW5jKSB7XG4gICAgZmlsdGVyRnVuYyA9IF8uaXNGdW5jdGlvbihrZXkpID8ga2V5IDogZmlsdGVyRnVuYztcbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKCFfLmlzRnVuY3Rpb24obGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgICAgICAgfSBlbHNlIGlmIChfLmlzRnVuY3Rpb24oa2V5KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmaWx0ZXJGdW5jLmNhbGwodGhpcywgbGlzdGVuYWJsZS5nZXRJbml0aWFsU3RhdGUoKSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEZpbHRlciBpbml0aWFsIHBheWxvYWQgZnJvbSBzdG9yZS5cbiAgICAgICAgICAgICAgICB2YXIgcmVzdWx0ID0gZmlsdGVyRnVuYy5jYWxsKHRoaXMsIGxpc3RlbmFibGUuZ2V0SW5pdGlhbFN0YXRlKCkpO1xuICAgICAgICAgICAgICAgIGlmIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBfLm9iamVjdChba2V5XSwgW3Jlc3VsdF0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4ge307XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBfLmV4dGVuZCh0aGlzLCBSZWZsdXguTGlzdGVuZXJNZXRob2RzKTtcbiAgICAgICAgICAgIHZhciBtZSA9IHRoaXM7XG4gICAgICAgICAgICB2YXIgY2IgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmIChfLmlzRnVuY3Rpb24oa2V5KSkge1xuICAgICAgICAgICAgICAgICAgICBtZS5zZXRTdGF0ZShmaWx0ZXJGdW5jLmNhbGwobWUsIHZhbHVlKSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IGZpbHRlckZ1bmMuY2FsbChtZSwgdmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBtZS5zZXRTdGF0ZShfLm9iamVjdChba2V5XSwgW3Jlc3VsdF0pKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICB0aGlzLmxpc3RlblRvKGxpc3RlbmFibGUsIGNiKTtcbiAgICAgICAgfSxcbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQ6IFJlZmx1eC5MaXN0ZW5lck1peGluLmNvbXBvbmVudFdpbGxVbm1vdW50XG4gICAgfTtcbn07XG5cblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9zcmMvY29ubmVjdEZpbHRlci5qc1xuICoqIG1vZHVsZSBpZCA9IDIxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyksXG4gICAgTGlzdGVuZXJNZXRob2RzID0gcmVxdWlyZSgnLi9MaXN0ZW5lck1ldGhvZHMnKTtcblxuLyoqXG4gKiBBIG1vZHVsZSBtZWFudCB0byBiZSBjb25zdW1lZCBhcyBhIG1peGluIGJ5IGEgUmVhY3QgY29tcG9uZW50LiBTdXBwbGllcyB0aGUgbWV0aG9kcyBmcm9tXG4gKiBgTGlzdGVuZXJNZXRob2RzYCBtaXhpbiBhbmQgdGFrZXMgY2FyZSBvZiB0ZWFyZG93biBvZiBzdWJzY3JpcHRpb25zLlxuICogTm90ZSB0aGF0IGlmIHlvdSdyZSB1c2luZyB0aGUgYGNvbm5lY3RgIG1peGluIHlvdSBkb24ndCBuZWVkIHRoaXMgbWl4aW4sIGFzIGNvbm5lY3Qgd2lsbFxuICogaW1wb3J0IGV2ZXJ5dGhpbmcgdGhpcyBtaXhpbiBjb250YWlucyFcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBfLmV4dGVuZCh7XG5cbiAgICAvKipcbiAgICAgKiBDbGVhbnMgdXAgYWxsIGxpc3RlbmVyIHByZXZpb3VzbHkgcmVnaXN0ZXJlZC5cbiAgICAgKi9cbiAgICBjb21wb25lbnRXaWxsVW5tb3VudDogTGlzdGVuZXJNZXRob2RzLnN0b3BMaXN0ZW5pbmdUb0FsbFxuXG59LCBMaXN0ZW5lck1ldGhvZHMpO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L3NyYy9MaXN0ZW5lck1peGluLmpzXG4gKiogbW9kdWxlIGlkID0gMjExXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG5cbi8qKlxuICogQSBtaXhpbiBmYWN0b3J5IGZvciBhIFJlYWN0IGNvbXBvbmVudC4gTWVhbnQgYXMgYSBtb3JlIGNvbnZlbmllbnQgd2F5IG9mIHVzaW5nIHRoZSBgTGlzdGVuZXJNaXhpbmAsXG4gKiB3aXRob3V0IGhhdmluZyB0byBtYW51YWxseSBzZXQgbGlzdGVuZXJzIGluIHRoZSBgY29tcG9uZW50RGlkTW91bnRgIG1ldGhvZC5cbiAqXG4gKiBAcGFyYW0ge0FjdGlvbnxTdG9yZX0gbGlzdGVuYWJsZSBBbiBBY3Rpb24gb3IgU3RvcmUgdGhhdCBzaG91bGQgYmVcbiAqICBsaXN0ZW5lZCB0by5cbiAqIEBwYXJhbSB7RnVuY3Rpb258U3RyaW5nfSBjYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZXZlbnQgaGFuZGxlclxuICogQHBhcmFtIHtGdW5jdGlvbnxTdHJpbmd9IGRlZmF1bHRDYWxsYmFjayBUaGUgY2FsbGJhY2sgdG8gcmVnaXN0ZXIgYXMgZGVmYXVsdCBoYW5kbGVyXG4gKiBAcmV0dXJucyB7T2JqZWN0fSBBbiBvYmplY3QgdG8gYmUgdXNlZCBhcyBhIG1peGluLCB3aGljaCBzZXRzIHVwIHRoZSBsaXN0ZW5lciBmb3IgdGhlIGdpdmVuIGxpc3RlbmFibGUuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdGVuYWJsZSxjYWxsYmFjayxpbml0aWFsKXtcbiAgICByZXR1cm4ge1xuICAgICAgICAvKipcbiAgICAgICAgICogU2V0IHVwIHRoZSBtaXhpbiBiZWZvcmUgdGhlIGluaXRpYWwgcmVuZGVyaW5nIG9jY3Vycy4gSW1wb3J0IG1ldGhvZHMgZnJvbSBgTGlzdGVuZXJNZXRob2RzYFxuICAgICAgICAgKiBhbmQgdGhlbiBtYWtlIHRoZSBjYWxsIHRvIGBsaXN0ZW5Ub2Agd2l0aCB0aGUgYXJndW1lbnRzIHByb3ZpZGVkIHRvIHRoZSBmYWN0b3J5IGZ1bmN0aW9uXG4gICAgICAgICAqL1xuICAgICAgICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBmb3IodmFyIG0gaW4gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kcyl7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXNbbV0gIT09IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHNbbV0pe1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpc1ttXSl7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBcIkNhbid0IGhhdmUgb3RoZXIgcHJvcGVydHkgJ1wiK20rXCInIHdoZW4gdXNpbmcgUmVmbHV4Lmxpc3RlblRvIVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbV0gPSBSZWZsdXguTGlzdGVuZXJNZXRob2RzW21dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG8obGlzdGVuYWJsZSxjYWxsYmFjayxpbml0aWFsKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFucyB1cCBhbGwgbGlzdGVuZXIgcHJldmlvdXNseSByZWdpc3RlcmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQ6IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMuc3RvcExpc3RlbmluZ1RvQWxsXG4gICAgfTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL2xpc3RlblRvLmpzXG4gKiogbW9kdWxlIGlkID0gMjEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgUmVmbHV4ID0gcmVxdWlyZSgnLi9pbmRleCcpO1xuXG4vKipcbiAqIEEgbWl4aW4gZmFjdG9yeSBmb3IgYSBSZWFjdCBjb21wb25lbnQuIE1lYW50IGFzIGEgbW9yZSBjb252ZW5pZW50IHdheSBvZiB1c2luZyB0aGUgYGxpc3RlbmVyTWl4aW5gLFxuICogd2l0aG91dCBoYXZpbmcgdG8gbWFudWFsbHkgc2V0IGxpc3RlbmVycyBpbiB0aGUgYGNvbXBvbmVudERpZE1vdW50YCBtZXRob2QuIFRoaXMgdmVyc2lvbiBpcyB1c2VkXG4gKiB0byBhdXRvbWF0aWNhbGx5IHNldCB1cCBhIGBsaXN0ZW5Ub01hbnlgIGNhbGwuXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGxpc3RlbmFibGVzIEFuIG9iamVjdCBvZiBsaXN0ZW5hYmxlc1xuICogQHJldHVybnMge09iamVjdH0gQW4gb2JqZWN0IHRvIGJlIHVzZWQgYXMgYSBtaXhpbiwgd2hpY2ggc2V0cyB1cCB0aGUgbGlzdGVuZXJzIGZvciB0aGUgZ2l2ZW4gbGlzdGVuYWJsZXMuXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdGVuYWJsZXMpe1xuICAgIHJldHVybiB7XG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTZXQgdXAgdGhlIG1peGluIGJlZm9yZSB0aGUgaW5pdGlhbCByZW5kZXJpbmcgb2NjdXJzLiBJbXBvcnQgbWV0aG9kcyBmcm9tIGBMaXN0ZW5lck1ldGhvZHNgXG4gICAgICAgICAqIGFuZCB0aGVuIG1ha2UgdGhlIGNhbGwgdG8gYGxpc3RlblRvYCB3aXRoIHRoZSBhcmd1bWVudHMgcHJvdmlkZWQgdG8gdGhlIGZhY3RvcnkgZnVuY3Rpb25cbiAgICAgICAgICovXG4gICAgICAgIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGZvcih2YXIgbSBpbiBSZWZsdXguTGlzdGVuZXJNZXRob2RzKXtcbiAgICAgICAgICAgICAgICBpZiAodGhpc1ttXSAhPT0gUmVmbHV4Lkxpc3RlbmVyTWV0aG9kc1ttXSl7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzW21dKXtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFwiQ2FuJ3QgaGF2ZSBvdGhlciBwcm9wZXJ0eSAnXCIrbStcIicgd2hlbiB1c2luZyBSZWZsdXgubGlzdGVuVG9NYW55IVwiO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHRoaXNbbV0gPSBSZWZsdXguTGlzdGVuZXJNZXRob2RzW21dO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMubGlzdGVuVG9NYW55KGxpc3RlbmFibGVzKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICAgICAqIENsZWFucyB1cCBhbGwgbGlzdGVuZXIgcHJldmlvdXNseSByZWdpc3RlcmVkLlxuICAgICAgICAgKi9cbiAgICAgICAgY29tcG9uZW50V2lsbFVubW91bnQ6IFJlZmx1eC5MaXN0ZW5lck1ldGhvZHMuc3RvcExpc3RlbmluZ1RvQWxsXG4gICAgfTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL2xpc3RlblRvTWFueS5qc1xuICoqIG1vZHVsZSBpZCA9IDIxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiLyoqXG4gKiBJbnRlcm5hbCBtb2R1bGUgdXNlZCB0byBjcmVhdGUgc3RhdGljIGFuZCBpbnN0YW5jZSBqb2luIG1ldGhvZHNcbiAqL1xuXG52YXIgc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UsXG4gICAgXyA9IHJlcXVpcmUoXCIuL3V0aWxzXCIpLFxuICAgIGNyZWF0ZVN0b3JlID0gcmVxdWlyZShcIi4vY3JlYXRlU3RvcmVcIiksXG4gICAgc3RyYXRlZ3lNZXRob2ROYW1lcyA9IHtcbiAgICAgICAgc3RyaWN0OiBcImpvaW5TdHJpY3RcIixcbiAgICAgICAgZmlyc3Q6IFwiam9pbkxlYWRpbmdcIixcbiAgICAgICAgbGFzdDogXCJqb2luVHJhaWxpbmdcIixcbiAgICAgICAgYWxsOiBcImpvaW5Db25jYXRcIlxuICAgIH07XG5cbi8qKlxuICogVXNlZCBpbiBgaW5kZXguanNgIHRvIGNyZWF0ZSB0aGUgc3RhdGljIGpvaW4gbWV0aG9kc1xuICogQHBhcmFtIHtTdHJpbmd9IHN0cmF0ZWd5IFdoaWNoIHN0cmF0ZWd5IHRvIHVzZSB3aGVuIHRyYWNraW5nIGxpc3RlbmFibGUgdHJpZ2dlciBhcmd1bWVudHNcbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gQSBzdGF0aWMgZnVuY3Rpb24gd2hpY2ggcmV0dXJucyBhIHN0b3JlIHdpdGggYSBqb2luIGxpc3RlbiBvbiB0aGUgZ2l2ZW4gbGlzdGVuYWJsZXMgdXNpbmcgdGhlIGdpdmVuIHN0cmF0ZWd5XG4gKi9cbmV4cG9ydHMuc3RhdGljSm9pbkNyZWF0b3IgPSBmdW5jdGlvbihzdHJhdGVneSl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKC8qIGxpc3RlbmFibGVzLi4uICovKSB7XG4gICAgICAgIHZhciBsaXN0ZW5hYmxlcyA9IHNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgcmV0dXJuIGNyZWF0ZVN0b3JlKHtcbiAgICAgICAgICAgIGluaXQ6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgdGhpc1tzdHJhdGVneU1ldGhvZE5hbWVzW3N0cmF0ZWd5XV0uYXBwbHkodGhpcyxsaXN0ZW5hYmxlcy5jb25jYXQoXCJ0cmlnZ2VyQXN5bmNcIikpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9O1xufTtcblxuLyoqXG4gKiBVc2VkIGluIGBMaXN0ZW5lck1ldGhvZHMuanNgIHRvIGNyZWF0ZSB0aGUgaW5zdGFuY2Ugam9pbiBtZXRob2RzXG4gKiBAcGFyYW0ge1N0cmluZ30gc3RyYXRlZ3kgV2hpY2ggc3RyYXRlZ3kgdG8gdXNlIHdoZW4gdHJhY2tpbmcgbGlzdGVuYWJsZSB0cmlnZ2VyIGFyZ3VtZW50c1xuICogQHJldHVybnMge0Z1bmN0aW9ufSBBbiBpbnN0YW5jZSBtZXRob2Qgd2hpY2ggc2V0cyB1cCBhIGpvaW4gbGlzdGVuIG9uIHRoZSBnaXZlbiBsaXN0ZW5hYmxlcyB1c2luZyB0aGUgZ2l2ZW4gc3RyYXRlZ3lcbiAqL1xuZXhwb3J0cy5pbnN0YW5jZUpvaW5DcmVhdG9yID0gZnVuY3Rpb24oc3RyYXRlZ3kpe1xuICAgIHJldHVybiBmdW5jdGlvbigvKiBsaXN0ZW5hYmxlcy4uLiwgY2FsbGJhY2sqLyl7XG4gICAgICAgIF8udGhyb3dJZihhcmd1bWVudHMubGVuZ3RoIDwgMywnQ2Fubm90IGNyZWF0ZSBhIGpvaW4gd2l0aCBsZXNzIHRoYW4gMiBsaXN0ZW5hYmxlcyEnKTtcbiAgICAgICAgdmFyIGxpc3RlbmFibGVzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpLFxuICAgICAgICAgICAgY2FsbGJhY2sgPSBsaXN0ZW5hYmxlcy5wb3AoKSxcbiAgICAgICAgICAgIG51bWJlck9mTGlzdGVuYWJsZXMgPSBsaXN0ZW5hYmxlcy5sZW5ndGgsXG4gICAgICAgICAgICBqb2luID0ge1xuICAgICAgICAgICAgICAgIG51bWJlck9mTGlzdGVuYWJsZXM6IG51bWJlck9mTGlzdGVuYWJsZXMsXG4gICAgICAgICAgICAgICAgY2FsbGJhY2s6IHRoaXNbY2FsbGJhY2tdfHxjYWxsYmFjayxcbiAgICAgICAgICAgICAgICBsaXN0ZW5lcjogdGhpcyxcbiAgICAgICAgICAgICAgICBzdHJhdGVneTogc3RyYXRlZ3lcbiAgICAgICAgICAgIH0sIGksIGNhbmNlbHMgPSBbXSwgc3Vib2JqO1xuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbnVtYmVyT2ZMaXN0ZW5hYmxlczsgaSsrKSB7XG4gICAgICAgICAgICBfLnRocm93SWYodGhpcy52YWxpZGF0ZUxpc3RlbmluZyhsaXN0ZW5hYmxlc1tpXSkpO1xuICAgICAgICB9XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCBudW1iZXJPZkxpc3RlbmFibGVzOyBpKyspIHtcbiAgICAgICAgICAgIGNhbmNlbHMucHVzaChsaXN0ZW5hYmxlc1tpXS5saXN0ZW4obmV3TGlzdGVuZXIoaSxqb2luKSx0aGlzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmVzZXQoam9pbik7XG4gICAgICAgIHN1Ym9iaiA9IHtsaXN0ZW5hYmxlOiBsaXN0ZW5hYmxlc307XG4gICAgICAgIHN1Ym9iai5zdG9wID0gbWFrZVN0b3BwZXIoc3Vib2JqLGNhbmNlbHMsdGhpcyk7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9ucyA9ICh0aGlzLnN1YnNjcmlwdGlvbnMgfHwgW10pLmNvbmNhdChzdWJvYmopO1xuICAgICAgICByZXR1cm4gc3Vib2JqO1xuICAgIH07XG59O1xuXG4vLyAtLS0tIGludGVybmFsIGpvaW4gZnVuY3Rpb25zIC0tLS1cblxuZnVuY3Rpb24gbWFrZVN0b3BwZXIoc3Vib2JqLGNhbmNlbHMsY29udGV4dCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgaSwgc3VicyA9IGNvbnRleHQuc3Vic2NyaXB0aW9ucyxcbiAgICAgICAgICAgIGluZGV4ID0gKHN1YnMgPyBzdWJzLmluZGV4T2Yoc3Vib2JqKSA6IC0xKTtcbiAgICAgICAgXy50aHJvd0lmKGluZGV4ID09PSAtMSwnVHJpZWQgdG8gcmVtb3ZlIGpvaW4gYWxyZWFkeSBnb25lIGZyb20gc3Vic2NyaXB0aW9ucyBsaXN0IScpO1xuICAgICAgICBmb3IoaT0wO2kgPCBjYW5jZWxzLmxlbmd0aDsgaSsrKXtcbiAgICAgICAgICAgIGNhbmNlbHNbaV0oKTtcbiAgICAgICAgfVxuICAgICAgICBzdWJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcbn1cblxuZnVuY3Rpb24gcmVzZXQoam9pbikge1xuICAgIGpvaW4ubGlzdGVuYWJsZXNFbWl0dGVkID0gbmV3IEFycmF5KGpvaW4ubnVtYmVyT2ZMaXN0ZW5hYmxlcyk7XG4gICAgam9pbi5hcmdzID0gbmV3IEFycmF5KGpvaW4ubnVtYmVyT2ZMaXN0ZW5hYmxlcyk7XG59XG5cbmZ1bmN0aW9uIG5ld0xpc3RlbmVyKGksam9pbikge1xuICAgIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICAgICAgdmFyIGNhbGxhcmdzID0gc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICBpZiAoam9pbi5saXN0ZW5hYmxlc0VtaXR0ZWRbaV0pe1xuICAgICAgICAgICAgc3dpdGNoKGpvaW4uc3RyYXRlZ3kpe1xuICAgICAgICAgICAgICAgIGNhc2UgXCJzdHJpY3RcIjogdGhyb3cgbmV3IEVycm9yKFwiU3RyaWN0IGpvaW4gZmFpbGVkIGJlY2F1c2UgbGlzdGVuZXIgdHJpZ2dlcmVkIHR3aWNlLlwiKTtcbiAgICAgICAgICAgICAgICBjYXNlIFwibGFzdFwiOiBqb2luLmFyZ3NbaV0gPSBjYWxsYXJnczsgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSBcImFsbFwiOiBqb2luLmFyZ3NbaV0ucHVzaChjYWxsYXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBqb2luLmxpc3RlbmFibGVzRW1pdHRlZFtpXSA9IHRydWU7XG4gICAgICAgICAgICBqb2luLmFyZ3NbaV0gPSAoam9pbi5zdHJhdGVneT09PVwiYWxsXCI/W2NhbGxhcmdzXTpjYWxsYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgZW1pdElmQWxsTGlzdGVuYWJsZXNFbWl0dGVkKGpvaW4pO1xuICAgIH07XG59XG5cbmZ1bmN0aW9uIGVtaXRJZkFsbExpc3RlbmFibGVzRW1pdHRlZChqb2luKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBqb2luLm51bWJlck9mTGlzdGVuYWJsZXM7IGkrKykge1xuICAgICAgICBpZiAoIWpvaW4ubGlzdGVuYWJsZXNFbWl0dGVkW2ldKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICB9XG4gICAgam9pbi5jYWxsYmFjay5hcHBseShqb2luLmxpc3RlbmVyLGpvaW4uYXJncyk7XG4gICAgcmVzZXQoam9pbik7XG59XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL2pvaW5zLmpzXG4gKiogbW9kdWxlIGlkID0gMjE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIvKlxuICogaXNPYmplY3QsIGV4dGVuZCwgaXNGdW5jdGlvbiwgaXNBcmd1bWVudHMgYXJlIHRha2VuIGZyb20gdW5kZXNjb3JlL2xvZGFzaCBpblxuICogb3JkZXIgdG8gcmVtb3ZlIHRoZSBkZXBlbmRlbmN5XG4gKi9cbnZhciBpc09iamVjdCA9IGV4cG9ydHMuaXNPYmplY3QgPSBmdW5jdGlvbihvYmopIHtcbiAgICB2YXIgdHlwZSA9IHR5cGVvZiBvYmo7XG4gICAgcmV0dXJuIHR5cGUgPT09ICdmdW5jdGlvbicgfHwgdHlwZSA9PT0gJ29iamVjdCcgJiYgISFvYmo7XG59O1xuXG5leHBvcnRzLmV4dGVuZCA9IGZ1bmN0aW9uKG9iaikge1xuICAgIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cbiAgICB2YXIgc291cmNlLCBwcm9wO1xuICAgIGZvciAodmFyIGkgPSAxLCBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgc291cmNlID0gYXJndW1lbnRzW2ldO1xuICAgICAgICBmb3IgKHByb3AgaW4gc291cmNlKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvciAmJiBPYmplY3QuZGVmaW5lUHJvcGVydHkpIHtcbiAgICAgICAgICAgICAgICB2YXIgcHJvcGVydHlEZXNjcmlwdG9yID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihzb3VyY2UsIHByb3ApO1xuICAgICAgICAgICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShvYmosIHByb3AsIHByb3BlcnR5RGVzY3JpcHRvcik7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG9ialtwcm9wXSA9IHNvdXJjZVtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gb2JqO1xufTtcblxuZXhwb3J0cy5pc0Z1bmN0aW9uID0gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdHlwZW9mIHZhbHVlID09PSAnZnVuY3Rpb24nO1xufTtcblxuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSByZXF1aXJlKCdldmVudGVtaXR0ZXIzJyk7XG5cbmV4cG9ydHMubmV4dFRpY2sgPSBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgIHNldFRpbWVvdXQoY2FsbGJhY2ssIDApO1xufTtcblxuZXhwb3J0cy5jYXBpdGFsaXplID0gZnVuY3Rpb24oc3RyaW5nKXtcbiAgICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpK3N0cmluZy5zbGljZSgxKTtcbn07XG5cbmV4cG9ydHMuY2FsbGJhY2tOYW1lID0gZnVuY3Rpb24oc3RyaW5nKXtcbiAgICByZXR1cm4gXCJvblwiK2V4cG9ydHMuY2FwaXRhbGl6ZShzdHJpbmcpO1xufTtcblxuZXhwb3J0cy5vYmplY3QgPSBmdW5jdGlvbihrZXlzLHZhbHMpe1xuICAgIHZhciBvPXt9LCBpPTA7XG4gICAgZm9yKDtpPGtleXMubGVuZ3RoO2krKyl7XG4gICAgICAgIG9ba2V5c1tpXV0gPSB2YWxzW2ldO1xuICAgIH1cbiAgICByZXR1cm4gbztcbn07XG5cbmV4cG9ydHMuUHJvbWlzZSA9IHJlcXVpcmUoXCJuYXRpdmUtcHJvbWlzZS1vbmx5XCIpO1xuXG5leHBvcnRzLmNyZWF0ZVByb21pc2UgPSBmdW5jdGlvbihyZXNvbHZlcikge1xuICAgIHJldHVybiBuZXcgZXhwb3J0cy5Qcm9taXNlKHJlc29sdmVyKTtcbn07XG5cbmV4cG9ydHMuaXNBcmd1bWVudHMgPSBmdW5jdGlvbih2YWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmICgnY2FsbGVlJyBpbiB2YWx1ZSkgJiYgdHlwZW9mIHZhbHVlLmxlbmd0aCA9PT0gJ251bWJlcic7XG59O1xuXG5leHBvcnRzLnRocm93SWYgPSBmdW5jdGlvbih2YWwsbXNnKXtcbiAgICBpZiAodmFsKXtcbiAgICAgICAgdGhyb3cgRXJyb3IobXNnfHx2YWwpO1xuICAgIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL3V0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMjE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJleHBvcnRzLmNyZWF0ZWRTdG9yZXMgPSBbXTtcblxuZXhwb3J0cy5jcmVhdGVkQWN0aW9ucyA9IFtdO1xuXG5leHBvcnRzLnJlc2V0ID0gZnVuY3Rpb24oKSB7XG4gICAgd2hpbGUoZXhwb3J0cy5jcmVhdGVkU3RvcmVzLmxlbmd0aCkge1xuICAgICAgICBleHBvcnRzLmNyZWF0ZWRTdG9yZXMucG9wKCk7XG4gICAgfVxuICAgIHdoaWxlKGV4cG9ydHMuY3JlYXRlZEFjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgIGV4cG9ydHMuY3JlYXRlZEFjdGlvbnMucG9wKCk7XG4gICAgfVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9zcmMvS2VlcC5qc1xuICoqIG1vZHVsZSBpZCA9IDIxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwidmFyIF8gPSByZXF1aXJlKCcuL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gbWl4KGRlZikge1xuICAgIHZhciBjb21wb3NlZCA9IHtcbiAgICAgICAgaW5pdDogW10sXG4gICAgICAgIHByZUVtaXQ6IFtdLFxuICAgICAgICBzaG91bGRFbWl0OiBbXVxuICAgIH07XG5cbiAgICB2YXIgdXBkYXRlZCA9IChmdW5jdGlvbiBtaXhEZWYobWl4aW4pIHtcbiAgICAgICAgdmFyIG1peGVkID0ge307XG4gICAgICAgIGlmIChtaXhpbi5taXhpbnMpIHtcbiAgICAgICAgICAgIG1peGluLm1peGlucy5mb3JFYWNoKGZ1bmN0aW9uIChzdWJNaXhpbikge1xuICAgICAgICAgICAgICAgIF8uZXh0ZW5kKG1peGVkLCBtaXhEZWYoc3ViTWl4aW4pKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIF8uZXh0ZW5kKG1peGVkLCBtaXhpbik7XG4gICAgICAgIE9iamVjdC5rZXlzKGNvbXBvc2VkKS5mb3JFYWNoKGZ1bmN0aW9uIChjb21wb3NhYmxlKSB7XG4gICAgICAgICAgICBpZiAobWl4aW4uaGFzT3duUHJvcGVydHkoY29tcG9zYWJsZSkpIHtcbiAgICAgICAgICAgICAgICBjb21wb3NlZFtjb21wb3NhYmxlXS5wdXNoKG1peGluW2NvbXBvc2FibGVdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBtaXhlZDtcbiAgICB9KGRlZikpO1xuXG4gICAgaWYgKGNvbXBvc2VkLmluaXQubGVuZ3RoID4gMSkge1xuICAgICAgICB1cGRhdGVkLmluaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgICAgIGNvbXBvc2VkLmluaXQuZm9yRWFjaChmdW5jdGlvbiAoaW5pdCkge1xuICAgICAgICAgICAgICAgIGluaXQuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICB9LCB0aGlzKTtcbiAgICAgICAgfTtcbiAgICB9XG4gICAgaWYgKGNvbXBvc2VkLnByZUVtaXQubGVuZ3RoID4gMSkge1xuICAgICAgICB1cGRhdGVkLnByZUVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29tcG9zZWQucHJlRW1pdC5yZWR1Y2UoZnVuY3Rpb24gKGFyZ3MsIHByZUVtaXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgbmV3VmFsdWUgPSBwcmVFbWl0LmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXdWYWx1ZSA9PT0gdW5kZWZpbmVkID8gYXJncyA6IFtuZXdWYWx1ZV07XG4gICAgICAgICAgICB9LmJpbmQodGhpcyksIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIGlmIChjb21wb3NlZC5zaG91bGRFbWl0Lmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdXBkYXRlZC5zaG91bGRFbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgICAgICByZXR1cm4gIWNvbXBvc2VkLnNob3VsZEVtaXQuc29tZShmdW5jdGlvbiAoc2hvdWxkRW1pdCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAhc2hvdWxkRW1pdC5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgICAgIH0sIHRoaXMpO1xuICAgICAgICB9O1xuICAgIH1cbiAgICBPYmplY3Qua2V5cyhjb21wb3NlZCkuZm9yRWFjaChmdW5jdGlvbiAoY29tcG9zYWJsZSkge1xuICAgICAgICBpZiAoY29tcG9zZWRbY29tcG9zYWJsZV0ubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICB1cGRhdGVkW2NvbXBvc2FibGVdID0gY29tcG9zZWRbY29tcG9zYWJsZV1bMF07XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiB1cGRhdGVkO1xufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9zcmMvbWl4ZXIuanNcbiAqKiBtb2R1bGUgaWQgPSAyMjRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMVxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oc3RvcmUsIGRlZmluaXRpb24pIHtcbiAgZm9yICh2YXIgbmFtZSBpbiBkZWZpbml0aW9uKSB7XG4gICAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgJiYgT2JqZWN0LmRlZmluZVByb3BlcnR5KSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eURlc2NyaXB0b3IgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKGRlZmluaXRpb24sIG5hbWUpO1xuXG4gICAgICAgIGlmICghcHJvcGVydHlEZXNjcmlwdG9yLnZhbHVlIHx8IHR5cGVvZiBwcm9wZXJ0eURlc2NyaXB0b3IudmFsdWUgIT09ICdmdW5jdGlvbicgfHwgIWRlZmluaXRpb24uaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcmVbbmFtZV0gPSBkZWZpbml0aW9uW25hbWVdLmJpbmQoc3RvcmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBwcm9wZXJ0eSA9IGRlZmluaXRpb25bbmFtZV07XG5cbiAgICAgICAgaWYgKHR5cGVvZiBwcm9wZXJ0eSAhPT0gJ2Z1bmN0aW9uJyB8fCAhZGVmaW5pdGlvbi5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBzdG9yZVtuYW1lXSA9IHByb3BlcnR5LmJpbmQoc3RvcmUpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBzdG9yZTtcbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9yZWZsdXgvc3JjL2JpbmRNZXRob2RzLmpzXG4gKiogbW9kdWxlIGlkID0gMjI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogUmVwcmVzZW50YXRpb24gb2YgYSBzaW5nbGUgRXZlbnRFbWl0dGVyIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEV2ZW50IGhhbmRsZXIgdG8gYmUgY2FsbGVkLlxuICogQHBhcmFtIHtNaXhlZH0gY29udGV4dCBDb250ZXh0IGZvciBmdW5jdGlvbiBleGVjdXRpb24uXG4gKiBAcGFyYW0ge0Jvb2xlYW59IG9uY2UgT25seSBlbWl0IG9uY2VcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5mdW5jdGlvbiBFRShmbiwgY29udGV4dCwgb25jZSkge1xuICB0aGlzLmZuID0gZm47XG4gIHRoaXMuY29udGV4dCA9IGNvbnRleHQ7XG4gIHRoaXMub25jZSA9IG9uY2UgfHwgZmFsc2U7XG59XG5cbi8qKlxuICogTWluaW1hbCBFdmVudEVtaXR0ZXIgaW50ZXJmYWNlIHRoYXQgaXMgbW9sZGVkIGFnYWluc3QgdGhlIE5vZGUuanNcbiAqIEV2ZW50RW1pdHRlciBpbnRlcmZhY2UuXG4gKlxuICogQGNvbnN0cnVjdG9yXG4gKiBAYXBpIHB1YmxpY1xuICovXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7IC8qIE5vdGhpbmcgdG8gc2V0ICovIH1cblxuLyoqXG4gKiBIb2xkcyB0aGUgYXNzaWduZWQgRXZlbnRFbWl0dGVycyBieSBuYW1lLlxuICpcbiAqIEB0eXBlIHtPYmplY3R9XG4gKiBAcHJpdmF0ZVxuICovXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLl9ldmVudHMgPSB1bmRlZmluZWQ7XG5cbi8qKlxuICogUmV0dXJuIGEgbGlzdCBvZiBhc3NpZ25lZCBldmVudCBsaXN0ZW5lcnMuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IFRoZSBldmVudHMgdGhhdCBzaG91bGQgYmUgbGlzdGVkLlxuICogQHJldHVybnMge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbiBsaXN0ZW5lcnMoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1tldmVudF0pIHJldHVybiBbXTtcbiAgaWYgKHRoaXMuX2V2ZW50c1tldmVudF0uZm4pIHJldHVybiBbdGhpcy5fZXZlbnRzW2V2ZW50XS5mbl07XG5cbiAgZm9yICh2YXIgaSA9IDAsIGwgPSB0aGlzLl9ldmVudHNbZXZlbnRdLmxlbmd0aCwgZWUgPSBuZXcgQXJyYXkobCk7IGkgPCBsOyBpKyspIHtcbiAgICBlZVtpXSA9IHRoaXMuX2V2ZW50c1tldmVudF1baV0uZm47XG4gIH1cblxuICByZXR1cm4gZWU7XG59O1xuXG4vKipcbiAqIEVtaXQgYW4gZXZlbnQgdG8gYWxsIHJlZ2lzdGVyZWQgZXZlbnQgbGlzdGVuZXJzLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBldmVudCBUaGUgbmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcmV0dXJucyB7Qm9vbGVhbn0gSW5kaWNhdGlvbiBpZiB3ZSd2ZSBlbWl0dGVkIGFuIGV2ZW50LlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gZW1pdChldmVudCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbZXZlbnRdKSByZXR1cm4gZmFsc2U7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudF1cbiAgICAsIGxlbiA9IGFyZ3VtZW50cy5sZW5ndGhcbiAgICAsIGFyZ3NcbiAgICAsIGk7XG5cbiAgaWYgKCdmdW5jdGlvbicgPT09IHR5cGVvZiBsaXN0ZW5lcnMuZm4pIHtcbiAgICBpZiAobGlzdGVuZXJzLm9uY2UpIHRoaXMucmVtb3ZlTGlzdGVuZXIoZXZlbnQsIGxpc3RlbmVycy5mbiwgdHJ1ZSk7XG5cbiAgICBzd2l0Y2ggKGxlbikge1xuICAgICAgY2FzZSAxOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQpLCB0cnVlO1xuICAgICAgY2FzZSAyOiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExKSwgdHJ1ZTtcbiAgICAgIGNhc2UgMzogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIpLCB0cnVlO1xuICAgICAgY2FzZSA0OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMpLCB0cnVlO1xuICAgICAgY2FzZSA1OiByZXR1cm4gbGlzdGVuZXJzLmZuLmNhbGwobGlzdGVuZXJzLmNvbnRleHQsIGExLCBhMiwgYTMsIGE0KSwgdHJ1ZTtcbiAgICAgIGNhc2UgNjogcmV0dXJuIGxpc3RlbmVycy5mbi5jYWxsKGxpc3RlbmVycy5jb250ZXh0LCBhMSwgYTIsIGEzLCBhNCwgYTUpLCB0cnVlO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG5cbiAgICBsaXN0ZW5lcnMuZm4uYXBwbHkobGlzdGVuZXJzLmNvbnRleHQsIGFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHZhciBsZW5ndGggPSBsaXN0ZW5lcnMubGVuZ3RoXG4gICAgICAsIGo7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChsaXN0ZW5lcnNbaV0ub25jZSkgdGhpcy5yZW1vdmVMaXN0ZW5lcihldmVudCwgbGlzdGVuZXJzW2ldLmZuLCB0cnVlKTtcblxuICAgICAgc3dpdGNoIChsZW4pIHtcbiAgICAgICAgY2FzZSAxOiBsaXN0ZW5lcnNbaV0uZm4uY2FsbChsaXN0ZW5lcnNbaV0uY29udGV4dCk7IGJyZWFrO1xuICAgICAgICBjYXNlIDI6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSk7IGJyZWFrO1xuICAgICAgICBjYXNlIDM6IGxpc3RlbmVyc1tpXS5mbi5jYWxsKGxpc3RlbmVyc1tpXS5jb250ZXh0LCBhMSwgYTIpOyBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBpZiAoIWFyZ3MpIGZvciAoaiA9IDEsIGFyZ3MgPSBuZXcgQXJyYXkobGVuIC0xKTsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICBhcmdzW2ogLSAxXSA9IGFyZ3VtZW50c1tqXTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsaXN0ZW5lcnNbaV0uZm4uYXBwbHkobGlzdGVuZXJzW2ldLmNvbnRleHQsIGFyZ3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuLyoqXG4gKiBSZWdpc3RlciBhIG5ldyBFdmVudExpc3RlbmVyIGZvciB0aGUgZ2l2ZW4gZXZlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGV2ZW50IE5hbWUgb2YgdGhlIGV2ZW50LlxuICogQHBhcmFtIHtGdW5jdG9ufSBmbiBDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2YgdGhlIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIG9uKGV2ZW50LCBmbiwgY29udGV4dCkge1xuICB2YXIgbGlzdGVuZXIgPSBuZXcgRUUoZm4sIGNvbnRleHQgfHwgdGhpcyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpIHRoaXMuX2V2ZW50cyA9IHt9O1xuICBpZiAoIXRoaXMuX2V2ZW50c1tldmVudF0pIHRoaXMuX2V2ZW50c1tldmVudF0gPSBsaXN0ZW5lcjtcbiAgZWxzZSB7XG4gICAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdLmZuKSB0aGlzLl9ldmVudHNbZXZlbnRdLnB1c2gobGlzdGVuZXIpO1xuICAgIGVsc2UgdGhpcy5fZXZlbnRzW2V2ZW50XSA9IFtcbiAgICAgIHRoaXMuX2V2ZW50c1tldmVudF0sIGxpc3RlbmVyXG4gICAgXTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLyoqXG4gKiBBZGQgYW4gRXZlbnRMaXN0ZW5lciB0aGF0J3Mgb25seSBjYWxsZWQgb25jZS5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgTmFtZSBvZiB0aGUgZXZlbnQuXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBDYWxsYmFjayBmdW5jdGlvbi5cbiAqIEBwYXJhbSB7TWl4ZWR9IGNvbnRleHQgVGhlIGNvbnRleHQgb2YgdGhlIGZ1bmN0aW9uLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24gb25jZShldmVudCwgZm4sIGNvbnRleHQpIHtcbiAgdmFyIGxpc3RlbmVyID0gbmV3IEVFKGZuLCBjb250ZXh0IHx8IHRoaXMsIHRydWUpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKSB0aGlzLl9ldmVudHMgPSB7fTtcbiAgaWYgKCF0aGlzLl9ldmVudHNbZXZlbnRdKSB0aGlzLl9ldmVudHNbZXZlbnRdID0gbGlzdGVuZXI7XG4gIGVsc2Uge1xuICAgIGlmICghdGhpcy5fZXZlbnRzW2V2ZW50XS5mbikgdGhpcy5fZXZlbnRzW2V2ZW50XS5wdXNoKGxpc3RlbmVyKTtcbiAgICBlbHNlIHRoaXMuX2V2ZW50c1tldmVudF0gPSBbXG4gICAgICB0aGlzLl9ldmVudHNbZXZlbnRdLCBsaXN0ZW5lclxuICAgIF07XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGV2ZW50IGxpc3RlbmVycy5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50IHdlIHdhbnQgdG8gcmVtb3ZlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGxpc3RlbmVyIHRoYXQgd2UgbmVlZCB0byBmaW5kLlxuICogQHBhcmFtIHtCb29sZWFufSBvbmNlIE9ubHkgcmVtb3ZlIG9uY2UgbGlzdGVuZXJzLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVMaXN0ZW5lciA9IGZ1bmN0aW9uIHJlbW92ZUxpc3RlbmVyKGV2ZW50LCBmbiwgb25jZSkge1xuICBpZiAoIXRoaXMuX2V2ZW50cyB8fCAhdGhpcy5fZXZlbnRzW2V2ZW50XSkgcmV0dXJuIHRoaXM7XG5cbiAgdmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1tldmVudF1cbiAgICAsIGV2ZW50cyA9IFtdO1xuXG4gIGlmIChmbikge1xuICAgIGlmIChsaXN0ZW5lcnMuZm4gJiYgKGxpc3RlbmVycy5mbiAhPT0gZm4gfHwgKG9uY2UgJiYgIWxpc3RlbmVycy5vbmNlKSkpIHtcbiAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVycyk7XG4gICAgfVxuICAgIGlmICghbGlzdGVuZXJzLmZuKSBmb3IgKHZhciBpID0gMCwgbGVuZ3RoID0gbGlzdGVuZXJzLmxlbmd0aDsgaSA8IGxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAobGlzdGVuZXJzW2ldLmZuICE9PSBmbiB8fCAob25jZSAmJiAhbGlzdGVuZXJzW2ldLm9uY2UpKSB7XG4gICAgICAgIGV2ZW50cy5wdXNoKGxpc3RlbmVyc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy9cbiAgLy8gUmVzZXQgdGhlIGFycmF5LCBvciByZW1vdmUgaXQgY29tcGxldGVseSBpZiB3ZSBoYXZlIG5vIG1vcmUgbGlzdGVuZXJzLlxuICAvL1xuICBpZiAoZXZlbnRzLmxlbmd0aCkge1xuICAgIHRoaXMuX2V2ZW50c1tldmVudF0gPSBldmVudHMubGVuZ3RoID09PSAxID8gZXZlbnRzWzBdIDogZXZlbnRzO1xuICB9IGVsc2Uge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbZXZlbnRdO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJlbW92ZSBhbGwgbGlzdGVuZXJzIG9yIG9ubHkgdGhlIGxpc3RlbmVycyBmb3IgdGhlIHNwZWNpZmllZCBldmVudC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gZXZlbnQgVGhlIGV2ZW50IHdhbnQgdG8gcmVtb3ZlIGFsbCBsaXN0ZW5lcnMgZm9yLlxuICogQGFwaSBwdWJsaWNcbiAqL1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbiByZW1vdmVBbGxMaXN0ZW5lcnMoZXZlbnQpIHtcbiAgaWYgKCF0aGlzLl9ldmVudHMpIHJldHVybiB0aGlzO1xuXG4gIGlmIChldmVudCkgZGVsZXRlIHRoaXMuX2V2ZW50c1tldmVudF07XG4gIGVsc2UgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vL1xuLy8gQWxpYXMgbWV0aG9kcyBuYW1lcyBiZWNhdXNlIHBlb3BsZSByb2xsIGxpa2UgdGhhdC5cbi8vXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXI7XG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbjtcblxuLy9cbi8vIFRoaXMgZnVuY3Rpb24gZG9lc24ndCBhcHBseSBhbnltb3JlLlxuLy9cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24gc2V0TWF4TGlzdGVuZXJzKCkge1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8vXG4vLyBFeHBvc2UgdGhlIG1vZHVsZS5cbi8vXG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlcjIgPSBFdmVudEVtaXR0ZXI7XG5FdmVudEVtaXR0ZXIuRXZlbnRFbWl0dGVyMyA9IEV2ZW50RW1pdHRlcjtcblxuLy9cbi8vIEV4cG9zZSB0aGUgbW9kdWxlLlxuLy9cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vcmVmbHV4L34vZXZlbnRlbWl0dGVyMy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDIyN1xuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwiLyohIE5hdGl2ZSBQcm9taXNlIE9ubHlcbiAgICB2MC43LjYtYSAoYykgS3lsZSBTaW1wc29uXG4gICAgTUlUIExpY2Vuc2U6IGh0dHA6Ly9nZXRpZnkubWl0LWxpY2Vuc2Uub3JnXG4qL1xuIWZ1bmN0aW9uKHQsbixlKXtuW3RdPW5bdF18fGUoKSxcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlJiZtb2R1bGUuZXhwb3J0cz9tb2R1bGUuZXhwb3J0cz1uW3RdOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZCYmZGVmaW5lKGZ1bmN0aW9uKCl7cmV0dXJuIG5bdF19KX0oXCJQcm9taXNlXCIsXCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbD9nbG9iYWw6dGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxuKXtsLmFkZCh0LG4pLGh8fChoPXkobC5kcmFpbikpfWZ1bmN0aW9uIG4odCl7dmFyIG4sZT10eXBlb2YgdDtyZXR1cm4gbnVsbD09dHx8XCJvYmplY3RcIiE9ZSYmXCJmdW5jdGlvblwiIT1lfHwobj10LnRoZW4pLFwiZnVuY3Rpb25cIj09dHlwZW9mIG4/bjohMX1mdW5jdGlvbiBlKCl7Zm9yKHZhciB0PTA7dDx0aGlzLmNoYWluLmxlbmd0aDt0Kyspbyh0aGlzLDE9PT10aGlzLnN0YXRlP3RoaXMuY2hhaW5bdF0uc3VjY2Vzczp0aGlzLmNoYWluW3RdLmZhaWx1cmUsdGhpcy5jaGFpblt0XSk7dGhpcy5jaGFpbi5sZW5ndGg9MH1mdW5jdGlvbiBvKHQsZSxvKXt2YXIgcixpO3RyeXtlPT09ITE/by5yZWplY3QodC5tc2cpOihyPWU9PT0hMD90Lm1zZzplLmNhbGwodm9pZCAwLHQubXNnKSxyPT09by5wcm9taXNlP28ucmVqZWN0KFR5cGVFcnJvcihcIlByb21pc2UtY2hhaW4gY3ljbGVcIikpOihpPW4ocikpP2kuY2FsbChyLG8ucmVzb2x2ZSxvLnJlamVjdCk6by5yZXNvbHZlKHIpKX1jYXRjaChjKXtvLnJlamVjdChjKX19ZnVuY3Rpb24gcihvKXt2YXIgYyx1LGE9dGhpcztpZighYS50cmlnZ2VyZWQpe2EudHJpZ2dlcmVkPSEwLGEuZGVmJiYoYT1hLmRlZik7dHJ5eyhjPW4obykpPyh1PW5ldyBmKGEpLGMuY2FsbChvLGZ1bmN0aW9uKCl7ci5hcHBseSh1LGFyZ3VtZW50cyl9LGZ1bmN0aW9uKCl7aS5hcHBseSh1LGFyZ3VtZW50cyl9KSk6KGEubXNnPW8sYS5zdGF0ZT0xLGEuY2hhaW4ubGVuZ3RoPjAmJnQoZSxhKSl9Y2F0Y2gocyl7aS5jYWxsKHV8fG5ldyBmKGEpLHMpfX19ZnVuY3Rpb24gaShuKXt2YXIgbz10aGlzO28udHJpZ2dlcmVkfHwoby50cmlnZ2VyZWQ9ITAsby5kZWYmJihvPW8uZGVmKSxvLm1zZz1uLG8uc3RhdGU9MixvLmNoYWluLmxlbmd0aD4wJiZ0KGUsbykpfWZ1bmN0aW9uIGModCxuLGUsbyl7Zm9yKHZhciByPTA7cjxuLmxlbmd0aDtyKyspIWZ1bmN0aW9uKHIpe3QucmVzb2x2ZShuW3JdKS50aGVuKGZ1bmN0aW9uKHQpe2Uocix0KX0sbyl9KHIpfWZ1bmN0aW9uIGYodCl7dGhpcy5kZWY9dCx0aGlzLnRyaWdnZXJlZD0hMX1mdW5jdGlvbiB1KHQpe3RoaXMucHJvbWlzZT10LHRoaXMuc3RhdGU9MCx0aGlzLnRyaWdnZXJlZD0hMSx0aGlzLmNoYWluPVtdLHRoaXMubXNnPXZvaWQgMH1mdW5jdGlvbiBhKG4pe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7aWYoMCE9PXRoaXMuX19OUE9fXyl0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBwcm9taXNlXCIpO3RoaXMuX19OUE9fXz0xO3ZhciBvPW5ldyB1KHRoaXMpO3RoaXMudGhlbj1mdW5jdGlvbihuLHIpe3ZhciBpPXtzdWNjZXNzOlwiZnVuY3Rpb25cIj09dHlwZW9mIG4/bjohMCxmYWlsdXJlOlwiZnVuY3Rpb25cIj09dHlwZW9mIHI/cjohMX07cmV0dXJuIGkucHJvbWlzZT1uZXcgdGhpcy5jb25zdHJ1Y3RvcihmdW5jdGlvbih0LG4pe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIHR8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG4pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7aS5yZXNvbHZlPXQsaS5yZWplY3Q9bn0pLG8uY2hhaW4ucHVzaChpKSwwIT09by5zdGF0ZSYmdChlLG8pLGkucHJvbWlzZX0sdGhpc1tcImNhdGNoXCJdPWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzLnRoZW4odm9pZCAwLHQpfTt0cnl7bi5jYWxsKHZvaWQgMCxmdW5jdGlvbih0KXtyLmNhbGwobyx0KX0sZnVuY3Rpb24odCl7aS5jYWxsKG8sdCl9KX1jYXRjaChjKXtpLmNhbGwobyxjKX19dmFyIHMsaCxsLHA9T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZyx5PVwidW5kZWZpbmVkXCIhPXR5cGVvZiBzZXRJbW1lZGlhdGU/ZnVuY3Rpb24odCl7cmV0dXJuIHNldEltbWVkaWF0ZSh0KX06c2V0VGltZW91dDt0cnl7T2JqZWN0LmRlZmluZVByb3BlcnR5KHt9LFwieFwiLHt9KSxzPWZ1bmN0aW9uKHQsbixlLG8pe3JldHVybiBPYmplY3QuZGVmaW5lUHJvcGVydHkodCxuLHt2YWx1ZTplLHdyaXRhYmxlOiEwLGNvbmZpZ3VyYWJsZTpvIT09ITF9KX19Y2F0Y2goZCl7cz1mdW5jdGlvbih0LG4sZSl7cmV0dXJuIHRbbl09ZSx0fX1sPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gdCh0LG4pe3RoaXMuZm49dCx0aGlzLnNlbGY9bix0aGlzLm5leHQ9dm9pZCAwfXZhciBuLGUsbztyZXR1cm57YWRkOmZ1bmN0aW9uKHIsaSl7bz1uZXcgdChyLGkpLGU/ZS5uZXh0PW86bj1vLGU9byxvPXZvaWQgMH0sZHJhaW46ZnVuY3Rpb24oKXt2YXIgdD1uO2ZvcihuPWU9aD12b2lkIDA7dDspdC5mbi5jYWxsKHQuc2VsZiksdD10Lm5leHR9fX0oKTt2YXIgZz1zKHt9LFwiY29uc3RydWN0b3JcIixhLCExKTtyZXR1cm4gcyhhLFwicHJvdG90eXBlXCIsZywhMSkscyhnLFwiX19OUE9fX1wiLDAsITEpLHMoYSxcInJlc29sdmVcIixmdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVybiB0JiZcIm9iamVjdFwiPT10eXBlb2YgdCYmMT09PXQuX19OUE9fXz90Om5ldyBuKGZ1bmN0aW9uKG4sZSl7aWYoXCJmdW5jdGlvblwiIT10eXBlb2Ygbnx8XCJmdW5jdGlvblwiIT10eXBlb2YgZSl0aHJvdyBUeXBlRXJyb3IoXCJOb3QgYSBmdW5jdGlvblwiKTtuKHQpfSl9KSxzKGEsXCJyZWplY3RcIixmdW5jdGlvbih0KXtyZXR1cm4gbmV3IHRoaXMoZnVuY3Rpb24obixlKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBufHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBlKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2UodCl9KX0pLHMoYSxcImFsbFwiLGZ1bmN0aW9uKHQpe3ZhciBuPXRoaXM7cmV0dXJuXCJbb2JqZWN0IEFycmF5XVwiIT1wLmNhbGwodCk/bi5yZWplY3QoVHlwZUVycm9yKFwiTm90IGFuIGFycmF5XCIpKTowPT09dC5sZW5ndGg/bi5yZXNvbHZlKFtdKTpuZXcgbihmdW5jdGlvbihlLG8pe2lmKFwiZnVuY3Rpb25cIiE9dHlwZW9mIGV8fFwiZnVuY3Rpb25cIiE9dHlwZW9mIG8pdGhyb3cgVHlwZUVycm9yKFwiTm90IGEgZnVuY3Rpb25cIik7dmFyIHI9dC5sZW5ndGgsaT1BcnJheShyKSxmPTA7YyhuLHQsZnVuY3Rpb24odCxuKXtpW3RdPW4sKytmPT09ciYmZShpKX0sbyl9KX0pLHMoYSxcInJhY2VcIixmdW5jdGlvbih0KXt2YXIgbj10aGlzO3JldHVyblwiW29iamVjdCBBcnJheV1cIiE9cC5jYWxsKHQpP24ucmVqZWN0KFR5cGVFcnJvcihcIk5vdCBhbiBhcnJheVwiKSk6bmV3IG4oZnVuY3Rpb24oZSxvKXtpZihcImZ1bmN0aW9uXCIhPXR5cGVvZiBlfHxcImZ1bmN0aW9uXCIhPXR5cGVvZiBvKXRocm93IFR5cGVFcnJvcihcIk5vdCBhIGZ1bmN0aW9uXCIpO2Mobix0LGZ1bmN0aW9uKHQsbil7ZShuKX0sbyl9KX0pLGF9KTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L3JlZmx1eC9+L25hdGl2ZS1wcm9taXNlLW9ubHkvbnBvLmpzXG4gKiogbW9kdWxlIGlkID0gMjI4XG4gKiogbW9kdWxlIGNodW5rcyA9IDFcbiAqKi8iLCJ2YXIgbmV4dFRpY2sgPSByZXF1aXJlKCdwcm9jZXNzL2Jyb3dzZXIuanMnKS5uZXh0VGljaztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcbnZhciBzbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBpbW1lZGlhdGVJZHMgPSB7fTtcbnZhciBuZXh0SW1tZWRpYXRlSWQgPSAwO1xuXG4vLyBET00gQVBJcywgZm9yIGNvbXBsZXRlbmVzc1xuXG5leHBvcnRzLnNldFRpbWVvdXQgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0VGltZW91dCwgd2luZG93LCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHdpbmRvdywgYXJndW1lbnRzKSwgY2xlYXJJbnRlcnZhbCk7XG59O1xuZXhwb3J0cy5jbGVhclRpbWVvdXQgPVxuZXhwb3J0cy5jbGVhckludGVydmFsID0gZnVuY3Rpb24odGltZW91dCkgeyB0aW1lb3V0LmNsb3NlKCk7IH07XG5cbmZ1bmN0aW9uIFRpbWVvdXQoaWQsIGNsZWFyRm4pIHtcbiAgdGhpcy5faWQgPSBpZDtcbiAgdGhpcy5fY2xlYXJGbiA9IGNsZWFyRm47XG59XG5UaW1lb3V0LnByb3RvdHlwZS51bnJlZiA9IFRpbWVvdXQucHJvdG90eXBlLnJlZiA9IGZ1bmN0aW9uKCkge307XG5UaW1lb3V0LnByb3RvdHlwZS5jbG9zZSA9IGZ1bmN0aW9uKCkge1xuICB0aGlzLl9jbGVhckZuLmNhbGwod2luZG93LCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gVGhhdCdzIG5vdCBob3cgbm9kZS5qcyBpbXBsZW1lbnRzIGl0IGJ1dCB0aGUgZXhwb3NlZCBhcGkgaXMgdGhlIHNhbWUuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9IHR5cGVvZiBzZXRJbW1lZGlhdGUgPT09IFwiZnVuY3Rpb25cIiA/IHNldEltbWVkaWF0ZSA6IGZ1bmN0aW9uKGZuKSB7XG4gIHZhciBpZCA9IG5leHRJbW1lZGlhdGVJZCsrO1xuICB2YXIgYXJncyA9IGFyZ3VtZW50cy5sZW5ndGggPCAyID8gZmFsc2UgOiBzbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG5cbiAgaW1tZWRpYXRlSWRzW2lkXSA9IHRydWU7XG5cbiAgbmV4dFRpY2soZnVuY3Rpb24gb25OZXh0VGljaygpIHtcbiAgICBpZiAoaW1tZWRpYXRlSWRzW2lkXSkge1xuICAgICAgLy8gZm4uY2FsbCgpIGlzIGZhc3RlciBzbyB3ZSBvcHRpbWl6ZSBmb3IgdGhlIGNvbW1vbiB1c2UtY2FzZVxuICAgICAgLy8gQHNlZSBodHRwOi8vanNwZXJmLmNvbS9jYWxsLWFwcGx5LXNlZ3VcbiAgICAgIGlmIChhcmdzKSB7XG4gICAgICAgIGZuLmFwcGx5KG51bGwsIGFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZm4uY2FsbChudWxsKTtcbiAgICAgIH1cbiAgICAgIC8vIFByZXZlbnQgaWRzIGZyb20gbGVha2luZ1xuICAgICAgZXhwb3J0cy5jbGVhckltbWVkaWF0ZShpZCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gaWQ7XG59O1xuXG5leHBvcnRzLmNsZWFySW1tZWRpYXRlID0gdHlwZW9mIGNsZWFySW1tZWRpYXRlID09PSBcImZ1bmN0aW9uXCIgPyBjbGVhckltbWVkaWF0ZSA6IGZ1bmN0aW9uKGlkKSB7XG4gIGRlbGV0ZSBpbW1lZGlhdGVJZHNbaWRdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqICh3ZWJwYWNrKS9+L25vZGUtbGlicy1icm93c2VyL34vdGltZXJzLWJyb3dzZXJpZnkvbWFpbi5qc1xuICoqIG1vZHVsZSBpZCA9IDIzMFxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfYW1kX29wdGlvbnNfXztcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAod2VicGFjaykvYnVpbGRpbi9hbWQtb3B0aW9ucy5qc1xuICoqIG1vZHVsZSBpZCA9IDIzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAxXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==