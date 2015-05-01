var Reflux = require('reflux')

var userActions = require('../actions/UserActions.js')

var UserStore = Reflux.createStore({
  init: function() {
    this.profile = { name: 'chris', email: 'chrisk@carbonfive.com' }
    this.listenTo(userActions.profileUpdate, this.onProfileUpdate)
  },

  getInitialState: function() {
    return this.profile
  },

  onProfileUpdate: function(profile) {
    this.profile = profile
    this.trigger(profile)
  }
})

module.exports = UserStore
