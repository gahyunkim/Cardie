import React from 'react';
import Item from './item.js';
import {getFeedData, likeFeedItem, uploadItem} from '../server';

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

 onPost(itemname, content, Category, picture){
   //add
   uploadItem(this.state._id, itemname, content, Category, picture, () => {this.refresh();});
   // Database is now updated. Refresh the feed.
 }

 componentDidMount() {
   this.refresh();
 }
 render(){
   console.log(this.state.items);
   if(this.state.items.length > 0){ //why are you sending Item id and length??
     var firstItem = (<Item _id={this.state.items[0]._id} item ={this.state.items[0]}
                      length ={this.state.items.length} isCat={false}/>);
     return(
       <div>
         {firstItem}
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
