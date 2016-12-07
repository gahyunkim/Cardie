import React from 'react';
import {Link} from 'react-router';
import Feed from './feed';
import {getItem, likeItem, dislikeItem} from '../server.js'
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
    var item = this.state;
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
            <Feed itemId={item._id}/>
          </div>
        );
    }
  }

}
