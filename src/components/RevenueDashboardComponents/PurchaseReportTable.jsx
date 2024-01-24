import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useFetchAllReviewsMutation } from '../../app/features/report/reportApiSlice';
import { FaEye, FaListUl } from "react-icons/fa";
import ViewInvoice from "./ViewInvoice";
import ListDrugs from "./ListDrugs";

const PurchaseReportTable = () => {
  const [viewInvoice, setViewInvoice] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [listDrugs, setListDrugs] = useState(false)

  const [allReviews, { data: response, isLoading, isError }] = useFetchAllReviewsMutation();

  useEffect(() => {
    allReviews();

  }, []);

  const handleInvoiceView = (invoiceData) => {
    setViewInvoice(true)
    setSelectedInvoice(invoiceData);
  }

  const handleListDrugs = (drugData) => {
    setListDrugs(true)
    setSelectedInvoice(drugData);
  }
    
  const returnedData = response?.data;
  console.log(returnedData);

 
 
  return (
    <div>
    <Table borderless responsive bgcolor="white" >
      <thead style={{ backgroundColor: "#F3F6F9" }}>
        <tr>
          <th className="text-nowrap">INVOICE ID</th>
          <th className="text-nowrap">DATE</th>
          <th className="text-nowrap">TOTAL AMOUNT (GHC)</th>
          <th className="text-nowrap">CUSTOMER NAME</th>
          <th className="text-nowrap">ACTION</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <tr>
            <td colSpan="5" className="text-lg fw-bold">Loading...</td>
          </tr>
        ) : isError || !returnedData ? (
          <tr>
            <td colSpan="5">Error fetching data</td>
          </tr>
        ) : (
              returnedData.map((res) => (
                <tr key={res.order_code}>
                  <td className="text-nowrap">{res.order_code}</td>
                  <td>{new Date(res.delivery_date).toLocaleDateString()}</td>
                  <td className="text-center">{res.grand_total}</td>
                  <td>{`${res.customer_name ? res.customer_name : "N/A" } `}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <div 
                        className="text-secondary pointer" 
                        onClick={() => handleInvoiceView(res)}
                      >
                        <FaEye/>
                      </div>
                      <div 
                        className="text-secondary pointer"
                        onClick={() => handleListDrugs(res)}
                      >
                        <FaListUl/>
                      </div>
                    </div>
                  </td>
                </tr>
          ))
        )}
      </tbody>
    </Table>

     {viewInvoice && <ViewInvoice viewInvoice={viewInvoice} setViewInvoice={setViewInvoice} selectedInvoice={selectedInvoice}/>}
     {listDrugs && <ListDrugs listDrugs={listDrugs} setListDrugs={setListDrugs} selectedInvoice={selectedInvoice}/>}

  </div>
    
  );
};

export default PurchaseReportTable;
