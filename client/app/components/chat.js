import React from 'react';
import {getUserProfile, getMessages, sendMessage} from '../server';

export default class Chat extends React.Component{

  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = {
      contents: []
    }
  }

  refresh() {
    getMessages(5, (messages) => {
      this.setState(messages);
    });
  }

  sendMessage(userid, recipientid, message) {
    sendMessage(userid, recipientid, message, () => {
      this.refresh();
    });
  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    var messages = this.state.messages ? this.state.messages : [];
    return(
      <div>
        {messages.map((message) =>{
          return(
            <div>
            {message.sender}
            {message.recipient}
            {message.date}
            {message.contents}
            </div>
          )}
        )}
      </div>
    )
  }
}
