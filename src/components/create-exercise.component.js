import React, { Component } from "react";

import axios from "axios";

import DatePicker from "react-date-picker";

export default class CreateExercise extends Component {
  /**
   * Constructor.
   *
   * @param {Object} props
   */
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      description: "",
      duration: 0,
      date: new Date(),
      users: [],
    };

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  /**
   * Lifecycle.
   */
  componentDidMount() {
    axios.get("http://localhost:5000/users").then((res) => {
      if (res.data.length > 0) {
        this.setState({
          users: res.data.map((user) => user.username),
          username: res.data[0].username,
        });
      }
    });
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
   * Function on description change.
   *
   * @param {Object} e
   */
  onChangeDescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  /**
   * Function on duration change.
   *
   * @param {Object} e
   */
  onChangeDuration(e) {
    this.setState({
      duration: Number(e.target.value),
    });
  }

  /**
   * Function on Date change.
   *
   * @param {Date} date
   */
  onChangeDate(date) {
    this.setState({
      date: date,
    });
  }

  /**
   * Function for form submit.
   *
   * @param {Object} e
   */
  onSubmit(e) {
    e.preventDefault();

    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date,
    };

    axios
      .post("http://localhost:5000/exercises/add", exercise)
      .then((res) => console.log(res.data));

    console.log(exercise);

    console.log(this.state);

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Exercise Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label> Username: </label>
            <select
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map((user) => {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input
              type="text"
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
            ></input>
          </div>
          <div className="form-group">
            <label>Duration (in Minutes): </label>
            <input
              type="text"
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
            ></input>
          </div>
          <div className="form-group">
            <label>Date: </label>
            <DatePicker
              value={this.state.date}
              onChange={this.onChangeDate}
            ></DatePicker>
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
