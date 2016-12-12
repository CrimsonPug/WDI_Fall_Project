import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

//Component that gets mounted when user clicks through game, returns all users who play the specified game.

class UserSearch extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            gameName: '',
            userList: [],
            skillList: []
        }
        this.takeClick = this.takeClick.bind(this);
    }

    takeClick(target) {
        localStorage.setItem('userSearch', target);
    }

    componentDidMount() {
        const userList = [];
        const skillList = [];
        axios.get('/game/' + localStorage.gameName).then((res) => {
            for (let x in res.data) {
                if (x % 2 === 0) {
                    userList.push(res.data[x]);
                }
                else if (x % 2 === 1) {
                    skillList.push(res.data[x]);
                }
            }
        }).then((res) => {
            this.setState({
                loading: false,
                userList: userList,
                skillList: skillList
            })
        })
    }

    componentWillMount() {
        this.setState({
            gameName: localStorage.gameName
        })
    }

    render() {
        const userArr = this.state.userList;
        if (this.state.loading) {
            return <div className="progress valign-wrapper container loader">
                <div className="indeterminate valign"></div>
            </div>
        }
        else {
            return (
                <div className="container">
                    <h2>RESULTS FOR {this.state.gameName}</h2>

                    {userArr.map((user, i) =>
                        <div>
                            <ul className="collection">
                                <li className="collection-item avatar">
                                    <Link to="/user/" onClick={() => { this.takeClick(user.username) } }><span className="title">{user.username}</span></Link>
                                    <p> {this.state.skillList[i]} </p>
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