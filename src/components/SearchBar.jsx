import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = (props) => {
  return (
    <div
      className={props.border && "form-group border"}
      style={{ borderRadius: props.radius }}
    >
      <div
        className="input-group bg-white "
        style={{ borderRadius: props.radius }}
      >
        <button className="input-group-addon border-0 p-2 mx-2 rounded-circle search-btn">
          <BsSearch />
        </button>

        <input
          type="search"
          className="form-control border-0 rounded-pill search"
          placeholder="Search here..."
          name="search"
          onChange={props.onChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;
