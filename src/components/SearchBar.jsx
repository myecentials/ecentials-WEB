import React, { Component } from "react";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

class SearchBar extends Component {
  state = {};
  render() {
    return (
      <div className="form-group">
        <div className="input-group bg-white rounded-pill">
          <button className="input-group-addon border-0 p-2 mx-2 rounded-circle search-btn">
            <BsSearch />
          </button>
          <input
            type="text"
            className="form-control border-0 rounded-pill"
            placeholder="Search here..."
            style={{ outlineColor: "none" }}
          />
        </div>
      </div>
    );
  }
}

export default SearchBar;
