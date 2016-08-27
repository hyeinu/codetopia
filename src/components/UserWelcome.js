import React, {Component} from 'react';
import { Link } from 'react-router';

export default class UserWelcome extends Component{
  render(){
    let { profile } = this.props;
    if(!profile){
      return (
        <ul className="nav navbar-nav navbar-nav navbar-right">
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/register">Register</Link></li>
        </ul> )
    }
      return (
        <ul className="nav navbar-nav navbar-nav navbar-right">
          <li>
            <Link to={`/profile/${profile._id}`}>
              <i className="glyphicon glyphicon-user"></i>
              Welcome {profile.username}!
            </Link>
          </li>
          <li>
            <a onClick={this.props._logout} style={{cursor: 'pointer'}}>Logout</a>
          </li>
        </ul>
      )
  }
}
