import React, { Component } from "react";
import { InputGroup, Button, Input } from "reactstrap";
import { BsSearch } from "react-icons/bs";

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <div className="search-bar card border-0">
        <input type="search" placeholder="Search here..." />
      </div>
    );
  }
}

export default SearchBar;
