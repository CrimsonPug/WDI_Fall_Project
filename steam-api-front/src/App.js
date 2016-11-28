import React, { Component } from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      submission: ''
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      submission: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div>

        <div className="searchBar">
          <form onSubmit={this.handleSubmit}>
            <input type="text" placeholder="Search" onChange={this.handleChange} />
            <ul>
              <li className="searchLink"><Link to="/search/">Search</Link></li>
              <li className="homeLink"><Link to="/">Home</Link></li>
              <li className="linkOne"><Link to="/login">Login</Link></li>
              <li className="linkTwo"><Link to="/register">Register</Link></li>
            </ul>
          </form>
          <div>
            <p className="userLog">Logged in as <a href="http://localhost:3000/userPage">{localStorage.username}</a></p>
          </div>
        </div>

        {React.cloneElement(this.props.children, { submission: this.state.submission })}
      </div>
    )
  }
}

export default App;