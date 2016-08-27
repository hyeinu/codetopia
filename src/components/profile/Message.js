import React, { Component } from 'react';
import Moment from 'moment'
import '../../css/style.css'

export default class Message extends Component {
  render(){
    let { message } = this.props;
    let { user_from, timestamp } = message;
    let { _id, username } = user_from
    let messageText = message.message;

    return (
      <div className="divPad">
        <b>{username} @ {Moment(timestamp).format('lll')}</b>
        <p>{messageText}</p>
        <hr />
      </div>
    )
  }

}
