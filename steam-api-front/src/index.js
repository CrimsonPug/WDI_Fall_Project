import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import SearchPage from './components/SearchPage';
import AccountPage from './components/UserPage';
import UserSearch from './components/UserSearch';
import SpecificUser from './components/SpecificUser';
import UserProfile from './components/UserProfile';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import App from './App';
import './index.css';

injectTapEventPlugin();

ReactDOM.render(
  <MuiThemeProvider>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Index} />
        <Route path="/search/" component={SearchPage} />
        <Route path="/specificUser/" component={SpecificUser} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/account" component={AccountPage} />
        <Route path="/game/" component={UserSearch} />
        <Route path="/user/" component={UserProfile} />
      </Route>
    </Router>
  </MuiThemeProvider>,
  document.getElementById('root')
);