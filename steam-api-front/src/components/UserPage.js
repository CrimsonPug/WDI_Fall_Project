import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

//Page that holds the account specific stuff, like adding games to a user's account.  Can't be accessed unless the user is validated.
// 2016/12/07 ADDED BUTTON TO ADD GAME, PLUS SMALL DESCRIPTIVE SECTION. ALSO ADDED REF TO THE FORM, AND A FORM CLEAR.

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
    axios.post('/addGame', this.state).then((res) => {
      console.log('game saved.');
    })
    this.refs.gameAddition.value = '';
  }

  componentDidMount() {
    axios.post('/account', this.state).then((res) => {
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

    let style = {
      backgroundColor: '#FFFFFF',
      background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(\'https://images4.alphacoders.com/681/681185.jpg\')',
      backgroundPositionY: '-10px',
      backgroundRepeat: 'no-repeat',
      color: '#FFFFFF'
    }

    if (this.state.loading) {
      return <div className="progress container valign-wrapper">
        <div className="indeterminate valign"></div>
      </div>
    }
    else {
      return (
        <div className="JSXWrapper">
          <div style={style} className="jumbotron">
            <h2 className="userJumbo">WELCOME {localStorage.username}!</h2>
          </div>
          <div className="container">

            <div>
              <h5 className="section">ABOUT</h5>
              <p>AGE: {this.state.age}</p>
              <p>MEMBER SINCE: {this.state.accountCreated.replace(/T.*?Z/, '')}</p>
              <p>{this.state.userBio}</p>
            </div>

            <div className="row">
              

              <h5>ADD GAMES</h5>
              <p>Try adding a game here, start by typing the name of the game you want to add, then select your skill level in that game.</p>
              <form onSubmit={this.handleSubmit}>
                <input className="gameInput col s6 xs12" type="text" ref="gameAddition" placeholder="Add some games! One at a time please." onChange={this.textChange} onSubmit={this.handleSubmit} />
                
                <div className="input-field col s4 x12 offset-s2">
                  <SelectField floatingLabelText={this.state.skillLevel} onChange={this.handleChange}>
                    <MenuItem value={'Casual'} primaryText="Casual" />
                    <MenuItem value={'Intermediate'} primaryText="Intermediate" />
                    <MenuItem value={'Skilled'} primaryText="Skilled" />
                    <MenuItem value={'Hardcore'} primaryText="Hardcore" />
                  </SelectField>
                </div>

                <button className="callToButtons btn col s6 offset-s6" onClick={this.handleSubmit}>Add Game</button>
              </form>

            </div>
          </div>
        </div>
      )
    }
  }
}

export default AccountPage;