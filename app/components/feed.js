import React from 'react';
import Item from './item.js';
import {Link} from 'react-router';
import {getFeedData} from '../server';

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
    return(
      <div>
        <Link to={"/profile/5"}>
          TEST FEED
        </Link>
        {console.log("now" + this.state.items)}
        {this.state.items.map((item) => {
          console.log("here2 " +item);
          return (
            <Item key={item._id} data={item} />
          );
        })}
      </div>
    )
  }
}
