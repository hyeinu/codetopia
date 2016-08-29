import React, { Component } from 'react';
import GameStore from '../../stores/GameStore'

export default class GameView extends Component {
  constructor(props){
    super(props)
    this.state = {
      scores: GameStore.getScores()
    }
    this._onChange = this._onChange.bind(this)
  }
  componentDidMount(){
    GameStore.startListening(this._onChange)
  }
  componentWillUnmount(){
    GameStore.stopListening(this._onChange)
  }
  _onChange(){
    this.setState({
      scores: GameStore.getScores()
    });
  }
  render(){
    let scoreview
    let { scores } = this.state
    let scoreArr = []
    if(!scores){
      scoreview = (<h1>Loading...</h1>)
    } else{
      for(let key in scores){
        scoreArr.push(scores[key])
      }
      scoreview = scoreArr.map((score, index) =>{
        return (
          <h3 key={index}>{score.username} : {score.scores}</h3>
        )
      })
    }
    return(
      <div>
        {scoreview}
      </div>
    )
  }
}
