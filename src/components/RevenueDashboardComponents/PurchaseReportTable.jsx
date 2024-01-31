import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useFetchAllReviewsMutation } from '../../app/features/report/reportApiSlice';
import { Link } from "react-router-dom";

const PurchaseReportTable = () => {
  const [allReviews, { data: response, isLoading, isError }] = useFetchAllReviewsMutation();

  useEffect(() => {
    allReviews();
  }, []);
 
    
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
                  <td>{new Date(res.createdAt).toLocaleDateString()}</td>
                  <td className="text-center">{res.grand_total}</td>
                  <td>{`${res.customer_name ? res.customer_name : "N/A" } `}</td>
                  <td>       
                    <div className="btn text-deep btn-bg">
                    <Link 
                       to={`/pharmacy/reports/sales-report/${res?.invoice_number}`}
                      
                         className="text-nowrap"
                      >
                        View Invoice
                      </Link>
                    </div>
                  </td>
                </tr>
          ))
        )}
      </tbody>
    </Table>

  </div>
    
  );
};

export default PurchaseReportTable;
