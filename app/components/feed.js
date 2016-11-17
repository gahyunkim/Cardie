import React from 'react';
import Item from './item.js';
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
 render(){
   if(this.state.items.length > 0){
     var firstItem = (<Item _id={this.state.items[0]._id} length={this.state.items.length}/>);
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
