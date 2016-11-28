import React, { Component } from 'react';
import axios from 'axios';

class Register extends Component {
  constructor() {
    super();
    this.state = { username: null, password: null, userbio: null, age: null };

    this.formSubmit = this.formSubmit.bind(this);
    this.txtFieldChange = this.txtFieldChange.bind(this);
  }

  formSubmit(e) {
    e.preventDefault();
    axios
      .post('http://localhost:8888/encrypt', this.state)
      .then((res) => {
        console.log(res);
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
    else if(e.target.name === "userbio"){
      this.setState({
        userbio: e.target.value
      });
    }
    else if(e.target.name === "age"){
      this.setState({
        age: e.target.value
      });
    }
  }

  render() {
    return (
      <div>
        <h3>Registration Form</h3>
        <form onSubmit={this.formSubmit}>
          <div className="form-group">
            <input
              onChange={this.txtFieldChange}
              className="form-control"
              type="text"
              placeholder="Username"
              name="username" />
          </div>
          <div className="form-group">
            <input
              onChange={this.txtFieldChange}
              className="form-control"
              type="password"
              placeholder="Password"
              name="password" />
          </div>
          <div className="form-group">
            <input
              onChange={this.txtFieldChange}
              className="form-control"
              type="text"
              placeholder="Write a short bio about yourself"
              name="userbio" />
          </div>
          <div className="form-group">
            <input
              onChange={this.txtFieldChange}
              className="form-control"
              type="text"
              placeholder="Age"
              name="age" />
          </div>
          <div className="form-group">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;