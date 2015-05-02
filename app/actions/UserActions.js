var Reflux = require('reflux')

var userActions = Reflux.createActions([
  'updateProfile',
  'updateProfileFailed',
  'updateProfileCompleted'
]);

userActions.updateProfile.listen(function(newProfile) {
  setTimeout( (updateAPICall).bind(this), 1000 )

  function updateAPICall() {
    console.log('loaded')
    if (newProfile.email === 'taken@carbonfive.com') {
      userActions.updateProfileFailed({email: 'Email has been taken'})
    } else {
      newProfile.errors = {}
      userActions.updateProfileCompleted(newProfile)
    }
  }
})

module.exports = userActions
