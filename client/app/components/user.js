import React from 'react';
// import UserDescriptionEntry from './userdescriptionentry.js';
import { getUserProfile } from '../server';
import {Link} from 'react-router';

export default class User extends React.Component{
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state ={}
  }

  refresh(){
    getUserProfile(this.props.user, (user) => {
      this.setState(user);
    })
  }

  componentDidMount(){
    this.refresh();
  }

  render(){
    var userData = this.state;
    return(
      <div>
        <h1>{"Hello, " + userData.username}</h1>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-5 user-description">
                <div className="panel panel-default">
                  <div className="panel-body ">

                    <div>
                      <div className="row">
                        <div className="col-md-6">
                          <font size="+2" color="black">My Info</font>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-12 ">
                          <ul className="nav nav-pills nav-stacked accounts user-description">
                            <li role="presentation">
                              <a>
                                <span className="glyphicon glyphicon-sunglasses"></span>
                                {userData.username}</a>
                            </li>
                            <li role="presentation">
                              <a>
                                <span className="glyphicon glyphicon-user"></span>
                                {userData.fullName}</a>
                            </li>
                            <li role="presentation">
                              <a><span className="glyphicon glyphicon-envelope"></span>
                              {userData.email}</a>
                          </li>
                          <li role="presentation">
                            <a><span className="glyphicon glyphicon-home"></span>
                            {userData.location}</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-3 user-description">
            <div className="container">
              <div className="row">
                <div className="col-md-4 user-description">
                  <div className="panel panel-default">
                    <div className="panel-body ">

                      <div className="row">
                        <div className="col-md-10">
                          <div className="media">
                            <div className="media-body">
                              <font size="+1" color="black">
                                <Link to={"user/" + this.props.user + "/pm"}>
                                  Manage My Products
                                </Link>
                              </font>
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

  </div>

)
}
}
