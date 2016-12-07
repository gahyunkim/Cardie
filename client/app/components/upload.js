import React from 'react';
// import {getUserProfile} from '../server';
import {uploadItem} from '../server';

export default class Upload extends React.Component{
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = {
      contents: "",
      name: "",
      category: "",
      description: ""
    };
  }
  /*** Called when the user clicks the 'post' button.
  * Triggers the `Upload` prop if the post isn't empty, and clears* the component.
  */
  handleUpload() {
    uploadItem(this.state, "000000000000000000000005", () => {
      this.refresh();
    });
  }

  handlePhotoChange(e){
    e.preventDefault();
    this.setState({
      contents: e.target.value,
      name: this.state.name,
      category: this.state.category,
      description: this.state.description
    });
  }
  handleNameChange(e){
    e.preventDefault();
    this.setState({
      contents: this.state.contents,
      name: e.target.value,
      category: this.state.category,
      description: this.state.description
    });
  }
  handleCategoryChange(e){
    e.preventDefault();
    this.setState({
      contents: this.state.contents,
      name: this.state.name,
      category: e.target.value,
      description: this.state.description
    });
  }

  handleDescriptionChange(e){
    e.preventDefault();
    this.setState({
      contents: this.state.contents,
      name: this.state.name,
      category: this.state.category,
      description: e.target.value
    });
  }


    render(){
      // var userData = getUserProfile(5);
      return(
        <div>
          <div className="panel panel-default">
            <div className="panel-body">
              <form onSubmit={() => this.handleUpload()}>
                <div className="row">
                  <div className="col-md-6">
                    <img src="/img/camera-solid.jpg" alt="..." className="img-thumbnail imagesize" />
                  </div>
                  <div className="col-md-3 descriptionbox">
                    <input type="text"
                           className="form-control"
                           placeholder="Photo URL"
                           value={this.state.contents}
                           onChange={(e) => this.handlePhotoChange(e)}/>
                  </div>
                  <div className="col-md-3 descriptionbox">
                    <input type="text"
                           className="form-control"
                           placeholder="Item Name"
                           value={this.state.name}
                           onChange={(e) => this.handleNameChange(e)}/>
                  </div>
                  <div className="col-md-3 categoriesbutton">
                    <select className="form-control input-lg categoriesbutton"
                            value={this.state.category}
                            onChange={(e) => this.handleCategoryChange(e)}>
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
                    </select>
                  </div>
                  <div className="col-md-3 descriptionbox">
                    <textarea className="form-control"
                              rows="7"
                              placeholder="Enter Description"
                              value={this.state.description}
                              onChange={(e) => this.handleDescriptionChange(e)}></textarea>
                  </div>
                  <div className="col-md-3 descriptionbox">
                    <button className="btn btn-default btn-lg submitsubmitbutton btn-success" type="submit">
                      <input type="submit" value="Upload" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      )
    }
  }
