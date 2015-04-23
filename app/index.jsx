var React = require('react')
  , Router = require('react-router')

var TestForm = require('./components/TestForm.jsx')

require('./styles/index.scss')

var App = React.createClass({
  render() {
    return (
      <main className="app">
        <Router.RouteHandler {...this.props} />
      </main>
    )
  }
});

var routes = (
  <Router.Route name="app" path="/" handler={App}>
    <Router.DefaultRoute handler={TestForm} />
  </Router.Route>
);

Router.run(routes, Router.HistoryLocation, (Handler, state) => {
  React.render(<Handler/>, document.body);
})