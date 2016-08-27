import React, { Component } from 'react';
import ProfileStore from '../../stores/ProfileStore'
import UserActions from '../../actions/UserActions'
import '../../css/style.css'

export default class ListProfiles extends Component {
  constructor(){
    super()
    this.state = {
      profiles: UserActions.getAllProfiles()
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
    return(
      <div>
      <h1>Profile List</h1>
      </div>
    )
  }
}
