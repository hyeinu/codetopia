import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import Layout from './components/Layout'
import Splash from './components/Splash'
import RegisterPage from './components/register/RegisterPage'
import LoginPage from './components/login/LoginPage'
import ProfilePage from './components/profile/ProfilePage'
import MyProfilePage from './components/profile/MyProfilePage'
import ListProfiles from './components/profile/ListProfiles'
import UserStore from './stores/UserStore'

render(
  <Router history={browserHistory}>
    <Route path='/' component={Layout}>
      <IndexRoute component={Splash}></IndexRoute>
      <Route path='register' component={RegisterPage}></Route>
      <Route path='login' component={LoginPage}></Route>
      <Route path='profiles' component={ListProfiles}></Route>
      <Route path='profile/:id' component={ProfilePage}></Route>
      <Route path='myprofile/:id' component={MyProfilePage}></Route>
    </Route>
  </Router>,
  document.getElementById('root')
);
