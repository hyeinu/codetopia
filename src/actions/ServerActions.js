import AppDispatcher from '../AppDispatcher'
import Constants from '../Constants'

const ServerActions = {
  receiveProfile(profile){
    AppDispatcher.dispatch({
      type: Constants.RECEIVE_PROFILE,
      profile
    })
  },
  removeProfile(){
    AppDispatcher.dispatch({
      type: Constants.REMOVE_PROFILE
    })
  },
  receiveAllProfiles(profiles){
    AppDispatcher.dispatch({
      type: Constants.RECEIVE_PROFILES,
      profiles
    })
  }
}

export default ServerActions;
