import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";

import Navbar from "./components/navbar.component"
import BooksList from "./components/books-list.component";
import CreateBooks from "./components/create-books.component";

function App() {
  return (
    <Router>
      <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component={BooksList} />
      {/* <Route path="/create" component={CreateBooks} /> */}
      </div>
    </Router>
  );
}

export default App;
