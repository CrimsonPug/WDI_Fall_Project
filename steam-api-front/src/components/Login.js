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
    e.preventDefault();
    let self = this;
    axios
      .post('/login', this.state)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          localStorage.authToken = res.data.token;
          localStorage.setItem('username', res.data.username);
          window.location = "/";
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
    let style = {
      background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("https://ubistatic-a.akamaihd.net/0021/community-intelligence/prod/article/56784c5484c3d.jpg")',
      backgroundColor: '#FFFFFF',
      backgroundSize: 'cover',
      color: '#FFFFFF'
    }
    if (this.state.loggedIn === false) {
      return (

        <div className="JSXWrapper">

          <div style={style} className="jumbotron">
            <h2 className="col s12 center-align">Login Form</h2>
          </div>

          <div id="auth" className="container">
            <div className="row">
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
        </div>
      )
    }

    else if (this.state.loggedIn === true) {
      return (
        <div>
          <h1 className="center-align"> HAVE FUN </h1>
        </div>
      )
    }
  }
}

export default Login;