import React from 'react';
import ReactDOM from 'react-dom';
import Feed from './components/feed';
import Trending from './components/trending';
import User from './components/user';
import ProductManager from './components/productmanager.js';
import Upload from './components/upload';
import Item from './components/item';
import Chat from './components/chat';
import ErrorBanner from './components/errorbanner';
import { IndexRoute, Router, Route, hashHistory } from 'react-router'

class FeedPage extends React.Component {
  render() {
    return <Feed key={5} />;
  }
}

class TrendingPage extends React.Component {
  render() {
    return <Trending />;
  }
}

class ProfilePage extends React.Component {
  render() {
    return <User user={5}/>;
  }
}

class ProductManagerPage extends React.Component {
  render() {
    return <ProductManager pm={5} />;
  }
}

class ChatPage extends React.Component {
  render() {
    return <Chat key={5} />;
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
      <Route path="feeds/:userid" component={FeedPage} />
      <Route path="profile/:id" component={ProfilePage} />
      <Route path="pm/:id" component={ProductManagerPage} />
      <Route path="chat/:id" component={ChatPage} />
      <Route path="trending" component={TrendingPage} />
      <Route path="upload" component={UploadPage} />
      <Route path="item/:itemID" component={ItemPage} />
    </Route>
  </Router>
),
document.getElementById('main-feed')

);
