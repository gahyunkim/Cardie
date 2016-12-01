import React from 'react';
import {getUserProfile} from '../server';

export default class Upload extends React.Component{
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = {category: '',
                  description: '',
                  photo: '',
                  expiration: ''};
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  render(){
    var userData = getUserProfile(5);
    var item_img = document.getElementById("myFile");
    return(
      <div>
        <div className="panel panel-default">

            <div className="panel-body">

              <form>
                <div className="row">
                    <div className="col-md-6">
                        <img src="/img/camera-solid.jpg" alt="..." className="img-thumbnail imagesize" />
                    </div>
                    <form encType="multipart/form-data" action="/upload/image" method="post">
                      <input id="image-file" type="file" />
                    </form>
                    <div className="col-md-3 categoriesbutton"><select className="form-control input-lg categoriesbutton">
                      <option selected disabled>Category</option>
                      <option>Auto</option>
                      <option>Electronics</option>
                      <option>Dorm</option>
                      <option>Home & Furniture</option>
                      <option>Sports & Outdoor</option>
                      <option>TV, Movies, Books</option>
                      <option>Food</option>
                      <option>Supplies</option>
                      <option>Other</option>
                    </select></div>
                    <div className="col-md-3 descriptionbox">
                        <textarea className="form-control" rows="7" placeholder="Enter Description"></textarea>
                    </div>

                </div>
                <div className="row">
                    <div className="col-md-5 expirerow">
                        <p>Item expires: </p>
                        <input type="date" className="form-control expireform" placeholder="Text input" />
                    </div>
                      <div>
                        <div className="col-md-2">
                          <button className="btn btn-default btn-lg submitsubmitbutton btn-success" type="submit">
                            Upload
                            <span className="glyphicon glyphicon-upload" aria-hidden="true"></span>
                          </button>
                        </div>
                      </div>
                  </div>
                </form>
            </div>

        </div>

      </div>
    )
  }
}
