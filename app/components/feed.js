import React from 'react';
import Item from './item.js';
import {Link} from 'react-router';
import {getFeedData, likeFeedItem} from '../server';

export default class Feed extends React.Component{
 constructor(props) {
   super(props);
   this.state = {
     items: []
   };
 }
 refresh(){
   getFeedData(5, (feedData)=>{
     this.setState(feedData);
   });
 }
 componentDidMount() {
   this.refresh();
 }
 handleLikeClick(clickEvent) {
   // Stop the event from propagating up the DOM
   // tree, since we handle it here. Also prevents
   // the link click from causing the page to scroll to the top.
   clickEvent.preventDefault();
   // 0 represents the 'main mouse button' --
   // typically a left click
   // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
   if (clickEvent.button === 0) {
     // Callback function for both the like and unlike cases.
     var callbackFunction = (updatedLikeCounter) => {
       this.setState({likeCounter: updatedLikeCounter});
     };
       // User clicked 'like' button.
       likeFeedItem(this.state._id, 4, callbackFunction);
   }
 }
 didUserLike(likeCounter) {
   var liked = false;
   // Look for a likeCounter entry with userId 4 -- which is the
   // current user.
   for (var i = 0; i < likeCounter.length; i++) {
     if (likeCounter[i]._id === 5) {
       liked = true;
       break;
     }
   }
   return liked;
 }
 render(){
   var allItems = this.state.items.map((item) => {
     console.log("here2 " +item);
     return (
       <Item key={item._id} data={item} />
     );
   })
   console.log(allItems);
   if(allItems.length > 0){
     console.log(allItems[0].props.data.likeCounter);
     var checkLike = this.didUserLike(allItems[0].props.data.likeCounter);
     console.log(checkLike);
     var itemImage
     itemImage = allItems[0].props.data.contents;
     return(
       <div>
         <div className="col-md-2">
           <button type="button" className="dislike">
             <img src="img/no_dogs.JPG" className="no_dogs" />
           </button>
         </div>
         <div className="col-md-8">
           <Link to={"/profile/5"}>
             TEST FEED
           </Link>
           {console.log(allItems[0].props.data.likeCounter[0])}
           <img src={itemImage} className="item_for_sale" />
         </div>
         <div className="col-md-2">
           <button type="button" className="like">
             <img src="img/throw_a_bone.JPG" className="throw_a_bone" />
           </button>
         </div>
       </div>
     )
   }
   else{
     return(
       <div>
         <Link to={"/profile/5"}>
           TEST FEED
         </Link>
         <h1>No More Items In Your Area</h1>
       </div>
     )
   }

 }
}
