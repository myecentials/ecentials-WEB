import React from "react";
import { Progress } from "reactstrap";
import logo from "../logo.svg";

const Loading = (props) => {
  return (
    <div className="contain">
      <div>
        <img src={logo} alt="" width={120} />
        <Progress
          value={props.load}
          className="my-3"
          style={{ height: "0.5rem" }}
          animated
        />
      </div>
    </div>
  );
};

export default Loading;
