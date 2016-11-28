import React, { Component } from 'react';
import axios from 'axios';

class UserSearch extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userList: []
    }
  }

  componentDidMount() {
    const userList = [];
    axios.get('http://localhost:8888/search/' + this.props.submission).then((res) => {
      for (let i in res.data) {
        userList.push(res.data[i])
      }
    }).then((res) => {
      this.setState({
        loading: false,
        userList: userList
      })
    })
  }

  render() {
    const userArr = this.state.userList;
    if (this.state.loading) {
      return <div className="progress container">
        <div className="indeterminate"></div>
      </div>
    }
    else {
      return (
        <div className="container">
          <h2>Search Results</h2>

          {userArr.map((user) =>
            <div>
              <ul className="collection">
                <li className="collection-item avatar">
                  <span className="title">{user.username}</span>
                  <p className="truncate">{user.userBio}</p>
                </li>
              </ul>
            </div>
          )}

        </div>
      )
    }
  }
}

export default UserSearch;