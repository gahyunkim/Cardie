import React from 'react';
import {getUserProfile} from '../server';

export default class Upload extends React.Component{
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = {value: ""
    };
  }
  handlePost(e) {
    e.preventDefault();
    var itemNameText =this.state.value.trim();
    if(itemNameText !== "") {
      this.setState({value: ""});
    }

  }
  handleChange(event) {
    this.setState({value: event.target.value});
  }

  previewImage() {
    var preview = document.getElementById("myFile");
    this.setState({photo: itemImage})
  }


  render(){
    var userData = getUserProfile(5);
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
                  <input id="myFile" type="file" onChange={(e) => this.uploadImage(e)}/>
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
                    <button className="btn btn-default btn-lg submitsubmitbutton btn-success" type="submit" onClick={(e) =>this.handlePost(e)}>
                      Upload
                      <span className="glyphicon glyphicon-upload" aria-hidden="true"></span>
                    </button>
                  </div>
                  <<<<<<< HEAD
                </form>
              </div>
              =======
            </div>
          </div>
        </form>
      </div>

      >>>>>>> e85be815785bdcbe6c360904a0a2258480c18d46
    </div>
  </div>
)
}
}
