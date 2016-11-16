import React from 'react';

export default class Category extends React.Component{
  constructor(props) {
    super(props);
    this.state = props.data;
  }
  render(){
    console.log("here " + this.state);
    return(
      <li className="list-group-item">
        <div className="panel panel-default">

          <div className="panel-heading">{this.state._id}</div>
          <div className="panel-body">

            <div className="col-lg-3 col-md-4 col-xs-6 thumb">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="http://placehold.it/400x300"  alt=""/>
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="http://placehold.it/400x300" alt=""/>
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="http://placehold.it/400x300" alt=""/>
              </a>
            </div>
            <div className="col-lg-3 col-md-4 col-xs-6 thumb">
              <a className="thumbnail" href="#">
                <img className="img-responsive" src="http://placehold.it/400x300" alt=""/>
              </a>
            </div>
            <div id="category1" className="collapse">
              <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                <a className="thumbnail" href="#">
                  <img className="img-responsive" src="http://placehold.it/400x300" alt=""/>
                </a>
              </div>
              <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                <a className="thumbnail" href="#">
                  <img className="img-responsive" src="https://tse4.mm.bing.net/th?id=OIP.Mf749e3b566949daac2ba418a7e8fbbbbo0&pid=15.1" alt="" />
                </a>
              </div>
              <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                <a className="thumbnail" href="#">
                  <img className="img-responsive" src="http://placehold.it/400x300" alt="" />
                </a>
              </div>
              <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                <a className="thumbnail" href="#">
                  <img className="img-responsive" src="http://placehold.it/400x300" alt="" />
                </a>
              </div>
            </div>
            <a href="#category1" className="btn btn-info btn-color" data-toggle="collapse">See More</a>
          </div>
        </div>
      </li>
    )
  }

}
