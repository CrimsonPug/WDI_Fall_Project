import React, { Component } from 'react';
import { Link } from 'react-router';
import axios from 'axios';

//Component that gets mounted when a user searches for a specific user by name.

class SpecificUser extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            searchName: '',
            userResult: [],
            skillList: []
        }
        this.takeClick = this.takeClick.bind(this);
    }

    takeClick(target) {
        localStorage.setItem('userSearch', target);
    }

    componentDidMount() {
        const userList = [];
        axios.get('/specificUser/' + this.props.submission).then((res) => {
            userList.push(res.data);
            this.setState({
                userResult: userList,
                loading: false
            })
            console.log(userList);
        })
    }

    componentWillMount() {
        this.setState({
            searchName: this.props.submission
        })
    }

    render() {
        const userArr = this.state.userResult;
        if (this.state.loading) {
            return <div className="progress container">
                <div className="indeterminate"></div>
            </div>
        }
        else {
            return (
                <div className="container">
                    <h2>Search Results</h2>

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

export default SpecificUser;