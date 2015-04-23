webpackJsonp([0],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    Router = __webpack_require__(2);
	
	var TestForm = __webpack_require__(4);
	
	__webpack_require__(46);
	
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
	  React.createElement(Router.DefaultRoute, { handler: TestForm })
	);
	
	Router.run(routes, Router.HistoryLocation, function (Handler, state) {
	  React.render(React.createElement(Handler, null), document.body);
	});

/***/ },

/***/ 4:
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(1),
	    Formsy = __webpack_require__(125);
	
	var TestInput = React.createClass({
	  displayName: 'TestInput',
	
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
	
	var TestForm = React.createClass({
	  displayName: 'TestForm',
	
	  getInitialState: function getInitialState() {
	    return { canSubmit: false };
	  },
	  handleSubmit: function handleSubmit(data) {
	    console.log(data);
	  },
	  enableButton: function enableButton() {
	    this.setState({ canSubmit: true });
	  },
	  disableButton: function disableButton() {
	    this.setState({ canSubmit: false });
	  },
	  render: function render() {
	    var disabled = !this.state.canSubmit;
	
	    return React.createElement(
	      Formsy.Form,
	      { onSubmit: this.handleSubmit,
	        onValid: this.enableButton,
	        onInvalid: this.disableButton },
	      React.createElement(TestInput, { name: 'name',
	        title: 'Name',
	        required: true }),
	      React.createElement(TestInput, { name: 'email',
	        title: 'Email',
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
	
	module.exports = TestForm;

/***/ },

/***/ 46:
/***/ function(module, exports, __webpack_require__) {

	// removed by extract-text-webpack-plugin

/***/ },

/***/ 125:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var React = global.React || __webpack_require__(1);
	var Formsy = {};
	var validationRules = __webpack_require__(173);
	var utils = __webpack_require__(174);
	var Mixin = __webpack_require__(175);
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

/***/ 173:
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

/***/ 174:
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

/***/ 175:
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


/***/ }

});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hcHAvaW5kZXguanN4Iiwid2VicGFjazovLy8uL2FwcC9jb21wb25lbnRzL1Rlc3RGb3JtLmpzeCIsIndlYnBhY2s6Ly8vLi9hcHAvc3R5bGVzL2luZGV4LnNjc3MiLCJ3ZWJwYWNrOi8vLy4vfi9mb3Jtc3ktcmVhY3Qvc3JjL21haW4uanMiLCJ3ZWJwYWNrOi8vLy4vfi9mb3Jtc3ktcmVhY3Qvc3JjL3ZhbGlkYXRpb25SdWxlcy5qcyIsIndlYnBhY2s6Ly8vLi9+L2Zvcm1zeS1yZWFjdC9zcmMvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4vfi9mb3Jtc3ktcmVhY3Qvc3JjL01peGluLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxLQUFJLEtBQUssR0FBRyxtQkFBTyxDQUFDLENBQU8sQ0FBQztLQUN4QixNQUFNLEdBQUcsbUJBQU8sQ0FBQyxDQUFjLENBQUM7O0FBRXBDLEtBQUksUUFBUSxHQUFHLG1CQUFPLENBQUMsQ0FBMkIsQ0FBQzs7QUFFbkQsb0JBQU8sQ0FBQyxFQUFxQixDQUFDOztBQUU5QixLQUFJLEdBQUcsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDOzs7QUFDMUIsU0FBTSxvQkFBRztBQUNQLFlBQ0U7O1NBQU0sU0FBUyxFQUFDLEtBQUs7T0FDbkIsb0JBQUMsTUFBTSxDQUFDLFlBQVksRUFBSyxJQUFJLENBQUMsS0FBSyxDQUFJO01BQ2xDLENBQ1I7SUFDRjtFQUNGLENBQUMsQ0FBQzs7QUFFSCxLQUFJLE1BQU0sR0FDUjtBQUFDLFNBQU0sQ0FBQyxLQUFLO0tBQUMsSUFBSSxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFDLE9BQU8sRUFBRSxHQUFJO0dBQzdDLG9CQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUMsT0FBTyxFQUFFLFFBQVMsR0FBRztFQUU3QyxDQUFDOztBQUVGLE9BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLE1BQU0sQ0FBQyxlQUFlLEVBQUUsVUFBQyxPQUFP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QUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLE1BQUs7QUFDTCxJQUFHOztBQUVIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTCxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0wsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTCxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1QsUUFBTztBQUNQLDRDQUEyQztBQUMzQzs7QUFFQSxNQUFLOztBQUVMLElBQUc7O0FBRUg7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUssZUFBZTtBQUNwQixJQUFHOztBQUVIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSztBQUNMLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUwsSUFBRzs7QUFFSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLFFBQU87QUFDUDs7QUFFQSxJQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxRQUFPO0FBQ1A7O0FBRUE7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPOztBQUVQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPOztBQUVQLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQSxFQUFDOztBQUVEO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7O0FDNVpBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0Esd0VBQXVFLEdBQUcsbUZBQW1GLEdBQUc7QUFDaEssSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQ2RBOztBQUVBOztBQUVBLHVDQUFzQyxNQUFNO0FBQzVDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Qsc0JBQXFCO0FBQ3JCO0FBQ0EsUUFBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSyxJQUFJOztBQUVUOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7O0FBRUEsSUFBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIOztBQUVBOztBQUVBOztBQUVBLE1BQUs7OztBQUdMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBLHNEQUFxRCw2QkFBNkI7O0FBRWxGLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBLE1BQUs7QUFDTCxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBLElBQUc7QUFDSDtBQUNBO0FBQ0EsSUFBRztBQUNIO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0JylcbiAgLCBSb3V0ZXIgPSByZXF1aXJlKCdyZWFjdC1yb3V0ZXInKVxuXG52YXIgVGVzdEZvcm0gPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvVGVzdEZvcm0uanN4JylcblxucmVxdWlyZSgnLi9zdHlsZXMvaW5kZXguc2NzcycpXG5cbnZhciBBcHAgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPG1haW4gY2xhc3NOYW1lPVwiYXBwXCI+XG4gICAgICAgIDxSb3V0ZXIuUm91dGVIYW5kbGVyIHsuLi50aGlzLnByb3BzfSAvPlxuICAgICAgPC9tYWluPlxuICAgIClcbiAgfVxufSk7XG5cbnZhciByb3V0ZXMgPSAoXG4gIDxSb3V0ZXIuUm91dGUgbmFtZT1cImFwcFwiIHBhdGg9XCIvXCIgaGFuZGxlcj17QXBwfT5cbiAgICA8Um91dGVyLkRlZmF1bHRSb3V0ZSBoYW5kbGVyPXtUZXN0Rm9ybX0gLz5cbiAgPC9Sb3V0ZXIuUm91dGU+XG4pO1xuXG5Sb3V0ZXIucnVuKHJvdXRlcywgUm91dGVyLkhpc3RvcnlMb2NhdGlvbiwgKEhhbmRsZXIsIHN0YXRlKSA9PiB7XG4gIFJlYWN0LnJlbmRlcig8SGFuZGxlci8+LCBkb2N1bWVudC5ib2R5KTtcbn0pXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9hcHAvaW5kZXguanN4XG4gKiovIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKVxuICAsIEZvcm1zeSA9IHJlcXVpcmUoJ2Zvcm1zeS1yZWFjdCcpXG5cbnZhciBUZXN0SW5wdXQgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIG1peGluczogW0Zvcm1zeS5NaXhpbl0sXG4gIGdldEluaXRpYWxTdGF0ZSgpIHtcbiAgICByZXR1cm4geyBzaG93RXJyb3JzOiBmYWxzZSB9XG4gIH0sXG4gIGNoYW5nZVZhbHVlOiBmdW5jdGlvbihldmVudCkge1xuICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQuY3VycmVudFRhcmdldC52YWx1ZSk7XG4gIH0sXG4gIGhhbmRsZUNoYW5nZShldmVudCkge1xuICAgIHRoaXMuc2V0VmFsdWUoZXZlbnQudGFyZ2V0LnZhbHVlKVxuICB9LFxuICBoYW5kbGVCbHVyKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBzaG93RXJyb3JzOiB0cnVlIH0pXG4gIH0sXG4gIGhhbmRsZUZvY3VzKCkge1xuICAgIGlmICghdGhpcy5pc1ByaXN0aW5lKCkgJiYgIXRoaXMuc2hvd0Vycm9ycygpKVxuICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dFcnJvcnM6IGZhbHNlIH0pXG4gIH0sXG4gIG9yRW1wdHkoc3RyKSB7XG4gICAgcmV0dXJuIHN0ciA/IHN0ciA6ICcnXG4gIH0sXG4gIHJlbmRlcigpIHtcbiAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5vckVtcHR5KHRoaXMucHJvcHMuY2xhc3NOYW1lKSAgKyAnICcgICsgKHRoaXMuc2hvd1JlcXVpcmVkKCkgPyAncmVxdWlyZWQnIDogdGhpcy5zaG93RXJyb3IoKSA/ICdlcnJvcicgOiBudWxsKVxuICAgIHZhciBlcnJvck1lc3NhZ2UgPSB0aGlzLnN0YXRlLnNob3dFcnJvcnMgPyB0aGlzLmdldEVycm9yTWVzc2FnZSgpIDogJydcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17J2Zvcm0tZ3JvdXAnICsgY2xhc3NOYW1lfT5cbiAgICAgICAgPGxhYmVsIGh0bWxGb3I9e3RoaXMucHJvcHMubmFtZX0+e3RoaXMucHJvcHMudGl0bGV9PC9sYWJlbD5cbiAgICAgICAgPGlucHV0IHR5cGU9e3RoaXMucHJvcHMudHlwZSB8fCAndGV4dCd9XG4gICAgICAgICAgICAgICBuYW1lPXt0aGlzLnByb3BzLm5hbWV9XG4gICAgICAgICAgICAgICB2YWx1ZT17dGhpcy5nZXRWYWx1ZSgpfVxuICAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxuICAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgICBvbkZvY3VzPXt0aGlzLmhhbmRsZUZvY3VzfSAvPlxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9J3ZhbGlkYXRpb24tZXJyb3InPntlcnJvck1lc3NhZ2V9PC9zcGFuPlxuICAgICAgPC9kaXY+XG4gICAgKVxuICB9XG59KTtcblxudmFyIFRlc3RGb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGUoKSB7XG4gICAgcmV0dXJuIHsgY2FuU3VibWl0OiBmYWxzZSB9XG4gIH0sXG4gIGhhbmRsZVN1Ym1pdChkYXRhKSB7XG4gICAgY29uc29sZS5sb2coZGF0YSlcbiAgfSxcbiAgZW5hYmxlQnV0dG9uOiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldFN0YXRlKHsgY2FuU3VibWl0OiB0cnVlIH0pXG4gIH0sXG4gIGRpc2FibGVCdXR0b246IGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBjYW5TdWJtaXQ6IGZhbHNlIH0pXG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRpc2FibGVkID0gIXRoaXMuc3RhdGUuY2FuU3VibWl0XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEZvcm1zeS5Gb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH1cbiAgICAgICAgICAgICAgICAgICBvblZhbGlkPXt0aGlzLmVuYWJsZUJ1dHRvbn1cbiAgICAgICAgICAgICAgICAgICBvbkludmFsaWQ9e3RoaXMuZGlzYWJsZUJ1dHRvbn0+XG4gICAgICAgIDxUZXN0SW5wdXQgbmFtZT1cIm5hbWVcIlxuICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiTmFtZVwiXG4gICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cbiAgICAgICAgPFRlc3RJbnB1dCBuYW1lPVwiZW1haWxcIlxuICAgICAgICAgICAgICAgICAgIHRpdGxlPVwiRW1haWxcIlxuICAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25zPVwiaXNFbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbkVycm9yPVwiVGhpcyBpcyBub3QgYSB2YWxpZCBlbWFpbFwiXG4gICAgICAgICAgICAgICAgICAgcmVxdWlyZWQgLz5cbiAgICAgICAgPGJ1dHRvbiB0eXBlPVwic3VibWl0XCIgZGlzYWJsZWQ9e2Rpc2FibGVkfT5cbiAgICAgICAgICBUZXN0IFN1Ym1pdFxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvRm9ybXN5LkZvcm0+XG4gICAgKTtcbiAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gVGVzdEZvcm07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL2FwcC9jb21wb25lbnRzL1Rlc3RGb3JtLmpzeFxuICoqLyIsIi8vIHJlbW92ZWQgYnkgZXh0cmFjdC10ZXh0LXdlYnBhY2stcGx1Z2luXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FwcC9zdHlsZXMvaW5kZXguc2Nzc1xuICoqIG1vZHVsZSBpZCA9IDQ2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgUmVhY3QgPSBnbG9iYWwuUmVhY3QgfHwgcmVxdWlyZSgncmVhY3QnKTtcbnZhciBGb3Jtc3kgPSB7fTtcbnZhciB2YWxpZGF0aW9uUnVsZXMgPSByZXF1aXJlKCcuL3ZhbGlkYXRpb25SdWxlcy5qcycpO1xudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscy5qcycpO1xudmFyIE1peGluID0gcmVxdWlyZSgnLi9NaXhpbi5qcycpO1xudmFyIG9wdGlvbnMgPSB7fTtcblxuRm9ybXN5Lk1peGluID0gTWl4aW47XG5cbkZvcm1zeS5kZWZhdWx0cyA9IGZ1bmN0aW9uIChwYXNzZWRPcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBwYXNzZWRPcHRpb25zO1xufTtcblxuRm9ybXN5LmFkZFZhbGlkYXRpb25SdWxlID0gZnVuY3Rpb24gKG5hbWUsIGZ1bmMpIHtcbiAgdmFsaWRhdGlvblJ1bGVzW25hbWVdID0gZnVuYztcbn07XG5cbkZvcm1zeS5Gb3JtID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaXNWYWxpZDogdHJ1ZSxcbiAgICAgIGlzU3VibWl0dGluZzogZmFsc2UsXG4gICAgICBjYW5DaGFuZ2U6IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgZ2V0RGVmYXVsdFByb3BzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9uU3VjY2VzczogZnVuY3Rpb24gKCkge30sXG4gICAgICBvbkVycm9yOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uU3VibWl0OiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uVmFsaWRTdWJtaXQ6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgb25JbnZhbGlkU3VibWl0OiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uU3VibWl0dGVkOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uVmFsaWQ6IGZ1bmN0aW9uICgpIHt9LFxuICAgICAgb25JbnZhbGlkOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIG9uQ2hhbmdlOiBmdW5jdGlvbiAoKSB7fSxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnM6IG51bGxcbiAgICB9O1xuICB9LFxuXG4gIC8vIEFkZCBhIG1hcCB0byBzdG9yZSB0aGUgaW5wdXRzIG9mIHRoZSBmb3JtLCBhIG1vZGVsIHRvIHN0b3JlXG4gIC8vIHRoZSB2YWx1ZXMgb2YgdGhlIGZvcm0gYW5kIHJlZ2lzdGVyIGNoaWxkIGlucHV0c1xuICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmlucHV0cyA9IHt9O1xuICAgIHRoaXMubW9kZWwgPSB7fTtcbiAgfSxcblxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24gKCkge1xuICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XG4gIH0sXG5cbiAgY29tcG9uZW50V2lsbFVwZGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBpbnB1dEtleXMgPSBPYmplY3Qua2V5cyh0aGlzLmlucHV0cyk7XG5cbiAgICAvLyBUaGUgdXBkYXRlZCBjaGlsZHJlbiBhcnJheSBpcyBub3QgYXZhaWxhYmxlIGhlcmUgZm9yIHNvbWUgcmVhc29uLFxuICAgIC8vIHdlIG5lZWQgdG8gd2FpdCBmb3IgbmV4dCBldmVudCBsb29wXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG5cbiAgICAgIC8vIFRoZSBjb21wb25lbnQgbWlnaHQgaGF2ZSBiZWVuIHVubW91bnRlZCBvbiBhblxuICAgICAgLy8gdXBkYXRlXG4gICAgICBpZiAodGhpcy5pc01vdW50ZWQoKSkge1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnZhbGlkYXRpb25FcnJvcnMpIHtcbiAgICAgICAgICB0aGlzLnNldElucHV0VmFsaWRhdGlvbkVycm9ycyh0aGlzLnByb3BzLnZhbGlkYXRpb25FcnJvcnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIG5ld0lucHV0S2V5cyA9IE9iamVjdC5rZXlzKHRoaXMuaW5wdXRzKTtcbiAgICAgICAgaWYgKHV0aWxzLmFycmF5c0RpZmZlcihpbnB1dEtleXMsIG5ld0lucHV0S2V5cykpIHtcbiAgICAgICAgICB0aGlzLnZhbGlkYXRlRm9ybSgpO1xuICAgICAgICB9XG5cbiAgICAgIH1cblxuICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gIH0sXG5cbiAgLy8gVXBkYXRlIG1vZGVsLCBzdWJtaXQgdG8gdXJsIHByb3AgYW5kIHNlbmQgdGhlIG1vZGVsXG4gIHN1Ym1pdDogZnVuY3Rpb24gKGV2ZW50KSB7XG5cbiAgICBldmVudCAmJiBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgLy8gVHJpZ2dlciBmb3JtIGFzIG5vdCBwcmlzdGluZS5cbiAgICAvLyBJZiBhbnkgaW5wdXRzIGhhdmUgbm90IGJlZW4gdG91Y2hlZCB5ZXQgdGhpcyB3aWxsIG1ha2UgdGhlbSBkaXJ0eVxuICAgIC8vIHNvIHZhbGlkYXRpb24gYmVjb21lcyB2aXNpYmxlIChpZiBiYXNlZCBvbiBpc1ByaXN0aW5lKVxuICAgIHRoaXMuc2V0Rm9ybVByaXN0aW5lKGZhbHNlKTtcbiAgICB0aGlzLnVwZGF0ZU1vZGVsKCk7XG4gICAgdmFyIG1vZGVsID0gdGhpcy5tYXBNb2RlbCgpO1xuICAgIHRoaXMucHJvcHMub25TdWJtaXQobW9kZWwsIHRoaXMucmVzZXRNb2RlbCwgdGhpcy51cGRhdGVJbnB1dHNXaXRoRXJyb3IpO1xuICAgIHRoaXMuc3RhdGUuaXNWYWxpZCA/IHRoaXMucHJvcHMub25WYWxpZFN1Ym1pdChtb2RlbCwgdGhpcy5yZXNldE1vZGVsLCB0aGlzLnVwZGF0ZUlucHV0c1dpdGhFcnJvcikgOiB0aGlzLnByb3BzLm9uSW52YWxpZFN1Ym1pdChtb2RlbCwgdGhpcy5yZXNldE1vZGVsLCB0aGlzLnVwZGF0ZUlucHV0c1dpdGhFcnJvcik7XG5cbiAgfSxcblxuICBtYXBNb2RlbDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLm1hcHBpbmcgPyB0aGlzLnByb3BzLm1hcHBpbmcodGhpcy5tb2RlbCkgOiB0aGlzLm1vZGVsO1xuICB9LFxuXG4gIC8vIEdvZXMgdGhyb3VnaCBhbGwgcmVnaXN0ZXJlZCBjb21wb25lbnRzIGFuZFxuICAvLyB1cGRhdGVzIHRoZSBtb2RlbCB2YWx1ZXNcbiAgdXBkYXRlTW9kZWw6IGZ1bmN0aW9uICgpIHtcbiAgICBPYmplY3Qua2V5cyh0aGlzLmlucHV0cykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IHRoaXMuaW5wdXRzW25hbWVdO1xuICAgICAgdGhpcy5tb2RlbFtuYW1lXSA9IGNvbXBvbmVudC5zdGF0ZS5fdmFsdWU7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcblxuICAvLyBSZXNldCBlYWNoIGtleSBpbiB0aGUgbW9kZWwgdG8gdGhlIG9yaWdpbmFsIC8gaW5pdGlhbCB2YWx1ZVxuICByZXNldE1vZGVsOiBmdW5jdGlvbiAoKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgIHRoaXMuaW5wdXRzW25hbWVdLnJlc2V0VmFsdWUoKTtcbiAgICB9LmJpbmQodGhpcykpO1xuICAgIHRoaXMudmFsaWRhdGVGb3JtKCk7XG4gIH0sXG5cbiAgc2V0SW5wdXRWYWxpZGF0aW9uRXJyb3JzOiBmdW5jdGlvbiAoZXJyb3JzKSB7XG4gICAgT2JqZWN0LmtleXModGhpcy5pbnB1dHMpLmZvckVhY2goZnVuY3Rpb24gKG5hbWUsIGluZGV4KSB7XG4gICAgICB2YXIgY29tcG9uZW50ID0gdGhpcy5pbnB1dHNbbmFtZV07XG4gICAgICB2YXIgYXJncyA9IFt7XG4gICAgICAgIF9pc1ZhbGlkOiAhKG5hbWUgaW4gZXJyb3JzKSxcbiAgICAgICAgX3ZhbGlkYXRpb25FcnJvcjogZXJyb3JzW25hbWVdXG4gICAgICB9XTtcbiAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZS5hcHBseShjb21wb25lbnQsIGFyZ3MpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG5cbiAgLy8gR28gdGhyb3VnaCBlcnJvcnMgZnJvbSBzZXJ2ZXIgYW5kIGdyYWIgdGhlIGNvbXBvbmVudHNcbiAgLy8gc3RvcmVkIGluIHRoZSBpbnB1dHMgbWFwLiBDaGFuZ2UgdGhlaXIgc3RhdGUgdG8gaW52YWxpZFxuICAvLyBhbmQgc2V0IHRoZSBzZXJ2ZXJFcnJvciBtZXNzYWdlXG4gIHVwZGF0ZUlucHV0c1dpdGhFcnJvcjogZnVuY3Rpb24gKGVycm9ycykge1xuICAgIE9iamVjdC5rZXlzKGVycm9ycykuZm9yRWFjaChmdW5jdGlvbiAobmFtZSwgaW5kZXgpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzLmlucHV0c1tuYW1lXTtcblxuICAgICAgaWYgKCFjb21wb25lbnQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdZb3UgYXJlIHRyeWluZyB0byB1cGRhdGUgYW4gaW5wdXQgdGhhdCBkb2VzIG5vdCBleGlzdHMuIFZlcmlmeSBlcnJvcnMgb2JqZWN0IHdpdGggaW5wdXQgbmFtZXMuICcgKyBKU09OLnN0cmluZ2lmeShlcnJvcnMpKTtcbiAgICAgIH1cblxuICAgICAgdmFyIGFyZ3MgPSBbe1xuICAgICAgICBfaXNWYWxpZDogZmFsc2UsXG4gICAgICAgIF9leHRlcm5hbEVycm9yOiBlcnJvcnNbbmFtZV1cbiAgICAgIH1dO1xuICAgICAgY29tcG9uZW50LnNldFN0YXRlLmFwcGx5KGNvbXBvbmVudCwgYXJncyk7XG4gICAgfS5iaW5kKHRoaXMpKTtcbiAgfSxcblxuICAvLyBUcmF2ZXJzZSB0aGUgY2hpbGRyZW4gYW5kIGNoaWxkcmVuIG9mIGNoaWxkcmVuIHRvIGZpbmRcbiAgLy8gYWxsIGlucHV0cyBieSBjaGVja2luZyB0aGUgbmFtZSBwcm9wLiBNYXliZSBkbyBhIGJldHRlclxuICAvLyBjaGVjayBoZXJlXG4gIHRyYXZlcnNlQ2hpbGRyZW5BbmRSZWdpc3RlcklucHV0czogZnVuY3Rpb24gKGNoaWxkcmVuKSB7XG5cbiAgICBpZiAodHlwZW9mIGNoaWxkcmVuICE9PSAnb2JqZWN0JyB8fCBjaGlsZHJlbiA9PT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGNoaWxkcmVuO1xuICAgIH1cbiAgICByZXR1cm4gUmVhY3QuQ2hpbGRyZW4ubWFwKGNoaWxkcmVuLCBmdW5jdGlvbiAoY2hpbGQpIHtcblxuICAgICAgaWYgKHR5cGVvZiBjaGlsZCAhPT0gJ29iamVjdCcgfHwgY2hpbGQgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIGNoaWxkO1xuICAgICAgfVxuXG4gICAgICBpZiAoY2hpbGQucHJvcHMgJiYgY2hpbGQucHJvcHMubmFtZSkge1xuXG4gICAgICAgIHJldHVybiBSZWFjdC5jbG9uZUVsZW1lbnQoY2hpbGQsIHtcbiAgICAgICAgICBfYXR0YWNoVG9Gb3JtOiB0aGlzLmF0dGFjaFRvRm9ybSxcbiAgICAgICAgICBfZGV0YWNoRnJvbUZvcm06IHRoaXMuZGV0YWNoRnJvbUZvcm0sXG4gICAgICAgICAgX3ZhbGlkYXRlOiB0aGlzLnZhbGlkYXRlLFxuICAgICAgICAgIF9pc0Zvcm1EaXNhYmxlZDogdGhpcy5pc0Zvcm1EaXNhYmxlZCxcbiAgICAgICAgICBfaXNWYWxpZFZhbHVlOiBmdW5jdGlvbiAoY29tcG9uZW50LCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucnVuVmFsaWRhdGlvbihjb21wb25lbnQsIHZhbHVlKS5pc1ZhbGlkO1xuICAgICAgICAgIH0uYmluZCh0aGlzKVxuICAgICAgICB9LCBjaGlsZC5wcm9wcyAmJiBjaGlsZC5wcm9wcy5jaGlsZHJlbik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gUmVhY3QuY2xvbmVFbGVtZW50KGNoaWxkLCB7fSwgdGhpcy50cmF2ZXJzZUNoaWxkcmVuQW5kUmVnaXN0ZXJJbnB1dHMoY2hpbGQucHJvcHMgJiYgY2hpbGQucHJvcHMuY2hpbGRyZW4pKTtcbiAgICAgIH1cblxuICAgIH0sIHRoaXMpO1xuXG4gIH0sXG5cbiAgaXNGb3JtRGlzYWJsZWQ6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9wcy5kaXNhYmxlZDtcbiAgfSxcblxuICBnZXRDdXJyZW50VmFsdWVzOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuaW5wdXRzKS5yZWR1Y2UoZnVuY3Rpb24gKGRhdGEsIG5hbWUpIHtcbiAgICAgIHZhciBjb21wb25lbnQgPSB0aGlzLmlucHV0c1tuYW1lXTtcbiAgICAgIGRhdGFbbmFtZV0gPSBjb21wb25lbnQuc3RhdGUuX3ZhbHVlO1xuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfS5iaW5kKHRoaXMpLCB7fSk7XG4gIH0sXG5cbiAgc2V0Rm9ybVByaXN0aW5lOiBmdW5jdGlvbiAoaXNQcmlzdGluZSkge1xuICAgIHZhciBpbnB1dHMgPSB0aGlzLmlucHV0cztcbiAgICB2YXIgaW5wdXRLZXlzID0gT2JqZWN0LmtleXMoaW5wdXRzKTtcblxuICAgIC8vIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIGNvbXBvbmVudCBhbmQgc2V0IGl0IGFzIHByaXN0aW5lXG4gICAgLy8gb3IgXCJkaXJ0eVwiLlxuICAgIGlucHV0S2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpbmRleCkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IGlucHV0c1tuYW1lXTtcbiAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZSh7XG4gICAgICAgIF9pc1ByaXN0aW5lOiBpc1ByaXN0aW5lXG4gICAgICB9KTtcbiAgICB9LmJpbmQodGhpcykpO1xuICB9LFxuXG4gIC8vIFVzZSB0aGUgYmluZGVkIHZhbHVlcyBhbmQgdGhlIGFjdHVhbCBpbnB1dCB2YWx1ZSB0b1xuICAvLyB2YWxpZGF0ZSB0aGUgaW5wdXQgYW5kIHNldCBpdHMgc3RhdGUuIFRoZW4gY2hlY2sgdGhlXG4gIC8vIHN0YXRlIG9mIHRoZSBmb3JtIGl0c2VsZlxuICB2YWxpZGF0ZTogZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuXG4gICAgLy8gVHJpZ2dlciBvbkNoYW5nZVxuICAgIGlmICh0aGlzLnN0YXRlLmNhbkNoYW5nZSkge1xuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZSh0aGlzLmdldEN1cnJlbnRWYWx1ZXMoKSk7XG4gICAgfVxuXG4gICAgdmFyIHZhbGlkYXRpb24gPSB0aGlzLnJ1blZhbGlkYXRpb24oY29tcG9uZW50KTtcbiAgICAvLyBSdW4gdGhyb3VnaCB0aGUgdmFsaWRhdGlvbnMsIHNwbGl0IHRoZW0gdXAgYW5kIGNhbGxcbiAgICAvLyB0aGUgdmFsaWRhdG9yIElGIHRoZXJlIGlzIGEgdmFsdWUgb3IgaXQgaXMgcmVxdWlyZWRcbiAgICBjb21wb25lbnQuc2V0U3RhdGUoe1xuICAgICAgX2lzVmFsaWQ6IHZhbGlkYXRpb24uaXNWYWxpZCxcbiAgICAgIF9pc1JlcXVpcmVkOiB2YWxpZGF0aW9uLmlzUmVxdWlyZWQsXG4gICAgICBfdmFsaWRhdGlvbkVycm9yOiB2YWxpZGF0aW9uLmVycm9yLFxuICAgICAgX2V4dGVybmFsRXJyb3I6IG51bGxcbiAgICB9LCB0aGlzLnZhbGlkYXRlRm9ybSk7XG5cbiAgfSxcblxuICAvLyBDaGVja3MgdmFsaWRhdGlvbiBvbiBjdXJyZW50IHZhbHVlIG9yIGEgcGFzc2VkIHZhbHVlXG4gIHJ1blZhbGlkYXRpb246IGZ1bmN0aW9uIChjb21wb25lbnQsIHZhbHVlKSB7XG5cbiAgICB2YXIgY3VycmVudFZhbHVlcyA9IHRoaXMuZ2V0Q3VycmVudFZhbHVlcygpO1xuICAgIHZhciB2YWxpZGF0aW9uRXJyb3JzID0gY29tcG9uZW50LnByb3BzLnZhbGlkYXRpb25FcnJvcnM7XG4gICAgdmFyIHZhbGlkYXRpb25FcnJvciA9IGNvbXBvbmVudC5wcm9wcy52YWxpZGF0aW9uRXJyb3I7XG4gICAgdmFsdWUgPSBhcmd1bWVudHMubGVuZ3RoID09PSAyID8gdmFsdWUgOiBjb21wb25lbnQuc3RhdGUuX3ZhbHVlO1xuXG4gICAgdmFyIHZhbGlkYXRpb25SZXN1bHRzID0gdGhpcy5ydW5SdWxlcyh2YWx1ZSwgY3VycmVudFZhbHVlcywgY29tcG9uZW50Ll92YWxpZGF0aW9ucyk7XG4gICAgdmFyIHJlcXVpcmVkUmVzdWx0cyA9IHRoaXMucnVuUnVsZXModmFsdWUsIGN1cnJlbnRWYWx1ZXMsIGNvbXBvbmVudC5fcmVxdWlyZWRWYWxpZGF0aW9ucyk7XG5cbiAgICAvLyB0aGUgY29tcG9uZW50IGRlZmluZXMgYW4gZXhwbGljaXQgdmFsaWRhdGUgZnVuY3Rpb25cbiAgICBpZiAodHlwZW9mIGNvbXBvbmVudC52YWxpZGF0ZSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICB2YWxpZGF0aW9uUmVzdWx0cy5mYWlsZWQgPSBjb21wb25lbnQudmFsaWRhdGUoKSA/IFtdIDogWydmYWlsZWQnXTtcbiAgICB9XG5cbiAgICB2YXIgaXNSZXF1aXJlZCA9IE9iamVjdC5rZXlzKGNvbXBvbmVudC5fcmVxdWlyZWRWYWxpZGF0aW9ucykubGVuZ3RoID8gISFyZXF1aXJlZFJlc3VsdHMuc3VjY2Vzcy5sZW5ndGggOiBmYWxzZTtcbiAgICB2YXIgaXNWYWxpZCA9ICF2YWxpZGF0aW9uUmVzdWx0cy5mYWlsZWQubGVuZ3RoICYmICEodGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JzICYmIHRoaXMucHJvcHMudmFsaWRhdGlvbkVycm9yc1tjb21wb25lbnQucHJvcHMubmFtZV0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlzUmVxdWlyZWQ6IGlzUmVxdWlyZWQsXG4gICAgICBpc1ZhbGlkOiBpc1JlcXVpcmVkID8gZmFsc2UgOiBpc1ZhbGlkLFxuICAgICAgZXJyb3I6IChmdW5jdGlvbiAoKSB7XG5cbiAgICAgICAgaWYgKGlzVmFsaWQgJiYgIWlzUmVxdWlyZWQpIHtcbiAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodmFsaWRhdGlvblJlc3VsdHMuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiB2YWxpZGF0aW9uUmVzdWx0cy5lcnJvcnNbMF07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JzICYmIHRoaXMucHJvcHMudmFsaWRhdGlvbkVycm9yc1tjb21wb25lbnQucHJvcHMubmFtZV0pIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5wcm9wcy52YWxpZGF0aW9uRXJyb3JzW2NvbXBvbmVudC5wcm9wcy5uYW1lXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc1JlcXVpcmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHZhbGlkYXRpb25FcnJvcnNbcmVxdWlyZWRSZXN1bHRzLnN1Y2Nlc3NbMF1dIHx8IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWlzVmFsaWQpIHtcbiAgICAgICAgICByZXR1cm4gdmFsaWRhdGlvbkVycm9yc1t2YWxpZGF0aW9uUmVzdWx0cy5mYWlsZWRbMF1dIHx8IHZhbGlkYXRpb25FcnJvcjtcbiAgICAgICAgfVxuXG4gICAgICB9LmNhbGwodGhpcykpXG4gICAgfTtcblxuICB9LFxuXG4gIHJ1blJ1bGVzOiBmdW5jdGlvbiAodmFsdWUsIGN1cnJlbnRWYWx1ZXMsIHZhbGlkYXRpb25zKSB7XG5cbiAgICB2YXIgcmVzdWx0cyA9IHtcbiAgICAgIGVycm9yczogW10sXG4gICAgICBmYWlsZWQ6IFtdLFxuICAgICAgc3VjY2VzczogW11cbiAgICB9O1xuICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0aW9ucykubGVuZ3RoKSB7XG4gICAgICBPYmplY3Qua2V5cyh2YWxpZGF0aW9ucykuZm9yRWFjaChmdW5jdGlvbiAodmFsaWRhdGlvbk1ldGhvZCkge1xuXG4gICAgICAgIGlmICh2YWxpZGF0aW9uUnVsZXNbdmFsaWRhdGlvbk1ldGhvZF0gJiYgdHlwZW9mIHZhbGlkYXRpb25zW3ZhbGlkYXRpb25NZXRob2RdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3Jtc3kgZG9lcyBub3QgYWxsb3cgeW91IHRvIG92ZXJyaWRlIGRlZmF1bHQgdmFsaWRhdGlvbnM6ICcgKyB2YWxpZGF0aW9uTWV0aG9kKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdmFsaWRhdGlvblJ1bGVzW3ZhbGlkYXRpb25NZXRob2RdICYmIHR5cGVvZiB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRm9ybXN5IGRvZXMgbm90IGhhdmUgdGhlIHZhbGlkYXRpb24gcnVsZTogJyArIHZhbGlkYXRpb25NZXRob2QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciB2YWxpZGF0aW9uID0gdmFsaWRhdGlvbnNbdmFsaWRhdGlvbk1ldGhvZF0oY3VycmVudFZhbHVlcywgdmFsdWUpO1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsaWRhdGlvbiA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJlc3VsdHMuZXJyb3JzLnB1c2godmFsaWRhdGlvbik7XG4gICAgICAgICAgICByZXN1bHRzLmZhaWxlZC5wdXNoKHZhbGlkYXRpb25NZXRob2QpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoIXZhbGlkYXRpb24pIHtcbiAgICAgICAgICAgIHJlc3VsdHMuZmFpbGVkLnB1c2godmFsaWRhdGlvbk1ldGhvZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgIHZhciB2YWxpZGF0aW9uID0gdmFsaWRhdGlvblJ1bGVzW3ZhbGlkYXRpb25NZXRob2RdKGN1cnJlbnRWYWx1ZXMsIHZhbHVlLCB2YWxpZGF0aW9uc1t2YWxpZGF0aW9uTWV0aG9kXSk7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWxpZGF0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgcmVzdWx0cy5lcnJvcnMucHVzaCh2YWxpZGF0aW9uKTtcbiAgICAgICAgICAgIHJlc3VsdHMuZmFpbGVkLnB1c2godmFsaWRhdGlvbk1ldGhvZCk7XG4gICAgICAgICAgfSBlbHNlIGlmICghdmFsaWRhdGlvbikge1xuICAgICAgICAgICAgcmVzdWx0cy5mYWlsZWQucHVzaCh2YWxpZGF0aW9uTWV0aG9kKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmVzdWx0cy5zdWNjZXNzLnB1c2godmFsaWRhdGlvbk1ldGhvZCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybjtcblxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHJlc3VsdHMuc3VjY2Vzcy5wdXNoKHZhbGlkYXRpb25NZXRob2QpO1xuXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0cztcblxuICB9LFxuXG4gIC8vIFZhbGlkYXRlIHRoZSBmb3JtIGJ5IGdvaW5nIHRocm91Z2ggYWxsIGNoaWxkIGlucHV0IGNvbXBvbmVudHNcbiAgLy8gYW5kIGNoZWNrIHRoZWlyIHN0YXRlXG4gIHZhbGlkYXRlRm9ybTogZnVuY3Rpb24gKCkge1xuICAgIHZhciBhbGxJc1ZhbGlkID0gdHJ1ZTtcbiAgICB2YXIgaW5wdXRzID0gdGhpcy5pbnB1dHM7XG4gICAgdmFyIGlucHV0S2V5cyA9IE9iamVjdC5rZXlzKGlucHV0cyk7XG5cbiAgICAvLyBXZSBuZWVkIGEgY2FsbGJhY2sgYXMgd2UgYXJlIHZhbGlkYXRpbmcgYWxsIGlucHV0cyBhZ2Fpbi4gVGhpcyB3aWxsXG4gICAgLy8gcnVuIHdoZW4gdGhlIGxhc3QgY29tcG9uZW50IGhhcyBzZXQgaXRzIHN0YXRlXG4gICAgdmFyIG9uVmFsaWRhdGlvbkNvbXBsZXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgaW5wdXRLZXlzLmZvckVhY2goZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgaWYgKCFpbnB1dHNbbmFtZV0uc3RhdGUuX2lzVmFsaWQpIHtcbiAgICAgICAgICBhbGxJc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICBpc1ZhbGlkOiBhbGxJc1ZhbGlkXG4gICAgICB9KTtcblxuICAgICAgaWYgKGFsbElzVmFsaWQpIHtcbiAgICAgICAgdGhpcy5wcm9wcy5vblZhbGlkKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnByb3BzLm9uSW52YWxpZCgpO1xuICAgICAgfVxuXG4gICAgICAvLyBUZWxsIHRoZSBmb3JtIHRoYXQgaXQgY2FuIHN0YXJ0IHRvIHRyaWdnZXIgY2hhbmdlIGV2ZW50c1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNhbkNoYW5nZTogdHJ1ZVxuICAgICAgfSk7XG5cbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICAvLyBSdW4gdmFsaWRhdGlvbiBhZ2FpbiBpbiBjYXNlIGFmZmVjdGVkIGJ5IG90aGVyIGlucHV0cy4gVGhlXG4gICAgLy8gbGFzdCBjb21wb25lbnQgdmFsaWRhdGVkIHdpbGwgcnVuIHRoZSBvblZhbGlkYXRpb25Db21wbGV0ZSBjYWxsYmFja1xuICAgIGlucHV0S2V5cy5mb3JFYWNoKGZ1bmN0aW9uIChuYW1lLCBpbmRleCkge1xuICAgICAgdmFyIGNvbXBvbmVudCA9IGlucHV0c1tuYW1lXTtcbiAgICAgIHZhciB2YWxpZGF0aW9uID0gdGhpcy5ydW5WYWxpZGF0aW9uKGNvbXBvbmVudCk7XG4gICAgICBpZiAodmFsaWRhdGlvbi5pc1ZhbGlkICYmIGNvbXBvbmVudC5zdGF0ZS5fZXh0ZXJuYWxFcnJvcikge1xuICAgICAgICB2YWxpZGF0aW9uLmlzVmFsaWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbXBvbmVudC5zZXRTdGF0ZSh7XG4gICAgICAgIF9pc1ZhbGlkOiB2YWxpZGF0aW9uLmlzVmFsaWQsXG4gICAgICAgIF9pc1JlcXVpcmVkOiB2YWxpZGF0aW9uLmlzUmVxdWlyZWQsXG4gICAgICAgIF92YWxpZGF0aW9uRXJyb3I6IHZhbGlkYXRpb24uZXJyb3IsXG4gICAgICAgIF9leHRlcm5hbEVycm9yOiAhdmFsaWRhdGlvbi5pc1ZhbGlkICYmIGNvbXBvbmVudC5zdGF0ZS5fZXh0ZXJuYWxFcnJvciA/IGNvbXBvbmVudC5zdGF0ZS5fZXh0ZXJuYWxFcnJvciA6IG51bGxcbiAgICAgIH0sIGluZGV4ID09PSBpbnB1dEtleXMubGVuZ3RoIC0gMSA/IG9uVmFsaWRhdGlvbkNvbXBsZXRlIDogbnVsbCk7XG4gICAgfS5iaW5kKHRoaXMpKTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBubyBpbnB1dHMsIHNldCBzdGF0ZSB3aGVyZSBmb3JtIGlzIHJlYWR5IHRvIHRyaWdnZXJcbiAgICAvLyBjaGFuZ2UgZXZlbnQuIE5ldyBpbnB1dHMgbWlnaHQgYmUgYWRkZWQgbGF0ZXJcbiAgICBpZiAoIWlucHV0S2V5cy5sZW5ndGggJiYgdGhpcy5pc01vdW50ZWQoKSkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGNhbkNoYW5nZTogdHJ1ZVxuICAgICAgfSk7XG4gICAgfVxuICB9LFxuXG4gIC8vIE1ldGhvZCBwdXQgb24gZWFjaCBpbnB1dCBjb21wb25lbnQgdG8gcmVnaXN0ZXJcbiAgLy8gaXRzZWxmIHRvIHRoZSBmb3JtXG4gIGF0dGFjaFRvRm9ybTogZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgIHRoaXMuaW5wdXRzW2NvbXBvbmVudC5wcm9wcy5uYW1lXSA9IGNvbXBvbmVudDtcbiAgICB0aGlzLm1vZGVsW2NvbXBvbmVudC5wcm9wcy5uYW1lXSA9IGNvbXBvbmVudC5zdGF0ZS5fdmFsdWU7XG4gICAgdGhpcy52YWxpZGF0ZShjb21wb25lbnQpO1xuICB9LFxuXG4gIC8vIE1ldGhvZCBwdXQgb24gZWFjaCBpbnB1dCBjb21wb25lbnQgdG8gdW5yZWdpc3RlclxuICAvLyBpdHNlbGYgZnJvbSB0aGUgZm9ybVxuICBkZXRhY2hGcm9tRm9ybTogZnVuY3Rpb24gKGNvbXBvbmVudCkge1xuICAgIGRlbGV0ZSB0aGlzLmlucHV0c1tjb21wb25lbnQucHJvcHMubmFtZV07XG4gICAgZGVsZXRlIHRoaXMubW9kZWxbY29tcG9uZW50LnByb3BzLm5hbWVdO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcblxuICAgIHJldHVybiBSZWFjdC5ET00uZm9ybSh7XG4gICAgICAgIG9uU3VibWl0OiB0aGlzLnN1Ym1pdCxcbiAgICAgICAgY2xhc3NOYW1lOiB0aGlzLnByb3BzLmNsYXNzTmFtZSBcbiAgICAgIH0sXG4gICAgICB0aGlzLnRyYXZlcnNlQ2hpbGRyZW5BbmRSZWdpc3RlcklucHV0cyh0aGlzLnByb3BzLmNoaWxkcmVuKVxuICAgICk7XG5cbiAgfVxufSk7XG5cbmlmICghZ2xvYmFsLmV4cG9ydHMgJiYgIWdsb2JhbC5tb2R1bGUgJiYgKCFnbG9iYWwuZGVmaW5lIHx8ICFnbG9iYWwuZGVmaW5lLmFtZCkpIHtcbiAgZ2xvYmFsLkZvcm1zeSA9IEZvcm1zeTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBGb3Jtc3k7XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mb3Jtc3ktcmVhY3Qvc3JjL21haW4uanNcbiAqKiBtb2R1bGUgaWQgPSAxMjVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBpc0RlZmF1bHRSZXF1aXJlZFZhbHVlOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHZhbHVlID09PSAnJztcbiAgfSxcbiAgaGFzVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuICEhdmFsdWU7XG4gIH0sXG4gIG1hdGNoUmVnZXhwOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSwgcmVnZXhwKSB7XG4gICAgcmV0dXJuICEhdmFsdWUgJiYgISF2YWx1ZS5tYXRjaChyZWdleHApO1xuICB9LFxuICBpc1VuZGVmaW5lZDogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IHVuZGVmaW5lZDtcbiAgfSxcbiAgaXNFbXB0eVN0cmluZzogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09ICcnO1xuICB9LFxuICBpc0VtYWlsOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiAhdmFsdWUgfHwgdmFsdWUubWF0Y2goL14oKChbYS16XXxcXGR8WyEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkrKFxcLihbYS16XXxcXGR8WyEjXFwkJSYnXFwqXFwrXFwtXFwvPVxcP1xcXl9ge1xcfH1+XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkrKSopfCgoXFx4MjIpKCgoKFxceDIwfFxceDA5KSooXFx4MGRcXHgwYSkpPyhcXHgyMHxcXHgwOSkrKT8oKFtcXHgwMS1cXHgwOFxceDBiXFx4MGNcXHgwZS1cXHgxZlxceDdmXXxcXHgyMXxbXFx4MjMtXFx4NWJdfFtcXHg1ZC1cXHg3ZV18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfChcXFxcKFtcXHgwMS1cXHgwOVxceDBiXFx4MGNcXHgwZC1cXHg3Zl18W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pKSkpKigoKFxceDIwfFxceDA5KSooXFx4MGRcXHgwYSkpPyhcXHgyMHxcXHgwOSkrKT8oXFx4MjIpKSlAKCgoW2Etel18XFxkfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkqKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKVxcLikrKChbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KChbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkqKFthLXpdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSkpJC9pKTtcbiAgfSxcbiAgaXNUcnVlOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gdHJ1ZTtcbiAgfSxcbiAgaXNGYWxzZTogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IGZhbHNlO1xuICB9LFxuICBpc051bWVyaWM6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIG1hdGNoUmVzdWx0cyA9IHZhbHVlLm1hdGNoKC9bLStdPyhcXGQqWy5dKT9cXGQrLyk7XG4gICAgICBpZiAoISFtYXRjaFJlc3VsdHMpIHtcbiAgICAgICAgcmV0dXJuIG1hdGNoUmVzdWx0c1swXSA9PSB2YWx1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIGlzQWxwaGE6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIC9eW2EtekEtWl0rJC8udGVzdCh2YWx1ZSk7XG4gIH0sXG4gIGlzV29yZHM6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIC9eW2EtekEtWlxcc10rJC8udGVzdCh2YWx1ZSk7XG4gIH0sXG4gIGlzU3BlY2lhbFdvcmRzOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSkge1xuICAgIHJldHVybiAhdmFsdWUgfHwgdmFsdWUubWF0Y2goL15bYS16QS1aXFxzXFx1MDBDMC1cXHUwMTdGXSskLyk7XG4gIH0sXG4gIGlzTGVuZ3RoOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCA9PT0gbGVuZ3RoO1xuICB9LFxuICBlcXVhbHM6IGZ1bmN0aW9uICh2YWx1ZXMsIHZhbHVlLCBlcWwpIHtcbiAgICByZXR1cm4gdmFsdWUgPT0gZXFsO1xuICB9LFxuICBlcXVhbHNGaWVsZDogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUsIGZpZWxkKSB7XG4gICAgcmV0dXJuIHZhbHVlID09IHZhbHVlc1tmaWVsZF07XG4gIH0sXG4gIG1heExlbmd0aDogZnVuY3Rpb24gKHZhbHVlcywgdmFsdWUsIGxlbmd0aCkge1xuICAgIHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5sZW5ndGggJiYgdmFsdWUubGVuZ3RoIDw9IGxlbmd0aDtcbiAgfSxcbiAgbWluTGVuZ3RoOiBmdW5jdGlvbiAodmFsdWVzLCB2YWx1ZSwgbGVuZ3RoKSB7XG4gICAgcmV0dXJuIHZhbHVlICYmIHZhbHVlLmxlbmd0aCAmJiB2YWx1ZS5sZW5ndGggPj0gbGVuZ3RoO1xuICB9XG59O1xuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL34vZm9ybXN5LXJlYWN0L3NyYy92YWxpZGF0aW9uUnVsZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0ge1xuICBhcnJheXNEaWZmZXI6IGZ1bmN0aW9uIChhcnJheUEsIGFycmF5Qikge1xuICAgIHZhciBpc0RpZmZlcmVudCA9IGZhbHNlO1xuICAgIGlmIChhcnJheUEubGVuZ3RoICE9PSBhcnJheUIubGVuZ3RoKSB7XG4gICAgICBpc0RpZmZlcmVudCA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFycmF5QS5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtLCBpbmRleCkge1xuICAgICAgICBpZiAoaXRlbSAhPT0gYXJyYXlCW2luZGV4XSkge1xuICAgICAgICAgIGlzRGlmZmVyZW50ID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBpc0RpZmZlcmVudDtcbiAgfVxufTtcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9+L2Zvcm1zeS1yZWFjdC9zcmMvdXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNzRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBjb252ZXJ0VmFsaWRhdGlvbnNUb09iamVjdCA9IGZ1bmN0aW9uICh2YWxpZGF0aW9ucykge1xuXG4gIGlmICh0eXBlb2YgdmFsaWRhdGlvbnMgPT09ICdzdHJpbmcnKSB7XG5cbiAgICByZXR1cm4gdmFsaWRhdGlvbnMuc3BsaXQoL1xcLCg/IVtee1xcW10qW31cXF1dKS9nKS5yZWR1Y2UoZnVuY3Rpb24gKHZhbGlkYXRpb25zLCB2YWxpZGF0aW9uKSB7XG4gICAgICB2YXIgYXJncyA9IHZhbGlkYXRpb24uc3BsaXQoJzonKTtcbiAgICAgIHZhciB2YWxpZGF0ZU1ldGhvZCA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgIGFyZ3MgPSBhcmdzLm1hcChmdW5jdGlvbiAoYXJnKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoYXJnKTtcbiAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgIHJldHVybiBhcmc7IC8vIEl0IGlzIGEgc3RyaW5nIGlmIGl0IGNhbiBub3QgcGFyc2UgaXRcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3Jtc3kgZG9lcyBub3Qgc3VwcG9ydCBtdWx0aXBsZSBhcmdzIG9uIHN0cmluZyB2YWxpZGF0aW9ucy4gVXNlIG9iamVjdCBmb3JtYXQgb2YgdmFsaWRhdGlvbnMgaW5zdGVhZC4nKTtcbiAgICAgIH1cbiAgICAgIHZhbGlkYXRpb25zW3ZhbGlkYXRlTWV0aG9kXSA9IGFyZ3MubGVuZ3RoID8gYXJnc1swXSA6IHRydWU7XG4gICAgICByZXR1cm4gdmFsaWRhdGlvbnM7XG4gICAgfSwge30pO1xuXG4gIH1cblxuICByZXR1cm4gdmFsaWRhdGlvbnMgfHwge307XG5cbn07XG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIF92YWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgIF9pc1JlcXVpcmVkOiBmYWxzZSxcbiAgICAgIF9pc1ZhbGlkOiB0cnVlLFxuICAgICAgX2lzUHJpc3RpbmU6IHRydWUsXG4gICAgICBfcHJpc3RpbmVWYWx1ZTogdGhpcy5wcm9wcy52YWx1ZSxcbiAgICAgIF92YWxpZGF0aW9uRXJyb3I6ICcnLFxuICAgICAgX2V4dGVybmFsRXJyb3I6IG51bGxcbiAgICB9O1xuICB9LFxuICBnZXREZWZhdWx0UHJvcHM6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdmFsaWRhdGlvbkVycm9yOiAnJyxcbiAgICAgIHZhbGlkYXRpb25FcnJvcnM6IHt9XG4gICAgfTtcbiAgfSxcbiAgY29tcG9uZW50V2lsbE1vdW50OiBmdW5jdGlvbiAoKSB7XG5cbiAgICB2YXIgY29uZmlndXJlID0gZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5zZXRWYWxpZGF0aW9ucyh0aGlzLnByb3BzLnZhbGlkYXRpb25zLCB0aGlzLnByb3BzLnJlcXVpcmVkKTtcbiAgICAgIHRoaXMucHJvcHMuX2F0dGFjaFRvRm9ybSh0aGlzKTtcbiAgICB9LmJpbmQodGhpcyk7XG5cbiAgICBpZiAoIXRoaXMucHJvcHMubmFtZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGb3JtIElucHV0IHJlcXVpcmVzIGEgbmFtZSBwcm9wZXJ0eSB3aGVuIHVzZWQnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMucHJvcHMuX2F0dGFjaFRvRm9ybSkge1xuICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNNb3VudGVkKCkpIHJldHVybjtcbiAgICAgICAgaWYgKCF0aGlzLnByb3BzLl9hdHRhY2hUb0Zvcm0pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gTWl4aW4gcmVxdWlyZXMgY29tcG9uZW50IHRvIGJlIG5lc3RlZCBpbiBhIEZvcm0nKTtcbiAgICAgICAgfVxuICAgICAgICBjb25maWd1cmUoKTtcbiAgICAgIH0uYmluZCh0aGlzKSwgMCk7XG4gICAgfVxuICAgIGNvbmZpZ3VyZSgpO1xuXG4gIH0sXG5cbiAgLy8gV2UgaGF2ZSB0byBtYWtlIHRoZSB2YWxpZGF0ZSBtZXRob2QgaXMga2VwdCB3aGVuIG5ldyBwcm9wcyBhcmUgYWRkZWRcbiAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wczogZnVuY3Rpb24gKG5leHRQcm9wcykge1xuICAgIHRoaXMuc2V0VmFsaWRhdGlvbnMobmV4dFByb3BzLnZhbGlkYXRpb25zLCBuZXh0UHJvcHMucmVxdWlyZWQpO1xuICB9LFxuXG4gIGNvbXBvbmVudERpZFVwZGF0ZTogZnVuY3Rpb24gKHByZXZQcm9wcywgcHJldlN0YXRlKSB7XG5cbiAgICB2YXIgaXNWYWx1ZUNoYW5nZWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICBcbiAgICAgIHJldHVybiB0aGlzLnByb3BzLnZhbHVlICE9PSBwcmV2UHJvcHMudmFsdWUgJiYgdGhpcy5zdGF0ZS5fdmFsdWUgPT09IHByZXZQcm9wcy52YWx1ZTtcblxuICAgIH0uYmluZCh0aGlzKTtcblxuXG4gICAgLy8gSWYgdmFsaWRhdGlvbnMgaGFzIGNoYW5nZWQgb3Igc29tZXRoaW5nIG91dHNpZGUgY2hhbmdlcyBcbiAgICAvLyB0aGUgdmFsdWUsIHNldCB0aGUgdmFsdWUgYWdhaW4gcnVubmluZyBhIHZhbGlkYXRpb25cbiAgICBpZiAoaXNWYWx1ZUNoYW5nZWQoKSkge1xuICAgICAgdGhpcy5zZXRWYWx1ZSh0aGlzLnByb3BzLnZhbHVlKTtcbiAgICB9XG4gIH0sXG5cbiAgLy8gRGV0YWNoIGl0IHdoZW4gY29tcG9uZW50IHVubW91bnRzXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50OiBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5wcm9wcy5fZGV0YWNoRnJvbUZvcm0odGhpcyk7XG4gIH0sXG5cbiAgc2V0VmFsaWRhdGlvbnM6IGZ1bmN0aW9uICh2YWxpZGF0aW9ucywgcmVxdWlyZWQpIHtcblxuICAgIC8vIEFkZCB2YWxpZGF0aW9ucyB0byB0aGUgc3RvcmUgaXRzZWxmIGFzIHRoZSBwcm9wcyBvYmplY3QgY2FuIG5vdCBiZSBtb2RpZmllZFxuICAgIHRoaXMuX3ZhbGlkYXRpb25zID0gY29udmVydFZhbGlkYXRpb25zVG9PYmplY3QodmFsaWRhdGlvbnMpIHx8IHt9O1xuICAgIHRoaXMuX3JlcXVpcmVkVmFsaWRhdGlvbnMgPSByZXF1aXJlZCA9PT0gdHJ1ZSA/IHtpc0RlZmF1bHRSZXF1aXJlZFZhbHVlOiB0cnVlfSA6IGNvbnZlcnRWYWxpZGF0aW9uc1RvT2JqZWN0KHJlcXVpcmVkKTtcblxuICB9LFxuXG4gIC8vIFdlIHZhbGlkYXRlIGFmdGVyIHRoZSB2YWx1ZSBoYXMgYmVlbiBzZXRcbiAgc2V0VmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgX3ZhbHVlOiB2YWx1ZSxcbiAgICAgIF9pc1ByaXN0aW5lOiBmYWxzZVxuICAgIH0sIGZ1bmN0aW9uICgpIHtcbiAgICAgIHRoaXMucHJvcHMuX3ZhbGlkYXRlKHRoaXMpO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH0sXG4gIHJlc2V0VmFsdWU6IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIF92YWx1ZTogdGhpcy5zdGF0ZS5fcHJpc3RpbmVWYWx1ZSxcbiAgICAgIF9pc1ByaXN0aW5lOiB0cnVlXG4gICAgfSwgZnVuY3Rpb24gKCkge1xuICAgICAgdGhpcy5wcm9wcy5fdmFsaWRhdGUodGhpcyk7XG4gICAgfSk7XG4gIH0sXG4gIGdldFZhbHVlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX3ZhbHVlO1xuICB9LFxuICBoYXNWYWx1ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl92YWx1ZSAhPT0gJyc7XG4gIH0sXG4gIGdldEVycm9yTWVzc2FnZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhdGhpcy5pc1ZhbGlkKCkgfHwgdGhpcy5zaG93UmVxdWlyZWQoKSA/ICh0aGlzLnN0YXRlLl9leHRlcm5hbEVycm9yIHx8IHRoaXMuc3RhdGUuX3ZhbGlkYXRpb25FcnJvcikgOiBudWxsO1xuICB9LFxuICBpc0Zvcm1EaXNhYmxlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLl9pc0Zvcm1EaXNhYmxlZCgpO1xuICB9LFxuICBpc1ZhbGlkOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdGUuX2lzVmFsaWQ7XG4gIH0sXG4gIGlzUHJpc3RpbmU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcy5zdGF0ZS5faXNQcmlzdGluZTtcbiAgfSxcbiAgaXNSZXF1aXJlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAhIXRoaXMucHJvcHMucmVxdWlyZWQ7XG4gIH0sXG4gIHNob3dSZXF1aXJlZDogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB0aGlzLnN0YXRlLl9pc1JlcXVpcmVkO1xuICB9LFxuICBzaG93RXJyb3I6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gIXRoaXMuc2hvd1JlcXVpcmVkKCkgJiYgIXRoaXMuaXNWYWxpZCgpO1xuICB9LFxuICBpc1ZhbGlkVmFsdWU6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgIHJldHVybiB0aGlzLnByb3BzLl9pc1ZhbGlkVmFsdWUuY2FsbChudWxsLCB0aGlzLCB2YWx1ZSk7XG4gIH1cbn07XG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vfi9mb3Jtc3ktcmVhY3Qvc3JjL01peGluLmpzXG4gKiogbW9kdWxlIGlkID0gMTc1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9