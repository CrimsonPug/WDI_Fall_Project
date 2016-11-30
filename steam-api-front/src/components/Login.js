import React, { Component } from 'react';
import axios from 'axios';

//Login component, straight forward.

class Login extends Component {
  constructor() {
    super();
    this.state = { username: null, password: null, warning: 'no-warning', loggedIn: false };

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e) {
    let self = this;
    e.preventDefault();
    axios
      .post('http://localhost:8888/login', this.state)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.authToken = res.data.token;
          localStorage.setItem('username', res.data.username);
          window.location = "http://localhost:3000/";
          self.setState({
            warning: 'no-warning',
            loggedIn: true
          })
        }
        else {
          self.setState({
            warning: ''
          })
        }
      })
      .catch(() => {
        self.setState({
          warning: ''
        })
      })
  }

  txtFieldChange(e) {
    if (e.target.name === "username") {
      this.setState({
        username: e.target.value
      })
    }
    else if (e.target.name === "password") {
      this.setState({
        password: e.target.value
      });
    }
  }

  render() {
    if (this.state.loggedIn === false) {
      return (
        <div id="auth" className="container">
          <div className="row">
            <h3 className="col s12">Login Form</h3>
            <form onSubmit={this.formSubmit}>
              <div className="input-field col s6 xs12">
                <i className="material-icons prefix">perm_identity</i>
                <input
                  onChange={this.txtFieldChange}
                  className="regForm icon_prefix"
                  type="text"
                  placeholder="Username"
                  name="username" />
              </div>
              <div className="input-field col s6 xs12">
                <i className="material-icons prefix">vpn_key</i>
                <input
                  onChange={this.txtFieldChange}
                  className="regForm"
                  type="password"
                  placeholder="Password"
                  name="password" />
              </div>
              <div className="input-field col s12">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
          </div>
        </div>
      )
    }

    else if (this.state.loggedIn === true) {
      return (
        <div>
          <h1> HAVE FUN </h1>
        </div>
      )
    }
  }
}

export default Login;