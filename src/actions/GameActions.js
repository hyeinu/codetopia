import AppDispatcher from '../AppDispatcher'
import axios from 'axios'

const GameActions = {
  addPlayer(){
    AppDispatcher.dispatch({
      type: 'ADD_PLAYER'
    })
  },
  getFacts(id){
    axios.get(`/api/games/${id}/getFacts/`)
      .then(res =>{
        return res.data
      })
      .then(data => {
        AppDispatcher.dispatch({
          type: 'GET_FACTS',
          game_questions: data
        })
        this.addPlayer()
      })
      .catch(console.error)
  },
  getAllFacts(id){
    axios.get(`/api/games/${id}/getAll/`)
      .then(res =>{
        return res.data
      })
      .then(data => {
        AppDispatcher.dispatch({
          type: 'GET_ALL_FACTS',
          data
        })
      })
      .catch(console.error)
  },
  addFact(id, newMsg){
    axios.put(`/api/games/${id}/addFact/`, newMsg)
      .then(()=>{
        this.getAllFacts(id)
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

export default GameActions
