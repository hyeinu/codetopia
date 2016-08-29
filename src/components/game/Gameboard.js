import React, { Component } from 'react';

import GameStore from '../../stores/GameStore'
import UserStore from '../../stores/UserStore'
import GameActions from '../../actions/GameActions'
import GameView from './GameView'
import ScoreBoard from './ScoreBoard'

export default class Gameboard extends Component {
  constructor(props){
    super(props)
    this.state = {
      profile: UserStore.get(),
      game_questions: {},
      gamestate: null
    }
    this._onChange = this._onChange.bind(this)
  }
  componentDidMount(){
    GameStore.startListening(this._onChange)
    let id = this.state.profile._id
    GameActions.getFacts(id)
  }
  componentWillUnmount(){
    GameStore.stopListening(this._onChange)
  }
  _onChange(){
    this.setState({
      game_questions: GameStore.get(),
      gamestate: GameStore.getstate()
    });
  }
  _cleargame(){
    GameActions.clearScore()
  }
  _newgame(){
    GameActions.startGame()
  }
  render() {
    if(!this.state.gamestate){
      return(
        <div>
          <button onClick={this._newgame} className="btn btn-info center-block">Start Game</button>
        </div>
      )
    } else {
      let { game_questions } = this.state;
      let Questions = []
      let Gameviews
      for(let key in game_questions){
        let questionObj = {}
        questionObj.question = game_questions[key];
        questionObj.key = key;
        Questions.push(questionObj)
      }

      if(!Questions.length){
        Gameviews = (
          <div>
          <h1>Game Over</h1>
          <button onClick={this._cleargame} className="btn btn-success text-center">Start Over</button>
          </div>
        )
      } else {
        Gameviews = (
          <GameView game_questions={Questions} />
        )
      }
      return (
        <div>
          <div className="col-xs-10">
            {Gameviews}
          </div>
          <div className="col-xs-2">
            <ScoreBoard />
          </div>
        </div>
      )
    }
  }
}
