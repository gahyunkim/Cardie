
import React from 'react';
import Item from './item.js';
export default class Feed extends React.Component{
  constructor(props) {
      super(props);
      this.state = props.data;
    }
  render(){
    return(
      <div>
        Hello
      </div>
    )
  }
}
