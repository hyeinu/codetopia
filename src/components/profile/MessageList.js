import React, { Component } from 'react';
import Message from './Message'
import '../../css/style.css'

export default class MessageList extends Component {
  render(){
    let { messages } = this.props
    let messageElements
    if(messages){
      messageElements = messages.map((message , index) =>{
        return <Message key={index} message={message} />
      })
    }
    return(
      <div className="messageContainer">
        {messageElements}
      </div>
    )
  }
}
