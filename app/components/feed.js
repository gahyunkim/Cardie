
import React from 'react';
import Item from './item.js';
import {Link} from 'react-router';

export default class Feed extends React.Component{
  constructor(props) {
      super(props);
      this.state = props.data;
    }
  render(){
    return(
      <div>
        <Link to={"/profile/5"}>
          TEST FEED
        </Link>
      </div>
    )
  }
}
