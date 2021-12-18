import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.onChangename = this.onChangename.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      author: "",
      isbn: ""
    }
  }

  onChangename(e) {
    debugger
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  cancel() {
    this.setState({
      name: '',
      author: "",
      isbn: ""
    })
  }
  onSubmit(e) {
    e.preventDefault();
    axios.post('http://localhost:5000/api/add', this.state)
      .then(res => console.log(res.data));
    this.cancel()

  }

  render() {
    const { name, author, isbn } = this.state;
    return (
      <div>
        <h3>Create New Book</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Name: </label>
            <input type="text"
              required
              name="name"
              className="form-control"
              value={this.state.name}
              autoComplete='off'
              onChange={this.onChangename}
            />
          </div>
          <div className="form-group">
            <label>Author: </label>
            <input type="text"
              required
              name="author"
              autoComplete='off'
              className="form-control"
              value={this.state.author}
              onChange={this.onChangename}
            />
          </div>
          <div className="form-group">
            <label>ISBN: </label>
            <input type="text"
              required
              name="isbn"
              autoComplete='off'
              className="form-control"
              value={this.state.isbn}
              onChange={this.onChangename}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create User" disabled={name == "" || author == "" || isbn == "" ? true : false} className="btn btn-primary" />
            <input type="submit" style={{marginLeft:"1%"}} onClick={this.cancel.bind(this)} value="cancel" className="btn btn-secondary" />
          </div>
        </form>
      </div>
    )
  }
}