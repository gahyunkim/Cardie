import React from 'react';
import Item from './item';
import {getFeedData, likeItem, dislikeItem } from '../server';

export default class Feed extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      showDescription:false,
      itemId: props.itemId
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
    });
  }
  dislikeItem(itemid){
    dislikeItem(itemid, 5, () => {
      this.refresh();
    });
  }
  showDescription(){
    this.setState({showDescription: this.state.showDescription === true ? false : true});
    this.refresh();
  }

  render(){
    if(this.state.items.length > 0){
      var firstItem;
      if(this.state.itemId ===undefined){
        firstItem = this.state.items[0];
      }
      else{
        var id = this.state.itemId
        var current;
        for(let index in this.state.items) {
          current = this.state.items[index];
          if(current._id == id){
            break;
          }
        }
        firstItem = current;
      }
      if(this.state.showDescription === false){
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
              <h1>{firstItem.name}</h1>
              <div className="item_for_sale">
                <img src={firstItem.contents}  onClick={() => this.showDescription()}/>
              </div>
            </div>
            <div className="col-md-2">
              <button type="button"
                className="like"
                onClick={() => this.likeItem(firstItem._id)}>
                <img src="img/throw_a_bone.JPG" className="throw_a_bone" />
              </button>
            </div>
          </div>
        )}
        else{
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
                <h1>{firstItem.name}</h1>
                <div className="item_for_sale">
                  <img src={firstItem.contents} onClick={() => this.showDescription()}/>
                  <h3>{firstItem.description}</h3>
                </div>
                <div>

                </div>
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
