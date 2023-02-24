import React, { useEffect } from "react";
import Config from "./config/config";
import "bootstrap/dist/css/bootstrap.css";
import "./assets/styles/global.css";
import "./assets/styles/index.css";
import { useNavigate } from "react-router-dom";

function App() {
//  const act = useEffect(null)
  return (
    <>
      <Config />
    </>
  );
}

export default App;
