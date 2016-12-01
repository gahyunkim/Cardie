import React from 'react';
import {Link} from 'react-router';
import {getItem, likeItem, dislikeItem} from '../server.js'
export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = props.data;
  }
  didUserLike(item) {
    var liked = false;
    var likeCounter = item.likeCounter;
    // Look for a likeCounter entry with userId 4 -- which is the
    // current user.
    for (var i = 0; i < likeCounter.length; i++) {
      if (likeCounter[i] === 5) {
        liked = true;
        break;
      }
    }
    return liked;
  }
  didUserDislike(item) {
    var disliked = false;
    var dislikeCounter = item.dislikeCounter;
    for (var j = 0; j < dislikeCounter.length; j++) {
      if (dislikeCounter[j] === 5) {
        disliked = true;
        break;
      }
    }
    return disliked;
  }
  handleLikeClick(clickEvent, item) {
    // Stop the event from propagating up the DOM
    // tree, since we handle it here. Also prevents
    // the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();
    // 0 represents the 'main mouse button' --
    // typically a left click
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if (clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
      likeItem(item._id, 5, (feedData)=>{
        this.setState(feedData)});
    }
  }
  handleDislikeClick(clickEvent, item) {
    // Stop the event from propagating up the DOM
    // tree, since we handle it here. Also prevents
    // the link click from causing the page to scroll to the top.
    clickEvent.preventDefault();
    // 0 represents the 'main mouse button' --
    // typically a left click
    // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
    if (clickEvent.button === 0) {
      // Callback function for both the like and unlike cases.
      dislikeItem(item._id, 5,(feedData)=>{
        this.setState(feedData)});
    }
  }
  render(){
    var check = this.state;
    if(check !== null){
      return(
        <div className="col-lg-3 col-md-4 col-xs-6 thumb">
          <Link to={'/item/'+this.state._id}>
            <img className="img-responsive" src={this.state.contents} />
          </Link>
        </div>
      )
    }
    else{
      var id = this.props._id;
      var length;
      if(this.props.length === undefined){
        length = 8;
      }
      else{
        length = this.props.length;
      }
      var item = getItem(id, (feedData)=>{
        this.setState(feedData)});
      var checkIfLike = this.didUserLike(item);
      var checkIfDislike = this.didUserDislike(item);
      if(checkIfLike || checkIfDislike){
        return(
          <div>
            <div className="col-md-10">
              <ul>
                <h1>
                  {checkIfLike ? "You have already Liked this Item" : "You have already disliked this Item" }
                </h1>
                <ul>
                  <div>Name: {item.name}</div>
                </ul>
                <ul>
                  <div>Description: {item.description}</div>
                </ul>
                <ul>
                  <div>Category: {item.category}</div>
                </ul>
                <ul>
                  <img className="img-responsive" src={item.contents} />
                </ul>
              </ul>
            </div>
            <div className="col-md-2">
              <Link to={'/item/'+((item._id%length)+1)}>
                <button type="button" className="like">
                  Next Item
                </button>
              </Link>
            </div>
          </div>
        )
      }
      else{
        return(
          <div>
            <div className="col-md-2">
              <button type="button" className="dislike" onClick={(e) => this.handleDislikeClick(e, item)}>
                <Link to={'/item/'+((item._id%length)+1)}>
                    <img src="img/no_dogs.JPG" className="no_dogs" />
                </Link>
                </button>
            </div>
            <div className="col-md-8">
              <img src={item.contents} className="item_for_sale" />
            </div>
            <div className="col-md-2">
               <button type="button" className="like" onClick={(e) => this.handleLikeClick(e, item)}>
                <Link to={'/item/'+((item._id%length)+1)}>
                    <img src="img/throw_a_bone.JPG" className="throw_a_bone" />
                </Link>
                </button>
            </div>
          </div>
        )
      }
    }
  }

}
