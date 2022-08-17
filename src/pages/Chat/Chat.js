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

const Chat = () => {
  return (
    <>
      <Helmet>
        <title>Chat</title>
      </Helmet>
      <CustomeNav />
      <div className="d-md-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div>
        <div className="col-md-9 middle">
          <div className="d-flex justify-content-md-between align-items-center mt-md-5">
            <div className="d-flex mx-4">
              <BreadCrumb name="Chat" breadcrumb="/orders" hasStyles={true} />
            </div>
            <div className="d-md-block d-none">
              <NavIcons />
            </div>
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
                <SearchBar border={true} />
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
            <div className="col-md-8">
              <div className="mt-4">
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
                <hr className="bg-user" />
              </div>
              <div className="sender mt-4 mx-3 text-deep">
                <div className="rounded bg-light py-2 px-3">Hello Andrews</div>
                <div className="rounded bg-light py-2 px-3">
                  How are you doing today
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
