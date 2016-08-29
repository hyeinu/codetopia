import { EventEmitter } from 'events'
import AppDispatcher from '../AppDispatcher'
import UserActions from '../actions/UserActions'
import RouteActions from '../actions/RouteActions'
import Constants from '../Constants'

let _profile = null;
let _facts = [];

class UserStore extends EventEmitter {
  constructor(){
    super();
    AppDispatcher.register(action =>{
      switch(action.type){
        case Constants.RECEIVE_PROFILE:
        _profile = action.profile
        this.emit('Change')
        break;
        case Constants.REMOVE_PROFILE:
        _profile = null
        RouteActions.route('/')
        this.emit('Change')
        break;
        case 'GET_ALL_FACTS':
        _facts = action.data
        this.emit('Change')
        break;
      }
    });

  }
  startListening(cb){
    this.on('Change', cb)
  }
  stopListening(cb){
    this.removeListener('Change', cb)
  }
  get(){
    return _profile
  }
  getFacts(){
    return _facts
  }
}

export default new UserStore();
