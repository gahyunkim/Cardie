import React from 'react';
import Category from './category.js'
import {getCategories} from '../server.js';
import {Link} from 'react-router';

export default class Trending extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
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
