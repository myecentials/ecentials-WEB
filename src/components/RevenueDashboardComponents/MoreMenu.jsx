import React from "react";
import { Collapse } from "reactstrap";

import recycle from "../../assets/icons/svg/recycle.svg";
import download from "../../assets/icons/svg/download.svg";
import remove from "../../assets/icons/svg/trash_full.svg";

const MoreMenu = (props) => {
  return (
    <Collapse isOpen={props.isOpen}>
      <div className="card bg-white shadow border-0 revenue_collapse">
        <div className="my-2">
          <ul className="users_revenue_list">
            <li className="gray-text users_list">Delivery</li>
            <li className="users_list users_list__list">
              <img src={recycle} alt="" />
              <span className="mx-2 small">Refresh Data</span>
            </li>
            <li className="users_list users_list__list">
              <img src={download} alt="" />
              <span className="mx-2 small">Download(as CSV)</span>
            </li>
            <li className="users_list users_list__list">
              <img src={remove} alt="" />
              <span className="mx-2 small">Remove Section</span>
            </li>
          </ul>
        </div>
      </div>
    </Collapse>
  );
};

export default MoreMenu;
