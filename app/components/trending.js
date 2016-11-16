import React from 'react';
import Item from './item.js';
import Category from './category.js'
import {getFeedData, getCategories} from '../server.js';

export default class Trending extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: []
    };
  }
  refresh(){
    getCategories(5, (feedData)=>{
      this.setState(feedData);
    });

  }
  componentDidMount() {
    this.refresh();
  }
  render(){
    var allCategories = this.state.categories;
    console.log(allCategories);
    return(
      <div>
        <ul className="list-group">
          {this.state.categories.map((category)=>{
            return (
              <Category key={category._id} data={category} />
            );
          })}
        </ul>
      </div>
    );
  }
}
