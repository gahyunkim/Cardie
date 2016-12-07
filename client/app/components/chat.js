import React from 'react';
import {Link} from 'react-router';
import {getMessages, sendMessage} from '../server';

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
    getMessages("000000000000000000000005", (messages) => {
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
      <div className="row">
        <div className="panel panel-default">
          <div className="panel panel-heading">
            Messages
          </div>
          <div className="panel panel-body">
            <div className="row">
              <table>
                <tbody>
                  <tr>
                    <td> Date </td>
                    <td> From </td>
                    <td> To </td>
                    <td width="80%"> Contents </td>
                  </tr>
                  {messages.map((message) => {
                    return (
                      <tr>
                      <td> {message.date} </td>
                      <td> {message.sender} </td>
                      <td> {message.recipient}</td>
                      <td> {message.contents} </td>
                      </tr>
                    )}
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="panel panel-footer">
            <Link to={"user/" + this.props.user + "/messages/send"}>
              <button type="button" className="btn btn-default chat-btn">
                Send a Message!
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}
