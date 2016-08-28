import AppDispatcher from '../AppDispatcher'
import axios from 'axios'

const ChatActions = {
  createMessage(message){
    AppDispatcher.dispatch({
      type: 'GET_FACTS',
      message
    })
  },
  removeMessage(id){
    AppDispatcher.dispatch({
      type: 'REMOVE_FACT',
      id
    })
  },
  addPlayer(id){
    AppDispatcher.dispatch({
      type: 'ADD_PLAYER',
      id
    })
  },
  getFacts(id){
    axios.get(`/api/users/${id}/getFacts/`)
      .then(res =>{
        return res.data
      })
      .then(data => {
        AppDispatcher.dispatch({
          type: 'GET_FACTS',
          game_questions: data
        })
        this.addPlayer(id)
      })
      .catch(console.error)
  },
  addScore(){
    AppDispatcher.dispatch({
      type: 'ADD_SCORE'
    })
  },
  clearScore(){
    AppDispatcher.dispatch({
      type: 'CLEAR_SCORE'
    })
  },
  removePiece(id){
    AppDispatcher.dispatch({
      type: 'REMOVE_PIECE',
      id
    })
    this.addScore()
  },
  startGame(){
    AppDispatcher.dispatch({
      type: 'START_GAME'
    })
  }
}

export default ChatActions
