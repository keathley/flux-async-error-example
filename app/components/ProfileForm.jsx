var React = require('react')
  , Reflux = require('reflux')
  , Formsy = require('formsy-react')

var InputField = require('./InputField.jsx')

var UserActions = require('../actions/UserActions')
var UserStore = require('../stores/UserStore')

var ProfileForm = React.createClass({
  mixins: [Reflux.connect(UserStore, 'user')],
  getInitialState() {
    return { canSubmit: false }
  },
  handleSubmit(data) {
    UserActions.updateProfile(data)
  },
  enableButton() {
    this.setState({ canSubmit: true })
  },
  disableButton() {
    this.setState({ canSubmit: false })
  },
  render() {
    var disabled = !this.state.canSubmit
    var user = this.state.user || {}
    var name = user.name
    var email = user.email
    var errors = user.errors

    console.log(user)

    return (
      <section className="group">
        <Formsy.Form onSubmit={this.handleSubmit}
                     onValid={this.enableButton}
                     onInvalid={this.disableButton}>
          <InputField name="name"
                     title="Name"
                     value={name}
                     errors={errors['name']}
                     required />
          <InputField name="email"
                     title="Email"
                     value={email}
                     validations="isEmail"
                     validationError="This is not a valid email"
                     errors={errors['email']}
                     required />
          <button type="submit" disabled={disabled}>
            Test Submit
          </button>
        </Formsy.Form>
      </section>
    );
  }
});

module.exports = ProfileForm;
