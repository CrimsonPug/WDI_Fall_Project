import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

//The public page for a user, able to leave comments here as well as delete them if you're the owner of the comment.

class UserProfile extends Component {
    constructor() {
        super();
        this.state = {
            loading: true,
            userBio: '',
            age: '',
            username: '',
            skillLevel: 'Casual',
            targetComment: '',
            profileInfo: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(tar) {
        axios.delete('http://localhost:8888/deleteComment/' + tar + ',' + localStorage.username)
    }

    textChange(e) {
        this.setState({
            comment: e.target.value
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
        axios.post('http://localhost:8888/leaveComment', this.state).then((res) => {
            this.setState({
                profileInfo: res.data.profileInfo
            })
        })
    }

    componentDidMount() {
        axios.post('http://localhost:8888/userProfile', this.state).then((res) => {
            this.setState({
                onPage: localStorage.username,
                userId: res.data.user.id,
                userBio: res.data.user.userBio,
                age: res.data.user.age,
                accountCreated: res.data.user.created_at,
                profileInfo: res.data.profileInfo,
                loading: false
            })
        })
    }

    componentWillMount() {
        this.setState({
            username: localStorage.userSearch
        })
    }

    render() {
        let profileInfo = this.state.profileInfo;

        if (this.state.loading) {
            return <div className="progress">
                <div className="indeterminate"></div>
            </div>
        }
        else {
            return (
                <div className="container">
                    <h2>Welcome to {localStorage.userSearch}'s Page!</h2>

                    <div>
                        <h5>About</h5>
                        <p>Age {this.state.age}</p>
                        <p>Member since {this.state.accountCreated.replace(/T.*?Z/, '')}</p>
                        <p>{this.state.userBio}</p>
                    </div>

                    <div>
                        <p>Leave a comment!</p>
                        <form onSubmit={this.handleSubmit}>
                            <input className="gameInput" placeholder="Wanna join up? Leave them your details!" type="text" onChange={this.textChange} onSubmit={this.handleSubmit} />
                        </form>
                    </div>


                    {profileInfo.map((profile) =>
                        <div>
                            <ul className="collection">
                                <li className="collection-item avatar">
                                    <span className="title">From: {profile.sender_id}</span>
                                    <p className="truncate">{profile.comment}</p>
                                    <button onClick={() => { this.handleClick(profile.id) } } >Delete</button>
                                </li>
                            </ul>
                        </div>
                    )}

                </div>
            )
        }
    }
}

export default UserProfile;