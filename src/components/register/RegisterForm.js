import React, { Component } from 'react';
import UserActions from '../../actions/UserActions'

export default class RegisterForm extends Component {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      password1: '',
      password2: ''
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
    let { username, password1, password2 } = this.state
    if (password1 !== password2){
      this.setState({
        password1: '',
        password2: ''
      })
      return alert('Passwords do not match try again!')
    }
    let user = {
      username,
      password: password1
    }
    UserActions.register(user);
  }
  render() {
    let { username, password1, password2 } = this.state
    return (
      <div>
      <form onSubmit={this._submit}>
        <div className="form-group">
          <label>Username</label>
          <input type="text" className="form-control" placeholder="Username" value={username} data-statekey='username' onChange={this._onInputChange} />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" placeholder="Password" value={password1} data-statekey='password1' onChange={this._onInputChange} />
        </div>
        <div className="form-group">
          <label>Password (again)</label>
          <input type="password" className="form-control" placeholder="Password" value={password2} data-statekey='password2' onChange={this._onInputChange} />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
    </div>
    )
  }
}
