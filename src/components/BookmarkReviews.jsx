import React, { useState } from "react";

import star from "../assets/icons/svg/Star.svg";
import bookmark from "../assets/icons/svg/bookmark.svg";
import eye from "../assets/icons/svg/blueeye.svg";
import { Table } from "reactstrap";
import orders from "../static/orders";

const BookmarkReviews = () => {
  const [data, setData] = useState(orders);
  return data.map(({ name, desc, image }) => (
    <tr>
      <td>
        <div className="d-flex">
          <span
            className="rounded bg-light d-flex justify-content-center align-items-center"
            style={{
              height: "3rem",
              width: "3rem",
            }}
          >
            <img
              src={image}
              alt=""
              style={{
                height: "2.5rem",
                width: "2.5rem",
                borderRadius: "10px",
              }}
            />
          </span>
          <span className="mx-2 text-nowrap">{name.findName()}</span>
        </div>
      </td>
      <td style={{ textOverflow: "ellipsis" }}>
        {" "}
        <span className="gray-text">{desc}</span>
      </td>
      <td>
        <div className="d-flex">
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
          <img src={star} alt="" />
        </div>
      </td>
      <td>26/07/2020</td>
      <td>
        <div className="d-flex">
          <img src={bookmark} alt="" className="btn btn-white border" />
          <img src={eye} alt="" className="btn btn-white border mx-2" />
        </div>
      </td>
    </tr>
  ));
};

export default BookmarkReviews;
