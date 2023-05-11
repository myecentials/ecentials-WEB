import React from "react";

const GroupsChat = (props) => {
  return (
    <div>
      <div className="d-flex justify-content-between">
        <div className="d-flex ">
          <div className={props.bgImage}></div>
          <div
            className="d-flex flex-column  mx-2 align-ietms-center"
            style={{ width: "10rem" }}
          >
            <h6 className="text-deep">{props.heading}</h6>
            <p className="small gray-text truancate">
              Lorem ipsum dolor sit amet. Lorem, ipsum dolor.
            </p>
          </div>
        </div>
        <div className="d-flex line flex-column align-items-end">
          <p className="gray-text small text-nowrap mb-4">12:05 pm</p>
          {props.hasmessage && (
            <div
              className="tomato small rounded-circle text-white d-flex justify-content-center align-items-center"
              style={{ minWidth: "1.2rem", minHeight: "1.2rem" }}
            >
              5
            </div>
          )}
        </div>
      </div>
      <hr className="mt-0 bg-user" />
    </div>
  );
};

export default GroupsChat;
