import React from 'react';
import UserDescriptionEntry from './userdescriptionentry';
import {getUserProfile} from '../server';
import {createUserDescription} from '../server';

export default class User extends React.Component{
  constructor(props) {
    // super() calls the parent class constructor --
    // e.g. React.Component's constructor.
    super(props);
    this.state = props.data
  }

  handleUserDescription(e) {
    e.preventDefault();
    var userDescriptionText = this.state.value.trim();
    if (userDescriptionText !== "") {
      createUserDescription(e, this.props.user, (updatedUserDescription) =>
      {this.setState(updatedUserDescription)})
    }
  }

  /**
  * Called when the user types a character into the status update box.
  * @param e An Event object.
  */
  handleChange(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // e.target is the React Virtual DOM target of the
    // input event -- the <textarea> element. The textarea's
    // `value` is the entire contents of what the user has
    // typed in so far.
    this.setState({value: e.target.value});
  }

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

                    <UserDescriptionEntry user={this.props.user}
                      description = {userData.description}
                      email = {userData.email}>
                    </UserDescriptionEntry>


                <div className="row profile-update">
                  <div className="col-md-12">
                    <div className="media">
                      <div className="media-body description">
                        <font size="+1" color="black">Skills</font>
                          <div className="media-body">
                            <font size="+0.5" color="black">{this.props.description}</font>
                          </div>
                          <div className="description">
                          <textarea className="form-control"
                            rows="2"
                            placeholder= "Add a skill!"
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row profile-update">
                  <div className="col-md-12">
                    <div className="media">
                      <div className="media-body description">
                        <font size="+1" color="black">Education</font>
                          <div className="media-body">
                            <font size="+0.5" color="black">{this.props.description}</font>
                          </div>
                          <div className="description">
                          <textarea className="form-control"
                            rows="2"
                            placeholder= "Add a skill!"
                            onChange={(e) => this.handleChange(e)} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row profile-update">
                  <div className="col-md-12">
                    <div className="media">
                      <div className="media-body description">
                        <font size="+1" color="black">Certification</font>
                          <div className="media-body">
                            <font size="+0.5" color="black">{this.props.description}</font>
                          </div>
                          <div className="description">
                          <textarea className="form-control"
                            rows="2"
                            placeholder= "Add a skill!"
                            onChange={(e) => this.handleChange(e)} />
                        </div>
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
                <div className="col-md-4 user-description">
                  <div className="panel panel-default">
                    <div className="panel-body ">

                      <div className="row">
                        <div className="col-md-6">
                          <div className="media">
                            <div className="media-body">
                              <font size="+1" color="black">Information</font>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="row profile-update">
                        <div className="col-md-10">
                          <div className="media">

                            <ul className="nav nav-pills nav-stacked accounts user-description">
                              <li role="presentation">
                                <a href="#">
                                  <span className="glyphicon glyphicon-user"></span>
                                  {userData.fullName}</a>
                              </li>
                              <li role="presentation">
                                <a href="#"><span className="glyphicon glyphicon-envelope"></span>
                                {userData.email}</a>
                            </li>
                            <li role="presentation">
                              <a href="#"><span className="glyphicon glyphicon-home"></span>
                              {userData.location}</a>
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
