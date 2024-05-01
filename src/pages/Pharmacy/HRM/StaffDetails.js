import React, { useEffect } from "react";
import DateHeader from "../../../components/DateHeader";
// import NavIcons from "../../components/NavIcons";
// import SideBar from "../../../components/SideBar";
import BreadOutlined from "../../../components/BreadOutlined";
import BreadCrumb from "../../../components/BreadCrumb";
import StaffDetailsHeader from "../../../components/Pharmacy/Hrm/StaffDetailsHeader";
import { Helmet } from "react-helmet";
// import CustomeNav from "../../../components/CustomeNav";
import activeStaff from "../../../static/activeStaff";
// import Header from "../../../components/Header";
import axios from "../../../config/api/axios";
import { useState } from "react";
import PharmacyName from "../../../components/PharmacyName";
import { setToken ,facility_id } from "../../../app/features/authSlice/authSlice";
import { useSelector } from "react-redux";

const StaffDetails = () => {
  const [data, setData] = useState({});
  const token = useSelector(setToken)
  const facilityId = useSelector(facility_id)
  let Mydesc;
  activeStaff.filter(({ desc }, index) => {
    if (index === 0) {
      Mydesc = desc;
    }
    return Mydesc;
  });


  const PRIVILEDGES = [
		{
			label: "HRM",
			value: "hrm",
		},
		{
			label: "Customers",
			value: "customers",
		},
		{
			label: "Sales/Payment",
			value: "sales",
		},
		{
			label: "Products",
			value: "products",
		},
		// {
		// 	label: "Delivery",
		// 	value: "delivery",
		// },
		{
			label: "Manufacturer",
			value: "manufacturer",
		},
		{
			label: "Return",
			value: "return",
		},
		{
			label: "Orders",
			value: "orders",
		},
		{
			label: "Report",
			value: "report",
		},
		{
			label: "Invoice",
			value: "invoice",
		},
	];
  // STAFF DATA
  useEffect(()=>{
    const staffDetails = sessionStorage.getItem("staffDetails");
    if (staffDetails) {
      // Parse the stored data if it's an object or an array
      setData(JSON.parse(staffDetails));
    }
  },[])
  // useEffect(() => {
  //   axios
  //     .post(
  //       "/pharmacy/staff/fetch-pharmacy-staff",
  //       {
  //         facility_id: facilityId,
  //       },
  //       { headers: { "auth-token": token } }
  //     )
  //     .then((res) => {
  //       setData(res.data.data[sessionStorage.getItem("index")]);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [facilityId, token]);

  console.log(data);
  const {
    first_name,
    last_name,
    city,
    email,
    phone_number,
    photo,
    role,
    university,
    privileges,
    address,
    start_date,
    end_date,
  } = data;
  const roles = [];
  for (let privilege in privileges) {
    roles.push(privileges[privilege]);
  }

  let startDate = null;
  let endDate = null;
  startDate = new Date(start_date).getFullYear();
  endDate = new Date(end_date).getFullYear();

  if (startDate === endDate) {
    endDate = "Present";
  }

  return (
    <>
      <Helmet>
        <title>Staff Details</title>
      </Helmet>
      {/* <Header />
      <CustomeNav />
      <div className="d-flex">
        <div className="col-md-3 d-none d-md-block bg-white left">
          <SideBar />
        </div> */}
        <div className="col-md-9 ">
          <div className="d-block d-md-flex mx-3  mt-2 justify-content-between align-items-center">
            <div>
              <h6 className="mt-2 text-deep">HRM</h6>
              <DateHeader />
              <div className="d-flex ">
                <BreadOutlined name="HRM" breadcrumb="/pharmacy/hrm/staff" />
                <BreadOutlined name="Staff" breadcrumb="/pharmacy/hrm/staff" />
                <BreadCrumb
                  name={first_name}
                  breadcrumb="/pharmacy/hrm/staff/name"
                  hasStyles={true}
                />
              </div>
            </div>
            <PharmacyName />
          </div>

          <div className="row mt-4 mx-1">
            <div className="col-md-12 mb-5">
              <div className="card border-0">
                <StaffDetailsHeader
                  name={`${first_name} ${last_name}`}
                  role={role}
                  location={city}
                  phone={phone_number}
                  gmail={email}
                  img={photo}
                />

                {/* Privilagees */}
                <h6 className="text-deep mx-3 mt-4">Priviledges</h6>

                {PRIVILEDGES?.map(({ label, value }, index) => (
									<div key={index} className="form-check mx-3">
										<input
                    className="form-check-input admin"
                    type="checkbox"
                    id={value}
                    checked={roles.includes(value)}
                  />
                  <label
                    className="form-check-label text-deep small "
                    htmlFor="rememberme"
                  >
                    {label}
                  </label>
									</div>
								))}

                <div className="about text-deep mx-3">
                  <h6 className="mt-4">About</h6>
                  <p className="mt-2 w-md-75">{address}</p>
                </div>
                <h6 className="text-deep mx-3 mt-4">Education</h6>
                <ul>
                  <li className="mt-3 small mx-3 text-deep">
                    <b>{university}</b>
                    <p className="small gray-text">
                      {startDate} - {endDate}
                    </p>
                  </li>
                </ul>
              </div>
            </div>

            {/* RIGHT */}
           
          </div>
        </div>
      {/* </div> */}
    </>
  );
};

export default StaffDetails;


// <div className="col-md-4 bg-white mb-md-0 mb-5 pb-5">
// <h6 className="text-deep mt-3 mx-3">Latest Activity</h6>
// <ul className="mt-3 small">
//   <li className="list-disc list">
//     <div className="pb-4">
//       <div>
//         <b className="text-deep">Karen Hope</b> moved order “
//         <span className="text-tomato">#2678</span> “ from{" "}
//         <b className="text-deep">On Progress</b> to{" "}
//         <b className="text-deep">Done</b>
//       </div>
//       <div className="gray-text small mt-2">
//         2 March 2021, 13:45 PM
//       </div>
//     </div>
//   </li>
//   <li className="list-disc list">
//     <div className="pb-4">
//       <div>
//         <b className="text-deep">Samantha William</b> add new{" "}
//         <b className="text-deep">4</b> attached files
//       </div>
//       <div className="gray-text small">
//         2 March 2021, 13:45 PM
//       </div>
//     </div>
//   </li>
//   <li className="list-disc list">
//     <div className="pb-4">
//       <div>
//         <b className="text-deep">Jenny</b> moved order “
//         <span className="text-tomato">#2678</span> “ from{" "}
//         <b className="text-deep">On Progress</b> to{" "}
//         <b className="text-deep">Done</b>
//       </div>
//       <div className="gray-text small mt-2">
//         2 March 2021, 13:45 PM
//       </div>
//     </div>
//   </li>
//   <li className="list-disc list">
//     <div className="">
//       <div>
//         <b className="text-deep">Samantha William</b> created new{" "}
//         <b className="text-tomato">Task</b>
//       </div>
//       <div className="gray-text small mt-2">
//         2 March 2021, 13:45 PM
//       </div>
//     </div>
//   </li>
//   <li className="list-disc list"></li>
// </ul>
// </div>