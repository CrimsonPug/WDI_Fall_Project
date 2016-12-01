import React, { Component } from 'react';
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
        let confirm = window.confirm('You sure you want to delete this comment?');
        if (confirm) {
            axios.delete('http://localhost:8888/deleteComment/' + tar + ',' + localStorage.username)
            window.location = "http://localhost:3000/user/"
        }
        else {
            console.log('Nice try guy!');
        }
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
            console.log(this.state.profileInfo);
        })
    }

    componentWillMount() {
        this.setState({
            username: localStorage.userSearch
        })
    }

    render() {
        let profileInfo = this.state.profileInfo;
        let popUp = (
            <div>
                <a class="waves-effect waves-light btn" href="#modal1">Modal</a>

                <div id="modal1" class="modal">
                    <div class="modal-content">
                        <h4>Modal Header</h4>
                        <p>A bunch of text</p>
                    </div>
                    <div class="modal-footer">
                        <a href="#!" class=" modal-action modal-close waves-effect waves-green btn-flat">Agree</a>
                    </div>
                </div>
            </div>)
        let style = {
            backgroundColor: '#FFFFFF',
            backgroundImage: 'url(\'https://images4.alphacoders.com/681/681185.jpg\')',
            backgroundPositionY: '-10px',
            backgroundRepeat: 'no-repeat'
        }

        if (this.state.loading) {
            return <div className="progress">
                <div className="indeterminate"></div>
            </div>
        }
        else {
            return (

                <div className="JSXWrapper">
                    <div style={style} className="jumbotron">
                        <h2>WELCOME TO {localStorage.userSearch}'s PAGE!</h2>
                    </div>
                    <div className="container">

                        <div>
                            <h5>ABOUT</h5>
                            <p>AGE: {this.state.age}</p>
                            <p>MEMBER SINCE: {this.state.accountCreated.replace(/T.*?Z/, '')}</p>
                            <p>{this.state.userBio}</p>
                        </div>

                        <div>
                            <p>Leave a comment!</p>
                            <form onSubmit={this.handleSubmit}>
                                <input className="gameInput" placeholder="Wanna join up? Leave them your details! (Eg. Steam ID, battle.net tag)" type="text" onChange={this.textChange} onSubmit={this.handleSubmit} />
                            </form>
                        </div>


                        {profileInfo.map((profile) =>
                            <div>
                                <ul className="collection">
                                    <li className="collection-item avatar">
                                        <img src="http://www.conquerthewallmarathon.com/wp-content/uploads/2014/05/generic-user-icon.jpg" className="circle" />
                                        <span className="title">From: {profile.sender_id}</span>
                                        <p className="truncate">{profile.comment}</p>
                                        {this.state.onPage === profile.sender_id ? <button className="btn danger waves-effect waves-light right-align" onClick={() => { this.handleClick(profile.id) } } ><i className="material-icons">delete</i>Delete</button> : null}
                                    </li>
                                </ul>
                            </div>
                        )}

                </div>
            </div>
            )
        }
    }
}

export default UserProfile;