import React, { Component } from 'react';
import { Modal, Button, FormControl, ControlLabel } from 'react-bootstrap'
import  UserActions  from '../../actions/UserActions'

export default class ProfileForm extends Component {
  constructor(props){
    super(props);
    let { email, bio, pic_url } = this.props.profile
    this.state = {
      email: email,
      bio: bio,
      pic_url: pic_url
    }
    this._onInputChange = this._onInputChange.bind(this);
    this._submit = this._submit.bind(this);
  }
  _onInputChange(e){
    let key = e.target.dataset.statekey;
    let value = e.target.value
    this.setState({[key]: value})
  }
  _submit(e){
    e.preventDefault()
    let newProf = this.state
    UserActions.editProf(newProf)
    this.props.closeModal()
  }
  render(){
    return(
      <Modal bsSize="sm" show={this.props.showModal} onHide={this.props.closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="form-group" onSubmit={this._addAnimal}>
          <label>Email:</label>
          <FormControl onChange={this._onInputChange} value={this.state.email} type="text" placeholder="Email" data-statekey='email' required/>
          <label>Bio:</label>
          <FormControl onChange={this._onInputChange} value={this.state.bio} type="text" placeholder="About You" data-statekey='bio' required componentClass='textarea'/>
          <label>Image:</label>
          <FormControl onChange={this._onInputChange} value={this.state.pic_url} type="text" placeholder="Image Url" data-statekey='pic_url' />
          <img src={this.state.pic_url} alt="" className="img-responsive img-rounded center-block"/>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-success" onClick={this._submit}>Edit</Button>
          <Button onClick={this.props.closeModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    )
  }
}
