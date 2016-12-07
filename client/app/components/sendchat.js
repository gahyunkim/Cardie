import React from 'react';
import {Link} from 'react-router';
import {sendMessage} from '../server'

export default class Chat extends React.Component{

  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = {
      sender: 5,
      recipient: 0,
      date: "",
      contents: ""

    }
  }

  send() {
    sendMessage(this.state.sender, this.state.recipient, this.state.contents, () => {
      this.refresh();
    });
  }

  handleRecipientChange(e) {
    e.preventDefault();
    this.setState({
      sender: this.state.sender,
      recipient: e.target.value,
      date: this.state.date,
      contents: this.state.contents
    });
  }

  handleContentsChange(e) {
    e.preventDefault();
    this.setState({
      sender: this.state.sender,
      recipient: this.state.recipient,
      date: this.state.date,
      contents: e.target.value
    });
  }

  refresh() {

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
    return(
      <div>
        <div className="panel panel-default">
          <div className="panel panel-body">
            <form onSubmit={() => this.send()}>
              <div className="row">
                <div className="col-md-2">
                <Link to={"user/" + this.props.user + "/messages"}>
                  <button className="btn btn-default">
                    Back
                  </button>
                </Link>
                </div>
                <div className="col-md-8">
                <div className="row">
                  <input type="text"
                         className="form-control"
                         placeholder="Recipient"
                         value={this.state.recipient}
                         onChange={(e) => this.handleRecipientChange(e)}/>
                </div>
                <hr/>
                <div className="row">
                  <textarea
                         className="form-control"
                         rows="6"
                         width="100%"
                         placeholder="Contents"
                         value={this.state.recipient}
                         onChange={(e) => this.handleContentsChange(e)}/>
                </div>
                <div className="row">
                  <button className="btn btn-default" type="submit">
                    <input type="submit" value="Send" />
                  </button>
                </div>
                </div>
                <div className="col-md-2">
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}
