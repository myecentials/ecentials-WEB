import React from "react";
import { Modal, ModalBody, Table } from "reactstrap";
import leftchev from "../assets/icons/svg/leftchev.svg";
import rightchev from "../assets/icons/svg/rightchev.svg";
import oral1 from "../assets/images/png/oraddrug1.png";
import oral2 from "../assets/images/png/oraddrug2.png";
import oral3 from "../assets/images/png/oraddrug3.png";
import oral4 from "../assets/images/png/tablet1.png";
import chev from "../assets/icons/svg/chevfilldown.svg";
import updownchev from "../assets/icons/svg/updownchev.svg";
import eye from "../assets/icons/svg/eye.svg";
import edit from "../assets/icons/svg/edit.svg";
import bin from "../assets/icons/svg/bin.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "../config/api/axios";
import { useState } from "react";
import { toast, Toaster } from "react-hot-toast";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { facility_id, userInfo } from "../app/features/authSlice/authSlice";
import { useGetProductsMutation } from "../app/features/products/productsApiSlice";
import { allDrugs, invoicePOS } from "../app/features/invoice/invoiceSlice";
import { useGetDrugsCountMutation, useGetDrugsMutation } from "../app/features/invoice/invoiceApiSlice";
// import Pagination from "./Pagination";
// import { PaginationItem } from "@mui/material";
import { Pagination } from "@mui/material";
import { productsList } from "../app/features/products/productsSlice";

