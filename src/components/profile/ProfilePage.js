import React, { Component } from 'react';
import ProfileStore from '../../stores/ProfileStore'
import UserActions from '../../actions/UserActions'
import MessageList from './MessageList'
import MessageForm from './MessageForm'

export default class ProfilePage extends Component {
  constructor(){
    super();

    this.state = {
      profile: ProfileStore.getProfile()
    }
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
    ProfileStore.startListening(this._onChange)
    let id = this.props.params.id
    UserActions.getThisProfile(id)
  }
  componentWillUnmount(){
    ProfileStore.stopListening(this._onChange)
  }
  _onChange(){
    this.setState({profile: ProfileStore.getProfile()})
    console.log('this.state:', this.state)
  }
  render(){
    if(this.state.profile){
      let { username, pic_url, email, bio, friends, messages } = this.state.profile
      return(
        <div className="row">
        <div className="col-md-3">
        <img className="img-responsive img-rounded center-block" src={pic_url} />
        <br />
        </div>
        <div className="col-md-4">
          <h1>{username}</h1>
          <h3>Bio:</h3> <h4>{bio}</h4>
        <MessageForm profileId={this.props.params.id} />
        </div>
        <div className="col-md-5">
        <MessageList messages={messages}/>
        </div>
        </div>
      )
    } else{
      return(
        <h1>Loading...</h1>
      )
    }


  }
}
