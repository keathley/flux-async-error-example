var React = require('react')
  , Formsy = require('formsy-react')

var InputField = React.createClass({
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

module.exports = InputField