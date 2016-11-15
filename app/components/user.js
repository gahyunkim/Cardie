import React from 'react';
import {getUserProfile} from '../server';

export default class User extends React.Component{

  render(){
    var userData = getUserProfile(this.props.user);
    return(
      <div>
        <h1>{"Hi, I'm " + userData.username}</h1>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-5 user-description">
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
                        <textarea className="form-control"
                          rows="2"
                          placeholder="Describe yourself!"
                          onChange={(e) => this.handleChange(e)} />
                      </div>
                    </div>


                    <div className="row profile-update">
                      <div className="col-md-5">
                        <div className="media">
                          <div className="media-body description">
                            <font size="+1" color="black">Languages</font>
                            <ul className="nav nav-pills nav-stacked accounts">
                              <li role="presentation">
                              <br></br>
                                English
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row profile-update">
                      <div className="col-md-5">
                        <div className="media">
                          <div className="media-body linked-accounts">
                            <font size="+1" color="black">Linked Accounts</font>
                            <ul className="nav nav-pills nav-stacked accounts">
                              <li role="presentation">
                                <a href="#">
                                  <span className="glyphicon glyphicon-plus fa-fw"></span>
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
                              <font size="+1" color="black">Settings</font>
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

</div>

)
}
}
