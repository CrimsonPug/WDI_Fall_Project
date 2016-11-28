import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import Index from './components/Index';
import Login from './components/Login';
import Register from './components/Register';
import SearchPage from './components/SearchPage';
import UserPage from './components/UserPage';
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
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
              <Route path="/userPage" component={UserPage} /> 
          </Route>
      </Router>
    </MuiThemeProvider>,
  document.getElementById('root')
);