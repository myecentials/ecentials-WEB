import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import SideBar from "../../../components/SideBar";
import StaffCard from "../../../components/Pharmacy/Hrm/StaffCard";
import BreadOutlined from "../../../components/BreadOutlined";
import leftchev from "../../../assets/icons/svg/leftchev.svg";
import rightchev from "../../../assets/icons/svg/rightchev.svg";
import chevfilldown from "../../../assets/icons/svg/chevfilldown.svg";
import add from "../../../assets/icons/svg/add.svg";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
import { Link } from "react-router-dom";
// import Header from "../../../components/Header";
import axios from "../../../config/api/axios";
import { useState } from "react";
import { useEffect } from "react";
import { Modal } from "reactstrap";
import empty from "../../../assets/images/svgs/empty.svg";
import PharmacyName from "../../../components/PharmacyName";
import { useFetchAllStaffMutation } from "../../../app/features/hrm/hrmApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { allStaff } from "../../../app/features/hrm/hrmSlice";
import { facility_id, setToken } from "../../../app/features/authSlice/authSlice";
import ReactPaginate from 'react-paginate';


const Staff = () => {
    const token = useSelector(setToken);


  const [details, setDetails] = useState([]);
  const [, setIsLoading] = useState(false);
  const [staff] = useFetchAllStaffMutation();
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await staff(facilityid).unwrap();
        dispatch(allStaff({ ...results?.data }));
        setDetails(results?.data);
        console.log(results);
      } catch (error) {}
    };

    fetchData();
  }, [dispatch, facilityid, staff]);

  

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "/pharmacy/staff/fetch-pharmacy-staff",
        {
          facility_id: facilityid,
        },
        { headers: { "auth-token": token } }
      )
      .then((res) => {
        setDetails(res.data.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [facilityid, token]);


  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  // Simulate fetching items from another resources.
  // (This could be items from props; or items loaded in a local state
  // from an API endpoint with useEffect and useState)
  const endOffset = itemOffset + itemsPerPage;
  console.log(`Loading items from ${itemOffset} to ${endOffset}`);
  const currentItems = details.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(details.length / itemsPerPage);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % details.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <>
      <Helmet>
        <title>Staff</title>
      </Helmet>

        <div className="col-md-9 middle">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">HRM</h6>
              <DateHeader />
              <div className="d-flex">
                <BreadOutlined name="HRM" breadcrumb="/pharmacy/hrm/staff" />
                <BreadCrumb
                  name="Staff"
                  breadcrumb="/pharmacy/hrm/staff"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="d-md-flex justify-content-between mt-4">
            <div className="mx-3"></div>
            <div className="d-flex justify-content-evenly  mt-md-0 mt-3">
              <button
                className="btn outline-btn rounded-pill px-4 text-nowrap"
                style={{ color: "#4D44B5" }}
              >
                Newest{" "}
                <img src={chevfilldown} alt="" width={15} className="mx-2" />
              </button>
              <Link
                to="/pharmacy/hrm/staff/add-new-staff"
                className="btn mx-md-3 signup-btn rounded-pill px-4 text-nowrap"
              >
                <img src={add} alt="" width={10} className="mx-2" /> New Staff
              </Link>
            </div>
          </div>
          <Modal isOpen={false}></Modal>
          {details.length === 0 ? (
            <div className="staff_contain">
              <img
                src={empty}
                alt=""
                className="img-fluid d-block"
                width={300}
              />
              <p className="text-center mt-2 text-deep">No Staff Available</p>
            </div>
          ) : (
            <div className="row mt-md-5 mx-3 pb-5 d-grid-3">
              {currentItems?.map(
                (
                  { first_name, last_name, photo, department, _id, terminated },
                  index
                ) => (
                  <div className="col-lg-3 gy-3" key={_id}>
                    <StaffCard
                      to="/pharmacy/hrm/staff/names/edit"
                      image={photo}
                      link={`/pharmacy/hrm/staff/${first_name} ${last_name} ${_id}`}
                      name={`${first_name} ${last_name}`}
                      field={department}
                      id={index}
                      active={terminated}
                    />
                  </div>
                )
              )}
            </div>
          )}
 
          <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
          <ReactPaginate
        breakLabel=""
        nextLabel={ <img src={rightchev} alt="" className="mx-1" />}
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel= {<img src={leftchev} alt="" className="mx-1" />}
        renderOnZeroPageCount={null}
        containerClassName="d-flex justify-content-center align-items-center container" 
        pageClassName=" circle rounded-circle mail mx-1"  
        pageLinkClassName=""  
        activeClassName="circle rounded-circle mail circle-bgdeep text-white mx-2"  
        previousClassName="circle rounded-circle mail mx-2"  
        previousLinkClassName="circle rounded-circle mail "  
        nextClassName="circle rounded-circle mail "  
        nextLinkClassName="circle rounded-circle mail "  

      />
            {/* <p className="small text-center">
              Showing <span className="text-lightdeep">1-{details.length}</span>{" "}
              from <span className="text-lightdeep">{details.length}</span> data
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <img src={leftchev} alt="" className="mx-3" />
              <div className="circle rounded-circle mail circle-bgdeep text-white">
                1
              </div>
              <div className="circle rounded-circle mail mx-2">2</div>
              <div className="circle rounded-circle mail">3</div>
              <img src={rightchev} alt="" className="mx-3" />
            </div> */}
          </div>
        </div>
    </>
  );
};

export default Staff;
