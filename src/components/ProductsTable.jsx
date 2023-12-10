import React ,{ useEffect , useState} from "react";
import { Modal, ModalBody } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { toast, Toaster } from "react-hot-toast";
import DataTable from "react-data-table-component";
import edit from "../assets/icons/svg/edit.svg";
import bin from "../assets/icons/svg/bin.svg";

import { facility_id } from "../app/features/authSlice/authSlice";
import { useDeleteProductMutation,useSearchProductInPharmarcyMutation } from "../app/features/products/productsApiSlice";
import { allDrugs } from "../app/features/invoice/invoiceSlice";
import { useGetDrugsMutation } from "../app/features/invoice/invoiceApiSlice";
import { productsList ,getProducts} from "../app/features/products/productsSlice";
import { useNavigate } from "react-router-dom";
import { productCount } from './../app/features/dashboard/dashboardSlice';


const ProductsTable = ({ search = "" }) => {
 const products = useSelector(getProducts)
 const productTotal = useSelector(productCount)
  const [deleteProduct] = useDeleteProductMutation()
  const [searchDrug] =  useSearchProductInPharmarcyMutation()
  const [filterData, setFilterData] = useState([]);
  const navigate = useNavigate();
  const [drugs] = useGetDrugsMutation();
  const [data, setData] = useState([]);
  const facilityid = useSelector(facility_id);
  const dispatch = useDispatch();
  // const [drugsCount] = useGetDrugsCountMutation();
  const [isLoading, setIsLoading]= useState(false)
  const [totalRows, setTotalRows] = useState(0);
	const [perPage, setPerPage] = useState(10);
  const [searchText,setSearchText] = useState("")

const [sload,setSLoad] = useState(true)
const [load,setLoad] = useState(false)

  const columns = [
    {
      name: "Name",
      sortable: true,
      selector: (row) => row?.name,
      minWidth: "200px",
    },
    {
      name: "Picture",
      cell: (row) =>  <img
      src={row?.image}
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
      
      ,
    },
    {
      name: "Dosage",
      selector: (row) => row?.dosage,
    },
    {
      name: "Selling Price",
      sortable: true,
      selector: (row) => row?.selling_price,
      minWidth: "200px"

    },
    {
      name: "Total Item",
      sortable: true,
      selector: (row) => row?.total_stock,
      minWidth: "200px"

    },
    {
      name: "Expiry Date",
      sortable: true,
      cell: (row) =>   <span>
      {`${new Date(row?.expiry_date).getDate()}/${
        new Date(row?.expiry_date).getMonth() + 1
      }/${new Date(row?.expiry_date).getFullYear()}`}
    </span>
       ,
       minWidth: "200px"

    },

    {
      name: "Actions",
      cell: (row) => 
      ( 
        <span className="d-flex">   
                          {/* <Link
                            to="/products/edit-product"
                            onClick={() =>
                              handleProductIndex()  
                            }                              
                            >
                            </Link> */}
                            <img src={edit} alt=""  onClick={() =>
                              handleEdit(row)  
                            }     />
                          <img
                            src={bin}
                            alt=""
                            className="mx-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => handleDelete(row?._id)}  
                                                                     
                          />
                        </span>
      ),
    },
  ];


  // const handleEntryChange = (e) => {
  //   setEnteries(e.target.value);
  // };

  // const handleFilter = (event) =>{
  //   const newData = filterData.filter(row => row.name.toLowerCase().includes(event.target.value.toLowerCase()))
  //   setData(newData)
  // }
  const handleFilter = (event) =>{
  if(event.target.value ===""){
console.log("Empty oo, do something")
setSLoad(true)
setLoad(false)
fetchDrugs()
  }else{
    setSLoad(false)
setLoad(true)
    setSearchText(event.target.value)
    // searchDrugInPharmacy()

  }
  }




  const fetchDrugs = async (skip = 0, limit = 10) => {
    try {
      setIsLoading(true);
      const results = await drugs({ store_id: facilityid, skip, limit }).unwrap();
      dispatch(productsList([...results?.data]));  
      setData(results.data);
      setFilterData(results.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching drugs:', error);
      setIsLoading(false);
    }
  };
  const handleNextPage = () => {
    const currentTotal = products?.length;
    fetchDrugs(currentTotal, currentTotal + 10);
  };

  useEffect(() => {
    fetchDrugs();
  }, []);

  const searchDrugInPharmacy = async ()=> {
    try {
      setIsLoading(true);
      const res = await searchDrug({ store_id: facilityid, search_text: searchText }).unwrap();
      setData(res.data);
      setIsLoading(false);
  
    } catch(error){
      console.error('Error in searchDrugInPharmacy:', error);
      setIsLoading(false);    }
  
  }

  // useEffect(() => {
  //  searchDrugInPharmacy();
  // },[]);

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


  const handleEdit = (items) => {
    console.log(items);
    sessionStorage.setItem("productSelected", JSON.stringify(items));
    navigate("/products/edit-product")

  };
  
  const [isOpen, setIsOpen] = useState(false);
  const [drug_id, setDrug_id] = useState("");

  const handleDelete = (id) => {
    setIsOpen(true);
    setDrug_id(id);
  };

  const handleDeleteDrug = async () => {
    setIsOpen(false);
    try {
      const res = await deleteProduct({ drug_id }).unwrap();
toast.promise(
      Promise.resolve(res),
      {
        loading: (res) => "Deleting...",
        success: (res) => `Drug Deleted Succesfully`,
        error: (err) => "An error occured , please try again",
      },   
  setTimeout( () => fetchDrugs() ,5000  ) 
    ) 
     
    } catch (error) {
      console.log(error);
    }
    
  
  };

  
 


  return (
    <div className="mx-3 card  border-0">
      <div className="d-flex justify-content-between ms-bg py-2 gy-md-0 gy-2 ">
        <div className="d-flex ">
      <input
          type="search"
          className="form-control border-0 rounded-pill  w-50 mx-4"
          placeholder="Search..."
          name="search"
          onChange={handleFilter}
        />

        <button className="btn w-10 rounded-2 bg-light text-secondary" onClick={searchDrugInPharmacy} disabled={sload}>Search</button>
        </div>

        <button className="btn w-10 rounded-2 bg-light text-primary" onClick={handleNextPage} disabled={load}>LoadMore</button>
        </div>
      {/* {isLoading ? (
        <Loader />
      ) : ( */}
      
        <div className="table-responsive">
           <DataTable
              columns={columns}
              data={data}
              customStyles={customStyles}
              striped
              progressPending={isLoading}
              pagination
              // onSelectedRowsChange={handleChange}
              // selectableRows
            />
        </div>
      {/* )} */}
      <div className="d-md-flex justify-content-between align-items-center mx-4 mb-5 mt-4">
       {/*  {data?.length === 0 ? (
          <p className="text-deep">
            No products available, please add product to see them here
          </p>
        ) : (
          <p className="small text-center">
            Showing <span className="text-lightdeep">{indexOfFirstPost + 1}-{indexOfLastPost}</span> from{" "}
            <span className="text-lightdeep">{drugTotal?.length}</span> data
          </p>
        )}

          <Pagination count={Math.ceil(drugTotal / postPerPage)}   onChange={paginate}/> */}
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

/**
 *  This is the styling for the Datatable
 */
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
