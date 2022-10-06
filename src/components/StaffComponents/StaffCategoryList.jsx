import React from "react";
import { Table } from "reactstrap";
import leftchev from "../../assets/icons/svg/leftchev.svg";
import rightchev from "../../assets/icons/svg/rightchev.svg";
import edit from "../../assets/icons/svg/edit.svg";
import bin from "../../assets/icons/svg/bin.svg";
import eye from "../../assets/icons/svg/eye.svg";
import add from "../../assets/icons/svg/adddeep.svg";
import file from "../../assets/icons/svg/file.svg";
import xfile from "../../assets/icons/svg/xfile.svg";
import csvfile from "../../assets/icons/svg/csvfile.svg";
import pdf from "../../assets/icons/svg/pdf.svg";

import chev from "../../assets/icons/svg/chevfilldown.svg";
import updownchev from "../../assets/icons/svg/updownchev.svg";
import { Link } from "react-router-dom";

const StaffCategoryList = () => {
  return (
    <div className=" card bg-white border-0">
      <div className="d-flex flex-md-row gy-md-0 flex-column justify-content-between ms-bg py-2 gy-md-0 gy-2 t-header">
        <div className="">
          <div className=" my-0 text-white small ">
            <span className="mx-2">
              Showing{" "}
              <span className="btn btn-light">
                10 <img src={chev} alt="" width={10} />
              </span>{" "}
              entries
              <span>
                <input
                  type="text"
                  className="search ms-bg border mx-2 my-md-0 my-2 rounded text-white"
                  placeholder="search..."
                />
              </span>
            </span>
          </div>
        </div>
        <div className="my-md-0 my-2">
          <div className="mx-4 d-flex flex-wrap">
            <span>
              <div className="btn d-flex btn-light">
                <img src={eye} alt="" />
                <span className="small mx-2" style={{ color: "#4D44B5" }}>
                  Products
                </span>
              </div>
            </span>
            <span className="mx-2">
              <Link to="/staff-products/add-categories">
                <div className="btn d-flex btn-light">
                  <img src={add} alt="" />
                  <span
                    className="small mx-2 text-nowrap"
                    style={{ color: "#4D44B5" }}
                  >
                    Add Category
                  </span>
                </div>
              </Link>
            </span>
            <span className="d-flex my-sm-0">
              <img src={file} alt="" style={{ cursor: "pointer" }} />
              <img
                src={xfile}
                alt=""
                className="mx-2"
                style={{ cursor: "pointer" }}
              />
              <img
                src={csvfile}
                alt=""
                className="mx-2"
                style={{ cursor: "pointer" }}
              />
              <img
                src={pdf}
                alt=""
                className="mx-2"
                style={{ cursor: "pointer" }}
              />
            </span>
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <Table borderless bgcolor="white" striped>
          <thead className="text-deep">
            <tr className="small">
              <th></th>
              <th></th>
              <th className="text-nowrap">Index</th>
              <th className="text-nowrap">Category Name</th>
              <th className="text-nowrap">
                <img src={updownchev} alt="" className="mx-1" />
                Status
              </th>
              <th className="text-nowrap ">
                <img src={updownchev} alt="" className="mx-1" />
                Action
              </th>

              <th className="text-nowrap"></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              <td></td>
              <td className="py-3">1</td>
              <td className="py-3">Medicine</td>

              <td className="py-3">Active</td>
              <td className="py-3">
                <img src={edit} alt="" />
              </td>
              <td className="py-3">
                <img src={bin} alt="" />
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="py-3">2</td>
              <td className="py-3">Medicine</td>

              <td className="py-3">Inactive</td>
              <td className="py-3">
                <img src={edit} alt="" />
              </td>
              <td className="py-3">
                <img src={bin} alt="" />
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="py-3">3</td>
              <td className="py-3">Medicine</td>

              <td className="py-3">Active</td>
              <td className="py-3">
                <img src={edit} alt="" />
              </td>
              <td className="py-3">
                <img src={bin} alt="" />
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="py-3">4</td>
              <td className="py-3">Medicine</td>

              <td className="py-3">Active</td>
              <td className="py-3">
                <img src={edit} alt="" />
              </td>
              <td className="py-3">
                <img src={bin} alt="" />
              </td>
              <td></td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td className="py-3">5</td>
              <td className="py-3">Medicine</td>

              <td className="py-3">Inactive</td>
              <td className="py-3">
                <img src={edit} alt="" />
              </td>
              <td className="py-3">
                <img src={bin} alt="" />
              </td>
              <td></td>
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

export default StaffCategoryList;
