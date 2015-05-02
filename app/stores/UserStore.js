var Reflux = require('reflux')

var userActions = require('../actions/UserActions.js')

var UserStore = Reflux.createStore({
  listenables: userActions,

  init: function() {
    this.profile = {
      name: 'chris',
      email: 'chrisk@carbonfive.com',
      errors: {}
    }
  },

  getInitialState: function() {
    return this.profile
  },

  onUpdateProfile: function(profile) {
    console.log(profile)
  },

  onUpdateProfileCompleted: function(newProfile) {
    console.log(newProfile)
    this.profile = newProfile
    this.trigger(this.profile)
  },

  onUpdateProfileFailed: function(errors) {
    console.log(errors);
    this.profile.errors = errors
    this.trigger(this.profile)
  }
})

module.exports = UserStore
