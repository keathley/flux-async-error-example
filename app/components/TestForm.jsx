var React = require('react')
  , Formsy = require('formsy-react')

var TestInput = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState() {
    return { showErrors: false }
  },
  changeValue: function(event) {
    this.setValue(event.currentTarget.value);
  },
  handleChange(event) {
    this.setValue(event.target.value)
  },
  handleBlur() {
    this.setState({ showErrors: true })
  },
  handleFocus() {
    if (!this.isPristine() && !this.showErrors())
      this.setState({ showErrors: false })
  },
  orEmpty(str) {
    return str ? str : ''
  },
  render() {
    var className = this.orEmpty(this.props.className)  + ' '  + (this.showRequired() ? 'required' : this.showError() ? 'error' : null)
    var errorMessage = this.state.showErrors ? this.getErrorMessage() : ''

    return (
      <div className={'form-group' + className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input type={this.props.type || 'text'}
               name={this.props.name}
               value={this.getValue()}
               onChange={this.handleChange}
               onBlur={this.handleBlur}
               onFocus={this.handleFocus} />
        <span className='validation-error'>{errorMessage}</span>
      </div>
    )
  }
});

var TestForm = React.createClass({
  getInitialState() {
    return { canSubmit: false }
  },
  handleSubmit(data) {
    console.log(data)
  },
  enableButton: function() {
    this.setState({ canSubmit: true })
  },
  disableButton: function() {
    this.setState({ canSubmit: false })
  },
  render: function() {
    var disabled = !this.state.canSubmit

    return (
      <Formsy.Form onSubmit={this.handleSubmit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}>
        <TestInput name="name"
                   title="Name"
                   required />
        <TestInput name="email"
                   title="Email"
                   validations="isEmail"
                   validationError="This is not a valid email"
                   required />
        <button type="submit" disabled={disabled}>
          Test Submit
        </button>
      </Formsy.Form>
    );
  }
});

module.exports = TestForm;
