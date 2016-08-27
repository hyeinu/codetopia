import React, { Component } from 'react';
import UserStore from '../../stores/UserStore'
import UserActions from '../../actions/UserActions'
import '../../css/style.css'

export default class MessageForm extends Component {
  constructor(){
    super();
    this.state = {
      message: '',
      profile: UserStore.get()
    }
    this._inputChange = this._inputChange.bind(this)
    this._submit = this._submit.bind(this)
  }
  _inputChange(e){
    this.setState({
      message: e.target.value
    })
  }
  _submit(e){
    let newMessage = {}
    newMessage.message = this.state.message
    newMessage.user_from = this.state.profile._id
    let id = this.props.profileId
    UserActions.postMessage(id, newMessage)
    this.setState({
      message: ''
    })
  }
  render(){
    return(
      <div>
        <h4 className="inph4">Leave a Message:</h4>
        <input className="pInput form-control" type="text" value={this.state.message} onChange={this._inputChange} />
        <button className="btn btn-success form-control" onClick={this._submit}>Submit</button>
      </div>
    )
  }
}
