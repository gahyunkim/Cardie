import React from 'react';
// import {getUserProfile} from '../server';

export default class Upload extends React.Component{
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = {namevalue: "",
      categoryvalue: "",
      descriptionvalue: ""
    };
  }
  /*** Called when the user clicks the 'post' button.
  * Triggers the `Upload` prop if the post isn't empty, and clears* the component.
  */
  handleUpload(e) {
    e.preventDefault();
    var itemNameText = this.state.namevalue.trim();
    if(itemNameText !== "") {
      this.setState({namevalue: ""});

      var itemCategory = this.state.categoryvalue.trim();
      if(itemCategory !== "") {
        this.setState({categoryvalue: ""});
      }

      var itemDescrip = this.state.descriptionvalue.trim();
      if(itemDescrip !== "") {
        this.setState({descriptionvalue: ""});
    }
  }
}

    //Called when the user types a character into the form boxes.
    handleItemName(e) {
      this.setState({namevalue: e.target.value});
    }
    handleCategory(e) {
      this.setState({categoryvalue: e.target.value});
    }
    handleItemDescrip(e) {
      this.setState({descriptionvalue: e.target.value});
    }


    previewImage() {
      var preview = document.getElementById("myFile");
      this.setState({photo: preview})
    }


    render(){
      // var userData = getUserProfile(5);
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
                    <input id="myFile" type="file" onChange="previewImage()"/>
                  </form>
                  <div className="col-md-3 descriptionbox">
                    <textarea className="form-control" rows="1" placeholder="Item Name"></textarea>
                  </div>
                  <div className="col-md-3 categoriesbutton"><select className="form-control input-lg categoriesbutton">
                    <option>Category</option>
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
                        <span className="glyphicon glyphicon-upload" aria-hidden="true" onClick={(e) =>this.handleUpload(e)}></span>
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
