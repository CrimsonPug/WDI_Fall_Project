import React, { Component } from 'react';
import axios from 'axios';
import { Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle, OverlayTrigger, Button } from 'react-bootstrap';

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
            showModal: false,
            modalComment: '',
            profileInfo: [],
            currentComment: null
        }
        this.editHandler = this.editHandler.bind(this);
        this.modalText = this.modalText.bind(this);
        this.modalOpen = this.modalOpen.bind(this);
        this.modalClose = this.modalClose.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.textChange = this.textChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    modalClose() {
        this.setState({
            showModal: false
        })
    }

    modalOpen(currentComment) {
        console.log(currentComment);
        this.setState({
            showModal: true,
            currentComment: currentComment
        })
    }

    handleClick(tar) {
        let confirm = window.confirm('You sure you want to delete this comment?');
        if (confirm) {
            axios.delete('http://localhost:8888/deleteComment/' + tar + ',' + localStorage.username);
            window.location = "http://localhost:3000/user/";
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

    editHandler(tar) {
        console.log(tar);
        axios.put('http://localhost:8888/editComment/', this.state);
        window.location = "http://localhost:3000/user/";
    }

    modalText(e) {
        this.setState({
            modalComment: e.target.value
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
        console.log(profileInfo);
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


                        {profileInfo.map((profile, i) =>
                            <div key={i}>
                                <ul className="collection">
                                    <li className="collection-item avatar">
                                        <img role="presentation" src="http://www.conquerthewallmarathon.com/wp-content/uploads/2014/05/generic-user-icon.jpg" className="circle" />
                                        <span className="title">From: {profile.sender_id}</span>
                                        <p className="truncate">{profile.comment}</p>
                                        {this.state.onPage === profile.sender_id ? <button className="btn danger waves-effect waves-light right-align" onClick={() => { this.handleClick(profile.id) } } ><i className="material-icons">delete</i>Delete</button> : null}
                                        {this.state.onPage === profile.sender_id ? <button className="btn waves-effect waves-light right-align" onClick={()=> {this.modalOpen(profile.id) }}>edit</button> : null }
                                    </li>
                                </ul>
                            </div>
                        )}
        
                        <Modal show={this.state.showModal} onHide={this.modalClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>COMMENT EDITOR</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <h5>Didn't get it right the first time? No problem.</h5>

                                <form>
                                    <input onChange={this.modalText} type="text" placeholder="Comment here" />
                                </form>                                
                            </Modal.Body>
                            <Modal.Footer>
                                <Button onClick={()=>{this.editHandler(this.state.onPage)}}>Submit</Button>
                                <Button onClick={this.modalClose}>Close</Button>
                            </Modal.Footer>
                        </Modal>

                    </div>
                </div>
            )
        }
    }
}

export default UserProfile;