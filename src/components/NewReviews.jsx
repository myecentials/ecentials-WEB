import React, { useState } from "react";

import star from "../assets/icons/svg/Star.svg";
import bookmark from "../assets/icons/svg/bookmark.svg";
import eye from "../assets/icons/svg/blueeye.svg";
import bookmarkOutlined from "../assets/icons/svg/bookmarkoutlined.svg";
import { Table } from "reactstrap";
import orders from "../static/orders";

const NewReviews = () => {
  const [data, setData] = useState(orders);
  return data.map(({ name, desc, image }) => (
    <tr className="" style={{ height: "1rem" }}></tr>
  ));
};

export default NewReviews;
