import React from 'react';
import {getUserProfile} from '../server';

export default class User extends React.Component{

  render(){
    var key = this.props.user;
    var str = key.toString();
    // getUserProfile(key);
    return(
      <h1>{str}</h1>
      )
    }
  }
