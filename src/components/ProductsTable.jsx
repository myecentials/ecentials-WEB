import React from "react";
import { Table } from "reactstrap";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";

const ProductsTable = () => {
  return (
    <div className="mx-3 card bg-white border-0">
      <p className="ms-bg py-2 my-0 text-white small ">
        <span className="mx-2">Showing entries</span>
      </p>
      <div className="table-responsive">
        <table className="bg-white  table-striped table-borderless table">
          <thead className="text-deep">
            <tr className="small">
              <th className="text-nowrap">Products ID</th>
              <th className="text-nowrap">Name</th>
              <th className="text-nowrap">Image</th>
              <th className="text-nowrap">Dose</th>
              <th className="text-nowrap">Category</th>
              <th className="text-nowrap">Selling Price(GHC)</th>
              <th className="text-nowrap">Total Item</th>
              <th className="text-nowrap">Expiration Date</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
            <tr>
              <td className="py-4">#12345</td>
              <td className="py-4">Acetamenophen</td>
              <td className="py-4"></td>
              <td className="py-4">500mg</td>
              <td className="py-4">Oral</td>
              <td className="py-4">300</td>
              <td className="py-4">150</td>
              <td className="py-4">04/05/2023</td>
            </tr>
          </tbody>
        </table>
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

export default ProductsTable;
