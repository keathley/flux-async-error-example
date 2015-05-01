var React = require('react')
  , Formsy = require('formsy-react')

var InputField = require('./InputField.jsx')

var UserActions = require('../actions/UserActions')
var UserStore = require('../stores/UserStore')

var ProfileForm = React.createClass({
  getInitialState() {
    return {
      canSubmit: false,
      user: UserStore.getInitialState()
    }
  },
  handleSubmit(data) {
    UserActions.profileUpdate(data)
  },
  enableButton: function() {
    this.setState({ canSubmit: true })
  },
  disableButton: function() {
    this.setState({ canSubmit: false })
  },
  render: function() {
    var disabled = !this.state.canSubmit
    var user = this.state.user || {}
    var name = user.name
    var email = user.email

    return (
      <Formsy.Form onSubmit={this.handleSubmit}
                   onValid={this.enableButton}
                   onInvalid={this.disableButton}>
        <InputField name="name"
                   title="Name"
                   value={name}
                   required />
        <InputField name="email"
                   title="Email"
                   value={email}
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

module.exports = ProfileForm;
