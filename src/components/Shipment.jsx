import React from "react";
import chat from "../assets/icons/svg/chat.svg";
import { BsThreeDots } from "react-icons/bs";

const Shipment = () => {
  return (
    <div
      className="shipment card border-0 mb-5"
      style={{ borderRadius: "10px" }}
    >
      <div className="d-flex mt-4 mx-3 justify-content-between align-items-center">
        <h6>Awaiting shipments</h6>

        <input
          type="number"
          min={0}
          placeholder="Days Left"
          className="form-control w-25 form-control-sm rounded-pill"
        />
      </div>
      <div>
        <table className="table mt-4 table-borderless">
          <thead className="text-deep">
            <tr>
              <th className="text-center">Customer</th>
              <th className="text-center">Order ID</th>
              <th className="text-center">Days Left</th>
              <th>Order Value</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="">
                <div className="d-flex align-items-center">
                  <span className="circle rounded-circle circle-bg"></span>
                  <span className="text-deep mx-2">
                    <b>Andrews Opoku</b>
                  </span>
                </div>
              </td>
              <td className="text-lightdeep  d-flex align-items-center justify-content-center">
                <h6 className="my-2">ID 123456789</h6>
              </td>
              <td>
                <p className="circle rounded-circle bg-danger mx-auto my-auto text-white">
                  05
                </p>
              </td>
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-deep mt-2">$ 50,036</p>
                  <img src={chat} alt="" width={25} />
                  <BsThreeDots className="gray-text mx-3" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="">
                <div className="d-flex align-items-center">
                  <span className="circle rounded-circle circle-bg"></span>
                  <span className="text-deep mx-2">
                    <b>Anthony Amponsah</b>
                  </span>
                </div>
              </td>
              <td className="text-lightdeep  d-flex align-items-center justify-content-center">
                <h6 className="my-2">ID 987654321</h6>
              </td>
              <td>
                <p className="circle rounded-circle bg-danger mx-auto my-auto text-white">
                  05
                </p>
              </td>
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-deep mt-2">$ 50,036</p>
                  <img src={chat} alt="" width={25} />
                  <BsThreeDots className="gray-text mx-3" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="">
                <div className="d-flex align-items-center">
                  <span className="circle rounded-circle circle-bg"></span>
                  <span className="text-deep mx-2">
                    <b>Nana Quame</b>
                  </span>
                </div>
              </td>
              <td className="text-lightdeep  d-flex align-items-center justify-content-center">
                <h6 className="my-2">ID 987456321</h6>
              </td>
              <td>
                <p className="circle rounded-circle bg-danger mx-auto my-auto text-white">
                  05
                </p>
              </td>
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-deep mt-2">$ 50,036</p>
                  <img src={chat} alt="" width={25} />
                  <BsThreeDots className="gray-text mx-3" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="">
                <div className="d-flex align-items-center">
                  <span className="circle rounded-circle circle-bg"></span>
                  <span className="text-deep mx-2">
                    <b>Jennifer Harrison</b>
                  </span>
                </div>
              </td>
              <td className="text-lightdeep  d-flex align-items-center justify-content-center">
                <h6 className="my-2">ID 123987456</h6>
              </td>
              <td>
                <p className="circle rounded-circle bg-danger mx-auto my-auto text-white">
                  05
                </p>
              </td>
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-deep mt-2">$ 50,036</p>
                  <img src={chat} alt="" width={25} />
                  <BsThreeDots className="gray-text mx-3" />
                </div>
              </td>
            </tr>
            <tr>
              <td className="">
                <div className="d-flex align-items-center">
                  <span className="circle rounded-circle circle-bg"></span>
                  <span className="text-deep mx-2">
                    <b>Jesse Annim</b>
                  </span>
                </div>
              </td>
              <td className="text-lightdeep  d-flex align-items-center justify-content-center">
                <h6 className="my-2">ID 456895123</h6>
              </td>
              <td>
                <p className="circle rounded-circle bg-danger mx-auto my-auto text-white">
                  05
                </p>
              </td>
              <td>
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-deep mt-2">$ 50,036</p>
                  <img src={chat} alt="" width={25} />
                  <BsThreeDots className="gray-text mx-3" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <div className="d-flex justify-content-between align-items-center mx-2 mb-5">
          <p className="small">
            Showing <span className="text-lightdeep">1-5</span> from{" "}
            <span className="text-lightdeep">100</span> data
          </p>
          <div className="d-flex">
            <div className="circle rounded-circle circle-bgdeep text-white">
              1
            </div>
            <div className="circle rounded-circle mail mx-2">2</div>
            <div className="circle rounded-circle mail">3</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shipment;
