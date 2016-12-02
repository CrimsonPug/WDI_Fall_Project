import React, { Component } from 'react';
import axios from 'axios';

//Where you register your account, again, straightforward.

class Register extends Component {
  constructor() {
    super();
    this.state = { username: null, password: null, userbio: null, age: null };

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit() {
    axios
      .post('/encrypt', this.state)
      .then((res) => {
        console.log(res);
      })
    window.location = '/login';
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
    else if (e.target.name === "userbio") {
      this.setState({
        userbio: e.target.value
      });
    }
    else if (e.target.name === "age") {
      this.setState({
        age: e.target.value
      });
    }
  }

  render() {
    return (
      <div className="container">
        <div className="row">
        <h3 className="col s12">Registration Form</h3>
          <form onSubmit={this.formSubmit}>
            <div className="input-field col s6">
              <i className="material-icons prefix">perm_identity</i>
              <input
                onChange={this.txtFieldChange}
                className="form-control"
                type="text"
                placeholder="Username"
                name="username" />
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">vpn_key</i>
              <input
                onChange={this.txtFieldChange}
                className="form-control"
                type="password"
                placeholder="Password"
                name="password" />
            </div>
            <div className="input-field col s12">
              <i className="material-icons prefix">subject</i>
              <input
                onChange={this.txtFieldChange}
                className="form-control"
                type="text"
                placeholder="Tell us a bit about yourself!"
                name="userbio" />
            </div>
            <div className="input-field col s6">
              <i className="material-icons prefix">schedule</i>
              <input
                onChange={this.txtFieldChange}
                className="form-control"
                type="text"
                placeholder="Age"
                name="age" />
            </div>
            <div className="input-field col s6">
              <button className="btn btn-primary">Register</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default Register;