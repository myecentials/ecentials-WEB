import React, { useEffect, useState } from "react";
import { useFetchAllInvoicesMutation } from '../../app/features/report/reportApiSlice';
import { Link ,useNavigate} from "react-router-dom";
import Loader from "../Loader";
import DataTable from "react-data-table-component";


const PurchaseReportTable = ({ startDate, endDate ,setParsedData }) => {
  const [allReviews] = useFetchAllInvoicesMutation();
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [data, setData] = useState([]);
  const  [isLoading ,setIsLoading] = useState(false)

  // Handle asynchronous API data and filtering
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)
        const response = await allReviews().unwrap(); // Assuming this fetches data
        console.log(response)
setFilteredData(response.data)
setParsedData(response.data)
setData(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }finally{
        setIsLoading(false)
      }
    };

    fetchData();
  }, [allReviews, setParsedData]);


 

// useEffect(()=>{
  

// },[endDate, filteredData, setTotal, startDate])

  useEffect(()=>{


if(startDate !== "" && endDate !== ""){
 
  const newData = data.filter(
    (item) => {
      const created = new Date(item.createdAt);
      const start = new Date(startDate);
      const end = new Date(endDate);
       return created >= start && created <= end

  })
 setFilteredData( prev => newData)
 setParsedData(prev => newData)



}else if(startDate !== "") {
  const newData = data.filter(item => {
    return new Date(item.createdAt) >= new Date(startDate)
    
    
      })
     setFilteredData(prev => newData)
     setParsedData(prev => newData)

    
  
}else if (endDate !== ""){
  const newData = data.filter(item => {
    return new Date(item.createdAt) <= new Date(endDate)
    
      })
    setFilteredData( prev => newData)
    setParsedData(prev => newData)

    
}else{
  setFilteredData( prev => data)
  setParsedData(prev => data)

}


  },[startDate, endDate, data, setParsedData])

const handleSaleChosen = (items) => {
  console.log(items); // Optional logging for debugging

  try {
    const itemsString = JSON.stringify(items);
    sessionStorage.setItem("saleChosen", itemsString);
    navigate("/pharmacy/reports/sales-report/sales-report-details");
  } catch (error) {
    console.error("Error storing sale items:", error);
    // Handle storage error gracefully, e.g., show an error message to the user
  }
};


const columns = [
  {
    name: "INVOICE ID",
    sortable: true,
    minWidth: "200px",
    selector: (row) => row.order_code,
  },

  {
    name: "CREATED DATE",
    sortable: true,
    minWidth: "100px",
    selector: (row) => new Date(row.createdAt).toLocaleDateString(),
  },
  {
    name: "TOTAL AMOUNT (GHC)",
    sortable: true,
    minWidth: "200px",

    selector: (row) => row.grand_total.toFixed(2),
  },
  {
    name: "CUSTOMER NAME",
    sortable: true,
    minWidth: "200px",

    selector: (row) => row.customer_name || 'N/A',
  },
  {
    name: "ACTION ",
    sortable: true,
    minWidth: "200px",

    cell: (row) => (
          <span
           onClick={()=> handleSaleChosen(row)}
            className="border-0 px-3 py-1 small rounded-pill"
            style={{
              backgroundColor: "rgba(147, 193, 249, 0.15)",
              color: "#000000",
              padding:"5px 0",
              fontWeight:"500"
            }}
           >
            View Invoice
          </span>
    )
  },
  
];

 
  return (
    <div className="row mt-4">
       <div className="mt-4">
         <div className="mx-3">
           {isLoading ? (
								<Loader />
							) : (
								<DataTable
									columns={columns}
									data={filteredData}
									customStyles={customStyles}
                  pagination
									striped		
                  fixedHeader							
								/>
							)}
						</div>
					</div>  
  </div>
    
  );
};

export default PurchaseReportTable;

const customStyles = {
	headRow: {
		style: {
			backgroundColor: "#4D44B5",
			color: "white",
			fontSize: "15px",
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