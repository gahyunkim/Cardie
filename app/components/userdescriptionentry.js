import React from 'react';

export default class UserDescriptionEntry extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };
  }

  handlePost(e) {
    // Prevent the event from "bubbling" up the DOM tree.
    e.preventDefault();
    // Trim whitespace from beginning + end of entry.
    var statusUpdateText = this.state.value.trim();
    if (statusUpdateText !== "") {
      this.props.onPost(statusUpdateText)
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
}
