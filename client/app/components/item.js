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
    console.log(this.state);
    var item = this.state;
    console.log(item);
    if(item.isCat === true){
      return(
        <div className="col-lg-3 col-md-4 col-xs-6 thumb">
          <Link to={'/item/'+ item._id}>
            <img className="img-responsive" src={item.item.contents} />
          </Link>
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