const ProductsTable = ({ search = "" }) => {
  // console.log(search);
  const [drugs] = useGetDrugsMutation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userinfo = useSelector(userInfo);
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(50);
  const [currentPage, setCurrentPage] = useState(1)
  const [enteries, setEnteries] = useState(10);
  const [drugsCount] = useGetDrugsCountMutation();
  const [postPerPage, setPostPerPage] = useState(20)
  const indexOfLastPost = currentPage * postPerPage
  const indexOfFirstPost = indexOfLastPost - postPerPage
  const currentPost = data?.slice(indexOfFirstPost, indexOfLastPost)
  const [drugTotal, setDrugTotal] = useState(0)
  const paginate = (event, value) => {
    console.log(event, value)
    setCurrentPage(value)
  }

  const handleEntryChange = (e) => {
    setEnteries(e.target.value);
  };


  useEffect(() => {
    const fetchDrugsCount = async () => {
      try {
        const results = await drugsCount({ store_id: facilityid }).unwrap();
        setDrugTotal(results?.data)
        
      } catch (error) { }
    }

    fetchDrugsCount()
  }, [])

  useEffect(() => {
    const fetchDrugs = async () => {
      try {
        setIsLoading(true)
        const results = await drugs({ store_id: facilityid, skip: indexOfFirstPost, limit: currentPage ? currentPage * 20 : postPerPage }).unwrap();
       setData(results?.data)
        dispatch(productsList([...results?.data]));
      setIsLoading(false)
      } catch (error) {}
    };
    fetchDrugs();
  }, [currentPage]);

  const pharmDrugs = useSelector(allDrugs);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await pharmDrugs;
        // console.log(results);
        setData(results);
      } catch (error) {}
    };
    fetchData();
  }, [pharmDrugs]);


  const handleProductIndex = (items, e) => {
    const productData = data[e];
    sessionStorage.setItem("productInfo", JSON.stringify(items));
  };

  const [isOpen, setIsOpen] = useState(false);
  const [drug_id, setDrug_id] = useState("");
  const handleDelete = (index) => {
    setIsOpen(true);
    setDrug_id(data[index]._id);
  };
  const handleDeleteDrug = (e) => {
    console.log(drug_id);
    const myPromise = axios.delete(
      "/pharmacy/drugs/delete-drug",
      { data: { drug_id } },
      { headers: { "auth-token": sessionStorage.getItem("userToken") } }
    );

    toast.promise(
      myPromise,
      {
        loading: "Loading...",
        success: (res) => `${res.data.message}`,
        error: (err) => console.log(err),
      },
      setIsOpen(false),
      setTimeout(() => {
        window.location.reload(true);
      }, 1500)
    );
  };

  const [searchText, setSearchText] = useState("");

  
 


  return (
    <div className="mx-3 card bg-white border-0">
      <div className="d-flex justify-content-between ms-bg py-2 gy-md-0 gy-2 t-header">
        <div className=" my-0 text-white small ">
          {/* <span className="mx-2 text-nowrap">
            Showing{" "}
            <select name="enteries" id="" onChange={handleEntryChange}>
              {data?.slice(0, Math.ceil(data.length / 10)).map(({}, index) => (
                <option value={index * 10 + 10}>{index * 10 + 10}</option>
              ))}
            </select>{" "}
            entries
          </span> */}
        </div>

        <span className="mx-3">
          <Link to="/products/category">
            <div className="btn d-flex btn-light">
              <img src={eye} alt="" />
              <span className="small mx-2" style={{ color: "#4D44B5" }}>
                Category
              </span>
            </div>
          </Link>
        </span>
      </div>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="table-responsive">
          <Table borderless bgcolor="white" striped className="">
            <thead className="text-deep">
              <tr className="small">
                <th className="text-nowrap">#</th>
                <th className="text-nowrap">Name</th>
                <th className="text-nowrap">
                  <img src={updownchev} alt="" className="mx-1" />
                  Image
                </th>
                <th className="text-nowrap ">
                  <img src={updownchev} alt="" className="mx-1" />
                  Dose
                </th>

                <th className="text-nowrap">
                  {" "}
                  <img src={updownchev} alt="" /> Category
                </th>

                <th className="text-nowrap">Level Of Prescription</th>
                <th className="text-nowrap">Selling Price(GHC)</th>
                <th className="text-nowrap">Total Item</th>
                <th className="text-nowrap">Expiration Date</th>
                <th className="text-nowrap">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentPost
                ?.filter(({ name }) =>
                  name.toLowerCase() === ""
                    ? name?.toLowerCase()
                    : name?.toLowerCase()?.includes(search?.toLowerCase())
                )
                ?.map(
                  (
                    {
                      name,
                      dosage,
                      total_stock,
                      image,
                      medicine_group,
                      selling_price,
                      expiry_date,
                      level,
                      price,
                      description,

                      _id,
                    },
                    index
                  ) => (
                    <tr key={index} className="">
                      <td className="py-3 text-center">{(indexOfFirstPost + 1) + index}</td>
                      <td className="py-3 text-nowrap">{name}</td>
                      <td className="py-3">
                        <img
                          src={image}
                          alt=""
                          className="img-fluid d-block rounded "
                          style={{
                            width: "5rem",
                            height: "3rem",
                            aspectRatio: "3 / 2",
                            objectFit: "contain",
                            mixBlendMode: "darken",
                            pointerEvents: "none",
                          }}
                        />
                      </td>
                      <td className="py-3 text-nowrap">{dosage}</td>
                      <td className="py-3">{medicine_group}</td>
                      <td className="py-3 text-center">{level || "N/A"}</td>
                      <td className="py-3 text-center">{selling_price}</td>
                      <td className="py-3">{total_stock}</td>
                      <td className="py-3">
                        {`${new Date(expiry_date).getDate()}/${
                          new Date(expiry_date).getMonth() + 1
                        }/${new Date(expiry_date).getFullYear()}`}
                      </td>
                      <td>
                        <span className="d-flex">
                          <Link
                            to="/products/edit-product"
                            onClick={() =>
                              handleProductIndex(
                                {
                                  name,
                                  dosage,
                                  total_stock,
                                  image,
                                  medicine_group,
                                  selling_price,
                                  expiry_date,
                                  _id,
                                  price,
                                  description,
                                  level,
                                },
                                index
                              )
                            }
                          >
                            <img src={edit} alt="" />
                          </Link>
                          <img
                            src={bin}
                            alt=""
                            className="mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(index)}
                          />
                        </span>
                      </td>
                    </tr>
                  )
                )}
            </tbody>
          </Table>
        </div>
      )}
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5 mt-4">
        {data?.length === 0 ? (
          <p className="text-deep">
            No products available, please add product to see them here
          </p>
        ) : (
          <p className="small text-center">
            Showing <span className="text-lightdeep">{indexOfFirstPost + 1}-{indexOfLastPost}</span> from{" "}
            <span className="text-lightdeep">{drugTotal?.length}</span> data
          </p>
        )}
{/*       
          <Pagination postPerPage={postPerPage} totalPosts={data} paginate={paginate}/>
          <Pagination/>
          <Pagination/> */}
          <Pagination count={Math.ceil(drugTotal / postPerPage)}   onChange={paginate}/>
          <Modal isOpen={isOpen} centered={true}>
            <ModalBody>
              <p className="text-center text-deep">
                Do you want to delete this drug?
              </p>
              <div className="d-flex pb-3 justify-content-center align-items-center mx-auto">
                <button
                  className="btn btn-danger mx-2"
                  onClick={() => setIsOpen(false)}
                  style={{ width: "7rem" }}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-success text-white mx-2"
                  onClick={handleDeleteDrug}
                  style={{ width: "7rem" }}
                >
                  Delete
                </button>
              </div>
            </ModalBody>
          </Modal>
          <Toaster />
        
      </div>
    </div>
  );
};

export default ProductsTable;
