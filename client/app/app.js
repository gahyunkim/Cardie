import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/feed';
import Trending from './components/trending';
import User from './components/user';
import ProductManager from './components/productmanager.js';
import Upload from './components/upload';
import Item from './components/item';
import Chat from './components/chat';
import SendChat from './components/sendchat';
import ErrorBanner from './components/errorbanner';
import { IndexRoute, Router, Route, hashHistory } from 'react-router';
import ResetDatabase from './components/resetdatabase';

class FeedPage extends React.Component {
  render() {
    return <Feed key={"000000000000000000000005"} />;
  }
}

class TrendingPage extends React.Component {
  render() {
    return <Trending />;
  }
}

class ProfilePage extends React.Component {
  render() {
    return <User user={"000000000000000000000005"}/>;
  }
}

class ProductManagerPage extends React.Component {
  render() {
    return <ProductManager pm={"000000000000000000000005"} />;
  }
}

class ChatPage extends React.Component {
  render() {
    return <Chat key={"000000000000000000000005"} />;
  }
}

class SendChatPage extends React.Component {
  render() {
    return <SendChat key={"000000000000000000000005"} />;
  }
}

class UploadPage extends React.Component {
  render() {
    return <Upload/>;
  }
}
class App extends React.Component {
  render() {
    return (
    <div><ErrorBanner/>{this.props.children}</div>

    )
  }
}
class ItemPage extends React.Component {
  render() {
    return <Item _id={this.props.params.itemID}/>;
  }
}


ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      {/* Show the Feed at / */}
      <IndexRoute component={FeedPage} />
      <Route path="profile/:id" component={ProfilePage} />
      <Route path="user/:id/pm" component={ProductManagerPage} />
      <Route path="chat/:id" component={ChatPage} />
      <Route path="trending" component={TrendingPage} />
      <Route path="upload" component={UploadPage} />
      <Route path="item/:itemID" component={ItemPage} />
      <Route path="user/:id/messages" component={ChatPage} />
      <Route path="user/:id/messages/send" component={SendChatPage} />
    </Route>
  </Router>
),
document.getElementById('main-feed')

);
ReactDOM.render(<ResetDatabase />, document.getElementById('db-reset'));
