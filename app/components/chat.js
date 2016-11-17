import React from 'react';
import {getUserProfile} from '../server';
import {Link} from 'react-router';

// var app = require('express')();
// var server = require('http').Server(app);
// var io = require('socket.io')(server);
//
// server.listen(8080);
//
// app.get('/', function (req, res) {
//   res.sendfile(__dirname + '/index.html');
// });
//
// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

export default class Chat extends React.Component{

  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = props.data
  }

  render() {

    var user = getUserProfile(5);
    var other = getUserProfile(5);
    return (
      <div className="panel panel-default">
        <div className="panel-heading chat-head">
          {"Chatting with: " + other.username}
        </div>
        <div className="panel-body chat-body">
        </div>
        <div className="panel-footer chat-foot">
          <textarea className="form-control" rows="1" resize="none" placeholder="send a message..."/>
        </div>
      </div>
    )
  }
}
