import API from '../API'

const UserActions = {
  login: API.login,
  register: API.register,
  editProf: API.editProf,
  getProfile: API.getProfile,
  logout: API.logout
}

export default UserActions;
