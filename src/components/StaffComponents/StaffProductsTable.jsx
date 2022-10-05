import React from "react";
import { Table } from "reactstrap";
import leftchev from "../../assets/icons/svg/leftchev.svg";
import rightchev from "../../assets/icons/svg/rightchev.svg";
import oral1 from "../../assets/images/png/oraddrug1.png";
import oral2 from "../../assets/images/png/oraddrug2.png";
import oral3 from "../../assets/images/png/oraddrug3.png";
import oral4 from "../../assets/images/png/tablet1.png";
import chev from "../../assets/icons/svg/chevfilldown.svg";
import updownchev from "../../assets/icons/svg/updownchev.svg";
import eye from "../../assets/icons/svg/eye.svg";

import { Link } from "react-router-dom";

const StaffProductsTable = () => {
  return (
    <div className="mx-3 card bg-white border-0">
      <div className="d-flex justify-content-between ms-bg py-2 gy-md-0 gy-2 t-header">
        <div className=" my-0 text-white small ">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <span className="btn btn-light">
              10 <img src={chev} alt="" width={10} />
            </span>{" "}
            entries
          </span>
        </div>

        <span className="mx-3">
          <Link to="/staff-products/category">
            <div className="btn d-flex btn-light">
              <img src={eye} alt="" />
              <span className="small mx-2" style={{ color: "#4D44B5" }}>
                Category
              </span>
            </div>
          </Link>
        </span>
      </div>
      <div className="table-responsive">
        <Table borderless bgcolor="white" striped>
          <thead className="text-deep">
            <tr className="small">
              <th className="text-nowrap">Products ID</th>
              <th className="text-nowrap">Name</th>
              <th className="text-nowrap">
                <img src={updownchev} alt="" className="mx-1" />
                Image
              </th>
              <th className="text-nowrap ">
                <img src={updownchev} alt="" className="mx-1" />
                Dose
              </th>

              <th className="text-nowrap">
                {" "}
                <img src={updownchev} alt="" className="mx-1" /> Category
              </th>

              <th className="text-nowrap">Selling Price(GHC)</th>
              <th className="text-nowrap">Total Item</th>
              <th className="text-nowrap">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral1} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral2} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral3} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral4} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral1} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral2} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral3} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral4} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral1} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-3">#12345</td>
              <td className="py-3">Acetamenophen</td>
              <td className="py-3">
                <img src={oral2} alt="" />
              </td>
              <td className="py-3">500mg</td>
              <td className="py-3">Oral</td>
              <td className="py-3">300</td>
              <td className="py-3">150</td>
              <td className="py-3">04/05/2023</td>
            </tr>
          </tbody>
        </Table>
      </div>
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
        <p className="small text-center">
          Showing <span className="text-lightdeep">1-10</span> from{" "}
          <span className="text-lightdeep">100</span> data
        </p>
        <div className="d-flex justify-content-center align-items-center">
          <img src={leftchev} alt="" className="mx-3" />
          <div className="circle rounded-circle mail circle-bgdeep text-white">
            1
          </div>
          <div className="circle rounded-circle mail mx-2">2</div>
          <div className="circle rounded-circle mail">3</div>
          <img src={rightchev} alt="" className="mx-3" />
        </div>
      </div>
    </div>
  );
};

export default StaffProductsTable;
