
import React from 'react';
import { getProductManager, removeItem } from '../server';

export default class ProductManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      contents: []
    }

  }
  refresh(){
    getProductManager(this.props.pm, (pm) => {
      this.setState(pm);
    });

  }

  removeItem(userid, itemid){
    console.log(userid);
    console.log(itemid);
    removeItem(userid, itemid, () => {
      this.refresh();
    });
  }

  componentDidMount(){
    this.refresh();
  }
  render(){
    var items = this.state.items ? this.state.items : [];
    if(items.length === 0){
      return(
        <div>
          <h1>No Items for Sale</h1>
        </div>
      )
    } else {
      return(
        <div>
          <h1> Product Manager </h1>
          <table>
            <tbody>
              <tr>
                <td>
                  Item
                </td>
                <td>
                  Description
                </td>
                <td>
                  Actions
                </td>
              </tr>
              {items.map((item) =>{
                return(
                  <tr>
                    <td>
                      {item.name}
                      <br/>
                      <img src={item.contents} height="80" width="80"/>
                    </td>
                    <td>
                      {item.description}
                    </td>
                    <td>
                      <div className="item-actions">
                        <button type="button"
                                className="btn btn-default navbar-btn item-action-button check-button"
                                onClick={() => this.removeItem(item.vendorID, item._id)}>
                          <i className="material-icons">check</i>Sold
                        </button>
                        <button type="button"
                                className="btn btn-default navbar-btn item-action-button remove-button"
                                onClick={() => this.removeItem(item.vendorID, item._id)}>
                          <i className="material-icons">close</i>Remove
                        </button>
                      </div>
                    </td>
                  </tr>

                )}
              )}
            </tbody>
          </table>
        </div>
      )
    }
  }
}
