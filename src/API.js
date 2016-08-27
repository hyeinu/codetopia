import axios from 'axios'
import RouteActions from './actions/RouteActions'
import UserActions from './actions/UserActions'
import ServerActions from './actions/ServerActions'

const API = {
  register(user){
    axios.post('/api/users/register', user)
      .then(res => {
        RouteActions.route('/login')
      })
      .catch(console.error)
  },
  login(user){
    axios.post('/api/users/login', user)
      .then(() => {
        UserActions.getProfile()
        RouteActions.route('/')
      })
      .catch(console.error)
  },
  getProfile(){
    axios.get('/api/users/profile')
      .then(res => res.data)
      .then(ServerActions.receiveProfile)
      .catch(console.error)
  },
  logout(){
    axios.get('/api/users/logout')
      .then(ServerActions.removeProfile)
      .catch(console.error)
  },
  editProf(newProf){
    axios.put('/api/users/profile', newProf)
      .then(res => res.data)
      .then(ServerActions.receiveProfile)
      .catch(console.error)
  }
}

export default API
