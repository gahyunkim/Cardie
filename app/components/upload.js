import React from 'react';
import {getUserProfile} from '../server';
import Item from './item.js';


export default class Upload extends React.Component{
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = {
      titleBoxValue: "",
      categoryBoxValue: "",
      descriptionBoxValue: "",
      pictureValue: ""
    }
  }
  render(){
    console.log(this.state);
    var userData = getUserProfile(5);
    var picture = "/img/camera-solid.jpg"
    return(
      <div>
        <div className="panel panel-default">

            <div className="panel-body">

                <div className="row">
                    <div className="col-md-6">
                        <img src= {picture} alt="..." className="img-thumbnail imagesize" />
                    </div>
                    <div className="col-md-3"><button className="btn btn-default btn-lg buttonsize" type="submit">Choose <span className="glyphicon glyphicon-camera" aria-hidden="true"></span></button></div>
                      <div className="col-md-3 titlebox">
                          <textarea className="form-control" rows="1" placeholder="Title"></textarea>
                      </div>
                  <div className="col-md-3 categoriesbutton"><select className="form-control input-lg categoriesbutton">
                      <option selected disabled>Category</option>
                      <option>Auto</option>
                      <option>Electronics</option>
                      <option>Home & Furniture</option>
                      <option>Sports & Outdoor</option>
                      <option>TV, Movies, Books</option>
                      <option>Food</option>
                      <option>Supplies</option>
                      <option>Other</option>
                    </select></div>
                    <div className="col-md-3 descriptionbox">
                        <textarea className="form-control" rows="7" placeholder="Description"></textarea>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-5 expirerow">
                        <p>Item expires: </p>
                        <input type="date" className="form-control expireform" placeholder="Text input" />
                    </div>
                      <div className="col-md-2"><button className="btn btn-default btn-lg submitsubmitbutton btn-success" type="submit">Upload <span className="glyphicon glyphicon-upload" aria-hidden="true"></span></button></div>
                      <a href = "#"><div className="col-md-2"><button className="btn btn-default btn-lg submitcancelbutton btn-danger" type="submit">Cancel</button></div></a>
                    </div>

            </div>

        </div>

      </div>
    )
  }
}
