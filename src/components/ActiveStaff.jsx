import React, { useState } from "react";
import email from "../assets/icons/svg/email.svg";
import activeStaff from "../static/activeStaff";

const ActiveStaff = () => {
  const [clicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(!clicked);
  };
  return (
    <>
      {activeStaff.map(({ image, name, field }) => (
        <div className="d-flex justify-content-between align-items-start">
          <div className="d-flex">
            <div
              className="circle rounded-circle"
              style={{ backgroundColor: "#c1bbeb", width: 40, height: 40 }}
            >
              <img
                src={image}
                alt=""
                className="rounded-circle"
                width={45}
                height={45}
              />
            </div>
            <div className="mx-2">
              <h6 className="text-deep">{name.findName()}</h6>
              <p className="gray-text">{field}</p>
            </div>
          </div>

          <div className="">
            <div
              className={
                clicked
                  ? "circle mail rounded-circle ms-bg"
                  : "circle mail rounded-circle"
              }
              onClick={handleClick}
            >
              <svg
                width="23"
                height="16"
                viewBox="0 0 23 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M19.5 0H3.5C2.70435 0 1.94129 0.316071 1.37868 0.87868C0.81607 1.44129 0.5 2.20435 0.5 3V13C0.5 13.7956 0.81607 14.5587 1.37868 15.1213C1.94129 15.6839 2.70435 16 3.5 16H19.5C20.2956 16 21.0587 15.6839 21.6213 15.1213C22.1839 14.5587 22.5 13.7956 22.5 13V3C22.5 2.20435 22.1839 1.44129 21.6213 0.87868C21.0587 0.316071 20.2956 0 19.5 0ZM20.5 12.75L15.6 8.35L20.5 4.92V12.75ZM2.5 4.92L7.4 8.35L2.5 12.75V4.92ZM9.08 9.53L10.93 10.82C11.0974 10.9361 11.2963 10.9984 11.5 10.9984C11.7037 10.9984 11.9026 10.9361 12.07 10.82L13.92 9.53L18.92 14H4.1L9.08 9.53ZM3.5 2H19.5C19.6857 2.00149 19.8673 2.05467 20.0245 2.15358C20.1817 2.25249 20.3083 2.39322 20.39 2.56L11.5 8.78L2.61 2.56C2.69171 2.39322 2.81826 2.25249 2.97545 2.15358C3.13265 2.05467 3.31428 2.00149 3.5 2Z"
                  fill={clicked ? "#ffffff" : "#A098AE"}
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ActiveStaff;
