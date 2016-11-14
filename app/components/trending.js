import React from 'react';

export default class Trending extends React.Component{
  render(){
    return(
      <div style="height: 99999px;">
        //list of panels containing categories and grids of images
        <ul className="list-group">
          <li className="list-group-item">
            <div className="panel panel-default">
              // category
              <div className="panel-heading">category 1</div>
              <div className="panel-body">
                //images for category
                //first 4 pictures
                <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                  <a className="thumbnail" href="#">
                    <img className="img-responsive" src={'http://placehold.it/400x300'}  />
                  </a>
                </div>
                <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                  <a className="thumbnail" href="#">
                    <img className="img-responsive" src="http://placehold.it/400x300" />
                  </a>
                </div>
                <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                  <a className="thumbnail" href="#">
                    <img className="img-responsive" src="http://placehold.it/400x300" />
                  </a>
                </div>
                <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                  <a className="thumbnail" href="#">
                    <img className="img-responsive" src="http://placehold.it/400x300" />
                  </a>
                </div>
                //See more section
                <div className="container seeMoreButtons">
                  <div id="category1" className="collapse">
                    <div className="col-lg-3 col-md-4 col-xs-6 thumb">
                      <a className="thumbnail" href="#">
                        <img className="img-responsive" src="http://placehold.it/400x300" />
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
                  //  to edit to toggle between see more and see less
                  //<a href="#category1" className="btn btn-info btn-color" data-toggle="collapse">See More</a>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="panel panel-default">
              //category
              <div className="panel-heading">category 2</div>
              <div className="panel-body">
                // images for category
                //first 4 pictures
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
                //See more section
                <div className="container seeMoreButtons">
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
                  // to edit to toggle between see more and see less
                  //<a href="#category2" className="btn btn-info" data-toggle="collapse">See More</a>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="panel panel-default">
              // category
              <div className="panel-heading">category 3</div>
              <div className="panel-body">
                // images for category
                //first 4 pictures
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
                //See more section
                <div className="container seeMoreButtons">
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
                  //  to edit to toggle between see more and see less
                  //<a href="#category3" className="btn btn-info" data-toggle="collapse">See More</a>
                </div>
              </div>
            </div>
          </li>
          <li className="list-group-item">
            <div className="panel panel-default">
              // category
              <div className="panel-heading">category 3</div>
              <div className="panel-body">
                // images for category
                //first 4 pictures
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
                //See more section
                <div className="container seeMoreButtons">
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
                  //  to edit to toggle between see more and see less
                  //<a href="#category4" className="btn btn-info" data-toggle="collapse">See More</a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
