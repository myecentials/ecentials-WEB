import React from "react";
import { Collapse } from "reactstrap";
import { BsSearch } from "react-icons/bs";
import { useState } from "react";

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className="form-group">
      <div className="input-group bg-white rounded-pill">
        <button
          className="input-group-addon border-0 p-2 mx-2 rounded-circle search-btn"
          onClick={handleClick}
        >
          <BsSearch />
        </button>
        <Collapse isOpen={isOpen} horizontal={true}>
          <input
            type="text"
            className="form-control border-0 rounded-pill"
            placeholder="Search here..."
          />
        </Collapse>
      </div>
    </div>
  );
};

export default SearchBar;
