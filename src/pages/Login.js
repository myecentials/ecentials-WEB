import React, { Component } from "react";
import logo from "../logo.svg";
import briefcase from "../assets/icons/svg/briefcase.svg";
import lock from "../assets/icons/svg/lock.svg";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    isLoggedIn: false,
  };
  render() {
    return (
      <div className="container">
        <div className="contain">
          <div className="card login  shadow-lg border-0">
            <img src={logo} alt="" className=" mx-auto mt-4" width={120} />
            <div className="card-body">
              <h5 className="card-title  mt-4">Welcome Back</h5>
              <p className="light-text text-sm ">
                Login for{" "}
                <Link
                  to=""
                  className="text-primary bold-font text-decoration-none"
                >
                  admin
                </Link>
              </p>
              <div className="form-group ">
                <div class="form-floating mb-4">
                  <input
                    type="email"
                    class="form-control"
                    id="email"
                    placeholder="Business ID"
                  />
                  <label for="email" className="light-text">
                    <img src={briefcase} alt="" className="mb-2" />
                    <span className="mx-4">Business ID</span>
                  </label>
                </div>
                <div class="form-floating">
                  <input
                    type="password"
                    class="form-control"
                    id="password"
                    placeholder="Password"
                  />
                  <label for="password" className="light-text">
                    <img src={lock} alt="" className="mb-2" />
                    <span className="mx-4">Password</span>
                  </label>
                </div>

                <div className="row justify-content-center mt-3 ">
                  <div className="col-8">
                    <div class="form-check ">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        value=""
                        id="rememberme"
                      />
                      <label
                        class="form-check-label light-text "
                        for="rememberme"
                      >
                        Remember Me
                      </label>
                    </div>
                  </div>

                  <div className="col-4">
                    <Link
                      to=""
                      className="text-primary light-text forgot-password"
                    >
                      Forgot Password
                    </Link>
                  </div>
                </div>
                <input
                  type="submit"
                  value="Sign in"
                  className="btn btn-primary w-100 mt-4 bold-font btn-auth"
                />
                <p className="mt-4  text-center small">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-primary text-decoration-none"
                  >
                    sign up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
