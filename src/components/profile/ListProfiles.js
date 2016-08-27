import React, { Component } from 'react';
import { Link } from 'react-router';
import ProfileStore from '../../stores/ProfileStore'
import UserStore from '../../stores/UserStore'
import UserActions from '../../actions/UserActions'
import '../../css/style.css'

export default class ListProfiles extends Component {
  constructor(){
    super()
    this.state = {
      profiles: UserActions.getAllProfiles(),
      user_profile: UserStore.get()
    }
    this._onChange = this._onChange.bind(this)
  }

  componentDidMount(){
    ProfileStore.startListening(this._onChange)
  }
  componentWillUnmount(){
    ProfileStore.stopListening(this._onChange)
  }
  _onChange(){
    this.setState({profiles: ProfileStore.getAll()})
  }
  render(){
    let profiles
    if(!this.state.profiles){
      profiles = ( <h2> Loading...</h2>)
    } else{
      profiles = this.state.profiles.map(profile => {
        if(!this.state.user_profile){
          return (
            <div className="col-xs-3" key={profile._id}>
            <Link to={`/profile/${profile._id}`}>
            <img src={profile.pic_url} className="profHeight img-responsive img-rounded"/>
            <h3>{profile.username}</h3>
            <hr />
            </Link>
            </div>
          )
        }
        if(this.state.user_profile._id === profile._id){
          return <p key={profile._id}></p>
        }
        return (
          <div className="col-xs-3" key={profile._id}>
          <Link to={`/profile/${profile._id}`}>
          <img src={profile.pic_url} className="profHeight img-responsive img-rounded"/>
          <h3>{profile.username}</h3>
          <hr />
          </Link>
          </div>
        )
      })
    }
    return(
      <div>
      <h1>Profile List</h1>
      {profiles}
      </div>
    )
  }
}
