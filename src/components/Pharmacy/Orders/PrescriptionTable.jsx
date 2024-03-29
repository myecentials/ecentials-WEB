import React from "react";
// import leftchev from "../assets/icons/svg/leftchev.svg";
// import rightchev from "../assets/icons/svg/rightchev.svg";
// import updownchev from "../assets/icons/svg/updownchev.svg";
// import { Table } from "reactstrap";
// import chev from "../assets/icons/svg/chevfilldown.svg";
import { Link } from "react-router-dom";
// import orders from "../static/orders";
import axios from "../../../config/api/axios";
import { useEffect } from "react";
import { useState } from "react";
//import ReactImageMagnify from "react-image-magnify";
import Loader from "../../Loader";
// import useAuth from "../hooks/useAuth";
import { useFetchAllPrescriptionsMutation } from "../../../app/features/orders/ordersApiSlice";
import { useDispatch, useSelector } from "react-redux";
import { facility_id ,setToken } from "../../../app/features/authSlice/authSlice";
import { allPrescriptions ,setSinglePrescription } from "../../../app/features/orders/ordersSlice";
// import { Pagination } from "@mui/material";
import { toast ,Toaster} from 'react-hot-toast';
import DataTable from "react-data-table-component";


const PrescriptionTable = ({ search }) => {
  // const { auth } = useAuth();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prescriptions] = useFetchAllPrescriptionsMutation();
  const token = useSelector(setToken)
  const facilityId = useSelector(facility_id)
  const dispatch = useDispatch();
  // const [currentPage, setCurrentPage] = useState(1)
  // const [postPerPage, ] = useState(10)
  // const indexOfLastPost = currentPage * postPerPage
  // const indexOfFirstPost = indexOfLastPost - postPerPage
  // const currentPost = data?.slice(indexOfFirstPost, indexOfLastPost)
  // const [drugTotal, setDrugTotal] = useState(0)
  // const paginate = (event, value) => {
  //   setCurrentPage(value)
  // }


  const columns = [
		{
			name: "Image",
			cell: (row) => <img src={row.image || "N/A"} alt="precription" width={50}/>,
			minWidth: "70px",
		},
		{
			name: "Name",
			selector: (row) => row.user_name || "N/A",
			minWidth: "200px",
		},
		{
			name: "Email",
			selector: (row) => row.user_email,
			minWidth: "300px",
		},
		{
			name: "Address",
			selector: (row) => formatLocation(row.user_address) || "N/A",
			minWidth: "300px",
		},
    {
      name: "Status",
      minWidth: "150px",
      cell: (row) =>
      <span
      className="rounded-pill border-0 px-3 py-1 small"

      style={{
        backgroundColor: `${
          row.order_status === "Cancelled"
            ? "#FBE7E8"
            : row.order_status === "New"
            ? "#C1BBEB"
            : row.order_status === "Approved"
            ? "#EBF9F1"
            : ""
        }`,
        color: `${
          row.order_status === "Cancelled"
            ? "#A30D11"
            : row.order_status === "New"
            ? "#4D44B5"
            : row.order_status === "Approved"
            ? "#1F9254"
            : ""
        }`,
      }}>
      {row.status}
    </span> ,
     

    },
		
		{
			name: "Action",
			minWidth: "150px",
			cell: ( {
        image,
        user_name,
        user_email,
        user_address,
        user_id,
        _id,
      },
      index) => (
				<span className="py-3">
					 <Link
                          to="/pharmacy/orders/prescription/process"
                          className="border-0 px-3 py-1 small rounded-pill"
                          style={{
                            backgroundColor: "rgba(147, 193, 249, 0.29)",
                            color: "#007AFF",
                          }}
                          onClick={() =>
                            handleClick(
                              {
                                image,
                                user_name,
                                user_email,
                                user_address,
                                user_id,
                                _id,
                              },
                              index
                            )
                          }
                        >
                          Process
                        </Link>
				</span>
			),
		},
		
	];

  useEffect(() => {
    const fetchData = async () => {
      try{
        const results = await prescriptions(facilityId).unwrap();
        console.log(results)
        dispatch(allPrescriptions({ ...results?.data }));
        setData(results?.data);
      }catch(error){
        if (error.status === "FETCH_ERROR")
				toast.error("Error fetching prescriptions, retry");
      }
    
    };
    fetchData();
  }, [dispatch, facilityId, prescriptions]);

  useEffect(() => {
    setIsLoading(true);
    axios
      .post(
        "/prescriptions/get-prescriptions-for-pharmacy",
        {
          store_id: facilityId,
        },
        {
          headers: {
            "auth-token": token,
          },
        }
      )
      .then((res) => {
       
        setIsLoading(false);
        setData(res.data.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [facilityId, token]);

  function formatLocation(input) {
    // Split the input string using the delimiter "╡"
    const parts = input.split("╡");
  
    // Extract the individual components
    const town = parts[0];
    const city = parts[1];
    const country = parts[3];
  
    // Concatenate the components in the desired format
    const formattedLocation = `${town.trim()}, ${city.trim()}, ${country.trim()}`;
  
    return formattedLocation;
  }

  const handleClick = (item, e) => {
    console.log(item)
    dispatch(setSinglePrescription(item))
    sessionStorage.setItem("presId", JSON.stringify(item));
  };

  // const [, setEnteries] = useState(10);
  // const handleEntryChange = (e) => {
  //   setEnteries(e.target.value);
  // };

  return (
    <div className="mx-3 card bg-white border-0">
      <Toaster/>
      <div className=" ms-bg py-2 gy-md-0 gy-2">
        {/* <div className=" my-0 text-white small ">
          <span className="mx-2 text-nowrap">
            Showing{" "}
            <select name="enteries" id="" onChange={handleEntryChange}>
              {data.slice(0, Math.ceil(data.length / 10)).map(( index) => (
                <option value={index * 10 + 10}>{index * 10 + 10}</option>
              ))}
            </select>{" "}
            entries
          </span>
        </div> */}
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
         <DataTable
								columns={columns}
								data={data}
								pagination
								customStyles={customStyles}
								striped
							/>
        </div>
      )}
      {/* <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5 mt-5">
        <p className="small text-center">
          Showing <span className="text-lightdeep">1-{data.length}</span> from{" "}
          <span className="text-lightdeep">{data.length}</span> data
        </p>
        <Pagination count={Math.ceil(data.length / postPerPage)}   onChange={paginate}/>
      </div> */}
    </div>
  );
};

export default PrescriptionTable;
const customStyles = {
	headRow: {
		style: {
			backgroundColor: "#4D44B5",
			color: "white",
			fontSize: "18px",
			fontWeight: 800,
		},
	},
	cells: {
		style: {
			fontSize: "16px",
			fontWeight: 500,
		},
	},
};