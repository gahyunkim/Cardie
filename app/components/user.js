import React from 'react';

export default class User extends React.Component{






  render(){
    return(
      <div>
        <h1>Cardie Duncan</h1>
        <div className="container">
          <div className="row">
            <div className="col-md-7 user-description">
              <div className="panel panel-default">
                <div className="panel-body ">

                  <div className="row">
                    <div className="col-md-6">
                      <div className="media">
                        <div className="media-body">
                            <font size="+1" color="black">Description</font>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="btn-group pull-right" role="group">
                        <button type="button" className="btn btn-default ">
                          <font size="-1" color="009a3d">Edit Description</font>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12 description">
                      Hi! My name is Susie and I live in Lexington, MA. Things I like shopping for on Cardie include: pet supplies, stuffed animals, and more! Some of the things I sell include: old textbooks, furniture, and my own crafts!
                    </div>
                  </div>


                  <div className="row profile-update">
                    <div className="col-md-4">
                      <div className="media">
                        <div className="media-body linked-accounts">
                            <font size="+1" color="black">Linked Accounts</font>
                            <ul className="nav nav-pills nav-stacked accounts">
                              <li role="presentation">
                                <a href="#">
                                  <span className="glyphicon glyphicon-plus"></span>
                                    Facebook</a>
                                </li>
                                <li role="presentation">
                                  <a href="#"><span className="glyphicon glyphicon-plus"></span>
                                    Google</a>
                                </li>
                                <li role="presentation">
                                  <a href="#"><span className="glyphicon glyphicon-plus"></span>
                                    Linkedin</a>
                                </li>
                                <li role="presentation">
                                  <a href="#"><span className="glyphicon glyphicon-plus"></span>
                                    Twitter</a>
                                </li>
                                <li role="presentation">
                                  <a href="#">
                                    <span className="glyphicon glyphicon-plus"></span>
                                      Github
                                    </a>
                                  </li>
                                </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="col-md-3 user-description">
                  <div className="container">
                    <div className="row">
                      <div className="col-md-3 user-description">
                        <div className="panel panel-default">
                          <div className="panel-body ">

                            <div className="row">
                              <div className="col-md-6">
                                <div className="media">
                                  <div className="media-body">
                                    <a href="https://twitter.com/NASA">
                                      <font size="+1" color="black">Settings</font>
                                    </a>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div className="btn-group pull-right" role="group">
                                  <button type="button" className="btn btn-default ">
                                    <font size="-1" color="009a3d">Edit</font>
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="row profile-update">
                              <div className="col-md-10">
                                <div className="media">

                                  <ul className="nav nav-pills nav-stacked accounts user-description">
                                    <li role="presentation">
                                      <a href="#">
                                        <span className="glyphicon glyphicon-pencil"></span>
                                          Name</a>
                                      </li>
                                      <li role="presentation">
                                        <a href="#"><span className="glyphicon glyphicon-envelope"></span>
                                           Email</a>
                                      </li>
                                      <li role="presentation">
                                        <a href="#"><span className="glyphicon glyphicon-home"></span>
                                          Password</a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          )
        }
      }
