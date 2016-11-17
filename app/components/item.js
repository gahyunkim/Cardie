import React from 'react';

export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = props.data;
  }
  render(){
    var data;
    data = (
      <Item key = {this.state._id}
        name = {this.state.name}
        description = {this.state.description}
        category = {this.state.category}
        likeCounter = {this.state.likeCounter}
        contents = {this.state.contents}>
      </Item>
    );
    return(
      <div className="col-lg-3 col-md-4 col-xs-6 thumb">
        <a className="thumbnail" href={"#/item/" + this.state._id}>
          <img className="img-responsive" src={this.state.contents} />
        </a>
      </div>
    )
  }

}
