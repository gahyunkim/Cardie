import React from 'react';
import Item from './item.js';
import {getFeedData, getCategories} from '../server.js';

export default class Trending extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: []
    };
  }
  refresh(){
    getCategories(5, (feedData)=>{
      this.setState(feedData);
    });
    getFeedData(5, (feedData)=>{
      this.setState(feedData);
    });
  }
  componentDidMount() {
    this.refresh();
  }
  render(){

    console.log(this.state);

    return(
      <div>
        <ul className="list-group">
          <li className="list-group-item">
            <div className="panel panel-default">

              <div className="panel-heading">category 1</div>
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
          <li className="list-group-item">
            <div className="panel panel-default">

              <div className="panel-heading">category 2</div>
              <div className="panel-body">

                <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                  <a className="thumbnail" href="#">
                    <img className="img-responsive" src="http://www.freedigitalphotos.net/images/img/homepage/87357.jpg" alt=""/>
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
                <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                  <a className="thumbnail" href="#">
                    <img className="img-responsive" src="http://placehold.it/400x300" alt="" />
                  </a>
                </div>
                <div id="category2" className="collapse">
                  <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a className="thumbnail" href="#">
                      <img className="img-responsive" src="http://placehold.it/400x300" alt="" />
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a className="thumbnail" href="#">
                      <img className="img-responsive" src="http://www.gettyimages.pt/gi-resources/images/Homepage/Hero/PT/PT_hero_42_153645159.jpg" alt="" />
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
                <a href="#category2" className="btn btn-info" data-toggle="collapse">See More</a>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="panel panel-default">
              <div className="panel-heading">category 3</div>
              <div className="panel-body">
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
                <div id="category3" className="collapse">
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
                <a href="#category3" className="btn btn-info" data-toggle="collapse">See More</a>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="panel panel-default">
              <div className="panel-heading">category 3</div>
              <div className="panel-body">
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
                <div id="category4" className="collapse">
                  <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a className="thumbnail" href="#">
                      <img className="img-responsive" src="http://placehold.it/400x300" alt="" />
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a className="thumbnail" href="#">
                      <img className="img-responsive" src="http://placehold.it/400x300" alt=""/>
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a className="thumbnail" href="#">
                      <img className="img-responsive" src="http://placehold.it/400x300" alt="" />
                    </a>
                  </div>
                  <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                    <a className="thumbnail" href="#">
                      <img className="img-responsive" src="http://placehold.it/400x300" alt=""/>
                    </a>
                  </div>
                </div>
                <a href="#category4" className="btn btn-info" data-toggle="collapse">See More</a>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
