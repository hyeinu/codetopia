import API from '../API'

const UserActions = {
  login: API.login,
  register: API.register,
  editProf: API.editProf,
  getProfile: API.getProfile,
  getThisProfile: API.getThisProfile,
  getAllProfiles: API.getAllProfiles,
  logout: API.logout,
  postMessage(id, newMessage){
    API.postMessage(id, newMessage)
  }
}

export default UserActions;
