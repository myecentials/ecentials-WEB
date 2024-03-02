import React , {useCallback, useEffect, useState}from "react";
// import {data as invD} from "../../static/inventoryData";
import DataTable from "react-data-table-component";
import jsPDF from "jspdf";
import autoTable from 'jspdf-autotable'
import Loader from "./../Loader";
import { useFetchInventoryMutation } from '../../app/features/report/reportApiSlice';
import { facility_id } from '../../app/features/authSlice/authSlice';
import { useSelector } from "react-redux";
import {toast ,Toaster} from 'react-hot-toast';


const InventoryReportTable = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchInventory] = useFetchInventoryMutation();
  const facilityId = useSelector(facility_id);




  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };



  const generatePDF = () => {
    const doc = new jsPDF();

    // Define the mapping between keys and display names
    const columnMapping = {
      name: " Drug Name",
      total_stock: "Stock Quantity",
      quantity_sold: "Sold Quantity",
      outstanding_quantity: "Outstading Quantity",
      price: "Purchase Price",
      selling_price: "Sale Price",
    };
    
    // Define table columns using display names from the mapping
    const tableColumn = Object.values(columnMapping);
  
    // Map the data to the table rows using the mapping
  const tableRows = filteredData?.map(item => {
    return Object.keys(columnMapping).map(key => item[key]);
  });

  // const tableRows = filteredData?.map(item => {
  //   return Object.keys(columnMapping).map(key => {
  //     // Convert createdAt property to human-readable format
  //     if (key === "createdAt") {
  //       return formatDate(item[key]);
  //     }
  //     return item[key];
  //   });
  // });

    // Add table to the document
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
    });
  
    // Save the document
    doc.save("InventoryReport.pdf");
  };
  

  const columns = [
		{
			name: "Drug Name",
			selector: (row) => row.name,
			wrap: true,
			minWidth: "300px",
      sortable: true,

		},
		{
			name: "Stock Qty",
			selector: (row) => row.total_stock,
			wrap: true,
			minWidth: "200px",
      sortable: true,

		},
		{
			name: "Sold Qty",
			selector: (row) => row.selling_price,
			wrap: true,
			minWidth: "200px",
      sortable: true,

		},
		{
			name: "Outstanding Qty",
			selector: (row) => row.outstanding_quantity,
			wrap: true,
			minWidth: "300px",
      sortable: true,

		},
		{
			name: "Avg Purchase Price",
			selector: (row) => row.price,
			wrap: true,
			minWidth: "300px",
      sortable: true,

		},
		{
			name: "Avg Sale Price",
			selector: (row) => row.selling_price,
			wrap: true,
			minWidth: "300px",
      sortable: true,

		},
	
	];
  
  const fetchData = useCallback( async () => {
    try {
      setIsLoading(true)
      const result = await fetchInventory(facilityId);
      console.log(result)
      setData(prev =>  result?.data?.data?.drugs )
      setFilteredData(prev => result?.data?.data?.drugs )

      if (result.data.message === "inventory data retrieved successfully"){
        toast.success("Inventory retrieved successfully")
      }
    } catch (error) {
      console.error("Error fetching data", error);
    }finally{
setIsLoading(false)
    }
  },[facilityId, fetchInventory]);

  useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true)
//         const result = await fetchInventory(facilityId);
//         console.log(result)
//         setData(prev =>  result?.data?.data?.drugs )
//         setFilteredData(prev => result?.data?.data?.drugs )
//       } catch (error) {
//         console.error("Error fetching data", error);
//       }finally{
// setIsLoading(false)
//       }
//     };

    fetchData();
  }, [facilityId, fetchData, fetchInventory]);

  // useEffect(()=>{
  //   setPending(false)
  //   setData(prev => invD)
  //   setFilteredData(prev => invD)
  // },[])


  return (
    
    <>
    <Toaster/>
    <div className="mt-4 mx-3">
      <div className="card border-0">
        <div className="d-md-flex justify-content-between align-items-center m-3">
          <div className="d-flex">
            <div>
              <h6 className="text-deep">Inventory Report</h6>
              <p className="gray-text small">
                More than 400+ products
              </p>
            </div>
          </div>
          <div className="d-flex">
            <button className="btn-refresh" onClick={fetchData} >Refresh </button>
            <button
              className="btn-export"
              onClick={generatePDF}
            >
              Export to pdf
            </button>
          </div>
        </div>
      </div>
    </div>
    <div className="row mt-4" >
        <div className="mt-4">
          <div className="mx-3" >
            {isLoading ? (
              <Loader />
            ) : (
              <DataTable
           
                columns={columns}
                data={filteredData}
                customStyles={customStyles}
                pagination
                striped
                fixedHeader />
            )}
          </div>
        </div>
      </div></>
  );
};

export default InventoryReportTable;

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
