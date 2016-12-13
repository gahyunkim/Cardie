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
    getFeedData("000000000000000000000005", (feedData)=>{
      this.setState(feedData);
    });
  }

  componentDidMount() {
    this.refresh();
  }

  likeItem(itemid) {
    likeItem(itemid, "000000000000000000000005", () => {
      this.refresh();
    });
  }
  dislikeItem(itemid){
    dislikeItem(itemid, "000000000000000000000005", () => {
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
        if(current._id !== id){
          return(
            <div>
              <h1>The item you have picked is not in your feed, please go back and choose another item</h1>
            </div>
          )
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
              <div className="item-title-container">
                <h1>{firstItem.name}</h1>
              </div>
              <div className="item_for_sale">
                <img src={firstItem.contents}  width="400px" onClick={() => this.showDescription()}/>
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
                <div className="item-title-container">
                  <h1>{firstItem.name}</h1>
                </div>
                <div className="item_for_sale">
                  <img src={firstItem.contents} width="400px" onClick={() => this.showDescription()}/>
                  <div className="item-descrip-container">
                    <h3>{firstItem.description}</h3>
                  </div>
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
        if(this.state.itemId ===undefined){
          return(
            <div>
              <h1>No More Items In Your Area</h1>
            </div>
          )
        }
        else{
          return(
            <div>
              <h1>The item you have picked is not in your feed, please go back and choose another item</h1>
            </div>
          )
        }

      }
    }
  }
