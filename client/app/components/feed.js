import React from 'react';
import Item from './item';
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

 componentDidMount() {
   this.refresh();
 }
 render(){
   var items = this.state.items;
   if(items.length > 0){ //why are you sending Item id and length??
     var firstItem = items[0];
     return(
       <div>
         <Item key={firstItem._id} data={firstItem} />
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
