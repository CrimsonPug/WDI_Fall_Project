import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

//Handles all the other components, and has the top nav bar.

class App extends Component {
  constructor() {
    super();
    this.state = {
      submission: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.logOut = this.logOut.bind(this);
  }

  handleChange(e) {
    this.setState({
      submission: e.target.value
    })
  }

  logOut() {
    localStorage.removeItem('username');
    localStorage.removeItem('authToken');
    window.location = "http://localhost:3000/";
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {

    let loginMessage;
    if (localStorage.username != null || localStorage.username != undefined) {
      loginMessage = (
        <div>
          <p>Logged in as <a href="http://localhost:3000/account">{localStorage.username}</a>  <a onClick={this.logOut}>Logout</a></p>
        </div>
      )
    }
    else {
      loginMessage = (
        <div>
          <p>Welcome guest!</p>
        </div>
      )
    }

    return (
      <div>

        <div className="searchBar row valign-wrapper">
          <div className="input-field col s10 valign">
            <form className="inlinetest" onSubmit={this.handleSubmit}>
              <div className="row valign-wrapper">
                <div className="col s3 valign">
                  <input type="text" name="submission" placeholder="Search for a game or user" onChange={this.handleChange} />
                </div>
                <div className="col s9 valign">
                  <p>
                    <Link className="linkPad" to="/search/">Game Search</Link>
                    <Link className="linkPad" to="/specificUser/">User Search</Link>
                    <Link className="linkPad" to="/login">Login</Link>
                    <Link className="linkPad" to="/register">Register</Link>
                    <Link className="linkPad" to="/">Home</Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
          <div className="col s2">
            {loginMessage}
          </div>
        </div>
        <div className="childSpacer">
          {React.cloneElement(this.props.children, { submission: this.state.submission }, { handleClick: this.handleClick })}
        </div>
      </div>
    )
  }
}

export default App;