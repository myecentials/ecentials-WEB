import React from "react";
import DateHeader from "../../../components/DateHeader";
import BreadCrumb from "../../../components/BreadCrumb";
// import SideBar from "../../../components/SideBar";
import StaffCard from "../../../components/Pharmacy/Hrm/StaffCard";
import BreadOutlined from "../../../components/BreadOutlined";
import leftchev from "../../../assets/icons/svg/leftchev.svg";
import rightchev from "../../../assets/icons/svg/rightchev.svg";
import chevfilldown from "../../../assets/icons/svg/chevfilldown.svg";
import { AiOutlineCaretDown } from "react-icons/ai";
import { AiOutlineCaretUp } from "react-icons/ai";
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
import {
	facility_id,
	setToken,
} from "../../../app/features/authSlice/authSlice";
import ReactPaginate from "react-paginate";

const Staff = () => {
	const token = useSelector(setToken);
  
	const [details, setDetails] = useState([]);
	const [, setIsLoading] = useState(false);
	const [staff] = useFetchAllStaffMutation();
	const facilityid = useSelector(facility_id);
	const dispatch = useDispatch();
  
    const [itemOffset, setItemOffset] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [isAscending, setIsAscending] = useState(false);

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

	const handleItemsPerPageChange = (event) => {
		setItemsPerPage(Number(event.target.value)); // Convert the value to a number
	};


  const handleSortClick = () => {
    // Toggle the order when the button is clicked
    setIsAscending((prevOrder) => !prevOrder);

    // Sort the data based on the current order
    const sortedData = [...details].sort((a, b) => {
      const dateA = new Date(a.start_date);
      const dateB = new Date(b.start_date);
  
      if (isAscending) {
        // Ascending order
        return dateA - dateB;
      } else {
        // Descending order
        return dateB - dateA;
      }
    });

    // Update the state with the sorted data
    setDetails(sortedData);
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
					<div className="mx-3 text-deep">
						{" "}
						<label htmlFor="itemsPerPageSelect"> Per Page:</label>
						<select
							id="itemsPerPageSelect"
							value={itemsPerPage}
							onChange={handleItemsPerPageChange}
              style={{
                padding: '4px',
                borderRadius: '4px',
                border: '1px solid #ccc',
                cursor: 'pointer',
              }}
              >
							<option value={5}>5</option>
							<option value={10}>10</option>
							<option value={15}>15</option>
							<option value={20}>20</option>
						</select>
					</div>
					<div className="d-flex justify-content-evenly  mt-md-0 mt-3">
						<button
							className="btn outline-btn rounded-pill px-4 text-nowrap"
							style={{ color: "#4D44B5" }}
              onClick={handleSortClick}
              >
							Newest{" "}
							{/* <img src={chevfilldown} alt="" width={15} className="mx-2" /> */}
              {
                isAscending? 
                <AiOutlineCaretUp size={15}/> :
                <AiOutlineCaretDown size={15}/>

              }
						</button>
						<Link
							to="/pharmacy/hrm/staff/add-new-staff"
							className="btn mx-md-3 signup-btn rounded-pill px-4 text-nowrap">
							<img src={add} alt="" width={10} className="mx-2" /> New Staff
						</Link>
					</div>
				</div>
				<Modal isOpen={false}></Modal>
				{details.length === 0 ? (
					<div className="staff_contain">
						<img src={empty} alt="" className="img-fluid d-block" width={300} />
						<p className="text-center mt-2 text-deep">No Staff Available</p>
					</div>
				) : (
					<div className="row mt-md-5 mx-3 pb-5 d-grid-3">
						{currentItems?.map(
							(
								item,
								index
							) => (
								<div className="col-lg-3 gy-3" key={item._id}>
									<StaffCard
										to="/pharmacy/hrm/staff/names/edit"
										image={item.photo}
										link={`/pharmacy/hrm/staff/${item.first_name} ${item.last_name} ${item._id}`}
										name={`${item.first_name} ${item.last_name}`}
										field={item.department}
										id={item._id}
										active={item.terminated}
										details={item}
										email ={item.email}
									/>
								</div>
							)
						)}
					</div>
				)}

				<div className="d-md-flex justify-content-between align-items-center mx-4 mb-5">
					<ReactPaginate
						breakLabel=""
						nextLabel={<img src={rightchev} alt="" className="mx-1" />}
						onPageChange={handlePageClick}
						pageRangeDisplayed={3}
						pageCount={pageCount}
						previousLabel={<img src={leftchev} alt="" className="mx-1" />}
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
					
				</div>
			</div>
		</>
	);
};

export default Staff;
