import React from "react";
import { BsSearch } from "react-icons/bs";

const SearchBar = () => {
  const handleClick = () => {};
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
        />
      </div>
    </div>
  );
};

export default SearchBar;
