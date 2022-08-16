import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = (props) => {
  const handleClick = () => {};
  return (
    <div className={props.border && "form-group border rounded-pill"}>
      <div className="input-group bg-white rounded-pill">
        <button className="input-group-addon border-0 p-2 mx-2 rounded-circle search-btn">
          <BsSearch />
        </button>

        <input
          type="search"
          className="form-control border-0 rounded-pill search"
          placeholder="Search here..."
        />
      </div>
    </div>
  );
};

export default SearchBar;
