var React = require('react');
var Reflux = require('reflux');

var UserStore = require('../stores/UserStore.js')

var ProfileDetails = React.createClass({
  mixins: [Reflux.connect(UserStore, "user")],
  render: function() {
    var user = this.state.user || {}
    var name = user.name
    var email = user.email

    return (
      <div>
        <dt>
          <span>
            Name
          </span>
        </dt>
        <dd>
          {name}
        </dd>
        <dt>
          <span>
            Email
          </span>
        </dt>
        <dd>
          {email}
        </dd>
      </div>
    );
  }
});

module.exports = ProfileDetails;
