import React, { Component } from 'react';
import { Link } from 'react-router';
import './App.css';

//Handles all the other components, and has the top nav bar.
//2016/12/07  ADDED REF TO SEARCHBAR AND ADDED FORM CLEAR TO THE SUBMISSION FUNCTION.

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
    window.location = "/";
  }

  handleSubmit(e) {
    e.preventDefault();
    this.refs.searchBar.value = '';
  }

  render() {

    let loginMessage;
    if (localStorage.username != null || localStorage.username != undefined) {
      loginMessage = (
        <div>
          <p>Logged in as <a href="/account">{localStorage.username}</a>&nbsp;&nbsp;&nbsp;&nbsp;<a className="linkPad" onClick={this.logOut}>LOGOUT</a></p>
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
      <div className="App">
        <div className="searchBar row valign-wrapper">
          <div className="input-field col s10 valign">
            <form className="inlinetest" onSubmit={this.handleSubmit}>
              <div className="row valign-wrapper">
                <div className="col s1">
                  <Link className="linkPad" to="/">LFG</Link>
                </div>
                <div className="col s3 searchForm">
                  <input type="text" name="submission" ref="searchBar" placeholder="Search for a game or user" onChange={this.handleChange} />
                </div>
                <div className="col s8 valign">
                  <p>
                    <Link className="linkPad" to="/search/">GAMES</Link>
                    <Link className="linkPad" to="/specificUser/">USERS</Link>
                    <Link className="linkPad" to="/login">LOGIN</Link>
                    <Link className="linkPad" to="/register">REGISTER</Link>
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