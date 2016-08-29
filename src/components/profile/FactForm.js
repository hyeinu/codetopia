import React, { Component } from 'react';
import GameActions from '../../actions/GameActions'
import UserStore from '../../stores/UserStore'
import '../../css/style.css'

export default class FactForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      text: ''
    }
    this.add_fact = this.add_fact.bind(this)
    this._onInputChange = this._onInputChange.bind(this)
  }
  add_fact(e){
    e.preventDefault()
    let newFact = {}
    newFact.fact = this.state.text
    let id = this.props.id
    GameActions.addFact(id, newFact)
    this.setState({text: ''})
  }
  _onInputChange(e){
    this.setState({text: e.target.value})
  }
  render(){
    let { text } = this.state
    return(
      <div>
        <input className="form-control" type="text" value={text} onChange={this._onInputChange}/>
        <br />
        <button onClick={this.add_fact} className="btn btn-primary form-control">Add Facts</button>
      </div>
    )
  }
}
