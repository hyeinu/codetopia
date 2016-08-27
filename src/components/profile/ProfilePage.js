import React, { Component } from 'react';
import UserStore from '../../stores/UserStore'
import UserActions from '../../actions/UserActions'
import ProfileForm from './ProfileForm'

export default class ProfilePage extends Component {
  constructor(){
    super();
    this.state = {
      profile: UserActions.getProfile(),
      showModal: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
    UserStore.startListening(this._onChange)
  }
  componentWillUnmount(){
    UserStore.stopListening(this._onChange)
  }
  _onChange(){
    this.setState({profile: UserStore.get()})
  }
  showModal(){
    this.setState({showModal: true})
  }
  closeModal(){
    this.setState({showModal: false})
  }
  render(){
    if(this.state.profile){
      let { username, pic_url, email, bio, friends } = this.state.profile
      return(
        <div className="row">
        <div className="col-xs-3">
        <img className="img-responsive img-rounded center-block" src={pic_url} />
        <br />
        <button onClick={this.showModal} className="btn btn-primary form-control">Edit</button>
        </div>
        <div className="col-xs-9">
          <h1>Username: {username}</h1>
          <h1>Email: {email}</h1>
          <h3>Bio: {bio}</h3>
        </div>
        <ProfileForm showModal={this.state.showModal} closeModal={this.closeModal} profile={this.state.profile} />
        </div>
      )
    } else{
      return(
        <h1>Loading...</h1>
      )
    }


  }
}
