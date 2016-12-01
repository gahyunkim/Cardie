
import React from 'react';
import Item from './item.js'
import { getUserProfile, getItem, removeItem } from '../server.js';

export default class ProductManager extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      user: getUserProfile(this.props.pm),
      items: getUserProfile(this.props.pm).productManager.items.map((item) => getItem(item))
    }

  }
  refresh(){
    var user = getUserProfile(this.props.pm);
    var items = user.productManager.items.map((item) => getItem(item));
    this.setState(items);

  }

  handleSoldRemove(e){
    e.preventDefault();
    removeItem(this.props.pm, e.target.value, (update) => {
      var user = getUserProfile(this.props.pm);
      var items = user.productManager.items.map((item) => getItem(item));
      this.setState(update);
      this.refresh();
    })
  }

  componentDidMount(){
    this.refresh();
  }
  render(){
    var user = getUserProfile(this.props.pm);

    var items = user.productManager.items.map((item) => getItem(item));
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
                    {item.content}
                  </td>
                  <td>
                    {item.description}
                  </td>
                  <td>
                    <div className="item-actions">
                      <button type="button"
                              className="btn btn-default navbar-btn item-action-button check-button"
                              value={item._id}
                              onClick={(e) => this.handleSoldRemove(e)}>
                        <i className="material-icons">check</i>Sold
                      </button>
                      <button type="button"
                              className="btn btn-default navbar-btn item-action-button remove-button"
                              value={item._id}
                              onClick={(e) => this.handleSoldRemove(e)}>
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
