import React from "react";
import BreadCrumb from "../../components/BreadCrumb";
import NavIcons from "../../components/NavIcons";
import SideBar from "../../components/SideBar";
import { Helmet } from "react-helmet";
import CustomeNav from "../../components/CustomeNav";
import SearchBar from "../../components/SearchBar";
import GroupsChat from "../../components/GroupsChat";
import video from "../../assets/icons/svg/video.svg";
import morevert from "../../assets/icons/svg/morevert.svg";
import send from "../../assets/icons/svg/send.svg";
import sendfile from "../../assets/icons/svg/sendfile.svg";
import { useState } from "react";
import Header from "../../components/Header";
import PharmacyName from "../../components/PharmacyName";

const Chat = () => {
  const [sender, setSender] = useState("");
  const [senderText, setSenderText] = useState([]);
  const handleChange = (e) => {
    setSender(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (sender) {
      const textMessages = { sender };
      setSenderText((senderText) => {
        return [...senderText, textMessages];
      });

      setSender("");
    } else {
      console.log("Please  type a message");
    }
  };

  let objToday = new Date(),
    weekday = new Array(
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ),
    dayOfWeek = weekday[objToday.getDay()],
    domEnder = (function () {
      let a = objToday;
      if (/1/.test(parseInt((a + "").charAt(0)))) return "th";
      a = parseInt((a + "").charAt(1));
      return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th";
    })(),
    dayOfMonth =
      today + (objToday.getDate() < 10)
        ? "0" + objToday.getDate() + domEnder
        : objToday.getDate() + domEnder,
    months = new Array(
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ),
    curMonth = months[objToday.getMonth()],
    curYear = objToday.getFullYear(),
    curHour =
      objToday.getHours() > 12
        ? objToday.getHours() - 12
        : objToday.getHours() < 10
        ? "0" + objToday.getHours()
        : objToday.getHours(),
    curMinute =
      objToday.getMinutes() < 10
        ? "0" + objToday.getMinutes()
        : objToday.getMinutes(),
    curSeconds =
      objToday.getSeconds() < 10
        ? "0" + objToday.getSeconds()
        : objToday.getSeconds(),
    curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
  let today =
    curHour +
    ":" +
    curMinute +
    "." +
    curSeconds +
    curMeridiem +
    " " +
    dayOfWeek +
    " " +
    dayOfMonth +
    " of " +
    curMonth +
    ", " +
    curYear;

  return (
    <>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <Header />

      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar radius="50px" />
        </div>
        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">Settings</h6>
              <p className="small gray-text">
                <span className="text-primary">{dayOfWeek}, </span>
                {dayOfMonth} {curMonth}, {curYear}
              </p>
              <div className="d-flex">
                <BreadCrumb name="Chat" breadcrumb="/orders" hasStyles={true} />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div
            className="row bg-white mx-3 my-5"
            style={{ borderRadius: "10px" }}
          >
            <div
              className="col-md-4"
              style={{ borderRight: "2px solid #f7f6fe" }}
            >
              <div className="mt-4 mx-3">
                <h6 className="text-deep mb-3">Messages</h6>
                <SearchBar border={true} radius="50px" />
                <div>
                  <span className="small gray-text mt-4 mb-3 d-block">
                    Groups
                  </span>
                  <GroupsChat
                    heading="Sales Team"
                    bgImage="circle rounded-circle ms-bg"
                    hasmessage={true}
                  />
                  <GroupsChat
                    heading="Advert Team"
                    bgImage="circle rounded-circle tomato"
                    hasmessage={true}
                  />
                  <GroupsChat
                    heading="All Staff"
                    bgImage="circle rounded-circle bg-warning"
                  />
                </div>
                <div>
                  <span className="small gray-text mt-4 mb-3 d-block">
                    Chats
                  </span>
                  <GroupsChat
                    heading="Andrews Opoku"
                    bgImage="circle rounded-circle bg-user"
                    hasmessage={true}
                  />
                  <GroupsChat
                    heading="Jennifer Harrison"
                    bgImage="circle rounded-circle bg-user"
                    hasmessage={true}
                  />
                  <GroupsChat
                    heading="Nana Quame"
                    bgImage="circle rounded-circle bg-user"
                  />
                </div>
                <div className="btn mb-4 rounded-pill bg-user d-block text-purple">
                  <b>View More</b>
                </div>
              </div>
            </div>
            <div className="col-md-8 chat_message__container">
              <div className="mt-4 ">
                <div className="d-flex justify-content-between mx-3">
                  <div className="d-flex">
                    <div className="circle rounded-circle bg-user"></div>
                    <div className="mx-2">
                      <h6 className="text-deep">Andrews Opoku</h6>
                      <div className="d-flex align-items-center line">
                        <span
                          className="bg-success rounded-circle"
                          style={{ width: "0.6rem", height: "0.6rem" }}
                        ></span>
                        <div className="gray-text small mx-2">online</div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex">
                    <img
                      src={video}
                      alt=""
                      width={20}
                      style={{ cursor: "pointer" }}
                    />
                    <img
                      src={morevert}
                      alt=""
                      width={20}
                      className="mx-3"
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                </div>
                <div></div>
                <hr className="bg-user" />
              </div>
              <div className="sender mt-4 mx-3 text-deep chat_container__layout">
                <ul>
                  {senderText.map((items, index) => (
                    <li key={index} className="chat_container__sender_message">
                      {items.sender}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="chat_message__box">
                <hr />
                <form className="chat_message__form">
                  <div className="form-group chat_message__box_form-group">
                    <input
                      className="form-control rounded-pill py-2"
                      type="text"
                      placeholder="Write your message..."
                      value={sender}
                      onChange={handleChange}
                    />
                    <div className="bg-white rounded-pill chat_message__box_btn d-flex align-items-center">
                      <button className="btn border-0">
                        <img src={sendfile} alt="" width={20} />
                      </button>
                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="btn px-1 ms-bg rounded text-white rounded-pill d-flex justify-content-center align-items-center"
                      >
                        <span className="mx-2">send</span>
                        <img src={send} alt="" width={20} />
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
