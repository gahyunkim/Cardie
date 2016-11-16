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
    var allItems = this.state.items.map((item) => {
      console.log("here2 " +item);
      return (
        <Item key={item._id} data={item} />
      );
    })
    console.log(allItems);
    if(allItems.length > 0){
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
