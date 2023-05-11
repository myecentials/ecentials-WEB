import React from "react";
import { BsSearch } from "react-icons/bs";

const Search = () => {
  return (
    <div
      className="bg rounded-pill d-inline-block search_container"
      style={{ padding: "2px" }}
    >
      <input
        type="search"
        placeholder="Search"
        className="rounded-pill border-0 bg search_header"
      />
      <span
        className="bg-primary rounded-pill px-2 text-white"
        style={{ cursor: "pointer" }}
      >
        <BsSearch style={{ fontSize: "12px" }} />
      </span>
    </div>
  );
};

export default Search;
