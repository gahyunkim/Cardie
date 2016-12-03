import React from 'react';
import Item from './item';
import {getFeedData, likeItem, dislikeItem } from '../server';

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

 likeItem(itemid) {
   likeItem(itemid, 5, () => {
     this.refresh();
     this.render();
   });
 }
 dislikeItem(itemid){
   dislikeItem(itemid, 5, () => {
     this.refresh();
     this.render();
   });
 }

 render(){
   if(this.state.items.length > 0){ //why are you sending Item id and length??
     var firstItem = this.state.items[0];

/*
   var items = this.state.items;
   if(items.length > 0){ //why are you sending Item id and length??
     var firstItem = items[0];
*/
     return(
       <div>
         <div className="col-md-2">
           <button type="button"
                   className="dislike"
                   onClick={() => this.dislikeItem(firstItem._id)}>
                 <img src="img/no_dogs.JPG" className="no_dogs" />
             </button>
         </div>
         <div className="col-md-8">
           <Item _id={firstItem._id} data={firstItem} isCat={false}/>
         </div>
         <div className="col-md-2">
            <button type="button"
                    className="like"
                    onClick={() => this.likeItem(firstItem._id)}>
                 <img src="img/throw_a_bone.JPG" className="throw_a_bone" />
             </button>
         </div>
       </div>
     )
   }
   else{
     return(
       <div>
         <h1>No More Items In Your Area</h1>
       </div>
     )
   }
 }
}
