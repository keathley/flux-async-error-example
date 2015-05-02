var React = require('react')
  , Formsy = require('formsy-react')

var InputField = React.createClass({
  mixins: [Formsy.Mixin],
  getInitialState() {
    return { showErrors: true }
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
    if (!this.isPristine() && !this.showError())
      this.setState({ showErrors: false })
  },
  className() {
    return propClassName(this.props)
      + ' '
      + required(this.showRequired())
      + ' '
      + error(this.showError() || this.props.errors)

    function propClassName(props) {
      return props.className ? props.className : ''
    }

    function required(isRequired) {
      return isRequired ? 'required' : null
    }

    function error(isError) {
      return isError ? 'error' : null
    }
  },
  render() {
    var className = this.className()
    var errorMessage = this.state.showErrors ? this.getErrorMessage() : ''
    var asyncErrors = this.props.errors || ''

    console.log(className)

    return (
      <div className={'form-group' + className}>
        <label htmlFor={this.props.name}>{this.props.title}</label>
        <input type={this.props.type || 'text'}
               name={this.props.name}
               value={this.getValue()}
               onChange={this.handleChange}
               onBlur={this.handleBlur}
               onFocus={this.handleFocus}
               autoComplete='off' />
        <span className='validation-error'>{errorMessage}</span>
        <span className='validation-error'>{asyncErrors}</span>
      </div>
    )
  }
});

module.exports = InputField