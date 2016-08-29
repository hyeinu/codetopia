import React, { Component } from 'react';
import UserStore from '../../stores/UserStore'
import UserActions from '../../actions/UserActions'
import GameActions from '../../actions/GameActions'
import ProfileForm from './ProfileForm'
import FactForm from './FactForm'
import MessageList from './MessageList'

export default class ProfilePage extends Component {
  constructor(){
    super();
    this.state = {
      profile: UserActions.getProfile(),
      facts: [],
      showModal: false
    }
    this.closeModal = this.closeModal.bind(this);
    this.showModal = this.showModal.bind(this);
    this._onChange = this._onChange.bind(this);
  }
  componentDidMount(){
    UserStore.startListening(this._onChange)
    GameActions.getAllFacts(this.props.params.id)
  }
  componentWillUnmount(){
    UserStore.stopListening(this._onChange)
  }
  _onChange(){
    this.setState({profile: UserStore.get()})
    this.setState({facts: UserStore.getFacts()})
  }
  showModal(){
    this.setState({showModal: true})
  }
  closeModal(){
    this.setState({showModal: false})
  }
  render(){
    let { facts } = this.state
    let id = this.props.params.id
    let factLi
    if(!facts){
      factLi = <div></div>
    } else {
      factLi = (
        facts.map((fact, index) => {
          return <li key={index}>{fact}</li>
        })
      )
    }
    if(this.state.profile){
      let { username, pic_url, email, bio, friends, messages } = this.state.profile
      return(
        <div className="row">
          <div className="col-md-3">
            <img className="img-responsive img-rounded center-block" src={pic_url} />
            <br />
            <button onClick={this.showModal} className="btn btn-primary form-control">Edit</button>

          </div>
          <div className="col-md-4">
            <h1>{username}</h1>
            <h3>Bio:</h3> <h4>{bio}</h4>
            <FactForm id={id}/>
            <br />
            <ul>
              {factLi}
            </ul>
          </div>
          <div className="col-md-5">
            <MessageList messages={messages}/>
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
