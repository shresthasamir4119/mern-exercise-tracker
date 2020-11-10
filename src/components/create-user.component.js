import React, { Component } from "react";

import axios from "axios";

export default class CreateUser extends Component {
  /**
   * Constructor.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      username: "",
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Function on username change.
   *
   * @param {Object} e
   */
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }

  /**
   * Function for form submit.
   *
   * @param {Object} e
   */
  onSubmit(e) {
    e.preventDefault();

    const user = {
      username: this.state.username,
    };

    axios
      .post("http://localhost:5000/users/add", user)
      .then((res) => console.log(res.data));

    console.log(user);

    this.setState({
      username: "",
    });
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Username: </label>
            <input
              type="text"
              onChange={this.onChangeUsername}
              value={this.state.username}
            ></input>
          </div>

          <div className="form-group">
            <input
              type="submit"
              className="btn btn-primary"
              value="Create Exercise Log"
              onChange={this.onSubmit}
            ></input>
          </div>
        </form>
      </div>
    );
  }
}
