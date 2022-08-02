import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import logo from "../logo.svg";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCounter] = useState(0);

  useEffect(() => {
    setInterval(() => setCounter(count + 5), 1000);

    // setIsLoading(false);
  });
  if (isLoading) {
    return <Loading load={count} />;
  }
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <div className="contain">
        <h1 className="text-center">
          <span>
            <img src={logo} alt="" className="mb-4" width={150} />
          </span>{" "}
        </h1>
        <Link to="login">
          <h6>Go to Login</h6>
        </Link>
      </div>
      <Footer />
    </>
  );
};

export default Home;
