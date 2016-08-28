import { EventEmitter } from 'events'
import firebase from 'firebase'
import AppDispatcher from '../AppDispatcher'

let _game_questions = {}
let _game_state = null
let _username = null
let _user_key = null
let _user_scores = null
let _score = 0

class GameStore extends EventEmitter{
  constructor(){
    super()
    this.ref = firebase.database().ref('games');
    this.scores = firebase.database().ref('scores')
    this.gamestate = firebase.database().ref('gamestate')
    let user_score

    this.ref.on('value', snap =>{
      _game_questions = snap.val();
      this.emit('CHANGE')
    })

    this.scores.on('value', snap =>{
      _user_scores = snap.val()
      this.emit('CHANGE')
    })

    this.gamestate.on('value', snap =>{
      _game_state = snap.val()
      this.emit('CHANGE')
    })

    AppDispatcher.register(action =>{
      switch(action.type){
        case 'GET_FACTS':
          this.ref.push(action.game_questions)
          _username = action.game_questions.username
          break;
        case 'START_GAME':
          this.scores.remove()
          this.gamestate.push('')
          break;
        case 'REMOVE_FACT':
          this.ref.child(action.id).remove()
          break;
        case 'ADD_PLAYER':
          let userObj = {username: _username, score: 0}
          let player = this.scores.push(userObj)
          _user_key = player.key
          break;
        case 'ADD_SCORE':
          _score += 1;
          let updateObj = {}
          updateObj[_user_key] = {username: _username, scores: _score}
          this.scores.update(updateObj)
          break;
        case 'REMOVE_PIECE':
          this.ref.child(action.id).remove()
          this.emit('CHANGE')
          break;
        case 'CLEAR_SCORE':
          this.scores.remove()
          this.gamestate.remove()
          this.emit('CHANGE')
          break;
      }
    })
  }
  startListening(cb){
    this.on('CHANGE', cb)
  }
  stopListening(cb){
    this.removeListener('CHANGE', cb)
  }
  get(){
    return _game_questions;
  }
  getScores(){
    return _user_scores;
  }
  getstate(){
    return _game_state;
  }
}

export default new GameStore();
