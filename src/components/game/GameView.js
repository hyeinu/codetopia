import React, { Component } from 'react';
import GameActions from '../../actions/GameActions'

export default class GameView extends Component {
  removePiece(id, length){
    GameActions.removePiece(id, length)
  }
  render(){
    let questions = this.props.game_questions
    let ques_length = questions.length
    let randomNum = Math.floor(Math.random() * (questions.length))
    let random_fact

    let pieces = questions.map((fact , index) => {
      if(index === randomNum){
        random_fact = fact.question.fact
        return (
          <div className="col-md-4" key={index}>
          <img className="img-responsive img-rounded" key={index} src={fact.question.user_pic} onDoubleClick={this.removePiece.bind(null, fact.key, ques_length)} />
          <h4>{fact.question.username}</h4>
          </div>
        )
      } else{
        return(
          <div className="col-md-4" key={index}>
          <img className="img-responsive img-rounded" src={fact.question.user_pic} onClick='' />
          <h4>{fact.question.username}</h4>
          </div>
        )
      }
    })
    return(
      <div>
        <h1 className='text-center'>{random_fact}</h1>
        {pieces}
      </div>
    )
  }
}
