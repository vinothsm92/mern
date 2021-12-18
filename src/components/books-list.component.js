import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Books = (props) => (
  <tr>
    <td>{props.books._id}</td>
    <td>{props.books.name}</td>
    <td>{props.books.author}</td>
    <td>{props.books.isbn}</td>


  </tr>
)

export default class BooksList extends Component {
  constructor(props) {
    super(props);


    this.state = { books: [], sortField: "", sortType: false, pageNo: 0, pageSize: 5 };
    this.sort = this.sort.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/books?size=' + this.state.pageSize)
      .then(response => {

        this.setState({ books: response.data,pageNo:0,sortField: "", sortType: false })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  pagination(e) {
    var pageNo = e;

    if (e == "last") {
      var Quotient = this.state.books[0].count % this.state.pageSize;
      pageNo=Math.ceil(this.state.books[0].count /this.state.pageSize)-1;
     

    }
    axios.get('http://localhost:5000/api/books?page=' + pageNo + '&size=' + this.state.pageSize)
      .then(response => {

        this.setState({ books: response.data, pageNo: pageNo ,sortField: "", sortType: false,})
      })
      .catch((error) => {
        console.log(error);
      })
  }

  sort(e) {
    this.setState({ sortField: e, sortType: true });
    axios.get('http://localhost:5000/api/books?title='+e+'&page=' + this.state.pageNo + '&size=' + this.state.pageSize)
    .then(response => {

      this.setState({ books: response.data, pageNo: this.state.pageNo ,sortField: this.state.sortField})
    })
    .catch((error) => {
      console.log(error);
    })
  }


  booksList() {
    if (this.state.books.length != 0)
      return this.state.books[0].data.map((currentbooks, i) => {
        return <Books books={currentbooks} index={i} key={currentbooks._id} />;
      })
  }

  cancel() {

  }
  render() {
    return (
      <div>
        <h3>Books List</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
            {/* <div>
                {!this.state.sortType ? <i class="fa fa-sort-desc" aria-hidden="true"></i> : <i class="fa fa-sort-asc" aria-hidden="true"></i>}
              </div> */}
              <th onClick={() => this.sort("_id")}>Id {this.state.sortField == "_id" ?  <i class="fa fa-sort-asc" aria-hidden="true"></i>: <i class="fa fa-fw fa-sort"></i>}</th>
              <th onClick={() => this.sort("name")}>Name {this.state.sortField == "name" ? <i class="fa fa-sort-asc" aria-hidden="true"></i> : <i class="fa fa-fw fa-sort"></i>}</th>
              <th onClick={() => this.sort("author")}>Author {this.state.sortField == "author" ? <i class="fa fa-sort-asc" aria-hidden="true"></i> : <i class="fa fa-fw fa-sort"></i>}</th>
              <th onClick={() => this.sort("isdn")}>ISBN {this.state.sortField == "isdn" ? <i class="fa fa-sort-asc" aria-hidden="true"></i> : <i class="fa fa-fw fa-sort"></i>}</th>

            </tr>
          </thead>
          <tbody>
            {this.booksList()}
          </tbody>
        </table>
        <div>

          <div style={{ float: "left", width: "100%" }}>
            {this.state.books.length == 0 ? null : <div><input type="submit" style={{ marginLeft: "1%" }} onClick={this.componentDidMount.bind(this)} value="First" className="btn btn-secondary" />
              <input type="submit" style={{ marginLeft: "1%" }} onClick={() => this.pagination(this.state.pageNo - 1)} value="<" className="btn btn-secondary" />
             {Math.ceil(this.state.books[0].count /this.state.pageSize)-1==this.state.pageNo ?null: <input type="submit" style={{ marginLeft: "1%" }} onClick={() => this.pagination(this.state.pageNo + 1)} value=">" className="btn btn-secondary" />}
             {Math.ceil(this.state.books[0].count /this.state.pageSize)-1==this.state.pageNo ?null:  <input type="submit" style={{ marginLeft: "1%" }} onClick={() => this.pagination("last")} value="Last" className="btn btn-secondary" />}
            </div>}
          </div>
          <div style={{ float: "right", margin: "-2%" }}>
            Total of {this.state.books.length == 0 ? 0 : this.state.books[0].count} Records
          </div>
        </div>
      </div>
    )
  }
}