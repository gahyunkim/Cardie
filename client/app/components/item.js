import React from 'react';
import {Link} from 'react-router';
import {getItem} from '../server.js'
export default class Item extends React.Component{
  constructor(props){
    super(props);
    this.state = props;
  }

  refresh(){
    getItem(this.props._id, (item) => {
      this.setState(item);
    });
  }
  componentDidMount(){
    this.refresh();
  }
  render(){
    var item = this.state.data;
    if(this.state.isCat === true){
      return(
        <div className="col-lg-3 col-md-4 col-xs-6 thumb">
          <Link to={'/item/'+this.state.item._id}>
            <img className="img-responsive" src={this.state.item.contents} />
          </Link>
          <h1>{this.state.item.name}</h1>
        </div>
      )
    }
    else{
        return(
          <div>
              <img src={item.contents} className="item_for_sale" />
              <h1>{item.name}</h1>
          </div>
        );
    }
  }

}
