var React = require('react');
var ProfileForm = require('./ProfileForm.jsx')
  , ProfileDetails = require('./ProfileDetails.jsx')

var Profile = React.createClass({

  render: function() {
    return (
      <div className="profile">
        <ProfileForm />
        <ProfileDetails />
      </div>
    );
  }
});

module.exports = Profile;