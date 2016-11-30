import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

//Page that holds the account specific stuff, like adding games to a user's account.  Can't be accessed unless the user is validated.

class AccountPage extends Component {
  constructor() {
    super();
    this.state = {
      loading: true,
      userBio: '',
      age: '',
      username: '',
      skillLevel: 'Casual',
      gameName: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.textChange = this.textChange.bind(this);
  }

  textChange(e) {
    this.setState({
      gameName: e.target.value
    })
  }

  handleChange(e, key, payload) {
    e.preventDefault();
    this.setState({
      skillLevel: payload
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:8888/addGame', this.state).then((res) => {
      console.log(res);
    })
  }

  componentDidMount() {
    axios.post('http://localhost:8888/account', this.state).then((res) => {
      this.setState({
        userId: res.data.id,
        userBio: res.data.userBio,
        age: res.data.age,
        accountCreated: res.data.created_at,
        loading: false 
      })
    })
  }

  componentWillMount() {
    this.setState({
      username: localStorage.username,
      token: localStorage.authToken
    })
  }

  render() {

    if (this.state.loading) {
      return <div className="progress">
        <div className="indeterminate"></div>
      </div>
    }
    else {
      return (
        <div className="container">
          <h2>Welcome {localStorage.username}!</h2>

          <div>
            <h5 className="section">About</h5>
            <p>Age: {this.state.age}</p>
            <p>Member since: {this.state.accountCreated.replace(/T.*?Z/, '')}</p>
            <p>{this.state.userBio}</p>
          </div>

          <div>
            <p>Add some games!</p>
            <form onSubmit={this.handleSubmit}>
              <input className="gameInput" type="text" onChange={this.textChange} onSubmit={this.handleSubmit} />


              <div className="input-field col s6">
                <SelectField floatingLabelText={this.state.skillLevel} onChange={this.handleChange}>
                  <MenuItem value={'Casual'} primaryText="Casual" />
                  <MenuItem value={'Intermediate'} primaryText="Intermediate" />
                  <MenuItem value={'Skilled'} primaryText="Skilled" />
                  <MenuItem value={'Hardcore'} primaryText="Hardcore" />
                </SelectField>
              </div>
            </form>

          </div>

        </div>
      )
    }
  }
}

export default AccountPage;